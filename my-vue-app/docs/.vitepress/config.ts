import { defineConfig } from "vitepress";
// import { demoBlockPlugin } from "vitepress-theme-demoblock";

export default defineConfig({
  title: "高木木的博客",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/blog/",
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "高木木的博客",
    outline: 3,
    socialLinks: [
      { icon: "github", link: "https://github.com/wocwin/t-ui-plus" },
    ],
    nav: [
      {
        text: "GitHub地址",
        link: "https://github.com/wocwin/t-ui-plus",
      },
      {
        text: "Gitee码云地址",
        link: "https://gitee.com/wocwin/t-ui-plus",
      },
      {
        text: "博客",
        items: [
          {
            text: "掘金",
            link: "https://juejin.cn/user/888061128344087/posts",
          },
        ],
      },
    ],
    sidebar: {
      "/components": [
        {
          text: "常用组件",
          items: [
            { text: "下拉选择组件", link: "/components/TSelect/base.md" },
            {
              text: "下拉选择表格组件",
              link: "/components/TSelectTable/base.md",
            },
          ],
        },
        {
          text: "复杂组件",
          items: [
            {
              text: "条件查询组件",
              link: "/components/TQueryCondition/base.md",
            },
            { text: "表单组件", link: "/components/TForm/base.md" },
            { text: "table组件", link: "/components/TTable/base.md" },
          ],
        },
      ],
    },
  },
  // markdown: {
  //   config(md) {
  //     md.use(demoBlockPlugin, {
  //       customClass: "demoblock-custom",
  //     });
  //   },
  // },
});
