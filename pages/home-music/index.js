// pages/home-music/idnex.js
import { getBanner } from '../../service/api_music'
import querySelect from '../../utils/query-select'
import throttle from '../../utils/throttle'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    bannerList: [],
    swiperHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
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

  hanldeImageLoad: throttle(function() {
    // 获取图片高度
    querySelect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height }) 
      console.log(rect.height)
    })
  }),
  // hanldeImageLoad: function() {
  //   // 获取图片高度
  //   querySelect('.swiper-image').then(res => {
  //     const rect = res[0]
  //     this.setData({ swiperHeight: rect.height }) 
  //     console.log(123)
  //   })
  // },

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