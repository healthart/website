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

    def test_replay_map_has_nine_existing_targets(self):
        self.assertEqual(len(GENERATOR.REPLAY_TARGETS), 9)
        for link, relative_path in GENERATOR.REPLAY_TARGETS.items():
            replay = episode(link=f"{link}/" if "peterattiamd.com" in link else link)
            self.assertEqual(GENERATOR.replay_relative_path(replay), relative_path)
            self.assertTrue((GENERATOR.ROOT / relative_path).is_file())

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
