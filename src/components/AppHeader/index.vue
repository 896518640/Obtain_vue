<template>
  <div class="header">
    <img src="@/assets/logoko.png" class="logo" />
    <span class="title">学生就业管理系统</span>
    <el-dropdown trigger="hover" @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎，{{ user.nickname
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-moon-night" command="b">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码的弹窗 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="450px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        style="width:350px"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input
            type="password"
            v-model="ruleForm.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { logout } from "@/api/login.js";
import passwordApi from "@/api/password.js";
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      passwordApi.checkPwd(this.user.id, value).then(res => {
        //console.log(this.user.id, value);
        const resp = res.data;
        //console.log("resp", resp);
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.msg));
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      //console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
        //console.log(1);
      } else if (value !== this.ruleForm.pass) {
        //console.log(2);
        callback(new Error("两次输入密码不一致!"));
      } else {
        //console.log(3);
        callback();
      }
    };
    return {
      user: JSON.parse(localStorage.getItem("user")),
      dialogFormVisible: false,
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          {
            required: true,
            message: "原始密码不能为空",
            trigger: "blur"
          },
          { validator: validateOldPass, trigger: "blur" }
        ],
        pass: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        checkPass: [
          {
            required: true,
            message: "原始密码不能为空",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          passwordApi.updatePwd(this.user.id, this.ruleForm.pass).then(res => {
            const resp = res.data;
            if (resp.flag) {
              this.$message({
                message: resp.msg,
                type: "success"
              });
              //console.log(this.ruleForm);
              this.handleLogout();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.msg,
                type: "warning"
              });
            }
          });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    handleLogout() {
      logout(localStorage.getItem("token")).then(res => {
        //获取成功
        if (res.data.flag) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("date");
          this.$router.push("/login");
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "errror"
          });
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          //修改密码
          this.handlePwd();
          break;
        case "b":
          //退出登录
          //console.log(localStorage.getItem("token").toString());
          this.handleLogout();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
  width: 30px;
}
.title {
  position: absolute;
  color: black;
  font-weight: 100;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
  font-weight: 100;
}
</style>
