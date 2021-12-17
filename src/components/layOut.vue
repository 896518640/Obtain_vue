<template>
  <div>
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 左侧导航区域 -->
    <div class="container">
      <!-- 左侧导航区域 -->
      <app-navbar></app-navbar>
      <!-- 右侧主体区域 -->
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";
export default {
  components: {
    AppHeader,
    AppNavbar,
    AppMain
  }
};
</script>
<style scoped>
.header {
  position: absolute;
  line-height: 49px;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(53, 56, 51, 0.8);
  background: transparent;
  background: #f5f5f5;
  background: #bbbbbb;
  background: #dddddd;
  color: black;
}
.container {
  /* width: 100%;
  margin: 50px 0 0 0;
  height: 96vh; */
  position: fixed;
  left: 0;
  right: 0;
  top: 49px;
  bottom: 0;
  background: wheat;
  display: flex;
  justify-content: space-between;
}
.navbar {
  flex: 1 1 20%;
  display: flex;
  flex-direction: column;
  /* position: absolute;
  width: 230px;
  top: 49px;
  bottom: 0;
  left: 0; */
  overflow-y: auto;
  background: #545c64;
  background: #bbbbbb;
  background: #f5f5f5;
  color: black;
}
.main {
  flex: 1 1 80%;
  /* position: flexd;
  top: 49px;
  left: 229px;
  right: 0;
  bottom: 0; */
  overflow-y: auto;
  background: url(~@/assets/background.png);
  background-size: cover;
  /* background: tomato; */
}
@media screen and (max-device-width: 414px) {
  .header {
    font-size: 15px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .navbar {
    flex: 1 1 30%;
    display: flex;
  }
  .main {
    background: url(~@/assets/background2.png);
    background-size: cover;
  }
}
</style>
