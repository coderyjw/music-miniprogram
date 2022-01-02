// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore:true // 是否还有更多的数据
  },

  async getTopMVData(offset = 0) {
    try {
      if(!this.data.hasMore && offset !== 0) return

      wx.showNavigationBarLoading()
      const res = await getTopMV(offset)
      let newData
      if(offset === 0) {
        newData = res.data
      } else {
        newData = [...this.data.topMVs, ...res.data]
      }
      this.setData({
        topMVs: newData,
        hasMore: res.hasMore
      })

      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()

    } catch(err) {
      console.log(err)
    }
  },

  handleVideoItemClick(e) {
    const id  = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getTopMVData(0)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    this.getTopMVData(this.data.topMVs.length)
  },
})