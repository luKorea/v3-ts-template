import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
// import qs from 'qs'
import localCache from '@/utils/cache'
import { accountLoginRequest } from '../login/login'
import { useStore } from '@/store'
import { errorTip } from '../../utils/tip-info'
const store = useStore()

const resetCookie = () => {
  ElMessageBox.prompt(
    `当前登录账号为: ${localCache.getCache('email')}, 请输入密码重新登录`,
    '登录状态过期',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputType: 'password'
    }
  )
    .then(({ value }) => {
      console.log(value, 'value')
      const data = {
        email: localCache.getCache('email'),
        pwd: value
      }
      accountLoginRequest(data).then((res) => {
        if (res.state) {
          const { token } = res
          store.commit('login/changeToken', token)
          localCache.setCache('token', token)
        } else {
          errorTip(res.msg)
          resetCookie()
        }
      })
      return data
    })
    .catch(() => {
      console.log('请求失败~, 错误信息')
    })
}

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        const data = res.data
        // return data
        if (data.result === 7) {
          resetCookie()
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        console.log(err, 'er')
        // if (err.response.status === 404) {
        //   // ElMessage.error('请求地址不存在')
        //   console.log(`.......请求地址不存在`)
        // }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    // // config.data =
    // //   config.headers['Content-Type'] ===
    // //   'application/x-www-form-urlencoded;charset=UTF-8'
    // //     ? qs.stringify(config.data)
    // //     : config.data
    // config.data = qs.stringify(config.data)
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
