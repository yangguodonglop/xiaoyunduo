<template>
  <view class="">
    <view class="content">
      <view class="item item-active item-bg-img" style="display: flex;justify-content: center;align-items: center;position: relative;">
        <!--      <image src="../../../static/img/avatar.jpg" style="width: 150px;height: 150px;border-radius: 50%;overflow: hidden" @click="toUploadImg()"></image>-->
        <image :src="imgSrc"
               style="width: 150px;height: 150px;border-radius: 50%; border: 1px solid #E99D42;overflow: hidden"
               @click="toUploadImg()">
        </image>
        <view style="position: absolute;bottom:30px;color: red;">修改头像</view>

      </view>
      <view class="item item-active" v-if="uploadType">
        <view class="button-one" @click="chooseImages">
          选择图片
        </view>
      </view>
      <view class="item item-active" v-if="uploadType">
        <!--      <view class="button-one" @click="uploadImages">-->
        <!--        确定上传-->
        <!--      </view>-->
      </view>
      <view class="item">
        <view style="display: flex;">
          <view style="width:70px;text-align: right;">昵称:</view>
          <view>{{ this.nickName == '' ? this.phone : this.nickName }}</view>
        </view>
        <uni-icons class="icon-item" type="compose" size="30" @click="editName()"></uni-icons>
      </view>
      <view class="item">
        <view style="display: flex">
        <view style="width:70px;text-align: right;">手机号码:</view>
        <view>{{ this.phone }}</view>
        </view>
<!--        <view>手机号码:{{ this.phone }}</view>-->
<!--        <uni-icons class="icon-item" type="compose" size="30" @click="addNotice()"></uni-icons>-->
      </view>
      <view class="item">
        <view style="font-size: 12px;display: flex;">
          <view style="width:70px;font-size: 16px;text-align: right;">邀请码:</view>
          <view style="display: flex;align-items: center">{{ this.inviteCode == '' ? '暂无邀请码' : inviteCode.slice(0, 20) }}</view>

<!--          <span style="font-size: 16px;">邀请码：</span>{{ this.inviteCode == '' ? '暂无邀请码' : inviteCode.slice(0, 20) }}-->
        </view>
        <text class="button-text" @click="copyText">复制</text>
      </view>
      <view class="item">
        <view class="button-one" @click="toOpen()">
          生成邀请码
        </view>
      </view>
      <view class="item">
        <view class="button-one  button-one-active2">
          当日访问次数：{{fileDay}}
        </view>
      </view>
      <view class="item">
        <view class="button-one  button-one-active1">
          会员到期时间：{{expiration}}
        </view>
      </view>
      <view class="item">
        <view class="button-one button-one-active" @click="outLogin()">
          退出登录
        </view>
      </view>
    </view>
    <!-- 昵称修改弹窗 -->
    <view class="edit-name-dialog" v-show="showEditNameDialog">
      <view class="edit-name-dialog-mask" @click="showEditNameDialog=false"></view>
      <view class="edit-name-dialog-content">
        <view class="edit-name-dialog-title">修改昵称</view>
        <view class="edit-name-dialog-input">
          <input type="text" v-model="newName" placeholder="请输入新的昵称"></input>
        </view>
        <view class="edit-name-dialog-button">
          <view class="edit-name-dialog-cancel" @click="showEditNameDialog=false">取消</view>
          <view class="edit-name-dialog-confirm" @click="saveName">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import axios from "axios";
import {format, addDays} from "date-fns";

export default {
  name: "my",
  data() {
    return {
      inviteCode: '',
      phone: '',
      nickName: '',
      uploadType: false,
      files: [],
      images: [],
      formData: null,
      imageList: [],
      imageListActive: [],
      totalArr: [],
      showEditNameDialog: false, // 是否显示修改昵称的弹窗
      newName: '', // 新的昵称
      imgSrc: "",
      expiration: '',
      fileDay:''
    }

  },
  onShow() {
    this.getMyInfo()
    this.getPlatformInfo()
    this.queryVisitTotalInfo()
  },
  methods: {
    // 党日访问量
    queryVisitTotalInfo() {
      this.$api.user.getVisitTotal().then(res => {
        if (res.status == 0) {
          const date = new Date()
          const indexDay=date.getDate()
          this.fileDay=res.data.day[indexDay-1]

        } else {
          this.fileDay='暂未访问数据'
        }


      })
    },
    // 编辑
    editName() {
      this.showEditNameDialog = true;
    },
    saveName() {
      const nickName = this.newName
      this.$api.user.updateNick(nickName).then(res => {
        console.log(res)
        if (res.status == 0) {
          this.getMyInfo()
          this.showEditNameDialog = false;
          // this.phone=res.data.accName
          // this.inviteCode=res.data.InviteCode.code
        } else {
        }


      })

    },
    toUploadImg() {
      this.uploadType = true
    },
    copyText() {
      if (this.inviteCode == '') {
        uni.showToast({
          title: '请先成成邀请码',
          icon: 'error'
        });
        return false
      }
      uni.setClipboardData({
        data: this.inviteCode,
        success: function () {
          uni.showToast({
            title: '复制成功'
          });
        }
      });
    },
    getPlatformInfo() {
      this.$api.user.getPlatformInfo().then(res => {
        console.log(res)
        if (res.status == 0) {
          // this.inviteCode=res.data.code
        } else {
        }


      })
    },
    getMyInfo() {
      this.$api.user.getMyInfo().then(res => {
        console.log(res)
        if (res.status == 0) {
          this.phone = res.data.accName
          this.nickName = res.data.nickName
          this.inviteCode = res.data.InviteCode.code
          const tempImgUrl = res.data.headURL
          const tempTime = res.data.expiration
          if (tempTime <= 0) {
            this.expiration = '永久'
          } else {
            this.expiration = format(tempTime * 1000, 'yyyy-MM-dd')
          }
          // endTime: format(new Date(), "yyyy-MM-dd"),
          if (tempImgUrl.indexOf("personal_collection") != -1) {
            this.imgSrc = res.data.headURL
          } else {
            this.imgSrc = '../../../static/img/avatar.jpg'
          }
          console.log(this.imgSrc)
        } else {
        }


      })
    },
    toOpen() {
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      this.$api.user.makeInviteCode().then(res => {
        console.log(res)
        if (res.status == 0) {
          this.inviteCode = res.data.code
          uni.hideLoading()
          setTimeout(function () {
            this.queryInfo()
          }, 1000);
        } else {
        }


      })
    },
    outLogin() {
      localStorage.clear()
      uni.navigateTo({
        url: '/pages/user/login/login'
      })
    },
    async chooseImages() {
      this.formData = null
      this.totalArr = []

      try {
        const [error, res] = await uni.chooseImage({
          count: 9,
        });
        if (error) {
          console.log(error);
        } else if (res.tempFiles && res.tempFiles.length > 0) {
          console.log(res.tempFiles)
          res.tempFiles.map((item) => {
            this.totalArr.push(item)
          })

          console.log(this.totalArr)
          if (this.totalArr.length >= 3) {
            this.imageList = this.totalArr.slice(0, 3)
            this.imageListActive = this.totalArr.slice(3, this.totalArr.length)
            console.log(this.imageListActive)
          } else {
            this.imageList = this.totalArr.slice(0, this.totalArr.length)
            this.imageListActive = []

          }

          const formData = new FormData();
          console.log(this.totalArr.length)
          console.log(this.totalArr)
          for (let i = 0; i < this.totalArr.length; i++) {
            const file = this.totalArr[i];
            const blob = await this.getBlobFromUrl(file.path);
            console.log(blob)
            formData.append(`file`, blob, file.name);
          }
          this.formData = formData;
          this.uploadImages()
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
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      // this.formData.append('groupID', "")
      // this.formData.append('describe', this.value)

      try {
        const response = await axios.post(
            'http://175.27.187.172:8001/personal_collection/accountInfo/updateHead',
            this.formData,
            {
              headers: {
                'sID': JSON.parse(localStorage.getItem('userData')),
                'Content-Type': 'multipart/form-data',
              },
            }
        );
        if (response.data.status == 0) {
          console.log(response.data)
          uni.hideLoading()
          this.uploadType = false
          this.getMyInfo()
          // setTimeout(function(){
          //   uni.switchTab({
          //     url:'/pages/user/main/index'
          //   })
          // },1000);

        } else {
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
.page {
  height: auto;
  min-height: 100%;
  background-color: #f5f3f2;
}

.item-bg-img {
  //background: url("../../../static/img/headImg.jpg") no-repeat center;
  background: url("../../../static/img/avatar.jpg") no-repeat center;
  height: 200px;
  background-size: cover;
}

.content {
  .item {
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    &.item-active {
      padding-top: 10px;
    }

    &.item-active {
      width: 100%;
    }
  }

  .button-one {
    width: 345px;
    height: 40px;
    background: red;
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    background: #DE868F;
  }

  .button-one-active {
    background-color: #86a9de;

  }

  .button-one-active1 {
    background-color: #E99D42;
  }
  .button-one-active2 {
    background-color: #81B337;
  }


  .button-text {
    padding: 5px 10px;
    background-color: #DE868F;
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 12px;
  }
}

.edit-name-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.edit-name-dialog-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.edit-name-dialog-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.edit-name-dialog-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.edit-name-dialog-input {
  margin-bottom: 20px;
}

.edit-name-dialog-input input {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
}

.edit-name-dialog-button {
  display: flex;
  justify-content: space-between;
}

.edit-name-dialog-button view {
  flex-grow: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
}

.edit-name-dialog-cancel {
  background-color: #eee;
  color: #333;
  margin-right: 10px;
}

.edit-name-dialog-confirm {
  background-color: #007aff;
  color: #fff;
  margin-left: 10px;
}

</style>
