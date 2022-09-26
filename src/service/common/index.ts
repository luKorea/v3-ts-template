/*
 * @Author: korealu
 * @Date: 2022-02-11 10:36:34
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-12 11:32:16
 * @Description: 下拉列表数据统一获取
 * @FilePath: /pofi-admin/src/service/common/index.ts
 */
import hyRequest from '../index'
import { commonAPI } from './item-api'
// 公用API获取不同下拉列表。存在的暂时不修改，后续再统一修改
export function getCommonSelectList(
  type: string,
  data?: any,
  showLoading = false
) {
  return hyRequest.post<any>({
    url: (commonAPI as any)[type],
    data: data,
    showLoading: showLoading
  })
}
// 获取所有地区数据
export function getCountrySelectList() {
  return hyRequest.post<any>({
    url: commonAPI.country,
    showLoading: false
  })
}
// 获取所有分组(配置管理中需要)
export function getBaseConfigGroupList() {
  return hyRequest.post<any>({
    url: commonAPI.group,
    showLoading: false
  })
}

// 获取所有路由列表
export function getRouterSelectList() {
  return hyRequest.post<any>({
    url: commonAPI.router,
    showLoading: false
  })
}

// 获取所有角色路由列表
export function getRouterTreeList() {
  return hyRequest.post<any>({
    url: commonAPI.routers,
    showLoading: false
  })
}

// 获取系统角色列表
export function getRolesList() {
  return hyRequest.post<any>({
    url: commonAPI.role,
    showLoading: false
  })
}
