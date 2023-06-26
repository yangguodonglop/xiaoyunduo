<template>
  <view style="position: relative">
    <view>
      <view class="button-item">
        <view class="button-one" @click="addNotice()">
          查看公告
        </view>
      </view>
    </view>
    <view class="labels">
      <view style="margin-left: 5px;display: flex;flex-wrap: wrap;height: auto;margin-top: 5px;">
        <view style="margin-left: 5px;height: auto;height: 30px" v-for="(tag, index) in tags" :key="index">
          <text
              :class="[tag.active ? 'active' : '']"
              @click="toggleTag(index)"
              style="border: 1px solid rgb(237 13 13);border-radius: 20px;padding: 2px 5px;height:auto;overflow: hidden;"
          >
            {{ tag.name }}
          </text>
        </view>
      </view>
<!--      <text class="button-text" style="margin-left: 10px;" @click="linkAddLabel">管理标签</text>-->
    </view>
    <view v-for="(item,index) in infoList" :key="index+11" style="margin:20px auto;margin-bottom: 20px;margin-top:10px;padding: 5px;width: 98%;background: #FFFFFF; border-radius: 3px;
   border: 1px solid #999;">
      <view style="display: flex;justify-content:space-between;align-items: center;border-radius: 3px;border: 1px solid #999;border-radius: 5px;padding: 5px;padding-bottom: 8px;">
<!--        <view class="title" style="display: flex;align-items: center;justify-content:start;color: #ff7600">-->
<!--          {{nickName}}-->
<!--        </view>-->
        <view class="title" style="display: flex;align-items: center;justify-content:start;color: #ff7600">
          <!--        <img src="../login/images/test.png" width="45" height="50" alt="" style="margin-right: 5px;">-->
          0{{ index + 1 }}号美妞
        </view>
        <view>
<!--          <uni-tag text="编辑" @click="toEdit(item)"  type="primary" size="small" style="margin-right: 10px;" />-->
<!--          <uni-tag text="删除" @click="toDelete(item)" type="error" size="small" />-->
        </view>
      </view>
      <view class="img-describe" style="padding: 5px;text-indent: 20px; color: rgb(255 0 188)">
        {{ item.describe }}
      </view>
      <view class="img-describe" style="padding: 5px;text-indent: 15px; color: rgb(255 0 188);display: flex;flex-wrap:wrap;padding-top: 0px;">
        <view style="color:rgb(255, 118, 0)" v-for="label in item.labels">
          #{{label}}
        </view>
      </view>
      <div class="container">
        <video v-if="item.objs[0].suffix=='.mp4'" id="myVideo" :src="`${item.objs[0].showURL}.mp4`" controls style="width: 100%;"></video>
        <div v-if="item.objs[0].suffix!=='.mp4'"  @click="opens(item,0)" style="width: 100%;height: 225px;background-repeat: no-repeat;background-position: center center;"  :style="{ backgroundImage: `url(${item.objs[0].showURL})`, backgroundSize: 'cover' }" ></div>
        <template v-for="(items,index) in item.objs" >
          <template >
            <div v-if="index>0 && items.suffix!=='.mp4'" class="item" :style="{ backgroundImage: `url(${items.showURL})`, backgroundSize: 'contain' }" @click="open(item,index)"></div>
            <div v-if="index>0 && items.suffix=='.mp4'" class="item" >
              <video  id="myVideo1" :src="`${items.showURL}.mp4`" controls style="width: 100%;height: 100px;"></video>
            </div>
<!--            <div v-if="index>0" class="item" :style="{ backgroundImage: `url(${items.showURL})`, backgroundSize: 'contain' }" @click="open(item,index)"></div>-->
          </template>
<!--          <template v-if="item.objs[0].suffix!=='.mp4'">-->
<!--            <div  class="item" :style="{ backgroundImage: `url(${items.showURL})`, backgroundSize: 'contain' }" @click="open(item,index)"></div>-->
<!--          </template>-->
        </template>
      </div>
    </view>
    <uni-popup ref="popup" type="center" style="position: absolute;z-index: 111111;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">
          <swiper class="swiper" circular :indicator-dots="indicatorDots" :current="current" :autoplay="autoplay" :interval="interval"
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
             <textarea disabled placeholder="请输入描述" v-model="value" @confirm="handleConfirm"
                       style="border: 1px solid rgba(0,0,0,.2);width: 300px;height:100%;font-size: 14px;padding: 10px"/>
          </view>
          <button class="button" type="primary" @click="closePopupNotice">
            <text class="button-text">确定</text>
          </button>
        </view>
      </view>
    </uni-popup>

  </view>

</template>

<script>


import {getOwnerInfo} from "../../common/vmeitime-http/user";

export default {
  name: "index",
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      type: 'center',
      msgType: 'success',
      messageText: '这是一条成功提示',
      value: '',
      files: [],
      images: [],
      formData: null,
      infoList: [],
      infoListOpen: [],
      current:'0',
      tags:[],
      labels: [],
      urlId:'',
      nickName:'',
      headUrl:'',
      noticeType:true,
    }
  },
  mounted() {
    const queryString = window.location.href
    const oneStr = queryString.split('uid=');
    console.log(oneStr)
    const twoStr=oneStr[1]
    console.log(twoStr)
    const threeStr=twoStr.split("#/")[0]
    console.log(threeStr)
    this.urlId=threeStr
    this.queryInfo(this.urlId)
    this.queryLabel(this.urlId)
  },
  handleConfirm(event){
    console.log(event)

  },

  methods: {
    toggleTag(index) {
      this.noticeType=false
      this.tags[index].active = !this.tags[index].active;
      this.labels=[]
      this.tags.forEach((item)=>{
        if(item['active']){
          this.labels.push(item['name'])
        }
      })
      this.queryInfo(this.urlId)
    },
    addNotice(){
     this.$refs.popupNotice.open()
    },
    closePopup() {
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.close()
    },
    closePopupNotice(){
      this.$refs.popupNotice.close()
    },
    open(item,index) {
      // this.infoListOpen = item['objs']
      // console.log(this.infoListOpen)
      // console.log(item['objs'],index)
      if(item['objs'][0].suffix=='.mp4'){
        this.infoListOpen = item['objs'].slice(1,item['objs'].length)
        this.current=index-1
      }else{
        this.infoListOpen = item['objs']
        this.current=index
      }
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    opens(item,index) {
      // this.infoListOpen = item['objs']
      // console.log(this.infoListOpen)
      // console.log(item['objs'],index)
      if(item['objs'][0].suffix=='.mp4'){
        this.infoListOpen = item['objs'].slice(1,item['objs'].length)
        this.current=index-1
      }else{
        this.infoListOpen = item['objs']
        this.current=index
      }
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },



    queryInfo(urlId) {
      const param={
       labels:this.labels
       // labels:["你好"]
      }
      this.$api.user.getCollections(param,urlId).then(res => {
        if (res.status == 0) {
          this.infoList=[]
          this.value=''
          this.infoList = res.data.collections
          this.value=res.data.notice
          uni.showToast({
            icon: 'success',
            position: 'bottom',
            title: '信息获取中'
          });
          if(this.noticeType){
            setTimeout(this.addNotice(),1000)

          }


        } else {
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '获取信息失败'
          });
        }


      })
    },
    queryLabel(urlId){
      this.$api.user.getOwnerInfo(urlId).then(res => {
        if (res.status == 0) {
          this.nickName=res.data.nick
          this.headUrl=res.data.headURL
          console.log(this.headUrl)
          this.tags=[]
          res.data.lables.forEach((item)=>{
            const obj={
              name:item,
              active:false
            }
            this.tags.push(obj)
          })
          this.labels.forEach((item)=>{
            this.tags.forEach((items)=>{
              if(item==items.name){
                items.active=true
              }
            })
          })
        } else {
        }

      })
    },


  }


}
</script>

<style scoped lang="scss">
page {
  background-color: #f5f5f5;
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
  width: 77%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 10px;
  .tip{
    width: 150px;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }

  .icon-item {
    display: flex;
    align-items: center;

  }

  .button-one {
    width: 300px;
    height: 40px;
    background: #E99D42;
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;

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
.active {
  background-color: green;
  padding: 2px;
  color: #fff;
}
</style>
