<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:45
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 11:31:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-search/src/page-search.vue
-->
<template>
  <el-card>
    <div class="search-title">
      <div>高级检索</div>
      <div
        class="header"
        style="cursor: pointer"
        @click="changeFormVisible = !changeFormVisible"
      >
        <span>{{ changeFormVisible ? '收缩' : '展开' }}</span>
        <el-icon>
          <template v-if="changeFormVisible">
            <arrow-up />
          </template>
          <template v-else>
            <arrow-down />
          </template>
        </el-icon>
      </div>
    </div>
    <!-- 将 v-if 条件修改为v-show,避免数据回显时.因状态改变数据展示失败 -->
    <hy-form
      v-show="changeFormVisible"
      v-bind="searchFormConfig"
      v-model="formData"
      @changeInput="handleQueryClick"
      @changeClear="doIt"
      @changeSelect="doIt"
      :class="
        !changeFormVisible
          ? 'animate__animated animate__fadeOut'
          : 'animate__animated animate__fadeIn'
      "
    >
      <!-- 其他插槽 -->
      <template #other>
        <slot></slot>
      </template>
      <!-- <template #header>
        <span class="hg-flex">条件筛选</span>
      </template> -->
      <template #footer>
        <div class="handle-btns">
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  name: 'PageSearch',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    },
    searchInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    HyForm,
    ArrowUp,
    ArrowDown
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const changeFormVisible = ref<any>(true)
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      // 新增配置默认值功能
      formOriginData[item.field] = item.defaultValue ?? ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      // 修改对象里面的属性
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      const data: any = {}
      Object.keys(formData.value).map((key: any) => {
        const item = formData.value[key]
        if (item !== undefined && item !== '') {
          data[key] = item
        }
      })
      console.log(data, 'formData.value')
      emit('queryBtnClick', {
        ...data
      })
    }
    const doIt = () => {
      console.log(1)
    }
    return {
      doIt,
      changeFormVisible,
      formData,
      formOriginData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.search-title {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgb(182, 176, 176);
}
.page-search {
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
.header {
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  cursor: pointer;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
  /* text-align: right;
  padding: 0 50px 20px 0; */
}
</style>
