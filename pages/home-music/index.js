// pages/home-music/idnex.js
import { getBanner } from '../../service/api_music'
import queryRect from '../../utils/query-select'
import throttle from '../../utils/throttle'

import { rankingStore } from '../../store/index'

const throttleQueryRect = throttle(queryRect, 1000)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    bannerList: [],
    swiperHeight: 0,
    recommendSongs: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()

    // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享的数据
    rankingStore.onState("hotRanking", (res) => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })
  },

  getPageData() {
    getBanner(2).then(res => {
      this.setData({
        bannerList: res.banners
      })
    })
  },
  handleSearchClick(e) {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  hanldeImageLoad() {
    // 获取图片高度
    throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height }) 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})