const BASE_URL = 'http://123.207.32.32:9001'

class Request {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data: params,
        success: function(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, parmas) {
    return this.request(url, 'GET', parmas)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}

const request = new Request()

export default request


