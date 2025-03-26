<h1 align="center"> VitePress @sugarat/theme </h1>

<p align="center">
简约风的 <a href="https://theme.sugarat.top"  target="_blank"target="_blank">VitePress 博客主题</a> 示例运行项目。
</p>

<p align="center">
    <a href="https://atqq.github.io/vitepress-blog-sugar-template/" target="_blank">GitHub Pages Demo</a>
</p>

## Usage

先安装 `pnpm`

```sh
npm i -g pnpm
```

安装依赖

```sh
pnpm install
```

开发启动

```sh
pnpm dev
```

构建

```sh
pnpm build
```

预览产物

```sh
pnpm serve
```

## Github Pages 部署

① Github Pages 开启 Git Actions 部署支持

![](https://img.cdn.sugarat.top/mdImg/sugar/8a2454c628d0e2abcc7a0451ddd7d2dc)

② 复制文件 `.github/workflows/deploy.yml` 到自己的项目相同目录下

示例项目已包含，可以直接进行下一步

③ 修改 `docs/.vitepress/config.mts` 里的构建配置

`base` 改为 `"/仓库名/"` 即可

```ts
// 省略无关代码
const base = "/vitepress-blog-sugar-template/";
export default defineConfig({
  base,
});
```

④ 推送 `main` 分支即可

需要进一步修改部署和构建配置，详见`deploy.yml` 文件。

## Gitee Pages 部署

① 按照 [SPA](https://help.gitee.com/services/gitee-pages/spa-support) 要求添加 `.spa` 文件在`docs/public` 目录下

示例项目已包含，可以直接进行下一步

② 参照 `Usage` 部分构建代码

③ 推送构建后的页面资源到部署文档的分支

例如`gh-pages`

④ 参照[文档](https://help.gitee.com/services/gitee-pages/intro)选择分支和目录进行部署

_Gitee Pages 需要实名才能使用，同时需要人工审核。_

## 项目目录

📂 docs/
├── 📂 languages/ # 编程语言
│ ├── javascript/ # JavaScript/TypeScript
│ ├── python/ # Python
│ ├── java/ # Java
│ ├── cpp/ # C/C++
│ ├── go/ # Go
│ └── rust/ # Rust
│
├── 📂 frontend/ # 前端开发
│ ├── frameworks/ # 前端框架 (Vue, React, Svelte)
│ ├── ui-design/ # UI 与样式 (CSS, TailwindCSS, 动画)
│ ├── dom/ # DOM 操作与事件
│ ├── api/ # Web 标准与 API (Fetch, Storage)
│ ├── performance/ # 前端性能优化 (Tree Shaking, 懒加载)
│ └── engineering/ # 前端工程化 (Vite, Webpack)
│
├── 📂 backend/ # 后端开发
│ ├── nodejs/ # Node.js (Express, NestJS)
│ ├── python/ # Python (Django, FastAPI)
│ ├── java/ # Java (Spring Boot)
│ ├── databases/ # 数据库 (MySQL, MongoDB, Redis)
│ ├── apis/ # 接口与协议 (RESTful, GraphQL, gRPC)
│ └── optimization/ # 后端性能优化
│
├── 📂 devops/ # DevOps 与部署
│ ├── docker/ # Docker 与容器化
│ ├── k8s/ # Kubernetes
│ ├── ci-cd/ # 自动化部署 (GitHub Actions, Jenkins)
│ ├── linux/ # Linux 运维与命令
│ ├── monitoring/ # 监控与日志 (Prometheus, Grafana)
│ └── security/ # 安全与加固 (SSL, 防火墙)
│
├── 📂 algorithms/ # 数据与算法
│ ├── basics/ # 算法基础 (排序、搜索)
│ ├── data-structures/ # 数据结构 (链表、树、图)
│ ├── advanced/ # 高级算法 (动态规划、回溯、并查集)
│ ├── leetcode/ # LeetCode 刷题
│ └── big-data/ # 大数据与分布式计算
│
├── 📂 tools/ # 开发工具与环境
│ ├── editors/ # 编辑器与插件 (VSCode, JetBrains)
│ ├── terminals/ # 终端工具 (OnMyPosh, Zsh, Tmux)
│ ├── git/ # 版本控制 (Git, GitHub, GitLab)
│ ├── automation/ # 自动化脚本 (Shell, Python)
│ └── wsl/ # WSL2 开发环境
│
├── 📂 architecture/ # 软件架构与设计模式
│ ├── patterns/ # 设计模式 (单例、工厂、观察者)
│ ├── architectures/ # 架构设计 (MVC, DDD, 微服务)
│ ├── distributed/ # 分布式系统 (CAP, Paxos)
│ └── optimization/ # 系统性能优化 (缓存, 负载均衡)
│
├── 📂 learning/ # 学习与成长
│ ├── roadmap/ # 学习路线 (前端, 后端, 全栈)
│ ├── interviews/ # 面试与求职 (简历, 面试题)
│ ├── notes/ # 读书笔记与论文
│ └── productivity/ # 提效工具与方法
│
├── 📂 projects/ # 项目与实战
│ ├── open-source/ # 开源项目
│ ├── personal/ # 个人作品
│ ├── realworld/ # 业务实战
│ └── bugs/ # 踩坑与问题解决
│
└── 📂 others/ # 其他分类
├── thoughts/ # 随笔与思考
├── resources/ # 资源整理 (教程, 书籍)
└── summaries/ # 年度/季度总结
