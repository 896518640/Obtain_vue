<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-form"
    >
      <h2 class="login-title">登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <a class="el-button point" href="/register"> 没有帐号，点我注册 </a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, getUserInfo, getconstellation } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    getconstellation("双鱼座", "tomorrow")
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //将登陆的账号密码 与后台数据库进行比对 发送axios请求
          login(this.form.username, this.form.password).then(res => {
            const resp = res.data;
            //console.log("res", res);
            console.log("resp", resp);
            //console.log(resp.flag);
            //登陆成功 获取用户信息
            if (resp.flag) {
              getUserInfo(resp.data.token).then(res => {
                console.log(res);
                //查看是否获取成功
                const { flag, data } = res.data;
                //获取成功 即登陆成功
                if (flag) {
                  /* getIp()
                    .then(res => {
                      const resp = res.data;
                      console.log("resp", resp);
                      const { cname } = resp.data;
                      localStorage.setItem("caname", JSON.stringify(cname));
                    })
                    .catch(e => {
                      console.log(e);
                    }); */
                  //将信息存储到浏览器的loaclStorage 中
                  let date = new Date().toLocaleDateString();
                  //console.log(date);
                  localStorage.setItem("date", JSON.stringify(date));
                  localStorage.setItem("user", JSON.stringify(data));
                  localStorage.setItem("token", resp.data.token);
                  this.$message({
                    message: resp.msg,
                    type: "success"
                  });
                  this.$router.push("/");
                } //获取失败 进行提示
                else {
                  //console.log("获取用户信息失败");
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              });
            } //登陆失败 并且对原因进行提示
            else {
              //console.log("未登录");
              this.$message({
                message: resp.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(../../assets/wallhaven.png);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.login-form {
  width: 380px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 15px 5px 5px;
  border-radius: 15px;
  box-sizing: border-box;
}
.login-title {
  text-align: center;
  margin-bottom: 5px;
}
.point {
  width: 150px;
  font-size: 10px;
  text-decoration: none;
}
</style>
