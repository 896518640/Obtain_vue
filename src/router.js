import Vue from "vue";
import Router from "vue-router";
import Register from "./views/register";
import Login from "./views/login";
import Home from "./views/home";
import Teachers from "./views/teachers";
import Students from "./views/students";
import LayOut from "./components/layOut.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: LayOut,
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: Home,
          meta: { title: "首页" }
        }
      ]
    },
    //教师
    {
      path: "/teacher",
      component: LayOut,
      children: [
        {
          path: "/",
          component: Teachers,
          meta: { title: "教师管理" }
        }
      ]
    },
    //学生
    {
      path: "/student",
      component: LayOut,
      children: [
        {
          path: "/",
          component: Students,
          meta: { title: "学员管理" }
        }
      ]
    }
  ]
});
