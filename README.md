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

# 启动生产服务
pnpm run start
```

## 停更后内容续写

本地版本已按仓库最后一次提交时间（2025-08-02）作为断点，补全公开 RSS 中断点后的 Huberman Lab 与 The Peter Attia Drive 内容：

- Huberman Lab：94 条
- The Peter Attia Drive：39 条
- 合计：133 条

其中新写入/续写的页面已按原项目章节分类写入 `hubermanlab/new.md` 与 `peterattiamd/new.md` 两个索引页，并统一在条目前标注 `【new】`。另有 20 条 RSS 节目已由原项目已有同链接页面覆盖，不重复生成 continuation 页面。

新增/续写内容回到原栏目侧边栏中展示，并通过条目标题里的 `[NEW]` / `【new】` 标识。顶部本地搜索已启用；如果需要更大范围的批量全文检索，仍建议使用导出的本地知识库。

人工质量改写进度：

- continuation 页面总数：113 篇
- 已达到手写/人工改写质量：113 篇
- 仍带自动草稿标记、待人工改写：0 篇

续写生成脚本：

```bash
python3 scripts/generate_continuation.py
```

脚本会抓取公开 RSS、按 2025-08-02 过滤、保留手写高质量续写文件，并为未覆盖条目生成 Health Art 风格 Markdown 草稿。默认情况下，脚本不会覆盖任何已存在的 continuation 文件；如确需刷新仍带自动草稿标记的文件，可显式执行：

```bash
REFRESH_AUTO_DRAFTS=1 python3 scripts/generate_continuation.py
```

本地知识库导出：

```bash
python3 scripts/export_local_knowledge_base.py
```

导出目录：`/Users/wangchen/Documents/探索性研究/HealthArt-本地知识库`。该目录包含全部 Markdown 内容、入口索引、停更后新增索引，以及 JSON/CSV 元数据，可直接用 Obsidian、VS Code 或 Finder 本地搜索使用。

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
