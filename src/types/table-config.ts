/*
 * @Author: korealu
 * @Date: 2022-02-16 09:31:21
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-18 17:23:51
 * @Description: file content
 * @FilePath: /pofi-admin/src/types/table-config.ts
 */

import { PermissionType } from '@/types/permission'

export interface TableConfig {
  title?: string
  propList: any[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  showSummary?: boolean // 是否显示合计行
  summaryTextPosition?: string // 合计行显示名称位置
  sumText?: string // 合计行显示名称
  propertyList?: any[] // 需要合并的字段
  showFooter?: boolean
  permission?: PermissionType
  handleDraw?: boolean
  childrenProps?: any
  isEdit?: boolean
  editInfo?: any
}
