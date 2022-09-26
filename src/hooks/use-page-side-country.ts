import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageSearch } from '@/hooks/use-page-search'

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
  const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch(fn)
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
  const countryID = ref<any>(-999)
  const nodeInfo = ref<any>()
  const countryRef = ref()
  const copyQueryInfo = ref({})
  const selectItem = ref<any>()
  const selectCountryClick = (item: any) => {
    countryID.value = item.id
    handleQueryClick({
      ...copyQueryInfo.value,
      ...nodeInfo.value,
      rid: countryID.value
    })
  }
  const selectNodeClick = (item: any) => {
    nodeInfo.value = {
      ...item
    }
    handleQueryClick({
      ...copyQueryInfo.value,
      ...nodeInfo.value,
      rid: countryID.value
    })
  }
  const selectCategoryClick = (item: any) => {
    nodeInfo.value = {
      category: item.category,
      library: 8
    }
    selectItem.value = item.category
    handleQueryClick({
      ...copyQueryInfo.value,
      ...nodeInfo.value,
      rid: countryID.value
    })
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
    countryRef.value.currentIndex = 0
    countryID.value = showAll ? '-999' : countryList.value[0].id
    nodeInfo.value = {}
    handleResetClick()
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
    handleQueryClick
  }
}
