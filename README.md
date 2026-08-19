# Health Art

Health Art 致力于将前沿的健康科学知识转化为实用的生活指南。

我们深入研究并提炼来自 Huberman Lab、Peter Attia 等世界顶级健康专家的研究成果和建议。

为中文读者提供科学、实用的健康优化方案。

## 项目特点

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

- Huberman Lab：109 条目标节目，更新至 2026-08-13
- The Peter Attia Drive：41 条目标节目，更新至 2026-08-10（其中 12 篇付费 AMA 本轮不改写）
- The Diary Of A CEO：154 条目标节目，更新至 2026-08-14
- 合计：304 条目标节目；本轮实际同步 292 页，保留 12 篇受限 AMA 原文页面不动

本轮同步的 292 页中，245 页按原始完整节目复核，37 页只覆盖完整 replay 片段，另有 9 页 RSS/show notes replay 和 1 页 Peter 公开预览受限；它们都在页面内明确标注范围，不把片段或预览写成原始长节目总结。当前共有 288 个 continuation 页面，另有 21 个 feed 条目由原有页面覆盖。

三个来源的分类索引分别保存在 `hubermanlab/new.md`、`peterattiamd/new.md` 和 `diaryofaceo/new.md`。站点不单列“新增内容”导航；The Diary Of A CEO 页面按主题进入侧边栏，其他新增页面可通过顶部本地搜索找到。更大范围的批量检索可使用本地知识库导出。

本轮 2026-08-19 的网站正文从 canonical Obsidian 同步，保持原项目的三段式架构（确定行动指南、核心解析、深入视角），不写入完整转录或节目时间戳。健康干预、药物、补剂、筛查和风险主张仍在正文中保留适用边界；12 篇付费 AMA 只保留已有页面，未冒充完整节目复核。

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
