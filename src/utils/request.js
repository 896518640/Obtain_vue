import axios from "axios";
import { Loading, Message } from "element-ui";
const loading = {
  loadingInstance: null,
  open: function() {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        text: "拼命加载中",
        target: ".main",
        background: "rgba(0,0,0,0.5)"
      });
    }
  },
  close: function() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  }
};
//手动封装一个axios
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //默认根目录
  timeout: 5000 //超时时间
});
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求拦截
    loading.open();
    return config;
  },
  error => {
    // 出现异常,抛出错误对象
    loading.close();
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  response => {
    // response.data
    loading.close();
    const resp = response.data;
    if (!resp.flag) {
      Message({
        message: resp.msg || "系统异常",
        type: "warning",
        duration: 5000
      });
    }
    return response;
  },
  error => {
    loading.close();
    return Promise.reject(error);
  }
);
export default request; //导出axios
