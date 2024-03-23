import { defineConfig } from "vitepress";
import { blogTheme } from "./blog-theme";

export default defineConfig({
  extends: blogTheme,
  lang: "zh-cn",
  title: "高木木的博客",
  description: "高木木的博客，基于 vitepress 实现",
  lastUpdated: true,
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
        text: "组件文档",
        items: [
          { text: "echarts-liquidfill", link: "/sop/EchartsLiquidfill.md" },
          { text: "vue-drag-resize", link: "/sop/VueDragResize.md" },
        ],
      },
      { text: "工具配置", link: "" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/gaolin89898/blog",
      },
    ],
  },
});
