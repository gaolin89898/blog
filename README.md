<h1 align="center">GL 的个人网站</h1>

<p align="center">
基于 <a href="https://theme.sugarat.top" target="_blank">@sugarat/theme</a> 的个人博客，线上地址：<a href="https://www.gaolin.xin" target="_blank">www.gaolin.xin</a>
</p>

## 技术栈

- [VitePress](https://vitepress.dev/)（`1.0.0-rc.45`）+ [@sugarat/theme](https://theme.sugarat.top/) 博客主题
- [pagefind](https://pagefind.app/) 离线全文搜索
- [giscus](https://giscus.app/) 评论（基于 GitHub Discussions）
- 包管理使用 `pnpm`

## 快速开始

先安装 `pnpm`

```sh
npm i -g pnpm
```

安装依赖

```sh
pnpm install
```

本地开发

```sh
pnpm dev
```

构建（产物输出到 `dist/`）

```sh
pnpm build
```

本地预览构建产物

```sh
pnpm serve
```

## 部署

站点部署在阿里云服务器 `8.162.12.148` 的 `/var/www/blog`，nginx 以 `www.gaolin.xin` 提供服务。有两条部署路径：

### 方式一：GitHub Actions 自动部署（推荐）

推送 `main` 分支即可触发（`.github/workflows/deploy.yml`）：

1. 安装依赖并构建
2. 将 `dist/` 打包上传到服务器，清空 `/var/www/blog` 后解压（全量覆盖）
3. 部署结果通过企业微信机器人通知

需要在仓库 Secrets 中配置：`SERVER_HOST`、`SERVER_USER`、`SSH_PRIVATE_KEY`；企微通知另需 `WECOM_WEBHOOK`（未配置时仅跳过通知，不影响部署）。

### 方式二：本地手动部署

```sh
npm run deploy
```

`deploy-agent.js` 会自动提交未 commit 的更改、构建、并通过 WSL 中的 `sshpass + scp` 将 `dist/` 上传到服务器（密码读取自 `deploy-config.json`）。

> 注意：`deploy-config.json` 中包含服务器密码，不要把它提交到公开仓库；建议将其加入 `.gitignore` 并改用 SSH 密钥登录。

## 项目目录

```
docs/
├── index.md            # 首页
├── frontend/           # 前端开发（框架、UI 与样式、数据可视化、交互、工程化）
├── backend/            # 后端开发（Node.js、Nginx、服务器）
├── tools/              # 工具（编辑器、终端、Git、Docker、SSH、rclone、自动化、WSL、Node.js）
├── ai/                 # AI 工具（OpenCode、OpenClow 及插件）
├── projects/           # 项目实战（RFID、桌宠、桌面自动化、Linux 踩坑）
├── daily/              # 工作日报
├── blog-config/        # 博客配置记录（评论模块等）
└── public/             # 静态资源（favicon、logo、icons）
```

## 站点配置与备案合规

主题配置在 `docs/.vitepress/blog-theme.ts`，站点配置在 `docs/.vitepress/config.mts`。

域名已完成 ICP 备案（**陕ICP备2026001608号-1**），以下是审核硬性要求，**修改配置时不要动这两处**，否则备案会被驳回：

1. 浏览器标签页标题必须包含备案网站名「**GL的个人网站**」（`config.mts` 的 `title` 字段）；
2. 每个页面底部显著位置悬挂备案号，并链接到工信部备案管理系统 `https://beian.mit.gov.cn/`（`blog-theme.ts` 的 `footer.icpRecord`）。

## 相关链接

- 主题文档：https://theme.sugarat.top
- 本站 GitHub 仓库：https://github.com/gaolin89898/blog
