const components = [];

const installComponents = (app: any) => {
  components.forEach((comp: any) => {
    app.component(comp.name as string, comp);
  });
};

const install = (app: any, router?: any) => {
  installComponents(app);
};

export {};
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
};
