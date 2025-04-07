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

## 项目结构

```
health-art/
├── .vitepress/        # VitePress 配置
├── hubermanlab/       # Huberman Lab 相关内容
├── peterattiamd/      # Peter Attia MD 相关内容
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
