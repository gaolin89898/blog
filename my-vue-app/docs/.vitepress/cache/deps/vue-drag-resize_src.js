import "./chunk-ZS7NZCD4.js";

// node_modules/.pnpm/vue-drag-resize@1.5.4/node_modules/vue-drag-resize/src/index.js
import VueDragResize from "/home/gaolin/桌面/blog/my-vue-app/node_modules/.pnpm/vue-drag-resize@1.5.4/node_modules/vue-drag-resize/src/components/vue-drag-resize.vue";
function install(Vue) {
  if (install.installed)
    return;
  install.installed = true;
  Vue.component("vue-drag-resize", VueDragResize);
}
var plugin = {
  install
};
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
var src_default = VueDragResize;
export {
  src_default as default,
  install
};
//# sourceMappingURL=vue-drag-resize_src.js.map
