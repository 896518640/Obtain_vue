import router from "./router";
import { getUserInfo } from "@/api/login";
router.beforeEach((to, from, next) => {
  //获取token
  const token = localStorage.getItem("token");
  //console.log(token);
  //token不存在 表示用户未登录
  if (!token) {
    if (to.path === "/login") {
      next();
    } else if (to.path === "/register") {
      next();
    } else {
      next({ path: "/login" });
    }
  } //token存在 表示用户已登录
  else {
    if (to.path === "/login") {
      next();
    } else if (to.path === "/register") {
      next();
    } else {
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        next();
      } else {
        getUserInfo(token).then(res => {
          const resp = res.data;
          if (resp.flag) {
            localStorage.setItem("user", JSON.stringify(resp.data));
            next();
          } else {
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
