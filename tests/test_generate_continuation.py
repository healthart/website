import datetime as dt
import importlib.util
import sys
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "generate_continuation.py"
SPEC = importlib.util.spec_from_file_location("healthart_generate_continuation", SCRIPT_PATH)
GENERATOR = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GENERATOR
SPEC.loader.exec_module(GENERATOR)


def episode(**overrides):
    values = {
        "source": "hubermanlab",
        "title": "A careful episode title",
        "link": "https://example.com/episode",
        "published": dt.date(2026, 8, 14),
        "description": "",
        "topics": ["First RSS topic", "Second RSS topic"],
    }
    values.update(overrides)
    return GENERATOR.Episode(**values)


class GenerateContinuationTests(unittest.TestCase):
    def test_home_diaryofaceo_link_replacement_is_idempotent_with_chinese_slug(self):
        target = "/diaryofaceo/continuation_2026-09-21_RickRubin谈创作"
        home = """features:\n  - title: Diary Of A CEO\n    link: /diaryofaceo/continuation_2026-09-21_旧标题旧标题\n"""
        updated = GENERATOR.replace_home_diaryofaceo_link(home, target)
        self.assertIn(f"    link: {target}\n", updated)
        self.assertEqual(GENERATOR.replace_home_diaryofaceo_link(updated, target), updated)

    def test_metadata_page_keeps_evidence_boundary(self):
        text = GENERATOR.build_summary(episode())

        self.assertIn("状态为待精读", text)
        self.assertIn("## 节目线索", text)
        self.assertIn("## 当前状态", text)
        self.assertIn("不能把标题、简介或嘉宾主张当成已经验证的事实", text)
        self.assertNotIn("确定行动指南", text)
        self.assertNotIn("共识发现", text)

    def test_topic_extraction_omits_sponsor_chapters(self):
        description = (
            "Timestamps (00:00:00) Sponsors: Example "
            "(00:01:00) First real topic (00:02:00) Second real topic"
        )

        self.assertEqual(
            GENERATOR.extract_topics(description),
            ["First real topic", "Second real topic"],
        )

    def test_reviewed_title_override_is_used(self):
        link = "https://peterattiamd.com/peptides/"
        title = GENERATOR.localized_title_for_episode(
            episode(source="peterattiamd", link=link)
        )

        self.assertEqual(title, "肽类：区分科学前景与营销炒作")

    def test_replay_map_has_fourteen_existing_targets(self):
        self.assertEqual(len(GENERATOR.REPLAY_TARGETS), 14)
        for link, relative_path in GENERATOR.REPLAY_TARGETS.items():
            replay = episode(link=f"{link}/" if "peterattiamd.com" in link else link)
            self.assertEqual(GENERATOR.replay_relative_path(replay), relative_path)
            self.assertTrue((GENERATOR.ROOT / relative_path).is_file())

    def test_huberman_rss_missing_links_use_official_episode_urls(self):
        self.assertEqual(
            GENERATOR.HUBERMAN_MISSING_LINKS[
                "Essentials: Diet & Nutrition for Mental Health | Dr. Chris Palmer"
            ],
            "https://www.hubermanlab.com/episode/essentials-diet-and-nutrition-for-mental-health-chris-palmer",
        )
        self.assertEqual(
            GENERATOR.HUBERMAN_MISSING_LINKS[
                "Neuroscience of Emotions & Tools for Improving Emotion Regulation | Dr. Ralph Adolphs"
            ],
            "https://www.hubermanlab.com/episode/neuroscience-of-emotions-and-tools-for-improving-emotion-regulation-ralph-adolphs",
        )

    def test_discovery_only_items_are_held_out_of_generated_articles(self):
        held = GENERATOR.discovery_only_links()
        self.assertEqual(len(held), 2)
        self.assertIn("https://peterattiamd.com/ama89", held)
        self.assertIn("https://peterattiamd.com/ama88", held)
        self.assertNotIn("https://peterattiamd.com/bloodpressure", held)

    def test_new_source_statuses_keep_review_scope(self):
        cases = [
            ("peterattiamd", "https://peterattiamd.com/bloodpressure/", "已按公开重播全文复核"),
            ("diaryofaceo", "https://rss2.flightcast.com/xmsftuzjjykcmqwolaqn6mdn#flightcast_01m08555edjdxy5e3vgd5b9bpa", GENERATOR.REPLAY_STATUS),
            ("hubermanlab", "https://www.hubermanlab.com/episode/essentials-how-to-assess-and-improve-all-aspects-of-your-fitness-andy-galpin", "已按本期精选版全文复核"),
        ]
        for source, link, expected in cases:
            with self.subTest(link=link):
                rows = GENERATOR.collect_episode_rows([episode(source=source, link=link)])
                self.assertEqual(rows[source][0][2], expected)

    def test_new_full_episode_status_survives_index_regeneration(self):
        target = GENERATOR.ROOT / "hubermanlab/continuation_2026-09-21_肠道健康与减重从纤维到药物和内镜治疗.md"
        rows = GENERATOR.collect_episode_rows([
            episode(
                link="https://www.hubermanlab.com/episode/best-tools-for-gut-health-and-weight-loss-chris-thompson",
                published=dt.date(2026, 9, 21),
            )
        ])
        self.assertEqual(rows["hubermanlab"][0][1], target)
        self.assertEqual(rows["hubermanlab"][0][2], "已按完整节目复核")

    def test_reviewed_section_overrides_are_valid(self):
        section_maps = {
            "hubermanlab": GENERATOR.HUBERMAN_SECTIONS,
            "peterattiamd": GENERATOR.PETER_SECTIONS,
            "diaryofaceo": GENERATOR.DIARY_OF_A_CEO_SECTIONS,
        }
        for link, section_key in GENERATOR.CURRENT_SECTION_OVERRIDES.items():
            if "hubermanlab.com" in link:
                source = "hubermanlab"
            elif "peterattiamd.com" in link:
                source = "peterattiamd"
            else:
                source = "diaryofaceo"
            self.assertIn(section_key, section_maps[source])
            self.assertEqual(
                GENERATOR.sidebar_section_for_episode(episode(source=source, link=link)),
                section_maps[source][section_key],
            )

    def test_row_stats_count_unique_pages_and_replay_events(self):
        continuation = Path("/repo/source/continuation_one.md")
        original = Path("/repo/source/original.md")
        rows = [
            (episode(published=dt.date(2026, 8, 14)), continuation, GENERATOR.REPLAY_STATUS),
            (episode(published=dt.date(2026, 2, 1)), continuation, "续写页面"),
            (episode(published=dt.date(2026, 3, 1)), original, "原有页面覆盖"),
        ]

        self.assertEqual(
            GENERATOR.row_stats(rows),
            {
                "rss_events": 3,
                "covered_pages": 2,
                "continuation_pages": 1,
                "existing_pages": 1,
                "replay_events": 1,
            },
        )
        unique_rows = GENERATOR.unique_page_rows(rows)
        self.assertEqual(len(unique_rows), 2)
        self.assertEqual(unique_rows[0][1], original)
        self.assertEqual(unique_rows[1][2], "续写页面")


if __name__ == "__main__":
    unittest.main()
