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

网站以 `2025-08-02` 为断点，持续收录三个官方公开 RSS：

- Huberman Lab：109 条，更新至 2026-08-13
- The Peter Attia Drive：46 条，更新至 2026-08-10
- The Diary Of A CEO：162 条，更新至 2026-08-14
- 合计：317 条 feed 事件，对应 309 个页面

其中有 9 条是官方重播或精选片段：索引保留这次发布事件，但页面指向已收录的完整节目，不重复建页，也不改写原节目的发布日期。当前共有 288 个 continuation 页面，另有 21 个 feed 条目由原有页面覆盖。

三个来源的分类索引分别保存在 `hubermanlab/new.md`、`peterattiamd/new.md` 和 `diaryofaceo/new.md`。站点不单列“新增内容”导航；The Diary Of A CEO 页面按主题进入侧边栏，其他新增页面可通过顶部本地搜索找到。更大范围的批量检索可使用本地知识库导出。

本轮 2026-06-25 之后新增了 36 个页面。它们只保存节目身份、官方链接、发布日期和 RSS 主题线索，并统一标为 `待精读`。这些页面没有核对完整节目、逐字稿或原始研究，不应被当作已经验证的结论或行动建议。

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
