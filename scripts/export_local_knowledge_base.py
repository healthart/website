#!/usr/bin/env python3
"""Export the Health Art site content into a standalone local knowledge base.

The export is intentionally Markdown-first so it can be opened with Finder,
Obsidian, VS Code, or any local search tool without running the VitePress site.
"""

from __future__ import annotations

import csv
import json
import re
import shutil
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parent
TARGET = WORKSPACE / "HealthArt-本地知识库"

CONTENT_FOLDERS = {
    "hubermanlab": "01_Huberman_Lab",
    "peterattiamd": "02_Peter_Attia",
    "books": "03_Books",
    "diaryofaceo": "04_The_Diary_Of_A_CEO",
}

ROOT_DOCS = ["index.md", "README.md", "about.md", "continuation.md"]


@dataclass
class Article:
    title: str
    source: str
    source_path: str
    exported_path: str
    original_link: str
    published: str
    is_new: bool


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def extract_title(path: Path, text: str) -> str:
    match = re.search(r"^#\s+(.+)$", text, flags=re.M)
    if match:
        return match.group(1).strip()
    return path.stem


def extract_field(text: str, label: str) -> str:
    match = re.search(rf"^{re.escape(label)}：\s*(.+)$", text, flags=re.M)
    return match.group(1).strip() if match else ""


def page_link_for_source(path: Path) -> str:
    rel = path.relative_to(ROOT)
    return f"/{rel.parent.as_posix()}/{rel.stem}"


def continuation_new_links() -> set[str]:
    path = ROOT / "continuation.md"
    if not path.exists():
        return set()
    text = read_text(path)
    return set(re.findall(r"\]\((/[a-zA-Z0-9_/-]+)\)", text))


def ensure_dirs() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    (TARGET / "_metadata").mkdir(parents=True, exist_ok=True)
    (TARGET / "99_站点页面").mkdir(parents=True, exist_ok=True)
    for folder in CONTENT_FOLDERS.values():
        (TARGET / folder).mkdir(parents=True, exist_ok=True)


def copy_article(source_path: Path, target_dir: Path, source_label: str, new_links: set[str]) -> Article:
    text = read_text(source_path)
    target_path = target_dir / source_path.name
    shutil.copy2(source_path, target_path)
    page_link = page_link_for_source(source_path) if source_label != "site" else ""
    is_new = page_link in new_links or source_path.name.startswith("continuation_")
    return Article(
        title=extract_title(source_path, text),
        source=source_label,
        source_path=str(source_path.relative_to(ROOT)),
        exported_path=str(target_path.relative_to(TARGET)),
        original_link=extract_field(text, "原文链接"),
        published=extract_field(text, "发布日期"),
        is_new=is_new,
    )


def collect_articles() -> list[Article]:
    ensure_dirs()
    new_links = continuation_new_links()
    articles: list[Article] = []

    for source_folder, target_folder in CONTENT_FOLDERS.items():
        source_dir = ROOT / source_folder
        target_dir = TARGET / target_folder
        for path in sorted(source_dir.glob("*.md")):
            articles.append(copy_article(path, target_dir, source_folder, new_links))

    site_dir = TARGET / "99_站点页面"
    for name in ROOT_DOCS:
        path = ROOT / name
        if path.exists():
            articles.append(copy_article(path, site_dir, "site", new_links))

    return articles


def md_link(path: str) -> str:
    return quote(path, safe="/._-()")


def table_row(values: list[str]) -> str:
    escaped = [re.sub(r"\s+", " ", value or "").replace("|", "\\|").strip() for value in values]
    return "| " + " | ".join(escaped) + " |"


def write_all_index(articles: list[Article]) -> None:
    lines = [
        "# 全部文章索引",
        "",
        "| 标题 | 来源 | new | 原文 | 本地文件 |",
        "| --- | --- | --- | --- | --- |",
    ]
    for article in sorted(articles, key=lambda item: (item.source, item.title)):
        original = f"[原文]({article.original_link})" if article.original_link else ""
        local = f"[打开]({md_link(article.exported_path)})"
        lines.append(table_row([article.title, article.source, "【new】" if article.is_new else "", original, local]))
    (TARGET / "01_全部文章索引.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_new_index(articles: list[Article]) -> None:
    new_articles = [article for article in articles if article.is_new]
    lines = [
        "# 停更后新增索引",
        "",
        "这里收集 `2025-08-02` 之后补进知识库的条目，标题前统一标注 `【new】`。",
        "",
        "| 日期 | 标题 | 来源 | 原文 | 本地文件 |",
        "| --- | --- | --- | --- | --- |",
    ]
    for article in sorted(new_articles, key=lambda item: item.published or "", reverse=True):
        original = f"[原文]({article.original_link})" if article.original_link else ""
        local = f"[打开]({md_link(article.exported_path)})"
        lines.append(table_row([article.published, f"【new】{article.title}", article.source, original, local]))
    (TARGET / "02_停更后新增索引.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_source_index(articles: list[Article]) -> None:
    counts: dict[str, int] = {}
    new_counts: dict[str, int] = {}
    for article in articles:
        counts[article.source] = counts.get(article.source, 0) + 1
        if article.is_new:
            new_counts[article.source] = new_counts.get(article.source, 0) + 1

    lines = [
        "# 来源与导出说明",
        "",
        f"导出时间：{datetime.now().isoformat(timespec='seconds')}",
        "",
        f"源项目：`{ROOT}`",
        f"本地知识库：`{TARGET}`",
        "",
        "| 来源 | 文章数 | new 数 |",
        "| --- | ---: | ---: |",
    ]
    for source in sorted(counts):
        lines.append(table_row([source, str(counts[source]), str(new_counts.get(source, 0))]))
    lines.extend(
        [
            "",
            "## 使用建议",
            "",
            "- 用 Obsidian 打开本目录即可作为本地知识库。",
            "- 用 `01_全部文章索引.md` 查全部内容。",
            "- 用 `02_停更后新增索引.md` 只看停更后补充内容。",
            "- `_metadata/articles.json` 和 `_metadata/articles.csv` 可供后续向量化、RAG 或数据库导入。",
            "- 健康类内容只作为知识库素材，不作为个人医疗建议。",
        ]
    )
    (TARGET / "03_来源与导出说明.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_home(articles: list[Article]) -> None:
    total = len(articles)
    new_total = sum(1 for article in articles if article.is_new)
    lines = [
        "# HealthArt 本地知识库",
        "",
        "这是从 Health Art 本地站点导出的独立 Markdown 知识库，可以脱离网页服务直接使用。",
        "",
        f"- 全部 Markdown 文档：{total} 篇",
        f"- 停更后新增/覆盖条目：{new_total} 篇",
        "- 主要来源：Huberman Lab、The Peter Attia Drive、The Diary Of A CEO、书籍解析",
        "",
        "## 入口",
        "",
        "- [全部文章索引](01_%E5%85%A8%E9%83%A8%E6%96%87%E7%AB%A0%E7%B4%A2%E5%BC%95.md)",
        "- [停更后新增索引](02_%E5%81%9C%E6%9B%B4%E5%90%8E%E6%96%B0%E5%A2%9E%E7%B4%A2%E5%BC%95.md)",
        "- [来源与导出说明](03_%E6%9D%A5%E6%BA%90%E4%B8%8E%E5%AF%BC%E5%87%BA%E8%AF%B4%E6%98%8E.md)",
        "- [站点续写总览](99_%E7%AB%99%E7%82%B9%E9%A1%B5%E9%9D%A2/continuation.md)",
        "",
        "## 内容目录",
        "",
        "- [Huberman Lab](01_Huberman_Lab/)",
        "- [The Peter Attia Drive](02_Peter_Attia/)",
        "- [书籍解析](03_Books/)",
        "- [The Diary Of A CEO](04_The_Diary_Of_A_CEO/)",
        "- [站点页面](99_%E7%AB%99%E7%82%B9%E9%A1%B5%E9%9D%A2/)",
    ]
    (TARGET / "00_入口.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_metadata(articles: list[Article]) -> None:
    metadata_dir = TARGET / "_metadata"
    data = [asdict(article) for article in articles]
    (metadata_dir / "articles.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    with (metadata_dir / "articles.csv").open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(
            fh,
            fieldnames=["title", "source", "source_path", "exported_path", "original_link", "published", "is_new"],
        )
        writer.writeheader()
        writer.writerows(data)


def main() -> None:
    articles = collect_articles()
    write_home(articles)
    write_all_index(articles)
    write_new_index(articles)
    write_source_index(articles)
    write_metadata(articles)
    print(f"Knowledge base: {TARGET}")
    print(f"Exported markdown documents: {len(articles)}")
    print(f"New/continuation documents: {sum(1 for article in articles if article.is_new)}")


if __name__ == "__main__":
    main()
