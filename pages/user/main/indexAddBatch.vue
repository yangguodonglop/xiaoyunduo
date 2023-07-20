<template>
  <view>
    <view class="uni-margin-wrap">
      <div class="container" v-if="imageList.length>=1">
      <div class="item" v-for="(item,index) in imageList">
        <uni-icons class="icon-item" color="red" type="close" size="25" @click="deleteImg(index, item)"></uni-icons>
                    <video class="img_pwd_switch girl-img" v-if="item.type=='video/mp4'" id="myVideo" :src="item.path" controls style="width: 100%;"></video>
                    <image class="img_pwd_switch girl-img" v-if="item.type!=='video/mp4'" :src="item.path"/>
      </div>
      </div>
      <view class="img-describe">
        <view class="uni-textarea">
          <textarea placeholder="请输入描述" v-model="value" @confirm="handleConfirm"
          style="border: 1px solid rgba(0,0,0,.2);width: 100%;font-size: 14px;padding-top: 10px;text-indent:0px; padding: 10px"/>

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
      </view>
    </view>
    <view>
      <button @click="chooseImages">选择文件</button>
      <button @click="uploadImages">保存</button>
    </view>


  </view>

</template>

<script>
import axios from 'axios'
import {baseUrl, putLabel} from "../../../common/vmeitime-http/user";

export default {
  name: "index",
  data() {
    return {
      uploadNum:0,
      value1:[],
      range: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ],
      value: "",
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      type: 'center',
      msgType: 'success',
      messageText: '这是一条成功提示',
      files: [],
      images: [],
      formData: null,
      imageList: [],
      imageListActive: [],
      totalArr: [],
      labels: [],
      showAddTagDialog: false, // 控制弹窗的显示和隐藏
      newTag: "", // 存储新增标签的名称，
      newTags:'',
      selected: "", // 当前选中的选项
      tags: [

      ]
    }
  },
  onShow(){
    this.totalArr=[]
    this.queryLabel()
  },
 //  mounted() {
 // this.queryLabel()
 //
 //  },
  methods: {
    deleteImg(index, item) {
      this.imageList.splice(index, 1);
    },
    toggleTag(index) {
      this.tags[index].active = !this.tags[index].active;
    },
    copyText() {
      // 显示弹窗
      this.showAddTagDialog = true;
    },
    change(e) {
      console.log("e:", e);
    },
    addTags() {
      // 将新标签添加到tags数组中
      const newTags = this.newTags.split(",").map(tag => tag.trim());
      console.log(newTags)
      this.labels=newTags
      this.tags = [...this.tags, ...newTags];
      // 隐藏弹窗
      this.showAddTagDialog = false;
      // 清空输入框
      this.newTags = "";
      this.addLabels()
    },
    addLabels(){
      console.log(this.labels)
      const arr=[]
      this.labels.forEach((item)=>{
        arr.push(item)
      })
      const  param={
        labelName:arr
      }
      this.$api.user.putLabel(param).then(res => {
        console.log(res)
        if (res.status == 0) {
        this.queryLabel()
        } else {
        }
      })
    },
    queryLabel(){
      this.$api.user.getLabel().then(res => {
        if (res.status == 0) {
          this.tags=[]
          res.data.forEach((item)=>{
            const obj={
              name:item,
              active:false
            }
            this.tags.push(obj)
          })
        } else {
        }

      })
    },

    closePopup() {
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.close()
    },
    open() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    queryInfo() {
      this.$api.user.getItem().then(res => {
        console.log(res)
        if (res.status == 0) {
          uni.showToast({
            icon: 'success',
            position: 'bottom',
            title: '注册成功'
          });

        } else {
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '注册失败'
          });
        }


      })
    },
    // 管理标签
    linkAddLabel(){
        uni.navigateTo({
          url:'/pages/user/main/addLabel'
        })
    },
    handleConfirm(event){
      console.log(event)

    },
    async chooseImages() {


      try {
        const [error, res] = await uni.chooseFile({
          count: 11,
        });
        // this.uploadNum+=res.tempFiles.length
        // console.log(this.uploadNum)
        // console.log(res.tempFiles.length)
        if(res.tempFiles.length>10){
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '一次最多选择10个文件'
          });
          return false
        }

        if (error) {
          console.log(error);
        } else if (res.tempFiles && res.tempFiles.length > 0) {
          console.log(res.tempFiles)
          res.tempFiles.map((item)=>{
            this.totalArr.push(item)
          })
          this.imageList=[]
          this.imageList=this.totalArr
          const formData = new FormData();
          for (let i = 0; i < this.totalArr.length; i++) {
            const file = this.totalArr[i];
            const blob = await this.getBlobFromUrl(file.path);
            formData.append(`item_${i}`, blob, file.name);
          }
          this.formData = formData;
        } else {
          console.log('用户未选择图片');
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getBlobFromUrl(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(`Failed to load ${url}: ${this.status}`));
          }
        };
        xhr.onerror = function () {
          reject(new Error(`Failed to load ${url}`));
        };
        xhr.send();
      });
    },
    async uploadImages() {
      console.log(this.tags)
      const tempArr=[]
      this.tags.forEach((item)=>{
        if(item['active']){
          tempArr.push(item['name'])
        }
      })
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      this.formData.append('groupID', "")
      this.formData.append('describe', this.value)
      this.formData.append('labels',JSON.stringify(tempArr))

      try {
        const url=baseUrl+'/personal_collection/myCollection/batchPutItem'
        const response = await axios.post(
            url,
            this.formData,
            {
              headers: {
                'sID': JSON.parse(localStorage.getItem('userData')),
                'Content-Type': 'multipart/form-data',
              },
            }
        );
        if(response.data.status==0){
          uni.hideLoading()
          setTimeout(function(){
            uni.switchTab({
              url:'/pages/user/main/index'
            })
          },1000);

        }else{
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '上传失败'
          });
        }
      } catch (error) {
        console.log('上传失败：', error);
      }
    },
  }


}
</script>

<style scoped lang="scss">
page {
  background-color: #f5f5f5;
}



/* #endif */


.uni-margin-wrap {
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: column;

  .uni-margin-content {
    width: 100%;
    display: flex;
    height: auto;

    .item-img {
      width: 130px;
      height: 150px;

      .girl-img {
        width: 100%;
        height: 100%;
      }
    }

    ::v-deep uni-image {
      width: 100px;
      height: auto;
    }
  }


  .img-describe {
    text-indent: 20px;
    color: #8f939c;
    font-size: 14px;
    padding: 5px;
  }
  .labels{
    //line-height: 40px;
    //display: flex;
    align-items: center;
  }
  .button-text {
    background-color: #DE868F;
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 1px 5px;
    margin-left: 2px;
  }

}
.add-tag-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  width: 300px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
}

.dialog-body {
  padding: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-top: 1px solid #cccccc;
}

.confirm-button {
  margin-left: 10px;
  background-color: #007aff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}

.cancel-button {
  background-color: #ffffff;
  color: #007aff;
  border: 1px solid #007aff;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}
.active {
  background-color: green;
  padding: 2px;
  color: #fff;
}
.item {
  background: #1AAD19;
  flex-grow: 1;
  height: 150px;
  width: calc(33.33% - 10px); /* 设置每个子元素的宽度为1/3减去间距 */
  position: relative;
  ::v-deep uni-image{
    width: 100%;
  }

  .icon-item {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    z-index: 10000;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 600px; /* 设置容器最大宽度 */
  height: auto;
  overflow: hidden;
}

</style>
