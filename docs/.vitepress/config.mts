import { defineConfig } from "vitepress";
import { blogTheme } from "./blog-theme";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

export default defineConfig({
  extends: blogTheme,
  lang: "zh-cn",
  title: "林九序的博客",
  description: "林九序的博客，基于 vitepress 实现",
  outDir: "../dist",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: "目录",
    },
    // 默认文案修改
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "相关文章",
    lastUpdatedText: "上次更新于",

    // 设置logo
    logo: "/logo.jpg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端开发",
        items: [
          {
            text: "前端总览",
            link: "/frontend/index.md",
          },
          {
            text: "UI 与样式",
            link: "/frontend/ui-style/index.md",
          },
          {
            text: "数据可视化",
            link: "/frontend/visualization/index.md",
          },
          {
            text: "前端交互",
            link: "/frontend/interaction/index.md",
          },
        ],
      },
      {
        text: "后端开发",
        items: [
          {
            text: "后端总览",
            link: "/backend/index.md",
          },
          {
            text: "Node.js",
            link: "/backend/nodejs/index.md",
          },
          {
            text: "Nginx",
            link: "/backend/nginx/index.md",
          },
          {
            text: "服务器",
            link: "/backend/server/hongkong-server-image-setup.md",
          },
        ],
      },
      {
        text: "工具",
        items: [
          {
            text: "工具总览",
            link: "/tools/index.md",
          },
          {
            text: "编辑器",
            link: "/tools/editors/index.md",
          },
          {
            text: "终端",
            link: "/tools/terminal/index.md",
          },
          {
            text: "Git",
            link: "/tools/git/index.md",
          },
          {
            text: "Docker",
            link: "/tools/docker/index.md",
          },
          {
            text: "SSH",
            link: "/tools/ssh/index.md",
          },
          {
            text: "rclone",
            link: "/tools/rclone/index.md",
          },
          {
            text: "自动化",
            link: "/tools/automation/index.md",
          },
        ],
      },
      {
        text: "AI 工具",
        items: [
          {
            text: "AI 总览",
            link: "/ai/index.md",
          },
          {
            text: "OpenCode",
            link: "/ai/opencode.md",
          },
          {
            text: "OpenClow",
            link: "/ai/openclow.md",
          },
          {
            text: "Oh My OpenCode",
            link: "/ai/opencode-plugins/oh-my-opencode.md",
          },
        ],
      },
      {
        text: "项目实战",
        items: [
          {
            text: "项目总览",
            link: "/projects/index.md",
          },
          {
            text: "RFID 项目",
            link: "/projects/rfid/index.md",
          },
          {
            text: "桌宠项目",
            link: "/projects/desktop-pet/index.md",
          },
        ],
      },
      {
        text: "博客配置",
        items: [
          {
            text: "评论模块",
            link: "/blog-config/comment-integration.md",
          },
        ],
      },
      {
        text: "工作日报",
        link: "/daily/index.md",
      },
      {
        text: "线上作品",
        items: [
          {
            text: "个人图床",
            link: "http://openlist.gaolin.xin/",
          },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/gaolin89898/blog",
      },
    ],
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});