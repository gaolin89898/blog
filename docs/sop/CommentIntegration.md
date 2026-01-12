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
*   `data-category`
*   `data-category-id`

### 3. 配置项目

打开项目中的 `docs/.vitepress/blog-theme.ts` 文件，找到 `comment` 配置项并填入刚才获取的信息。

```typescript
// docs/.vitepress/blog-theme.ts
export default {
  // ...
  comment: {
    repo: 'gaolin89898/blog', // 仓库地址
    repoId: 'YOUR_REPO_ID', // 替换为你的 repoId
    category: 'Announcements', // 分类
    categoryId: 'YOUR_CATEGORY_ID', // 替换为你的 categoryId
    mapping: 'pathname',
  },
  // ...
}
```

### 4. 验证

配置完成后，重启项目：

```bash
pnpm dev
```

进入任意文章页面，滚动到底部，应该能看到评论框。

## 常见问题

*   **评论框未显示**：检查 `repoId` 和 `categoryId` 是否正确。
*   **无法评论**：确保仓库已安装 Giscus App 且 Discussions 功能已开启。
