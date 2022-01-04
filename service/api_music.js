import request from './index'

/**
 * 获取轮播图
 * @param {0: pc, 1: android, 2: iphone, 3: ipad} type 
 */
export function getBanner(type) {
  return request.get('/banner', { type })
}

/**
 * 获取歌曲排行
 * @param {idx} idx 
 */
export function getRankings(idx) {
  return request.get("/top/list", {
    idx
  })
}

// cat -> category 类别
export function getSongMenu(cat="全部", limit=6, offset=0) {
  return request.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}


