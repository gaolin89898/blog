import BlogTheme from "@sugarat/theme";
import { AntDesignContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

// 自定义样式重载
import "./style.scss";

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp(ctx) {
    BlogTheme.enhanceApp?.(ctx);
    enhanceAppWithTabs(ctx.app);
    const { app } = ctx;
    app.component("demo-preview", AntDesignContainer);
  },
};
