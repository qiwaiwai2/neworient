<template>
  <div class="head">
    <div class="logo">
      <img src="../assets/images/newlogo.png" />
      <p>野外训练管理与考评系统</p>
      <!-- <p>Orienteering system</p> -->
    </div>
    <div class="userInfo">
        <a @click="home" style="color: #fff;">返回首页</a>
    </div>
  </div>
  <!-- <div class="head"> -->
  <!-- <div class="head_top">
            <div class="head_top_container">
                
            </div>
  </div>-->
  <!-- <div class="head_bottom">
            <div class="head_bottom_container">
                <div class="head_bottom_left">
                    <img src="../assets/images/logo.png" alt="">
                    <div class="divide"></div>
                    <div>
                        <p>定向越野赛事专用管理系统V1.0</p>
                        <p>Special management system for Orienteering events v1.0</p>
                    </div>
                </div>
                <div class="turn_item"> 
                    <img @click="home" style="width:32px;height:32px" src="../assets/images/home.png" alt="">
                </div>
            </div>
  </div>-->
  <!-- </div> -->
</template>
<script>
export default {
  name: "Head",
  methods: {
    home() {
      this.$router.push({ path: "/home" });
    }
  }
};
</script>
<style lang="scss" scoped>
.head_top {
  background-color: #0b2f47;
  .head_top_container {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    margin: 0 auto;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 0 60px;
    span {
      vertical-align: middle;
    }
    .active {
      color: $theme-color;
    }
  }
  @media screen and (max-width: 1280px) {
    .head_top_container {
      width: 900px;
    }
  }
}
.head_bottom {
  background-color: #fff;
  height: 70px;
  .head_bottom_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    margin: 0 auto;
    font-size: 14px;
    letter-spacing: 1px;
    padding: 10px 60px;
    background-color: #f2faff;
    span {
      vertical-align: middle;
    }
    img {
      width: 130px;
    }
    .turn_item {
      display: flex;
      align-items: center;
      height: 50px;
      cursor: pointer;
      span {
        margin-right: 100px;
      }
      .active {
        padding-bottom: 4px;
        border-bottom: 2px solid #59acf8;
        color: #59acf8;
      }
    }
    .active {
      color: $theme-color;
    }
    .head_bottom_left {
      display: flex;
      align-items: center;
      .divide {
        height: 50px;
        border: 1px solid #1562be;
        margin: 0 10px;
        opacity: 0.6;
      }
      p {
        color: #053270;
        padding-bottom: 0;
        margin-bottom: 0;
      }
      p:nth-child(1) {
        font-weight: 600;
        font-size: 16px;
      }
      p:nth-child(2) {
        font-size: 12px;
      }
    }
  }
}

.head {
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  line-height: normal;
  height: 80px;
  background-image: linear-gradient(90deg, #ffffff, #61863a);
  padding: 0 30px;
  p {
    margin-bottom: 0;
  }
  .logo {
    display: flex;
    color: #053270;
    align-items: center;
    & > * {
      display: block;
    }
    img {
      width: 255px;
      object-fit: contain;
    }
    p {
      padding-left: 10px;
      font-size: 22px;
    }
  }
  .userInfo {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 20px;
    }
    p {
      font-size: 18px;
      color: white;
    }
  }
}
</style>


