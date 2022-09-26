/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-29 18:37:36
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-search.ts
 */
import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch(fn?: any) {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => pageContentRef.value?.getPageData()
  const handleQueryClick = (queryInfo: any) => {
    if (fn) {
      fn()
    } else pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleQueryClick] as const
}
