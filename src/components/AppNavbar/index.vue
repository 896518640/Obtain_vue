<template>
  <div class="navbar">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#f5f5f5"
      text-color="black"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/teacher/">
        <i class="el-icon-s-custom"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>
      <el-menu-item index="/student/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">学员管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {};
</script>

<style scoped></style>
