/*
 * @Author: korealu
 * @Date: 2022-02-22 14:38:21
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-12 10:16:13
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/exportExcel.ts
 */
// exportToExcel.ts
import * as XLSX from 'xlsx'
import { showLoading, hideLoading } from '@/utils'
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'
console.log(EXCEL_EXTENSION, EXCEL_TYPE)
export class ExcelService {
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}-${new Date().getTime()}.xlsx`
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    showLoading(`${excelFileName} 文件导出中，请稍等`)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    }
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName))
    hideLoading()
  }
}

/**
 * @desc 下载Excel文件
 * @param data {any}
 * @param name {string}
 * @param type {string} 根据type来决定是否创建blob
 * @returns
 */
export const downloadExcel = (data: any, name: string, type = 'blob') => {
  return new Promise((resolve, reject) => {
    if (data) {
      const dateTime = Date.now()
      const url =
        type === 'blob'
          ? window.URL.createObjectURL(
              new Blob([data], {
                type: EXCEL_TYPE
              })
            )
          : data
      console.log(data, 'url', url)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      const fileName = name + '-' + dateTime + '.xlsx'
      console.log(fileName)
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      type === 'blob' && window.URL.revokeObjectURL(link.href)
      resolve('success')
    } else reject('no data')
  })
}
