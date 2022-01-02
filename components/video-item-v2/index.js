// components/video-item-v2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickItem() {
      wx.navigateTo({
        url: '/pages/detail-video/index?id=' + this.data.item.vid,
      })
      console.log(this.data.item)
    }
  }
})
