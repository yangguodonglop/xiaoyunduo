<template>
  <view style="position: relative">
    <view class="customer-service" @click="showMessage">
      <uni-icons type="chat" size="30" color="#fff"></uni-icons>
    </view>
    <view>
      <view class="button-item">
        <view class="tip">已收藏总数:{{ fileAll }}</view>
      </view>
      <view class="button-item" style="position: relative;">
        <view class="button-one" @click="checkNotice" style="background: #81B337;">
          我的公告
        </view>
        <uni-icons style="position: absolute;top:4px;right: 25px;width: 30px;color: #2979ff;"
                   class="icon-item" type="compose" size="30" @click="addNotice"></uni-icons>
      </view>
      <view class="button-item">
        <view class="button-one button-two" @click="toshare()">
          分享
        </view>
      </view>
      <view class="button-item">
        <view class="button-one " @click="toAdd()" style="background: #81B337;">
          添加收藏
        </view>
      </view>
      <view class="button-item">
        <view class="button-one button-three" @click="toAddBatch()" style="background: #81B337;">
          批量添加收藏
        </view>
      </view>
      <view class="button-item" style="margin-top: 0px;">
        <view class="button-one button-two" style="background: rgb(169 60 71);" @click="inputDialogToggle">
          一键删除
        </view>
      </view>
    </view>
    <view class="labels" style="padding: 10px;padding-bottom: 0px">
      <view style="margin-left: 5px;display: flex;flex-wrap: wrap;height: auto;margin-top: 5px;">
        <view style="margin-left: 5px;height: auto;height: 30px" v-for="(tag, index) in tags" :key="index">
          <text
              :class="[tag.active ? 'active' : '']"
              @click="toggleTag(index)"
              class="tag"
          >
            {{ tag.name }}
          </text>
        </view>
      </view>
      <!--      <text class="button-text" style="margin-left: 10px;" @click="linkAddLabel">管理标签</text>-->
    </view>
    <view v-for="(item,index) in infoList" :key="index+11" class="img-content" style="">
      <view
          style="display: flex;justify-content:space-between;align-items: center;border-radius: 3px;border: 1px solid #999;border-radius: 5px;padding: 5px;padding-bottom: 8px;">
        <view class="title" style="display: flex;align-items: center;justify-content:start;color: #ff7600">
          {{ index + 1 }}
        </view>
        <view>
          <uni-tag text="编辑" @click="toEdit(item)" type="primary" size="small" style="margin-right: 10px;"/>
          <uni-tag text="删除" @click="toDelete(item)" type="error" size="small"/>
        </view>
      </view>
      <view class="img-describe" style="padding: 5px;text-indent: 10px; color: rgb(255 0 188)">
        {{ item.describe }}
      </view>
      <view class="img-describe"
            style="padding: 5px;text-indent: 10px; color: rgb(255 0 188);display: flex;flex-wrap:wrap;padding-top: 0px;">
        <view style="color:rgb(255, 118, 0)" v-for="label in item.labels">
          #{{ label }}
        </view>
      </view>
<!--      <div class="container">-->
<!--        <video v-if="item.objs[0].suffix=='.mp4'" id="myVideo" :src="`${item.objs[0].showURL}.mp4`" controls-->
<!--               style="width: 100%;"></video>-->
<!--        <div v-if="item.objs[0].suffix!=='.mp4'" @click="opens(item,0)"-->
<!--             style="width: 100%;height: 300px;background-repeat: no-repeat;background-position: center;">-->
<!--          <img :src="item.objs[0].showURL"  style="width: 100%; height: 100%; object-fit: cover;">-->
<!--        </div>-->
<!--        <template v-for="(items,index) in item.objs">-->
<!--          <template>-->
<!--            <div v-if="index>0 && items.suffix!=='.mp4'" class="item"-->
<!--                 :style="{ backgroundImage: `url(${items.showURL})`, backgroundSize: 'contain' }"-->
<!--                 @click="open(item,index)"></div>-->
<!--            <div v-if="index>0 && items.suffix=='.mp4'" class="item">-->
<!--              <video id="myVideo1" :src="`${items.showURL}.mp4`" controls style="width: 100%;height: 100px;"></video>-->
<!--            </div>-->
<!--          </template>-->
<!--        </template>-->
<!--      </div>-->
      <div class="container">
        <video v-if="item.objs[0].suffix=='.mp4'" id="myVideo" :src="`${item.objs[0].showURL}.mp4`" controls style="width: 100%;"></video>
        <video v-if="item.objs[0].suffix=='.MOV'" id="myVideo" :src="`${item.objs[0].showURL}`" controls style="width: 100%;"></video>
        <div v-if="item.objs[0].suffix!=='.mp4' && item.objs[0].suffix!=='.MOV'"  @click="opens(item,0)" style="width: 100%;height: 225px;background-repeat: no-repeat;background-position: center center;"  :style="{ backgroundImage: `url(${item.objs[0].showURL})`, backgroundSize: 'cover' }" ></div>
        <template v-for="(items,index) in item.objs" >
          <template >
            <div v-if="index>0 && items.suffix!=='.mp4' && items.suffix!=='.MOV'" class="item" :style="{ backgroundImage: `url(${items.showURL})`, backgroundSize: 'contain' }" @click="open(item,index)"></div>
            <div v-if="index>0 && items.suffix=='.mp4'" class="item" >
              <video  id="myVideo1" :src="`${items.showURL}.mp4`" controls style="width: 100%;height: 100px;"></video>
            </div>
            <div v-if="index>0 && items.suffix=='.MOV'" class="item" >
              <video  id="myVideo1" :src="`${items.showURL}`" controls style="width: 100%;height: 100px;"></video>
            </div>
          </template>
        </template>
      </div>
    </view>

    <uni-popup ref="popup" type="center" style="position: absolute;z-index: 111111;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">
          <swiper class="swiper" circular :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay"
                  :interval="interval"
                  :duration="duration">
            <swiper-item v-for="items in infoListOpen">
              <view class="swiper-item ">
                <image class="img_pwd_switch girl-img" :src="items.showURL"/>
              </view>
            </swiper-item>

          </swiper>
          <button class="button" type="primary" @click="closePopup">
            <text class="button-text">关闭</text>
          </button>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="popupNotice" type="center" style="position: absolute;z-index: 111111;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">
          <view style="width: 100%;height: 300px;background: #FFFFFF">
            <view
                style="display: flex;justify-content: center;align-items: center;line-height: 40px;color:#E99D42;font-size: 16px;font-weight: bold; ">
              当日公告
            </view>
            <textarea placeholder="请输入描述" v-model="value" @confirm="handleConfirm" :disabled="disabled"
                      :style="{ 'background-color': disabled ? '#d9d9d9' : '' }"
                      style="border: 1px solid rgba(0,0,0,.2);width: 300px;height:100%;font-size: 14px;padding: 10px"/>
            <uni-icons class="icon-item" color="#E99D42" type="close" size="25"
                       style="position: absolute;right: 1px;top: 7px;" @click="closePopupNoticeActive"></uni-icons>

          </view>
          <button v-if="noticeText=='确认修改'" class="button" type="primary" @click="closePopupNotice">
            <text class="button-text">{{ noticeText }}</text>
          </button>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popupShare" type="center" style="position: absolute;z-index: 111111;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">
          <view style="width: 100%;height: 150px;background: #FFFFFF">
             <textarea disabled v-model="share" @confirm="handleConfirm"
                       style="border: 1px solid rgba(0,0,0,.2);width: 300px;height:100%;font-size: 14px;padding: 10px"/>
          </view>
          <button class="button" type="primary" @click="closePopupShare">
            <text class="button-text">关闭</text>
          </button>
          <button class="button" type="primary" @click="copyText">
            <text class="button-text">复制</text>
          </button>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popupNoticeToday" type="center" style="position: absolute;z-index: 111110;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">

          <view style="width: 100%;height: 300px;background: #FFFFFF">
            <view
                style="display: flex;justify-content: center;align-items: center;line-height: 40px;color:#E99D42;font-size: 16px;font-weight: bold; ">
              系统公告
            </view>
            <textarea v-model="valueToday" @confirm="handleConfirm" :disabled="disabled"
                      :style="{ 'background-color': disabled ? '#d9d9d9' : '' }"
                      style="border: 1px solid rgba(0,0,0,.2);width: 300px;height:100%;font-size: 14px;padding: 10px;color: #38810d;"/>
          </view>
          <button class="button" type="primary" @click="closePopupNoticeToday">
            <text class="button-text">关闭</text>
          </button>
        </view>
      </view>
    </uni-popup>
    <!-- 弹窗组件 -->
    <view class="modal-mask" v-show="isModalVisible">
      <view class="modal-wrapper">
        <view class="modal-container">
          <view class="modal-header">
            <view class="modal-title">客服QQ</view>
            <uni-icons class="icon-item" color="#E99D42" type="close" size="25"
                       style="position: absolute;right: 1px;top: 7px;" @click="closeMessage"></uni-icons>
<!--            <uni-icons type="cross" size="24" color="#666" @click="closeMessage"></uni-icons>-->
          </view>
          <view class="modal-content">
            <view class="qq-number">{{qqNumber}}</view>
            <button class="copy-button" @click="copyToClipboard">复制</button>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
import md5 from "js-md5";
import {baseUrl} from "../../../common/vmeitime-http/user";

export default {
  name: "index",
  data() {
    return {
      isModalVisible: false, // 弹窗是否可见
      qqNumber: '362960082', // QQ 号码
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      type: 'center',
      share: 'sadasdasdasdasdasdasdsa',
      msgType: 'success',
      messageText: '这是一条成功提示',
      value: '',
      valueToday: '当日公告这是一条成功提示这是一条成功提示这是一条成功提示这是一条成功提示这是一条成功提示这是一条成功提示',
      files: [],
      images: [],
      formData: null,
      infoList: [],
      infoListOpen: [],
      disabled: false,
      current: '0',
      fileAll: 0,
      fileDay: 0,
      noticeText: "关闭",
      tags:[],
    }
  },
  onShow() {
    this.queryInfo()
    this.queryVisitTotalInfo()
    this.getPlatformInfo()
    this.queryInfoActive()


  },
  mounted() {


  },
  handleConfirm(event) {
    console.log(event)

  },
  methods: {
    // 显示弹窗
    showMessage() {
      this.isModalVisible = true;
    },
    // 关闭弹窗
    closeMessage() {
      this.isModalVisible = false;
    },
    // 复制 QQ 号码到剪贴板
    copyToClipboard() {
      let _this=this
      uni.setClipboardData({
        data: this.qqNumber,
        success() {
          _this.isModalVisible = false;
          uni.showToast({
            title: '复制成功',
            icon: 'none',
          });
        },
        fail() {
          uni.showToast({
            title: '复制失败，请重试',
            icon: 'none',
          });
        },
      });
    },
    // 批量新增
    toAddBatch() {
      uni.navigateTo({
        url: '/pages/user/main/indexAddBatch'
      })
    },
    //关闭公告
    closePopupNoticeActive() {
      this.value = ''
      this.$refs.popupNotice.close()
    },
    // 获取当日公告
    getPlatformInfo() {
      this.$api.user.getPlatformInfo().then(res => {
        console.log(res)
        if (res.status == 0) {
          this.valueToday = res.data.pAnnouncement.text
        } else {
        }


      })
    },
    //关闭公告
    closePopupNoticeToday() {
      this.$refs.popupNoticeToday.close()
    },
    //一键删除
    inputDialogToggle() {
      let _this = this
      uni.showModal({
        title: '提示',
        content: '确定要删除所有收藏吗？',
        success: function (res) {
          if (res.confirm) {
            // 用户点击确定按钮执行的操作
            console.log('用户点击确定');
            // TODO: 执行删除操作
            const str = ''
            _this.$api.user.deleteItem(str).then(res => {
              console.log(res)
              if (res.status == 0) {
                uni.showToast({
                  icon: 'success',
                  position: 'bottom',
                  title: '删除成功'
                });
                _this.queryInfo()
              } else {
                uni.showToast({
                  icon: 'error',
                  position: 'bottom',
                  title: '删除失败'
                });
              }

            })
          } else if (res.cancel) {
            // 用户点击取消按钮执行的操作
            console.log('用户点击取消');
          }
        }
      })
    },
    closePopup() {
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.close()
    },
    toshare() {
      this.$api.user.makeShareURL(this.value).then(res => {
        const tempStr = res.data
        //   const url = tempStr.split('collections/')
        if (res.status == 0) {
          this.share = tempStr
          this.$refs.popupShare.open()

        } else {
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '生成失败'
          });
        }

      })

    },
    copyText() {
      uni.setClipboardData({
        data: this.share,
        success: () => {
          this.closePopupShare();
          uni.showToast({
            title: '复制成功',
            duration: 2000,
            zIndex: 10000000,
          });
        }
      });
    },
    closePopupShare() {
      this.share = ""
      this.$refs.popupShare.close()
    },
    closePopupNotice() {
      if (this.noticeText == '确认修改') {
        this.$api.user.updateAnnouncement(this.value).then(res => {
          console.log(res)
          if (res.status == 0) {
            uni.showToast({
              icon: 'success',
              position: 'bottom',
              title: '修改成功'
            });

          } else {
            uni.showToast({
              icon: 'error',
              position: 'bottom',
              title: '修改失败'
            });
          }
          this.queryInfo()

        })
      }

      this.$refs.popupNotice.close()
    },
    open(item, index) {
      if(item['objs'][0].suffix=='.mp4' || item['objs'][0].suffix=='.MOV'){
        this.infoListOpen = item['objs'].slice(1, item['objs'].length)
        this.current = index - 1
      } else {
        this.infoListOpen = item['objs']
        this.current = index
      }
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    opens(item, index) {
      if(item['objs'][0].suffix=='.mp4' || item['objs'][0].suffix=='.MOV'){
        this.infoListOpen = item['objs'].slice(1, item['objs'].length)
        this.current = index - 1
      } else {
        this.infoListOpen = item['objs']
        this.current = index
      }
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    toEdit(item) {
      console.log(item)
      localStorage.setItem('imgInfo', JSON.stringify(item))
      uni.navigateTo({
        url: '/pages/user/main/indexEdit'
      })
    },
    toDelete(item) {
      const str = item.id
      this.$api.user.deleteItem(str).then(res => {
        console.log(res)
        if (res.status == 0) {
          uni.showToast({
            icon: 'success',
            position: 'bottom',
            title: '删除成功'
          });
          this.queryInfo()
        } else {
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '删除失败'
          });
        }


      })
    },
    addNotice() {
      this.noticeText = '确认修改'
      this.disabled = false
      this.queryInfo()
      this.$refs.popupNotice.open()
    },
    checkNotice() {
      this.noticeText = '关闭'
      this.disabled = true;
      this.$refs.popupNotice.open()
      this.queryInfo()
    },
    toAdd() {
      uni.navigateTo({
        url: '/pages/user/main/indexAdd'
      })
    },
    toggleTag(index) {
      //this.noticeType=false
      this.tags[index].active = !this.tags[index].active;
      console.log(this.tags)
      this.labels=[]
      this.tags.forEach((item)=>{
        if(item['active']){
          this.labels.push(item['name'])
        }
      })
     this.queryInfo()
    },
    queryInfoActive() {
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      const param={
        labels:['']
      }
      this.$api.user.getItem(param).then(res => {
        if (res.status == 0) {
          if (res.data) {
            const tempArr  =(res.data.labels)
            this.tags=[]
            tempArr.forEach((item)=>{
              const obj={
                name:item,
                active:false
              }
              this.tags.push(obj)
            })
          } else {
            this.tags=[]
          }

        } else {

        }
        uni.hideLoading()

      })
    },
    queryInfo() {
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      const param={
        labels:this.labels
      }
      this.$api.user.getItem(param).then(res => {
        if (res.status == 0) {
          this.infoList = []
          if (res.data) {
            this.infoList = res.data.collections
            this.fileAll = res.data.collections.length
            this.value = res.data.notice
            this.systemNotice()

          } else {
            this.infoList = []
            this.value = ''
          }


        } else {
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '获取信息失败'
          });
        }
        uni.hideLoading()

      })
    },
    queryVisitTotalInfo() {
      this.$api.user.getVisitTotal().then(res => {
        if (res.status == 0) {
          console.log(res.data.count)
          const date = new Date()
          const indexDay = date.getDate()
          this.fileDay = res.data.day[indexDay - 1]

        } else {

        }
      })
    },
    systemNotice(){
      const lastLoginTime = document.cookie.replace(/(?:(?:^|.*;\s*)lastLoginTime\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      if (!lastLoginTime) {
        this.$refs.popupNoticeToday.open()
        document.cookie = `lastLoginTime=${new Date().getTime()}; path=/`;
      }
      const now = new Date().getTime();
      if (now - lastLoginTime >= 24 * 60 * 60 * 1000) {
        this.$refs.popupNoticeToday.open()
        document.cookie = `lastLoginTime=${new Date().getTime()}; path=/`;
      } else {
        this.$refs.popupNoticeToday.close()
      }
    }

  }


}
</script>

<style scoped lang="scss">
page {
  background-color: #f5f3f2;

  overflow-y: scroll;
}

.uni-page-body {
  height: 100%;
  background-color: #f5f3f2;
}

.upload-label {
  display: inline-block;
  padding: 8px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #4CAF50;
  border-radius: 4px;
  cursor: pointer;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}

.uni-margin-wrap {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;

  .title {
    position: absolute;
    top: 10px;
    left: 10px;
    color: red;
    z-index: 1000;
  }

  //.girl-img{
  //  width: 100%;
  //  height: 100%;
  //}
  ::v-deep uni-image {
    width: 100%;
    height: 300px;
  }

  .img-describe {
    text-indent: 20px;
    color: #8f939c;
    font-size: 14px;
    padding: 5px;
    margin-bottom: 5px;
  }
}

.uni-margin-wrap-popup {
  width: 100%;
  height: 100%;

  ::v-deep uni-image {
    width: 100%;
    height: 550px;
  }

  ::v-deep uni-swiper {
    height: 550px;
  }

  .uni-margin-wrap-popup {
    z-index: 1001;
  }

  ::v-deep .uni-popup {
    z-index: 1001;
  }
}

.button-item {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-around;
  text-align: center;

  .tip {
    width: 330px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    border-radius: 5px;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  }

  .icon-item {
    display: flex;
    align-items: center;

  }

  .button-one {
    width: 330px;
    height: 40px;
    background: #E99D42;
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);

    &.button-two {
      background: #81B337;
    }

    &.button-three {
      background: #DE868F;
      margin-bottom: 10px;

    }
  }

}

.button-edit {
  width: 150px;
  height: 40px;
  background: red;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  background: #007aff;
}

.button-delete {
  width: 150px;
  height: 40px;
  background: red;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  width: 33.33%;
  height: 100px;
  float: left;
  box-sizing: border-box; /* 让盒子大小包含边框和内边距 */
  border: 1px solid #ccc; /* 添加边框，可根据需要调整颜色和宽度 */
  background-color: #f2f2f2; /* 添加背景颜色，可根据需要调整颜色 */
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain; /* 调整图片自适应大小成小图展示 */
}

.item:nth-child(3n+1) {
  clear: left; /* 每行的第一个子元素清除左浮动 */
}

.customer-service {
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #2979ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.customer-service:hover {
  cursor: pointer;
  opacity: 0.8;
}
.active {
  background-color: green;
  padding: 2px;
  color: #fff;
}
.img-content{
  margin:20px auto;
  margin-bottom: 20px;
  padding: 5px;
  width: 98%;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #999;
  margin-top: 20px;
}
.tag {
  display: inline-block;
  border: 1px solid #2979ff;
  border-radius: 20px;
  padding: 2px 14px;
  height: auto;
  overflow: hidden;
  margin-right: 5px;
  background: #2979ff;
  margin-bottom: 5px;
  color: #ffffff;
}
.tag.active {
  background-color: #ff7600;
  color: #fff;
}
/* 弹窗遮罩层 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 弹窗容器 */
.modal-wrapper {
  width: 80%;
  max-width: 400px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* 弹窗头部 */
.modal-header {
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: relative;
}

/* 弹窗标题 */
.modal-title {
  flex: 1;
  text-align: center;
}

/* 弹窗内容区域 */
.modal-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* QQ 号码 */
.qq-number {
  font-size: 24px;
  margin-bottom: 16px;
}

/* 复制按钮 */
.copy-button {
  background: #007aff;
  color: #fff;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: #0051a8;
}

</style>
