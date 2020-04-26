<template>
  <div class="head">
    <div class="logo">
      <img src="../assets/image/ailong-logo.png"/>
      <p>野外训练管理与考评系统</p>
      <!-- <p>Orienteering system</p> -->
    </div>
    <div class="userInfo">
      <img src="../assets/image/userimage.jpg" alt />
      <p>
        <span>管理员</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Head"
};
</script>
<style lang="scss" scoped>
.head {
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  line-height: normal;
  p {
    margin-bottom: 0;
  }
  .logo {
    display: flex;
    color: #053270;
    & > * {
      display: block;
    }
    img {
      width: 130px;
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
