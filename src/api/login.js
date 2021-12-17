import request from "@/utils/request";
import axios from "axios";
//注册
export function register(username, nickname, password) {
  return request({
    url: "/user/register",
    method: "post",
    data: {
      username, //ES6简写
      nickname,
      password
    }
  });
}
//登录
export function login(username, password) {
  return request({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}
//获取用户信息
export function getUserInfo(token) {
  return request({
    url: `/user/userInfo?token=${token}`,
    method: "get"
  });
}
//退出登录
export function logout(token) {
  return request({
    url: "/user/logout",
    method: "post",
    data: {
      token
    }
  });
}
//获取星座信息
export function getconstellation(consName, type) {
  let key = "f2305a09f2e98e41e1b08e310ea76541";
  consName = encodeURI(consName);
  return axios({
    url: `/api/constellation/getAll?consName=${consName}&type=${type}&key=${key}`,
    method: "get"
  });
}
//获取ip
/* export function getIp() {
  return request({
    url: `/getIp`,
    method: "get"
  });
} */
