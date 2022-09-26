/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-31 16:07:19
 * @Description: file content
 * @FilePath: /pofi-admin/src/main.ts
 */
import { createApp } from 'vue'
import { globalRegister } from './global'

// import './lib/aliyun-upload-sdk/aliyun-upload-sdk-1.5.3.min'

import 'normalize.css'
import 'animate.css'
import './assets/css/index.less'
import './index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

import vcolorpicker from 'vcolorpicker'
const app = createApp(App)
app.use(vcolorpicker)

//兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
  FileReader.prototype.readAsBinaryString = function (fileData) {
    let binary = ''
    const pt = this as any
    const reader = new FileReader()
    reader.onload = function (e) {
      const bytes = new Uint8Array(reader.result as any)
      const length = bytes.byteLength
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      //pt.result  - readonly so assign binary
      pt.content = binary
      pt.onload()
    }
    reader.readAsArrayBuffer(fileData)
  }
}

// 注册element-plus/其他
app.use(globalRegister)
app.use(store)
setupStore()
// path: /user => user
app.use(router)

app.mount('#app')
