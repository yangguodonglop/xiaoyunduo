<template>
 <view v-html="protocol" style="padding: 10px;color:#666"></view>
</template>
<script>
import { XXTEA} from  './xxtea'
import md5 from 'js-md5'
import {register} from "../../../common/vmeitime-http/user";
var that
export default {
  name:'register',
  data() {
    return {
      protocol:''
      }
    },
  mounted() {
    that= this;
    this.queryInfo()
  },
  methods: {
    queryInfo() {
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      this.$api.user.getAgreement().then(res => {
        console.log(res)
        this.protocol = res.replace(/\n/g, '<br>')
        uni.hideLoading()

      })
    },
  }
}
</script>
<style>
page {
  height: auto;
  min-height: 100%;
  background-color: #f5f6f8;
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
    width: 224px;
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
  padding-top: 200upx;
  padding-bottom: 20upx;

  .head_bg {
    border: 1px solid #fbecf1;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .head_inner_bg {
      border-radius: 40px;
      width: 80px;
      height: 80px;
      display: flex;
      background-color: #fc2c5d;
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
      height: 12px;
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
  background-color: rgba(252, 44, 93, 1.0);
  -webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

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
