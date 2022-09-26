/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-26 14:38:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-modal.ts
 */
import { ref } from 'vue'
import PageForm from '@/components/page-form'

type CallbackFn = (item?: any) => void

export function usePageForm(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageFormRef = ref<InstanceType<typeof PageForm>>()
  const defaultInfo = ref({})
  const handleNewData = (item: any, other = false) => {
    // 修改新增函数执行顺序, other参数控制用户点击新增时是否传递参数，默认不传递
    newCb && newCb(item)
    if (other) {
      console.log(item, 'item')
      defaultInfo.value = { ...item }
    } else defaultInfo.value = {}
    if (pageFormRef.value) {
      pageFormRef.value.dialogVisible = true
    }
  }
  const handleEditData = (item: any) => {
    editCb && editCb(item)
    defaultInfo.value = { ...item }
    if (pageFormRef.value) {
      pageFormRef.value.dialogVisible = true
    }
  }
  return [pageFormRef, defaultInfo, handleNewData, handleEditData] as const
}
