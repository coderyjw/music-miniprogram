// pages/songs-list/index.js

import { getHotSongsType, getSongMenu } from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songMenuList: [],
    limit: 10,
    offset: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      type: options.type
    })
    if(this.data.type === 'hot') {
      this.getHotSongsData()
    } else if(this.data.type === 'recommend') {
      this.getRecommendSongsData()
    }
    
  },

  async getHotSongsData() {
    const res = await getHotSongsType()
      const hotSongsTypes = res.tags.filter(v => v.name !== '华语')
      const songMenuList = await Promise.all(hotSongsTypes.map(v => getSongMenu(v.name,  this.data.limit)))
      this.setData({
        songMenuList
      })
  },
  async getRecommendSongsData() {
    const res = await getSongMenu('华语', this.data.limit, this.data.offset)
    this.setData({
      offset: this.data.offset + this.data.limit
    })
    if(this.data.songMenuList.length === 0) {
      this.setData({
        songMenuList: [res]
      })
    } else if(this.data.songMenuList.length === 1) {
      const songMenuList = this.data.songMenuList
      songMenuList[0].playlists.push(...res.playlists)
      this.setData({
        songMenuList
      })
    }
  },

  handleMenuItemClick: function(event) {
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${item.id}&type=menu`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    this.setData({
      offset: 0,
      songMenuList: []
    })
    wx.showNavigationBarLoading()
    if(this.data.type === 'hot') {
      this.getHotSongsData()
    } else if(this.data.type === 'recommend') {
      this.getRecommendSongsData()
    }
    wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:  async function () {
    if(this.data.type === 'recommend') {
      this.getRecommendSongsData()
    }
  },
})