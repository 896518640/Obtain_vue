import Vue from "vue";
// Vue跟组件
import App from "./App.vue";
// 路由
import router from "./router";
//引入elementUI
import ElementUI from "element-ui";
import "@/permission";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

//使用 ElementUI 中间件
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
