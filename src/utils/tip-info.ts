/*
 * @Author: korealu
 * @Date: 2022-02-14 09:33:54
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-12 10:40:59
 * @Description: 封装公用文字提示
 * @FilePath: /pofi-admin/src/utils/tip-info.ts
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/lib/el-message/src/types'
export const infoTip = (message = '操作失败', duration = 1000) => {
  ElMessage({
    message: message,
    type: 'info',
    duration
  })
}
export const errorTip = (message = '操作失败', duration = 1000) => {
  ElMessage({
    message: message,
    type: 'error',
    duration
  })
}

export const warnTip = (message = '操作失败', duration = 1000) => {
  ElMessage({
    message: message,
    type: 'warning',
    duration
  })
}

export const successTip = (message = '操作成功', duration = 1000) => {
  ElMessage({
    message: message,
    type: 'success',
    duration
  })
}

interface MessageInfo {
  message: string
  title: string
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
  iconType?: MessageType
}

export const infoTipBox = (info: MessageInfo) => {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox.confirm(info.message, info.title, {
      confirmButtonText: info.confirmButtonText ?? '确定',
      cancelButtonText: info.cancelButtonText ?? '取消',
      type: info.iconType ?? 'warning',
      closeOnClickModal: true,
      closeOnPressEscape: false,
      showClose: false,
      distinguishCancelAndClose: true,
      showCancelButton: info.showCancelButton ?? true
    })
      .then(() => resolve())
      .catch((action: any) => reject(action))
  })
}
