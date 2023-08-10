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
      </view>
      <view class="item">
        <view style="display: flex;">
          <view style="width:80px;text-align: right;">昵称 :</view>
          <view style="margin-left: 5px;">{{ this.nickName == '' ? this.phone : this.nickName }}</view>
        </view>
        <uni-icons class="icon-item" type="compose" size="30" @click="editName()"></uni-icons>
      </view>
      <view class="item">
        <view style="display: flex">
        <view style="width:80px;text-align: right;">手机号码 :</view>
        <view style="margin-left: 5px;">{{ this.phone }}</view>
        </view>
<!--        <view>手机号码:{{ this.phone }}</view>-->
<!--        <uni-icons class="icon-item" type="compose" size="30" @click="addNotice()"></uni-icons>-->
      </view>
      <view class="item">
        <view style="display: flex;">
          <view style="width:80px;font-size: 16px;text-align: right;">邀请码 :</view>
          <view style="display: flex;align-items: center;margin-left: 5px;">{{ this.inviteCode == '' ? '暂无邀请码' : inviteCode.slice(0, 20) }}</view>

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
        <view class="button-one" style="background: #86deaa;"  @click="linkAddLabel">
          管理标签
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
    <uni-popup ref="popupNoticeToday" type="center" style="position: absolute;z-index: 111110;top: -10px;">
      <view class="uni-margin-wrap-popup">
        <view class="content-pop">

          <view style="width: 100%;height: 300px;background: #FFFFFF">
            <view
                style="display: flex;justify-content: center;align-items: center;line-height: 40px;color:#E99D42;font-size: 16px;font-weight: bold; ">
               友情提示
            </view>
            <textarea v-model="valueToday" @confirm="handleConfirm" :disabled="true"
                      :style="{ 'background-color': '#d9d9d9'}"
                      style="border: 1px solid rgba(0,0,0,.2);width: 300px;font-size:16px;height:100%;font-size: 15px;padding: 10px;padding-right:0px;color: #38810d;"/>
          </view>
          <button class="button" type="primary" @click="closePopupNoticeToday">
            <text class="button-text">关闭</text>
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import axios from "axios";
import {format, addDays} from "date-fns";
import {baseUrl} from "../../../common/vmeitime-http/user";

export default {
  name: "my",
  data() {
    return {
      valueToday: '您的会员还有3天到期，如需继续享受该业务，请联系管理员进行充值！',
      popupNoticeToday:true,
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
  mounted(){

  },
  methods: {
    // 关闭弹窗
    closePopupNoticeToday(){
      localStorage.setItem('again', 'true')
      this.$refs.popupNoticeToday.close()

    },
    // 管理标签
    linkAddLabel(){
      uni.navigateTo({
        url:'/pages/user/main/addLabel'
      })
    },
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
        if (res.status == 0) {
          // this.inviteCode=res.data.code
        } else {
        }


      })
    },
    getMyInfo() {
      this.$api.user.getMyInfo().then(res => {
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
          if (tempImgUrl.indexOf("personal_collection") != -1) {
            this.imgSrc = res.data.headURL
          } else {
            this.imgSrc = '../../../static/img/avatar.jpg'
          }
          const lastLoginTime = document.cookie.replace(/(?:(?:^|.*;\s*)lastLoginTime\s*\=\s*([^;]*).*$)|^.*$/, '$1');
          const expirationTime = tempTime; // 会员到期时间戳，这里假设为1696867200

          const now = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
          // const now=  1696608000

          const threeDaysInSeconds = 3 * 24 * 60 * 60; // 3天的秒数
            if (expirationTime - now <= threeDaysInSeconds) {
              const nowType=    localStorage.getItem('again',)
              if(!nowType || nowType=='false'){
                this.$refs.popupNoticeToday.open();
                document.cookie = `lastLoginTime=${new Date().getTime()}; path=/`;
              }

            }



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
        const [error, res] = await uni.chooseFile({
          count: 9,
        });
        if (error) {
        } else if (res.tempFiles && res.tempFiles.length > 0) {
          res.tempFiles.map((item) => {
            this.totalArr.push(item)
          })

          if (this.totalArr.length >= 3) {
            this.imageList = this.totalArr.slice(0, 3)
            this.imageListActive = this.totalArr.slice(3, this.totalArr.length)
          } else {
            this.imageList = this.totalArr.slice(0, this.totalArr.length)
            this.imageListActive = []

          }
          const formData = new FormData();
          for (let i = 0; i < this.totalArr.length; i++) {
            const file = this.totalArr[i];
            const blob = await this.getBlobFromUrl(file.path);
            formData.append(`file`, blob);
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

        const url=baseUrl+'/personal_collection/accountInfo/updateHead'
        const response = await axios.post(
            url,
            this.formData,
            {
              headers: {
                'sID': JSON.parse(localStorage.getItem('userData')),
                'Content-Type': 'multipart/form-data',
                // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
                // 'Accept-Encoding': 'gzip, deflate, br',

              },
            }
        );
        if (response.data.status == 0) {
          uni.hideLoading()
          this.uploadType = false
          this.getMyInfo()

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
  //background: url("../../../static/img/avatar.jpg") no-repeat center;
  height: 200px;
  background-size: cover;
  background-color: #CCCCCC;
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
</style>
