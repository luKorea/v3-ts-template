/*
 * @Author: korealu
 * @Date: 2022-02-09 17:34:25
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-26 14:20:09
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/language/config/content.config.ts
 */

import { TableConfig } from '@/types/table-config'
export const contentTableConfig: TableConfig = {
  title: '历史记录',
  propList: [
    { prop: 'id', label: '编号' },
    { prop: 'date', label: '日期' },
    { prop: 'version', label: '版本号' }
  ],
  childrenProps: {
    rowKey: 'id'
  },
  showIndexColumn: false,
  showSelectColumn: false,
  permission: {
    add: false,
    update: false,
    delete: false,
    drawTable: false
  }
}
