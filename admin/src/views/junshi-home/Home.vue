<template>
  <div class="home-1">
    <img class="image-bg" src="../../assets/image/home_bg.jpeg" alt />
    <!-- <Head /> -->
    <div class="home-main">
      <a-row :gutter="24">
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/game">
              <img class="img-icon" src="../../assets/image/home/1.png" />
              <div>训练项目管理</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/mapmanage">
              <img class="img-icon" src="../../assets/image/home/8.png" />
              <div>地图管理</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <a href="http://120.79.142.200:82/cross_web_new/gps-dist/index.html" target="__blank">
              <img class="img-icon" src="../../assets/image/home/9.png" />
              <div>轨迹追踪</div>
            </a>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/equipDistribute">
              <img class="img-icon" src="../../assets/image/home/4.png" />
              <div>定位设备分配</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/routeInfo">
              <img class="img-icon" src="../../assets/image/home/5.png" />
              <div>路线信息表</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/defend">
              <img class="img-icon" src="../../assets/image/home/6.png" />
              <div>硬件维护</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/nationality">
              <img class="img-icon" src="../../assets/image/home/7.png" />
              <div>单位信息</div>
            </router-link>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <a href="http://120.79.142.200:82/cross_web_new/gps-dist/index.html#/mapPage?gameId=d536e46042b0496b9d2251be6ec9ae8f&gameItemId=51a0d31f9d6c40258f9d9067e59ff2b5&groupId=93e7d70954e84ea8a439f83f842ee46b&startTime=2019-10-20%2010%3A00%3A00&endTime=2019-10-20%2016%3A00%3A00&isplay=2" target="__blank">
            <!-- <router-link to="/bib"> -->
              <img class="img-icon" src="../../assets/image/home/2.png" />
              <div>安全监控</div>
            </a>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="col-item">
            <router-link to="/drawLoats">
              <img class="img-icon" src="../../assets/image/home/3.png" />
              <div>成绩单</div>
            </router-link>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    console.log(process.env);
  }
};
</script>
<style lang="scss" scoped>
.home-1 {
  width: 100%;
  height: 100%;
}
.home-main {
  width: 1024px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  margin: auto;
}
.image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.col-item {
  padding: 20px;
  background: #ffffff;

  a {
    width: 100%;
    height: 100%;
    display: block;
    color: #234514;
  }
  .img-icon {
    margin-bottom: 10px;
    width: 64px;
  }
}
.ant-col-8 {
  margin-bottom: 24px;
}
</style>
