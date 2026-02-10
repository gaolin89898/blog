---
tags:
  - 运维
  - SOP
description: 标准作业程序与运维文档集成评论模块指南
---

---
sticky: 1
---

# VitePress 博客集成评论模块 (Giscus)

本博客使用了 [Giscus](https://giscus.app/zh-CN) 作为评论系统。Giscus 是一个由 GitHub Discussions 驱动的评论系统。

## 实现步骤

### 1. 准备工作

在使用 Giscus 之前，你需要：

1.  **公开的 GitHub 仓库**：Giscus 需要一个公开的仓库来存储评论。
2.  **安装 Giscus App**：在你的仓库中安装 [Giscus App](https://github.com/apps/giscus)。
3.  **开启 Discussions**：在你的仓库设置中开启 Discussions 功能。

### 2. 获取配置信息

访问 [Giscus 官网](https://giscus.app/zh-CN) 进行配置：

1.  输入你的仓库地址（例如 `gaolin89898/blog`）。
2.  选择 `Discussion` 分类（推荐选择 `Announcements`，并确保该分类允许任何人发帖）。
3.  滚动到页面底部，你将看到生成的配置信息。

我们需要重点关注以下几个字段：

*   `data-repo`
*   `data-repo-id`