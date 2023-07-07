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
          <image style="width:27px;height: 27px;" :src="imgInfo.icon_user" />
        </view>
        <input type="text" style="color: #fff;" v-model="username" placeholder="请输入手机号码">
        <view class="img">
          <image @tap="delUser" class="img_del" :src="imgInfo.icon_del" />
        </view>
      </view>
      <view class="line" />
      <view class="input">
        <view class="img">
          <image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd" />
        </view>
        <input style="color: #fff;" class="input-active"  v-model="password" :type="showPasswordType?'password':'text'"  @input="inputPwd" placeholder="请输入登录密码">
        <view class="img" >
          <image class="img_pwd_switch" @click="showPassword()" :src="imgInfo.icon_pwd_switch" />
        </view>
      </view>
      <view class="line" />
      <view class="input">
        <view class="img">
          <image style="width:30px;height: 35px;" :src="imgInfo.icon_pwd1" />
        </view>
        <input style="color: #fff;" type="text" v-model="invitationCode"  placeholder="请输入邀请码">
        <view class="img" >
          <image @tap="delUserActive" class="img_del" :src="imgInfo.icon_del" />
        </view>
      </view>
      <view class="line" />
      <view class="input">
        <view>
        <input type="text" style="color: #fff;"  v-model="verificationCode" placeholder="请输入6位输验证码">
        </view>
        <view style="display: flex;align-items: center;">
          <button  size="mini"  class="mini-btn" type="primary" @tap="login">获取验证码</button>
        </view>
      </view>
    </view>
    <view style="margin: 0px 20;color: #0A98D5;text-align:left;font-size: 14px;line-height: 45px;margin-left:20px;display: flex;align-items: center"
          @tap="findPwd">
        <checkbox :checked="isCheckeds" @click="isChecked()" style="display: flex;align-items: center;margin: 5px 0;margin-left: 10px" />
        <div  @click="toCheckProtocol()" style="display: flex;align-items: center">请阅读用户协议</div>

    </view>
    <button class="submit"  style="background: #007aff" type="primary" @tap="login">立即注册</button>
  </view>
</template>
<script>
import { XXTEA} from  './xxtea'
import md5 from 'js-md5'
import {register} from "../../../common/vmeitime-http/user";
var that
export default {
  name:'register',
  data() {
    const isUni = typeof(uni) !== 'undefined'
    return {
      isCheckeds:false,
      username: '',
      showPasswordType:'password',
      // userpwd: 'Cjwsjy@ddk_%8',
      userpwd: '',
      password:'',
      text:'text',
      verificationCode:'',
      invitationCode:'',
      pwdType: 'password',
      imgInfo: {
        head: isUni ? '/static/xyd.png' : require('./images/xyd.png'),
        icon_user: isUni ? '/static/icon_user.png' : require('./images/icon_user.png'),
        icon_del: isUni ? '/static/icon_del.png' : require('./images/icon_del.png'),
        icon_pwd: isUni ? '/static/icon_pwd.png' : require('./images/icon_pwd.png'),
        icon_pwd1: isUni ? '/static/yqm.png' : require('./images/yqm.png'),
        // icon_pwd_switch: isUni ? '/static/icon_pwd_switch.png' : require('./images/icon_pwd_switch.png'),
        icon_pwd_switch:  require('./images/show.png'),

        qq: isUni ? '/static/qq.png' : require('./images/qq.png'),
        wechat: isUni ? '/static/wechat.png' : require('./images/wechat.png'),
        weibo: isUni ? '/static/weibo.png' : require('./images/weibo.png')
      }
    }
  },

  mounted() {
    that= this;
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
    showPassword(){
      this.showPasswordType=!this.showPasswordType
      if(this.showPasswordType){
        this.imgInfo.icon_pwd_switch= require('./images/show.png')
      }else {
        this.imgInfo.icon_pwd_switch=require('./images/hide.png')
      }
    },
    inputUsername(e) {
      that.username = e.target.value
    },
    inputPwd(e) {
      that.password = e.target.value
    },
    delUser() {
      that.username = ''
    },
    delUserActive() {
      that.invitationCode = ''
    },
    switchPwd() {
      that.pwdType = that.pwdType === 'text' ? 'password' : 'text'
    },
    login() {
      const str = {
        accountName:this.username,
        invitationCode:this.invitationCode,
        verificationCode:'123456',
        password:md5(this.password)
      }
      console.log(str)
      if(!this.isCheckeds){
        uni.showToast({
          icon: 'error',
          title: '请勾选用户协议'
        });
        return false
      }
      var key = "ige1B5N";
      const tempJson=JSON.stringify(str)
      var encrypt_data = XXTEA.encryptToBase64(tempJson, key);
      this.$api.user.register(encrypt_data).then(res=>{

        if(res.status==0){
          localStorage.setItem('userData', JSON.stringify(res.data))
          localStorage.setItem('userPhone', this.username)
          // window.document.cookie=`sID=${res.data}`
          uni.showToast({
            icon: 'success',
            position: 'bottom',
            title: '注册成功'
          });
          setTimeout(function(){
            uni.switchTab({
              url:'/pages/user/main/index'
            })
          },1000);

        }else{
          uni.showToast({
            icon: 'error',
            position: 'bottom',
            title: '注册失败'
          });
        }


      })

    },
    findPwd() {
      uni.navigateTo({
        url:'/pages/user/find-pwd/find-pwd'
      })
    },
    goReg() {
      uni.navigateTo({
        url:'/pages/user/reg/reg'
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
  height: auto;
  min-height: 100%;
  background-color: #00102A;
}
</style>
<style lang="scss" scoped>
$form-border-color: rgba(214, 214, 214, 1);
$text-color: #B6B6B6;

.page_login {
  padding: 10px;
  .input-active{
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
  .input-active:focus{
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
  font-size: 40upx;
  margin-bottom: 100upx;
}

.login_form {
  display: flex;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid $form-border-color;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-top: 60px;

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
  margin-top: 0px;
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
