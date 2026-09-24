# Health Art

Health Art 整理三档播客、图书和公开健康方案，按实际来源范围写成中文解析。

播客的完整节目、Essentials 精选版、公开重播及付费预览分别标注；书籍旧稿与已按全书复核的解析也分别标注。

本地内容不等于已经推送或公开发布。

## 项目特点

当前内容规则和变更记录见 [HealthArt 综合规格](docs/healthart-spec.md)。[图书目录](books/index.md)提供《Protocols》7 章图解与原有 47 条方案、《超越百岁》17 章中文电子书导读、12 篇待按原书复核的旧稿和 [Huberman 基础健身 Protocol](books/huberman-protocol/foundational-fitness.md) 官方方案解析；[最新节目清单](latest.md)逐条列出近期播客的复核状态。两本书共 24 张章节图，来源范围在各页说明。

- 📚 基于 VitePress 构建的现代文档网站
- 🔍 提供详细的健康科学知识
- 🎨 清晰的内容结构和优雅的阅读体验
- 🚀 快速的页面加载速度

## 技术栈

- VitePress - 静态网站生成器
- TypeScript - 开发语言
- PM2 - Node.js 进程管理
- pnpm - 包管理工具

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建项目
pnpm run build

# 本地预览构建结果
pnpm run preview
```

## 停更后内容续写

网站以 `2025-08-02` 为断点，持续用三个官方公开 RSS 发现节目；正文以已经复核的本地 HealthArt 来源笔记为准：

- 截至 2026-09-23，三档官方节目均核对到 2026-09-21；本批新增 33 条节目记录。
- 本批 25 期节目已按当期可获得的完整转录或字幕复核（其中 5 期为 Essentials 精选版）；Kristen Holmes 的原始长访谈另按公开全文补核，本批精选重播回链该页；还有 1 期 Peter Attia 公开重播按本次公开全文复核、4 条其他精选片段回链原节目，2 期付费 AMA 按既定范围排除。
- 停更后累计 350 条 RSS 事件，其中 348 条有对应页面，去重后为 336 篇覆盖页面、315 篇续写页面及 52 条重播／片段事件。每条本批记录的状态见 [`latest.md`](latest.md)。

2026-08-19 那轮同步的 292 页中，245 页按原始完整节目复核，37 页只覆盖完整 replay 片段，另有 9 页 RSS/show notes replay 和 1 页 Peter 公开预览受限；它们都在页面内明确标注范围，不把片段或预览写成原始长节目总结。截至本批更新，累计 315 个 continuation 页面，另有 21 个既有页面覆盖；重播回链不增加去重页面数。

三个来源的分类索引分别保存在 `hubermanlab/new.md`、`peterattiamd/new.md` 和 `diaryofaceo/new.md`。站点顶部设有“最新节目”入口，本批页面均可从逐条状态清单进入；The Diary Of A CEO 页面也按主题进入侧边栏。更大范围的批量检索可使用本地知识库导出。

播客正文从 canonical Obsidian 来源笔记同步，保持原项目的三段式架构（确定行动指南、核心解析、深入视角），不写入完整转录。健康干预、药物、补剂、筛查和风险主张在正文中保留适用边界；付费 AMA 不冒充完整节目复核。

更新脚本：

```bash
python3 scripts/generate_continuation.py
```

脚本会抓取官方 RSS、按断点过滤、核对已有原文链接和重播映射，并为真正未覆盖的节目生成元数据页面。默认不覆盖任何已有 continuation 文件；如需刷新仍带当前元数据草稿标记的页面，可显式执行：

```bash
REFRESH_AUTO_DRAFTS=1 python3 scripts/generate_continuation.py
```

本地知识库导出：

```bash
python3 scripts/export_local_knowledge_base.py
```

导出目录位于网站仓库同级的 `HealthArt-本地知识库`。该目录包含全部 Markdown 内容、入口索引、停更后新增索引，以及 JSON/CSV 元数据，可直接用 Obsidian、VS Code 或 Finder 本地搜索使用。

健康类内容只作为知识库素材，不作为个人医疗建议。

## 项目结构

```
health-art/
├── .vitepress/        # VitePress 配置
├── hubermanlab/       # Huberman Lab 相关内容
├── peterattiamd/      # Peter Attia MD 相关内容
├── diaryofaceo/       # The Diary Of A CEO 相关内容
├── books/             # 图书与公开方案
├── scripts/           # 续写生成脚本
├── public/            # 静态资源
└── index.md           # 首页
```

## 部署

项目使用 PM2 进行进程管理，确保服务的稳定运行：

```bash
# 启动服务
pm2 start ecosystem.config.js
```

## 更新日志

- 2025-04-07: 项目初始化
- 2026-06-23: 补全 2025-08-02 后公开 RSS 节目内容，并加入续写生成脚本
- 2026-06-23: 全部 113 篇 continuation 页面按原项目结构人工改写为高质量续写
- 2026-08-14: 官方 RSS 覆盖更新至 317 条事件；新增 36 个待精读元数据页面，并将 9 条重播/精选片段映射到完整节目
- 2026-08-19: 从已按完整节目复核的 canonical Obsidian 页面同步 292 个网站页面；明确区分原始完整节目、replay 片段、RSS-only 和受限 AMA

- 2026-09-22: 新增 Huberman 基础健身 Protocol 解析、公开方案综述与资料汇总；图书列表以“《Huberman 基础健身 Protocol》实用行动指南”直接进入正文。
