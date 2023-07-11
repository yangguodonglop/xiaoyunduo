<template>
  <view>
    <div class="container" v-if="imageList.length>=1">
      <div class="item" v-for="item in imageList">
        <uni-icons class="icon-item" color="red" type="close" size="25" @click="deleteImg(item['id'])"></uni-icons>

        <video class="img_pwd_switch girl-img" v-if="item.suffix=='.mp4' && !item.suffixShow " id="myVideo" :src="`${item.showURL}.mp4`"  controls style="width: 100%;"></video>
        <video class="img_pwd_switch girl-img" v-if="item.suffix=='.mp4' && item.suffixShow " id="myVideo" :src="`${item.showURL}`"  controls style="width: 100%;"></video>
        <image class="img_pwd_switch girl-img" v-if="item.suffix!=='.mp4'" :src="item.showURL"/>
      </div>


    </div>
    <view style="display: flex;justify-content: center;align-items: center;height: 40px;width: 96%;"  v-if="imageList.length==0">暂无图片</view>

    <view class="img-describe">
      <view class="uni-textarea">
                <textarea placeholder="请输入描述" v-model="value" @confirm="handleConfirm"
                          style="border: 1px solid rgba(0,0,0,.2);width: 100%;font-size: 14px;padding-top: 10px"/>
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

    <view>
      <button @click="chooseImages">选择文件</button>
      <button @click="uploadImages">保存</button>
    </view>


  </view>

</template>

<script>
import store from '@/store/index';
import axios from 'axios'
import {fi} from "date-fns/locale";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {baseUrl} from "../../../common/vmeitime-http/user";

export default {
  name: "index",
  components: {UniIcons},
  data() {
    return {
      imageList: [],
      imageListActive: [],
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
      imgInfoList: [],
      groupId:'',
      uploadType:true,
      tags: [
        { name: "标签1", active: false },
        { name: "标签2", active: false },
        { name: "标签3", active: false }
      ],
    labels:[]

  }
  },
  // mounted() {
  //
  //   this.imgInfoList = JSON.parse(localStorage.getItem('imgInfo'))
  //   console.log(this.imgInfoList)
  //   this.value = this.imgInfoList['describe']
  //   this.groupId= this.imgInfoList['id']
  //   this.imgInfoList['objs'].map((item, index) => {
  //     item['id'] = index + 1
  //   })
  //   this.imageList = this.imgInfoList['objs']
  //   this.labels=this.imgInfoList['labels']
  //   this.queryLabel
  //
  // },
  onShow(){
    this.imgInfoList = JSON.parse(localStorage.getItem('imgInfo'))
    console.log(this.imgInfoList)
    this.value = this.imgInfoList['describe']
    this.groupId= this.imgInfoList['id']
    this.imgInfoList['objs'].map((item, index) => {
      item['id'] = index + 1
    })
    this.imageList = this.imgInfoList['objs']
    this.labels=this.imgInfoList['labels']
    this.totalArr=[]
    this.queryLabel()

  },
  methods: {
    toggleTag(index) {
      this.tags[index].active = !this.tags[index].active;
    },
    closePopup() {
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.close()
    },
    open() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
    deleteImg(id){
      console.log(id)
      const index = this.imageList.findIndex(person => person.id === id);
      if (index !== -1) {
        this.imageList.splice(index, 1);
      }
      console.log(this.imageList)
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
    async chooseImages() {
      this.uploadType=false
      try {
        const [error, res] = await uni.chooseFile({
          count: 9,
        });
        if (error) {
          console.log(error);
        } else if (res.tempFiles && res.tempFiles.length > 0) {

          res.tempFiles.map((item)=>{
            console.log(item)
            this.imageList.push(item)
          })
          const uniqueArr = [...new Set(this.imageList)]
          const tempArr=[]
          console.log("****")
          console.log(uniqueArr)
          uniqueArr.map((item,index)=>{
            console.log(item)
            let obj={
              id:'',
              showURL:'',
              url:'',
              name:'',
              suffix:'',
              suffixShow:''
            }
            if(item['id']){
              obj.id=item['id']
              obj.showURL=item['showURL']
              obj.url=item['url']
              obj.suffix=item['suffix']
              obj.suffixShow='local'
            }else{
              obj.id=index+1
              obj.showURL=item['path']
              obj.url=''
              obj.name=item['name']
              console.log(item.type)
              if(item.type=='video/mp4'){
                obj.suffix=".mp4"
                obj.suffixShow='online'
              }else{
                obj.suffix=".webp"

              }
            }
            tempArr.push(obj)
          })
          this.imageList=[]
          this.imageList=tempArr
          console.log(this.imageList)
          console.log(this.tags)
          const tempArray=[]
          this.tags.forEach((item)=>{
            if(item['active']){
              tempArray.push(item['name'])
            }
          })
          console.log(tempArray)
          const formData = new FormData();
          for (let i = 0; i < this.imageList.length; i++) {
            console.log(this.imageList[i]['url'])
            if( this.imageList[i]['url']==='' || !this.imageList[i]['url']){
               console.log("&&&")
              const file = this.imageList[i];
              console.log(file)
              const blob = await this.getBlobFromUrl(file.showURL);
              formData.append(`item_${i}`, blob,file.name);
            }
            else{
              console.log("&&&")
              formData.append(`item_${i}`, this.imageList[i]['url']);
            }

          }
          formData.append('groupID', this.groupId)
          formData.append('describe', this.value)
          formData.append('labels',JSON.stringify(tempArray))

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
      const tempArray=[]
      this.tags.forEach((item)=>{
        if(item['active']){
          tempArray.push(item['name'])
        }
      })
      console.log(tempArray)
      // return false

      if(this.uploadType){
        const tempArr=[]
        this.imageList.map((item,index)=>{
          console.log(item)
          let obj={
            id:'',
            showURL:'',
            url:'',
            name:''
          }
          if(item['id']){
            obj.id=item['id']
            obj.showURL=item['showURL']
            obj.url=item['url']
            obj.suffix=item['suffix']

          }else{
            obj.id=index+1
            obj.showURL=item['path']
            obj.url=''
            obj.name=item['name']
          }
          tempArr.push(obj)
        })
        this.imageList=[]
        this.imageList=tempArr
        const formData = new FormData();
        for (let i = 0; i < this.imageList.length; i++) {
          console.log(this.imageList[i])
          if( this.imageList[i]['url']==='' || !this.imageList[i]['url']){
            const file = this.imageList[i];
            const blob = await this.getBlobFromUrl(file.showURL);
            formData.append(`item_${i}`, blob,file.name);
          }
          else{
            formData.append(`item_${i}`, this.imageList[i]['url']);
          }

        }
        formData.append('groupID', this.groupId)
        formData.append('describe', this.value)
        formData.append('labels',JSON.stringify(tempArray))
        this.formData = formData;
      }
      uni.showLoading({
        title: '加载中',
        mask: true // 是否显示遮罩层
      })
      try {
        const url=baseUrl+'/personal_collection/myCollection/putItem'

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
            // uni.showToast({
            //   icon: 'error',
            //   position: 'bottom',
            //   title: '上传成功'
            // });
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
    handleConfirm(event){
      console.log(event)

    },
    queryLabel(){
      console.log(this.labels)
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

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 600px; /* 设置容器最大宽度 */
  height: auto;
  overflow: hidden;
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

.item:nth-child(3n+1) {
  // margin-right: 20px; /* 设置每行最后一个元素的右侧间距 */
}

.item:nth-child(n+7) {
  display: none; /* 隐藏第二行的第六个元素 */
}
.img-describe {
  text-indent: 20px;
  color: #8f939c;
  font-size: 14px;
  padding: 5px;
  margin-bottom: 5px;
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
.active {
  background-color: green;
  padding: 2px;
  color: #fff;
}
 .girl-img{
  width: 100%;
  height: 100%;
}
</style>
