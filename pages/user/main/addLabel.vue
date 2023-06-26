<template>
  <div>
    <view class="labels">
      <view style="margin-left: 10px">标签：</view>
      <!--      <view v-if="tags.length==0">暂无标签</view>-->
      <view v-if="tags.length>0" style="display: flex;flex-wrap: wrap;margin-left: 5px;">
        <view style="margin-left: 5px; margin-top: 4px;margin-bottom: 4px; position: relative;"
              v-for="(tag, index) in tags" :key="index">
          <text
              :class="[tag.active ? 'active' : '']"
              style="border: 1px solid rgb(237 13 13); border-radius: 16px; padding: 1px 16px 1px 12px; position: relative;"
          >
            {{ tag.name }}
            <view style="position: absolute; top: 4px; right: 4px; font-size: 12px; cursor: pointer;"
                  @click.stop="removeTag(index)">
              X
            </view>
          </text>
        </view>
      </view>
      <text style="margin-left: 10px" class="button-text " @click="addLabel()">新增标签</text>
      <text style="margin-left: 10px" class="button-text button-text-active" @click="addSave()">确认保存</text>
    </view>
    <view v-if="showAddTagDialog" class="add-tag-dialog">
      <view class="dialog-container">
        <view class="dialog-header">新增标签</view>
        <view class="dialog-body">
          <input type="text" v-model="newTags" placeholder="请输入标签名称"/>
        </view>
        <view class="dialog-footer">
          <button class="confirm-button" @click="onOk">确认</button>
          <button class="cancel-button" @click="showAddTagDialog = false">取消</button>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "addLabel",
  data() {
    return {
      tags: [
        // {name: "标签1", active: false},
        // {name: "标签2", active: false},
        // {name: "标签3", active: false}
      ],
      labelArray: [],
      newTags: '',
      showAddTagDialog: false, // 控制弹窗的显示和隐藏

    }
  },
  onShow() {
    this.queryLabel()
    // this.queryVisitTotalInfo()
  },
  methods: {
    addLabel() {
      if (this.tags.length >= 10) {
        uni.showToast({
          icon: 'error',
          position: 'bottom',
          title: '最多添加10个标签'
        });
        return false
      }
      this.newTags = ''
      this.showAddTagDialog = true;
      console.log(this.tags.length)
    },
    addSave() {
      uni.showLoading({
        title: '保存中',
        mask: true // 是否显示遮罩层
      })
      const arr = []
      this.labelArray.forEach((item) => {
        arr.push(item)
      })
      const param = {
        labelName: arr
      }
      this.$api.user.putLabel(param).then(res => {
        console.log(res)
        if (res.status == 0) {
          uni.hideLoading()
          // this.queryLabel()
          uni.navigateTo({
            url: '/pages/user/main/indexAdd'
          })
        } else {
        }
      })
    },
    queryLabel() {
      this.$api.user.getLabel().then(res => {
        if (res.status == 0) {
          this.tags = []
          this.labelArray = []
          res.data.forEach((item) => {
            const obj = {
              name: item,
              active: false
            }
            this.tags.push(obj)
            this.labelArray.push(item)
          })
        } else {
        }

      })
    },
    onOk() {
      if (this.newTags == '') {
        uni.showToast({
          icon: 'error',
          position: 'bottom',
          title: '标签不能为空'
        });
        return false
      }
      const obj = {
        name: this.newTags,
        active: false
      }
      const tempArr = JSON.parse(JSON.stringify(this.labelArray))
      if (tempArr.includes(this.newTags)) {
        uni.showToast({
          icon: 'error',
          position: 'bottom',
          title: '标签不能重复'
        });
        return false
      }
      this.labelArray.push(this.newTags)
      this.tags.push(obj)
      // 将新标签添加到tags数组中
      // const newTags = this.newTags.split(",").map(tag => tag.trim());
      // console.log(newTags)
      // this.labels=newTags
      // this.tags = [...this.tags, ...newTags];
      // // 隐藏弹窗
      this.showAddTagDialog = false;
      // // 清空输入框
      // this.newTags = "";
      // this.addLabels()
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.labelArray.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
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

.labels {
  //line-height: 40px;
  //display: flex;
  //align-items: center;
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

  &.button-text-active {
    background: #0A98D5;
  }
}
</style>
