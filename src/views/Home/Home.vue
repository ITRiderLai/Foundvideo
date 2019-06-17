<template>
  <div id="home">
     <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
        </div>
        <div class="markbg"></div>
        <div class="logo"></div>
        <div class="intro"></div>
    </div>
    <div class="video-list-positioner">
        <div class="video-list">
            <div class="date">-Video-</div>
        </div>
        <div class="video" v-for="(item, index) in videoList" :key="index" :style="`background-image:url(${item.coverForDetail})`" @click="goDetail(item)">
            <div class="cover"></div>
            <div class="title">{{item.title}}</div>
            <div class="meta">#{{item.category}}</div>
        </div>
    </div>
    <div class="download">
        <div class="intro"></div>
        <div class="image-list">
            <div class="icon"></div>
            <div class="logo"></div>
            <div class="download-button-list">
                <button class="ios"></button>
                <button class="android"></button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import "../../assets/js/swiper.min.js";
export default {
  name: "home",
  data() {
    return {
      videoList: []
    };
  },
  created() {
    axios
      .get(
        "https://baobab.kaiyanapp.com/api/v1/feed?udid=3e7ee30c6fc0004a773dc33b0597b5732b145c04"
      )
      .then(response => {
        this.videoList = response.data.dailyList[0].videoList;
       
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true,
      spaceBetween: 30,
      effect: "fade"
    });
  },
  methods:{
      goDetail(params){
          this.$router.push({path:'/detail',query:{des:params}})
      }
  }
};
</script>


<style scoped lang="less" >
#home {
  width: 100%;
  height: 100%;
}
.swiper-container {
  width: 100%;
  height: 100%;
  position: relative;
  .markbg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .logointro {
    position: absolute;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%);
    background-image: url("../../assets/img/logo.png");
  }
  .logo {
    .logointro;
    width: 266px;
    height: 100px;
    top: 20%;
    background-position: 0 81.02435%;
    background-size: 853.86px;
  }
  .intro {
    .logointro;
    background-position: 0 69.09976%;
    background-size: 528.59829px;
    height: 44px;
    top: 54%;
    width: 289px;
  }
}
.swiper-slide {
  background-image: url('../../assets/img/sw_bg1.jpg');
  background-position: center;
  background-size: cover;
}
.video-list-positioner {
  a {
    outline: none;
  }
  * {
    box-sizing: border-box;
  }
  .video-list {
    text-align: center;
    .date {
      background: #fff;
      font-family: Lobster, cursive;
      font-size: 16px;
      line-height: 90px;
      //   height: 200px;
    }
  }
  .video {
    text-align: center;
    height: 225px;
    background-position: 50%;
    background-size: cover;
    color: #fff;
    cursor: pointer;
    position: relative;
    .cover {
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
      position: absolute;
      -webkit-transition: all 0.6s;
      transition: all 0.6s;
      width: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      -webkit-transform: translateY(-24px);
      transform: translateY(-24px);
      position: absolute;
      top: 50%;
      width: 100%;
    }
    .meta {
      transform: translateY(12px);
      position: absolute;
      top: 50%;
      width: 100%;
    }
  }
}
.download {
  padding: 60px 0 0 0;
  background-color: white;
  a {
    outline: none;
  }
  * {
    box-sizing: border-box;
  }
  div {
    display: block;
  }
  .intro {
    text-align: center;
    background-image: url("../../assets/img/logo.png");
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 285px;
    height: 15px;
    width: 285px;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .image-list {
    text-align: center;
    width: 162px;
    font-size: 0;
    margin: 0 auto;
    .icon {
      margin: 0 0 30px;
      background-image: url("../../assets/img/logo.png");
      background-repeat: no-repeat;
      background-position: 0 52.54563%;
      background-size: 428px;
      border: 1px solid #888;
      border-radius: 20px;
      height: 100px;
      width: 100px;
      display: inline-block;
      vertical-align: middle;
    }
    .logo {
      margin: 0 0 30px;
      background-position: 0 94.03862%;
      background-size: 642px;
      height: 75px;
      width: 120px;
      background-image: url("../../assets/img/logo.png");
      background-repeat: no-repeat;
      display: inline-block;
      vertical-align: middle;
    }
    .download-button-list {
      height: 120px;
      position: relative;
      width: 162px;
      display: inline-block;
      vertical-align: middle;
      .ios {
        left: 0;
        background-image: url("../../assets/img/logo.png");
        background-repeat: no-repeat;
        background-size: 642px;
        background-position: 0 35.40825%;
        top: 0;
        background: none;
        border: none;
        height: 52px;
        position: absolute;
        width: 162px;
        color: inherit;
        overflow: visible;
        text-transform: none;
      }
      .android {
        left: 0;
        background-position: 0 17.78496%;
        bottom: 0;
       background-image: url("../../assets/img/logo.png");
        background-repeat: no-repeat;
        background-size: 642px;
        background: none;
        border: none;
        height: 52px;
        position: absolute;
        width: 162px;
      }
    }
  }
}
</style>
