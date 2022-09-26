<template>
  <div class="footer">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :total="listCount"
      v-bind="otherOptions"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagePagination',
  props: {
    page: {
      type: Object,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    otherOptions: {
      type: Object,
      default: () => ({
        pageSizes: [10, 20, 40, 60, 80, 100],
        layout: 'total, sizes, prev, pager, next, jumper'
      })
    }
  },
  emits: ['currentChange', 'sizeChange'],
  setup(props, { emit }) {
    const handleCurrentChange = (currentPage: number) =>
      emit('currentChange', {
        ...props.page,
        currentPage
      })
    const handleSizeChange = (pageSize: number) =>
      emit('sizeChange', {
        ...props.page,
        pageSize
      })
    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped></style>
