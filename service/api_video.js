import request from './index'


export function getTopMV(offset = 0, limit = 10) {
  return request.get('/top/mv', { offset, limit })
}

export function getMVUrl(id) {
  return request.get('/mv/url', { id })
}


export function getMVDetail(mvid) {
  return request.get('/mv/detail', { mvid })
}

export function getMVRelateVideo(id) {
  return request.get('/related/allvideo', { id })
}