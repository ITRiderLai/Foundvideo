<template>
  <div id="comment">
    <div class="reply-list-container">
        <div class="kyt-divider"></div>
        <div class="header">热门评论</div>
        <div class="reply-list">
            <a href="" v-for="(item, index) in replyuser" :key="index">
                <div class="reply">
                   <div class="like">  
                   </div> 
                   <div class="avatar" :style="`background-image:url(${item.picurl})`"></div>
                      <div class="entity">
                          <p class="username">{{item.name}}</p>
                          <p class="time">{{item.createTime}}</p>
                          <p class="text">{{item.message}}</p>
                      </div>
                </div>
            </a>
        </div>
    </div>
    <div class="tag-list-container-positioner">
      <div class="tag-list-container">
        <div class="kyt-divider"></div>
        <div class="header">热门标签</div>
        <div class="tag-list">
          <span class="tag" v-for="(item, index) in tags" :key="index">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    detailid: "",
    tags:""
  },
  data() {
    return {
      replyuser: []
    };
  },
  created(){
    console.log(this.tags)
    axios
      .get("https://baobab.kaiyanapp.com/api/v1/replies/video", {
        params: {
          id: this.detailid
        }
      })
      .then(response => {
        this.replyuser = [];
        response.data.replyList.forEach(element => {  
          this.replyuser.push({
            message: element.message,
            name: element.user.nickname,
            picurl: element.user.avatar,
            time: element.createTime
          });
        });
        console.log(this.replyuser)
      })
      .catch(error => {
        console.log(error);
      });

  },
  watch: {
    detailid(){
      axios
      .get("https://baobab.kaiyanapp.com/api/v1/replies/video", {
        params: {
          id: this.detailid
        }
      })
      .then(response => {
        this.replyuser = [];
        response.data.replyList.forEach(element => {
          this.replyuser.push({
            message: element.message,
            name: element.user.nickname,
            picurl: element.user.avatar,
            time: element.createTime
          });
        });
        console.log(this.replyuser)
      })
      .catch(error => {
        console.log(error);
      });
    },
    tags(){
      
    }
  }
};
</script>


<style scoped lang="less">
.reply-list-container {
  background: rgba(0, 0, 0, 0.4);
  .kyt-divider {
    transform: scaleY(0.5);
    background: #fff;
    height: 1px;
  }
  .header {
    margin: 16px 0 10px;
    text-align: center;
  }
  .reply-list {
    a {
      color: inherit;
      cursor: pointer;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      background-color: transparent;
      .reply {
        font-size: 12px;
        padding-bottom: 15px;
        position: relative;
        .like {
          position: absolute;
          text-align: right;
          top: 0;
          right: 16px;
        }
        .avatar {
          background-position: 50%;
          background-size: cover;
          border-radius: 50%;
          float: left;
          height: 36px;
          margin: 0 13px;
          width: 36px;
        }
        .entity {
          margin-left: 62px;
          .username {
            margin: 0;
            margin-bottom: 4px;
            line-height: 1.5;
          }
          .time {
            margin-bottom: 4px;
            opacity: 0.6;
            margin: 0;
            line-height: 1.5;
          }
          .text {
            margin-bottom: 15px;
            padding-right: 35px;
            margin: 0;
            line-height: 1.5;
          }
          .kyt-divider {
            .kyt-divider;
          }
        }
      }
    }
  }
}
.tag-list-container-positioner {
  .tag-list-container {
    background: rgba(0, 0, 0, 0.4);
    .kyt-divider {
      transform: scaleY(0.5);
      background: #fff;
      height: 1px;
    }
    .header {
      margin: 16px 0;
      text-align: center;
    }
    .tag-list {
      padding: 0 37px 16px;
      text-align: center;
      .tag {
        background: hsla(0, 0%, 100%, 0.3);
        border-radius: 2px;
        display: inline-block;
        font-size: 12px;
        letter-spacing: 3px;
        line-height: 22px;
        margin: 4px;
        padding: 0 6px 0 9px;
      }
    }
  }
}
</style>
