module.exports = {
  devServer: {
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL, //若是以dev-api开头的直接交给代理服务器
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "" //重写请求地址 这只是一个标识 真是访问的时候是在目的服务器的静态库中并没有这个文件夹
        }
      },
      "/api": {
        target: "http://web.juhe.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/ip": {
        target: "https://pv.sohu.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/ip": "/"
        }
      }
    }
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不会生成 .map 文件，加快打包速度
};
