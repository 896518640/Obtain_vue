<template>
  <div class="fontPage">
    <div class="a1">
      <div class="a11">
        <div class="a111">
          <div class="userphoto">
            <img
              src="http://cdn.u2.huluxia.com/g3/M02/26/9F/wKgBOVwJDa2AOwRPAABXhpMi9jk929.jpg"
            />
          </div>
          <div class="userinfo">
            <div>
              <p>
                <span class="small"> 欢迎！</span>
                <span class="big">{{ user.nickname }}</span>
              </p>
              <p class="small">您是:</p>
              <p class="big">超级管理员</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="a112">
          <div>
            <span class="small">上次登录:</span
            ><span class="big">{{ user.lastLoginPosition }}</span>
          </div>
        </div>
      </div>
      <div class="a12">2</div>
    </div>
    <div class="a2">
      <div class="a21">3</div>
      <div class="a22">4</div>
      <div class="a23">5</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      w: document.documentElement.clientWidth
    };
  },
  mounted() {
    //console.log(this.w);
    window.addEventListener("load", this.c);
    window.addEventListener("resize", this.c);
  },
  watch: {
    w: function() {
      this.c();
    }
  },
  method: {
    c: () => {
      let n = 15 * (this.w / 320) > 40 ? 40 + "px" : 15 * (this.w / 320);
      document.documentElement.style.fontSize = n;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
html {
  font-size: 5px;
}
.fontPage {
  width: 100%;
  height: 100%;
  padding: 5px;
  font-weight: 100;
  display: flex;
  box-sizing: border-box;
  /* background: url(~@/assets/background.png); */
}
hr {
  width: 100%;
}
.a1 {
  flex: 1 1 40%;
  margin: 10px;
  flex-direction: column;
  /* background: violet; */
  justify-content: space-between;
}
.a1,
.a2 {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  opacity: 0.8;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(8px);
  border-radius: 20px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  border-left: 1px solid rgba(255, 255, 255, 0.8);
}
.userphoto {
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userinfo {
  flex: 1 1 50%;
  /* width: 40%;
  height: 50%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* .userinfo > div {
  
} */
.small {
  color: beige;
  font-size: 1.1rem;
  font-weight: 100;
  line-height: 1rem;
}
.big {
  color: blanchedalmond;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1rem;
}
img {
  flex: 0 0 7rem;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: wheat;
}
.a2 {
  flex: 1 1 60%;
  margin: 10px;
  flex-direction: column;
  /* background: violet; */
  justify-content: space-between;
}
.a1 > div,
.a2 > div {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.a11 {
  flex: 1 1 45%;
  background-color: slateblue;
  flex-direction: column;
  justify-content: space-between;
}
.a12 {
  flex: 1 1 55%;
  background: coral;
}

.a21 {
  flex: 1 1 35%;
  background-color: slateblue;
}
.a22 {
  flex: 1 1 40%;
  background-color: salmon;
}
.a23 {
  flex: 0 0 20%;
  background-color: slateblue;
}
.a111 {
  flex: 1 1 70%;
  /* background: yellow; */
  display: flex;
}
.a112 {
  flex: 1 1 20%;
  /* background: springgreen; */
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.a112 p {
  text-align: center;
  height: 0.5rem;
}
@media screen and (max-device-width: 414px) {
  .fontPage {
    flex-direction: column;
  }
  img {
    width: 3rem;
    height: 6rem;
  }
}
</style>
