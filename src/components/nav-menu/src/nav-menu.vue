<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-04-20 09:33:38
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-13 09:42:34
 * @FilePath: /pofi-admin-private/src/components/nav-menu/src/nav-menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="nav-menu">
    <div class="logo" v-if="!collapse">
      <el-input
        v-model="searchValue"
        placeholder="请输入路由名称"
        clearable
        size="mini"
        prefix-icon="el-icon-search"
      ></el-input>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
    >
      <nav-menu-item
        :menuList="filterTableData"
        :defaultValue="defaultValue"
      ></nav-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
import navMenuItem from './nav-menu-item.vue'

export default defineComponent({
  components: {
    navMenuItem
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore()
    const searchValue = ref<any>('')
    const userMenus = computed(() => store.state.login.userMenus)
    const currentEnv = computed(() => store.state.login.userInfo.env)
    // route
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    const expandRow = ref<any>([])
    // 目前只做树形搜索
    const filterTableData = computed(() => {
      if (searchValue.value !== '') {
        setExpandRow(userMenus.value)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        expandRow.value = expandRow.value.join(',').split(',')
        return handleTreeData(userMenus.value, searchValue.value)
      } else {
        return userMenus.value
      }
    })
    //  树形表格过滤
    const handleTreeData = (treeData: any, searchValue: any): any => {
      if (!treeData || treeData.length === 0) {
        return []
      }
      const array = []
      for (let i = 0; i < treeData.length; i += 1) {
        let match: any = false
        for (let pro in treeData[i]) {
          if (typeof treeData[i][pro] == 'string') {
            match |= treeData[i][pro].includes(searchValue)
            if (match) break
          }
        }
        if (
          handleTreeData(treeData[i].children, searchValue).length > 0 ||
          match
        ) {
          array.push({
            ...treeData[i],
            children: handleTreeData(treeData[i].children, searchValue)
          })
        }
      }
      return array
    }
    // 将过滤好的树形数据展开
    const setExpandRow = (handleTreeData: any) => {
      if (handleTreeData.length) {
        for (let i of handleTreeData) {
          expandRow.value.push(i.id)
          if (i.children.length) {
            setExpandRow(i.children)
          }
        }
      }
    }
    return {
      filterTableData,
      searchValue,
      userMenus,
      defaultValue,
      currentEnv
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  .logo {
    display: flex;
    height: 40px;
    line-height: 40px;
    // padding: 4px;
    margin: 4px;
    // padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
