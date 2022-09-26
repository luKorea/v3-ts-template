import hyRequest from '@/service'

// 获取历史记录
export function getLogList(data: any) {
  return hyRequest.post<any>({
    url: '/cms/version/record/getRecords',
    data: data
  })
}
