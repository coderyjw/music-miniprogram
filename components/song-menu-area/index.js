// components/song-menu-area/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌单"
    },
    songMenu: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMenuItemClick: function(event) {
      const item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${item.id}&type=menu`,
      })
    },
    handleMoreClick: function(e) {
      let type
      if(this.data.title === '热门歌单') {
        type = 'hot'
      } else if(this.data.title === '推荐歌单') {
        type = 'recommend'
      }
      wx.navigateTo({
        url: `/pages/songs-list/index?type=${type}`,
      })
    }
  }
})
