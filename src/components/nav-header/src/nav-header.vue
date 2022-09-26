<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:45
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 15:46:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/nav-header/src/nav-header.vue
-->
<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <div class="hg-flex hg-align-center">
        <span class="hg-mr-3"> {{ envName }}</span>
        <el-tag
          type="danger"
          plain
          size="small"
          style="cursor: pointer"
          @click="showPageLog"
        >
          当前版本号: {{ currentVersion }}
          <i class="el-icon-info"> </i>
        </el-tag>
      </div>
      <!--      <hy-breadcrumb :breadcrumbs="breadcrumbs" />-->
      <user-info />
    </div>
  </div>
  <page-dialog ref="pageLogRef" title="版本更新记录" showWidth="40%">
    <el-table
      :data="dataList"
      :border="true"
      style="width: 100%"
      max-height="600px"
      :row-key="getKey"
      :indent="8"
      :expand-row-keys="showRow"
    >
      <el-table-column type="expand" label="内容" width="60px">
        <template #default="{ row }">
          <!-- {{ row.content }} -->
          <template v-for="(item, index) in row.content" :key="index">
            <div style="font-size: 16px; font-bold: 700">
              {{ item }}
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="记录标识" prop="id" align="center" />
      <el-table-column label="日期" prop="createTime" align="center" />
      <el-table-column label="版本号" prop="version" align="center" />
    </el-table>
    <div class="footer">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 40, 60, 80, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
      >
      </el-pagination> -->
      <page-pagination
        :page="page"
        :listCount="listCount"
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
      ></page-pagination>
    </div>
  </page-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
// import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { getLogList } from '@/service/main/log'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { handleChangeEnv } from '@/utils'
import { versionList } from '@/utils/log'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  components: {
    UserInfo
    // HyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const envName = computed(() => {
      return handleChangeEnv(store.state.login.userInfo.env).title
    })
    document.title = envName.value
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    // 显示版本信息
    const pageLogRef = ref<any>()
    const showPageLog = () => {
      if (pageLogRef.value) {
        pageLogRef.value.dialogVisible = true
        getData(page.value)
      }
    }
    // 分页操作
    const page = ref<any>({
      currentPage: 1,
      pageSize: 10
    })
    const dataList = ref<any>([])
    const listCount = ref<number>(0)
    const showRow = ref<any>([])
    const currentVersion = ref<any>()
    const getData = (pageInfo: any) => {
      // dataList.value = []
      getLogList(pageInfo).then((res) => {
        if (!res.result) {
          if (res.data?.rows?.length > 0) {
            let id = res.data.rows[0].id
            currentVersion.value = res.data.rows[0].version
            showRow.value.push(id)
            console.log(id, showRow.value, res.data.rows)
            dataList.value = res.data.rows.map((item: any) => {
              return {
                ...item,
                content: item.content.split('\r\n')
              }
            })
          }
          listCount.value = res.data.total
        } else errorTip(res.msg)
      })
    }
    getData(page.value)
    const handleCurrentChange = (data: any) => getData(data)
    const handleSizeChange = (data: any) => getData(data)
    const getKey = (row: any) => row.id
    return {
      getKey,
      showRow,
      page,
      listCount,
      dataList,
      handleCurrentChange,
      handleSizeChange,
      isFold,
      handleFoldClick,
      breadcrumbs,
      envName,
      currentVersion,
      pageLogRef,
      showPageLog,
      versionList
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
