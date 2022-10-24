import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageSearch } from '@/hooks/use-page-search'
import localCache from '@/utils/cache'

export function useCountryList() {
  const countryList = ref<any>([])
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        if (res.data?.rows?.length > 0) {
          sessionStorage.setItem('defaultCountry', res.data.rows[0]!.id)
        }
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  return [countryList]
}

/**
 *
 * @param showAll 用来判断当前侧边栏是否需要显示全选
 * @returns
 */
export function useMapCountry(showAll = true, fn?: any) {
  const [pageContentRef, handleResetClick, handleQueryClick, pageSearchRef] =
    usePageSearch(fn)
  const [countryList] = useCountryList()
  const handleCountryList = computed(() => {
    const list = showAll
      ? [
          {
            name: '全部',
            id: -999
          },
          ...countryList.value
        ]
      : countryList.value
    return list
  })
  // 侧边国家
  const countryID = ref<any>(
    showAll ? '-999' : localCache.getSessionCache('defaultCountry')
  )
  const nodeInfo = ref<any>()
  const countryRef = ref()
  const copyQueryInfo = ref({})
  const selectItem = ref<any>()
  const selectCountryClick = (item: any) => {
    countryID.value = item.id
    handleResetBtnClick()
    // console.log('-----', copyQueryInfo.value, nodeInfo.value, countryID.value);
    // handleQueryClick({
    //   ...copyQueryInfo.value,
    //   ...nodeInfo.value,
    //   rid: countryID.value
    // })
  }
  const selectNodeClick = (item: any) => {
    nodeInfo.value = {
      ...item
    }
    handleResetBtnClick()
  }
  const selectCategoryClick = (item: any) => {
    nodeInfo.value = {
      category: item.category,
      library: 8
    }
    selectItem.value = item.category
    handleResetBtnClick()
  }
  const handleQueryBtnClick = (queryInfo: any) => {
    copyQueryInfo.value = queryInfo
    handleQueryClick({
      ...queryInfo,
      ...nodeInfo.value,
      rid: countryID.value
    })
  }
  // 刷新时重新选择第一条数据
  const handleResetBtnClick = () => {
    handleResetClick({
      currentPage: 1,
      pageSize: 10,
      rid: countryID.value,
      ...nodeInfo.value
    })
  }
  return {
    pageContentRef,
    handleCountryList,
    countryRef,
    selectCountryClick,
    handleQueryBtnClick,
    handleResetBtnClick,
    selectNodeClick,
    countryID,
    selectCategoryClick,
    selectItem,
    handleQueryClick,
    pageSearchRef
  }
}
