<template>
  <div id="detail">
      <div class="kyt-container">
          <div class="kyt-container-head j-kyt-container-head">
              <div class="returnicon" @click="goBack"></div>
              <div class="kyt-player j-container-head-location" style="width: 375px; height: 210.938px;" >
                    <video ref="video" :src="songdetail.playUrl" controls autoplay/>
              </div>
          </div>
          <div class="video-info j-video-info">
              <div class="video-meta-positioner">
                  <div class="video-meta">
                      <h1>{{songdetail.title}}</h1>
                      <div class="kyt-divider kyt-divider-short"></div>
                      <p>{{songdetail.category}}</p>
                      <p class="description">{{songdetail.description}}</p>
                  </div>
              </div>
              <div class="kyt-divider"></div>
              <div class="relate-video-list-positioner">
                  <div class="relate-video-list">
                      <a href="" v-for="(item, index) in relatedcont" :key="index" @click="playRelate(item)">
                          <div class="relate-video">
                              <div class="cover" :style="`background-image:url(${item.cover.detail})`"></div>
                              <div class="meta">
                                  <div class="title">{{item.title}}</div>
                                  <div class="category">{{item.category}}</div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
              <Comment :detailid='songdetailid' :tags='playtags'></Comment>
          </div>
      </div>
  </div>
</template>

<script>
import Comment from '../../components/comment';
export default {
  name: "detail",
  data() {
    return {
      songdetail: null,
      songdetailid: 0,
      related:[],
      relatedcont:[],
      isplaying:true,
      playtags:[]
    };
  },
  components:{
      Comment
  },
  created() {
    this.songdetail = this.$route.query.des;
    this.songdetailid = this.$route.query.des.id;
    axios
      .get(
        "https://baobab.kaiyanapp.com/api/v4/video/related?id="+ this.songdetailid +"&f=iphone&vc=4800&udid="
      )
      .then(response => {
        this.related = response.data.itemList.slice(1,response.data.itemList.length);
        this.related.forEach(element => {
            this.relatedcont.push(element.data);
            this.playtags = element.data.tags;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
      playRelate(params){
          let event = window.event || arguments[0];
          event.preventDefault();
          this.isplaying = true;
          this.songdetail.playUrl = params.playUrl;
          this.songdetail.title = params.title;
          this.songdetail.category = params.category;
          this.songdetail.description = params.description;
          this.songdetailid = params.id
          // console.log(params)
          this.playtags = params.tags
      },
      goBack(){
        this.$router.go(-1)
      },
      togglePlay(){
          
          if(this.isplaying){
            //   console.log(video);
              this.$refs.video.pause();
              this.isplaying = false;
          }else{
              this.$refs.video.play();
              this.isplaying = true;
          }
          // alert('1')
      }
  }
};
</script>


<style scoped lang="less">
body {
  font-family: sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #fff;
  margin: 0;
  display: block;

}
*,
a {
  outline: none;
}
* {
  box-sizing: border-box;
}
#detail {
  background: rgb(51, 51, 51);
  .kyt-container {
    margin: 0 auto;
    max-width: 700px;
    overflow: hidden;
    .kyt-container-head {
      width: 100%;
      .returnicon {
          width: 100%;
          height: 40px;
          background-image: url(../../assets/img/return.png);
          background-color: rgba(0, 0, 0, 0.3); 
          background-size: 25px;
          background-position: 10px;
          background-repeat: no-repeat;
          transition: all 0.5s;
        }
      .kyt-player {
        background: #000;
        height: 258px;
        overflow: hidden;
        position: relative;
        left: 50%;
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
        width: 100%;
        
        video {
          z-index: 1;
          height: 100%;
          position: absolute;
          width: 100%;
          left: 0;
          display: inline-block;
        }
        .cover {
          background-position: bottom;
          background-repeat: no-repeat;
          background-size: cover;
          z-index: 2;
          height: 100%;
          position: absolute;
          width: 100%;
          left: 0;
        }
        .play-button {
          // background-color: rgba(0, 0, 0, 0.15);
          background-image: url("../../assets/img/play.png");
          background-position-x: 50% ;
          background-position-y: 80% ;
          background-repeat: no-repeat;
          background-size: 40px 40px;
          cursor: pointer;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
          z-index: 3;
          height: 70%;
          position: absolute;
          width: 100%;
          left: 0;
        }
      }
    }
    .video-info {
      color: white;
      position: relative;
      .video-meta {
        background: rgba(0, 0, 0, 0.2);
        padding: 15px;
        padding-bottom: 4px;
        h1 {
          font-size: 20px;
          margin: 0;
          margin-bottom: 7px;
          line-height: 1.5;
        }
        .kyt-divider {
          margin-bottom: 7px;
          transform: scaleY(0.5);
          background: #fff;
          height: 1px;
        }
        .kyt-divider-short {
          width: 40px;
        }
        p {
          margin: 0;
          margin-bottom: 12px;
          line-height: 1.5;
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
        .description {
          margin-bottom: 11px;
          opacity: 0.85;
        }
      }
      .kyt-divider {
        transform: scaleY(0.5);
        background: #fff;
        height: 1px;
      }
      .relate-video-list-positioner {
        .relate-video-list {
          background: rgba(0, 0, 0, 0.4);
          padding: 20px 15px 10px;
          a {
            color: inherit;
            cursor: pointer;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
            .relate-video {
              margin-bottom: 20px;
              position: relative;
              .cover {
                border-width: 0.5px;
                background-position: 50%;
                background-size: cover;
                border: 1px solid hsla(0, 0%, 100%, 0.3);
                padding-top: 25%;
                width: 40%;
              }
              .meta {
                left: 40%;
                margin-left: 15px;
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                .title {
                  font-size: 13px;
                  font-weight: 700;
                  margin-bottom: 5px;
                }
                .category {
                  font-size: 12px;
                  opacity: 0.85;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
