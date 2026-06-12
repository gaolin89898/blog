import { defineConfig } from "vitepress";
import { blogTheme } from "./blog-theme";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

export default defineConfig({
  extends: blogTheme,
  lang: "zh-cn",
  title: "高木木的博客",
  description: "高木木的博客，基于 vitepress 实现",
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
            text: "UI 与样式",
            link: "/frontend/ui-design/index.md",
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
            text: "项目记录",
            link: "/projects/rfid/inventory-crud-backend-2026-05-18.md",
          },
          {
            text: "NodeJS",
            link: "/backend/nodejs/index.md",
          },
          {
            text: "服务器部署",
            link: "/backend/server/hongkong-server-image-setup.md",
          },
          {
            text: "Nginx",
            link: "/backend/nginx/index.md",
          },
        ],
      },
      {
        text: "开发工具与环境",
        items: [
          {
            text: "编辑器与插件",
            link: "/tools/editors/index.md",
          },
          {
            text: "工作常用工具",
            link: "/tools/common/index.md",
          },
          {
            text: "SSH",
            link: "/tools/ssh/index.md",
          },
          {
            text: "Docker",
            link: "/tools/docker/index.md",
          },
          {
            text: "rclone",
            link: "/tools/rclone/index.md",
          },
          {
            text: "Linux 排错",
            link: "/tools/linux/kylin-virtual-keyboard-troubleshooting.md",
          },
          {
            text: "终端工具",
            link: "/tools/terminals/index.md",
          },
          {
            text: "git",
            link: "/tools/git/index.md",
          },
          {
            text: "自动化脚本",
            link: "/tools/automation/index.md",
          },
        ],
      },
      {
        text: "AI 相关",
        items: [
          {
            text: "OpenCode",
            link: "/tools/editors/opencode.md",
          },
          {
            text: "Oh My OpenCode",
            link: "/tools/opencode-plugins/oh-my-opencode.md",
          },
        ],
      },
      {
        text: "工作日报",
        link: "/daily/worklog/2026-06-12.md",
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
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
