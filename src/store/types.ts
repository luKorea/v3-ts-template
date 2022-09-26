/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-11 13:51:00
 * @Description: file content
 * @FilePath: /pofi-admin/src/store/types.ts
 */
import { ILoginState } from './login/types'
import { IRouterState } from './main/system/router/types'
import { IRoleState } from './main/system/role/types'
import { IPermissionState } from './main/system/permission/types'
import { IUserState } from './main/system/user/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
  tagsList: any[]
}

export interface IRootWithModule {
  login: ILoginState
  // 系统管理
  oaRouterModule: IRouterState
  oaUserModule: IUserState
  oaPermissionModule: IPermissionState
  oaRoleModule: IRoleState
}

export type IStoreType = IRootState & IRootWithModule
