/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:48
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-15 15:27:44
 * @Description:  这里封装CRUD公用查询函数
 * @FilePath: /pofi-admin/src/service/common-api.ts
 */
import hyRequest, { hyRequestJSON } from '@/service/index'

// 获取表格数据
export function getPageListData(
  url: string,
  queryInfo: any,
  showLoading = true
) {
  return hyRequest.post<any>({
    url: url,
    data: queryInfo,
    showLoading
  })
}

// 删除数据，使用地址栏参数
export function deletePageData(url: string, id: any) {
  return hyRequest.post<any>({
    url: url + '/' + id
  })
}

export function deleteQueryPageData(url: string, params: any) {
  return hyRequest.post<any>({
    url: url,
    params
  })
}

// 删除数据，使用query参数
export function deletePageToQueryData(url: string, data: any) {
  return hyRequest.post<any>({
    url: url,
    data: data
  })
}

//新增数据
export function createPageData(url: string, newData: any) {
  return hyRequest.post<any>({
    url: url,
    data: newData
  })
}

// 编辑数据
export function editPageDataJSON(url: string, editData: any) {
  return hyRequestJSON.post<any>({
    url: url,
    data: editData
  })
}
//新增数据
export function createPageDataJSON(url: string, newData: any) {
  return hyRequestJSON.post<any>({
    url: url,
    data: newData
  })
}

// 编辑数据
export function editPageData(url: string, editData: any) {
  return hyRequest.post<any>({
    url: url,
    data: editData
  })
}
// 排序列表
export function sortPageTableData(url: string, sortData: any) {
  return hyRequest.post<any>({
    url: url,
    data: sortData,
    showLoading: false
  })
}

// 获取单行数据
export const getItemData = (url: string, data: any) => {
  return hyRequest.post<any>({
    url: url,
    data: data,
    showLoading: true
  })
}

export const deleteItemData = (url: string, data: any) => {
  return hyRequest.post({
    url: url,
    data: data,
    showLoading: false
  })
}
