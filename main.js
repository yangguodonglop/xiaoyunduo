import Vue from 'vue'
import App from './App'
import store from './store/index';
// import cuCustom from './colorui/components/cu-custom.vue'
// import opCell from './components/opCell.vue'

// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.prototype.$store = store;

Vue.config.productionTip = false

// Vue.component('cu-custom',cuCustom)

// Vue.component('opCell',opCell)

Vue.prototype.$msg = (title, duration=1500, mask=false, icon='none')=>{
  //统一提示方便全局修改
  if(Boolean(title) === false){
    return;
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon
  });
}

import api from './common/vmeitime-http/index.js'
Vue.prototype.$api = api

App.mpType = 'app'

/* const app = new Vue({
    ...App
})
app.$mount() */
//runtime
const app = new Vue({
  ...App
})
app.$mount()
