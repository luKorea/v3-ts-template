import hyRequest from '../index'

//  获取oss凭证
export const getOssToken = (paramData: any) => {
  return hyRequest.post<any>({
    url: '/cms/oss/file/getToken',
    data: { ossType: paramData },
    showLoading: false
  })
}

//获取上传地址
export const getVideoAddressToken = (data: any) => {
  return hyRequest.post<any>({
    url: '/cms/oss/video/getAuth',
    params: data,
    showLoading: false
  })
}

// 获取阿里云视频token
export const getVideoToken = () => {
  return hyRequest.post<any>({
    url: '/cms/oss/video/getToken',
    showLoading: false
  })
}
