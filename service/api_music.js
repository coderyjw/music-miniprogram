import request from './index'

/**
 * 获取轮播图
 * @param {0: pc, 1: android, 2: iphone, 3: ipad} type 
 */
export function getBanner(type) {
  return request.get('/banner', { type })
}

export function getRankings(idx) {
  return request.get("/top/list", {
    idx
  })
}

