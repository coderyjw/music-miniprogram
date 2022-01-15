// pages/music-player/index.js
import { getSongDetail } from '../../service/api_player'
import { audioContext } from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentSong: {},
    durationTime: 0,

    currentPage: 0,
    contentHeight: 0,
    isMusicLyric: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取传入的id
    const id = options.id
    this.setData({ id })

    // 2.根据id获取歌曲信息
    this.getPageData(id)

     // 3.动态计算内容高度
     const globalData = getApp().globalData
     const screenHeight = globalData.screenHeight
     const statusBarHeight = globalData.statusBarHeight
     const navBarHeight = globalData.navBarHeight
     const contentHeight = screenHeight - statusBarHeight - navBarHeight
    const deviceRadio = globalData.deviceRadio
     this.setData({ contentHeight, isMusicLyric: deviceRadio >= 2  })

     // 4.使用audioContext播放歌曲
     audioContext.stop()
     audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
     audioContext.autoplay = true
  },

  // 网络请求
  getPageData: function(id) {
    getSongDetail(id).then(res => {
      this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
    })
  },

  // 事件处理
  handleSwiperChange: function(event) {
    const current = event.detail.current
    this.setData({ currentPage: current })
  },
})