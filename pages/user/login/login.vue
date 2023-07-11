<template>
  <view class="page_login">
    <view class="head">
      <view class="head_bg">
        <view class="head_inner_bg">
          <image style="width: 320px;height: 260px;" :src="imgInfo.head" class="head_logo"/>
        </view>
      </view>
    </view>

    <view class="app-name"></view>
    <view class="login_form">
      <view class="input">
        <view class="img">
          <image style="width:27px;height: 27px;" :src="imgInfo.icon_user"/>
        </view>
        <input type="text" style="color: #fff" v-model="username" placeholder="请输入用户账号">
        <view class="img">
          <image @tap="delUser" class="img_del" :src="imgInfo.icon_del"/>
        </view>
      </view>
      <view class="line"/>
      <view class="input">
        <view class="img">
          <image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd"/>
        </view>
        <input class="input-active" style="color: #fff;background: #00102A;" :type="showPasswordType?'password':'text'" v-model="userpwd"
               placeholder="请输入密码">
        <view class="img">
          <image class="img_pwd_switch" @click="showPassword()" :src="imgInfo.icon_pwd_switch"/>
        </view>
      </view>

    </view>
    <view style="display: flex;color: rgb(10, 152, 213);justify-content: space-between">
      <view style="display: flex;">
      <checkbox :checked="isCheckeds" @click="isChecked()" style="display: flex;align-items: center;margin: 5px 0;margin-left: 25px" />
      <div  @click="toCheckProtocol()" style="display: flex;align-items: center;font-size: 14px;">请阅读《用户协议》</div>
      </view>
      <view style="margin: 0px 20;color: #0A98D5;text-align:right;font-size: 14px;line-height: 40px;margin-right: 15px;"
            @tap="findPwd">忘记密码？
      </view>
    </view>

    <button class="submit" style="margin-top: 0px;background: #007aff;" type="primary" @tap="login">登录</button>
    <button class="submit" style="background: #007aff" type="primary" @tap="loginRegister">注册新账户</button>

  </view>
</template>
<script>
import {XXTEA} from './xxtea'
import md5 from 'js-md5'

var that
export default {
  data() {
    const isUni = typeof (uni) !== 'undefined'
    return {
      isCheckeds:true,
      showPasswordType: 'password',
      testss: 'password',
      username: '',
      // userpwd: 'Cjwsjy@ddk_%8',
      userpwd: '',
      pwdType: 'password',
      imgInfo: {
        head: isUni ? '/static/xyd.png' : require('./images/xyd.png'),
        icon_user: isUni ? '/static/icon_user.png' : require('./images/icon_user.png'),
        icon_del: isUni ? '/static/icon_del.png' : require('./images/icon_del.png'),
        icon_pwd: isUni ? '/static/icon_pwd.png' : require('./images/icon_pwd.png'),
        icon_pwd_switch:  require('./images/show.png'),
        qq: isUni ? '/static/qq.png' : require('./images/qq.png'),
        wechat: isUni ? '/static/wechat.png' : require('./images/wechat.png'),
        weibo: isUni ? '/static/weibo.png' : require('./images/weibo.png')
      }
    }
  },
  mounted() {
    that = this;
  },
  onLoad() {
    uni.setNavigationBarTitle({
      title: '小云朵'
    });
  },
  methods: {
    toCheckProtocol(){
      uni.navigateTo({
        url: '/pages/user/login/protocol'
      })
    },
    isChecked(){
      this.isCheckeds=!this.isCheckeds
    },
    showPassword() {
      this.showPasswordType = !this.showPasswordType
      if(this.showPasswordType){
        this.imgInfo.icon_pwd_switch= require('./images/show.png')
      }else {
        this.imgInfo.icon_pwd_switch=require('./images/hide.png')
      }
    },
    delUser() {
      this.username = ''
    },
    login() {
      if(!this.isCheckeds){
        uni.showToast({
          icon: 'error',
          title: '请勾选用户协议'
        });
        return false
      }
      const str = {
        accountName: this.username,
        loginWay: 1,
        verificationCode: '123456',
        password: md5(this.userpwd)
      }
      var key = "ige1B5N";
      const tempJson = JSON.stringify(str)
      var encrypt_data = XXTEA.encryptToBase64(tempJson, key);
      this.$api.user.login(encrypt_data).then(res => {
        console.log(res)
        if (res.status == 0) {

          localStorage.setItem('userData', JSON.stringify(res.data))
          localStorage.setItem('userPhone', this.username)
          uni.showToast({
            icon: 'success',
            position: 'bottom',
            title: '登录成功'
          });
          setTimeout(function () {
            uni.switchTab({
              url: '/pages/user/main/index'
            })
          }, 1000);

        } else {
          if(res.status==-109 ){
            uni.showToast({
              icon: 'error',
              position: 'bottom',
              title: '找不到账号'
            });
          } else if(res.status==-110){
            uni.showToast({
              icon: 'error',
              position: 'bottom',
              title: '密码错误'
            });
          }
          else if(res.status==-103){
            uni.showToast({
              icon: 'error',
              position: 'bottom',
              title: '账号错误'
            });
          }

        }

      })

    },
    loginRegister() {
      uni.navigateTo({
        url: '/pages/user/login/register'
      })
    },
    findPwd() {
      uni.navigateTo({
        url: '/pages/user/login/findPassword'
      })
    },
    goReg() {
      uni.navigateTo({
        url: '/pages/user/login/findPassword'
      })
    },
    thirdLogin(type) {
      console.log(type)
    }
  }
}
</script>
<style>
page {
  height: 100%;
  /*min-height: 100%;*/
  background-color: #00102A;
}
</style>
<style lang="scss" scoped>
$form-border-color: rgba(214, 214, 214, 1);
$text-color: #B6B6B6;

.page_login {
  padding: 10px;

  .input-active {
    position: relative;
    display: block;
    height: 100%;
    background: none;
    color: inherit;
    opacity: 1;
    font: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    text-align: inherit;
    text-indent: inherit;
    text-transform: inherit;
    text-shadow: inherit;
    border: none;
    width: 100%;
    height: 30px;
  }

  .input-active:focus {
    border: none;
    outline: none;
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 200 upx;
  padding-bottom: 20 upx;
  margin-top: 60px;

  .head_bg {
    //border: 1px solid #fbecf1;
    border-radius: 50px;
    width: 320px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;

    .head_inner_bg {
      border-radius: 40px;
      width: auto;
      height: auto;
      display: flex;
      //background-color: #fc2c5d;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
    }
  }
}

.app-name {
  text-align: center;
  font-size: 40 upx;
  margin-bottom: 100 upx;
}

.login_form {
  display: flex;
  margin: 60px 20px 0px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid $form-border-color;
  border-radius: 10px;

  .line {
    width: 100%;
    height: 1px;
    background-color: $form-border-color;
  }

  .input {
    width: 100%;
    max-height: 45px;
    display: flex;
    padding: 3px;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .img {
      min-width: 40px;
      min-height: 40px;
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img_del {
      width: 21px;
      height: 21px;
    }

    .img_pwd_switch {
      width: 28px;
      height: 28px;
    }

    input {
      outline: none;
      height: 30px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }
}

.submit {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  color: white;
  //background-color: rgba(252, 44, 93, 1.0);
  //-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

  &:active {
    color: #B6B6B6;
    background-color: rgba(252, 44, 93, 0.8);
  }
}

.opts {
  margin-top: 5px;
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .text {
    font-size: 13px;
    color: $text-color;
  }
}

.quick_login_line {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .line {
    height: 1px;
    width: 38%;
    background-color: rgba(211, 211, 213, 1);
  }

  .text {
    font-size: 13px;
    color: rgba(200, 200, 200, 1);
    margin: 2px;
  }
}

.quick_login_list {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .item {
    width: 50px;
    height: 50px;
    margin: 20px;
  }
}
</style>
