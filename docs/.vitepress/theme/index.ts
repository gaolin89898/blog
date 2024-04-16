import BlogTheme from "@sugarat/theme";
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

// 自定义样式重载
import "./style.scss";

// 自定义主题色
// import './user-theme.css'

export default {
  ...BlogTheme,
  enhanceApp({ app }) {
    app.component("demo-preview", AntDesignContainer);
  },
};
