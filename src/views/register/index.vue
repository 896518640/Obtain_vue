<template>
  <div class="register-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="register-form"
    >
      <h2 class="register-title">注册</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <a class="el-button point" href="/login">
          已有帐号，点我登录
        </a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/login";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        checkPass: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(
            this.form.username,
            this.form.nickname,
            this.form.password
          ).then(res => {
            console.log(res);
            let data = res.data;
            // eslint-disable-next-line no-empty
            if (data.flag) {
              this.$message({
                message: data.msg,
                type: "success"
              });
              //注册成功 直接跳转到首页
              this.$router.push("/login");
            } else {
              this.$message({
                message: data.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.register-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(../../assets/wallhaven.png);
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}
.register-form {
  width: 380px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 15px 5px 5px;
  border-radius: 15px;
  box-sizing: border-box;
}
.register-title {
  text-align: center;
  margin-bottom: 5px;
}
.point {
  width: 150px;
  font-size: 10px;
  text-decoration: none;
}
</style>
