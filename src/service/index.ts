/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:34
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-15 16:15:00
 * @Description: 这里导出统一接口请求方式
 * @FilePath: /pofi-admin/src/service/index.ts
 */
// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import qs from 'qs'

// import localCache from '@/utils/cache'
import { useExpirationTime } from '@/hooks/use-expiration-time'
import { useRouter } from 'vue-router'

const route = useRouter()

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      useExpirationTime(route)
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = qs.stringify(config.data)
      // 携带token的拦截
      // const token = localCache.getCache('token')
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    }
    // requestInterceptorCatch: (err) => {
    //   return err
    // },
    // responseInterceptor: (res) => {
    //   return res
    // },
    // responseInterceptorCatch: (err) => {
    //   console.log(err, '返回错误')
    //   return err
    // }
  }
})
export const hyRequestJSON = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      useExpirationTime(route)
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      return config
    }
  }
})
export const hyRequestExportData = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      config.responseType = 'blob'
      return config
    }
  }
})
export const hyRequestFormData = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      useExpirationTime(route)
      config.headers['Content-Type'] = 'multipart/form-data'
      return config
    }
  }
})

export default hyRequest
