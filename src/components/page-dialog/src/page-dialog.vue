<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:43:09
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-11 11:47:37
 * @Description:
 * @FilePath: /pofi-admin/src/components/page-dialog/src/page-dialog.vue
-->
<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :width="showWidth"
      top="10vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="showClose"
      destroy-on-close
      @close="closeDialog"
      style="border-radius: 10px !important"
    >
      <template #title v-if="showTitle">
        <div style="color: #409eff; font-weight: bold">{{ title }}</div>
      </template>
      <!-- <div class="card-header">
        <span style="color: rgb(180, 141, 222)">{{ title }}</span>
      </div> -->
      <slot></slot>
      <!-- <el-card>
        <template #header>
          <div class="card-header">
            <span style="color: rgb(180, 141, 222)">{{ title }}</span>
          </div>
        </template>
        <slot></slot>
      </el-card> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PageDialog',
  props: {
    title: {
      type: String,
      default: '操作'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showWidth: {
      type: String,
      default: '50%'
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['closeDialog'],
  setup(_, { emit }) {
    const dialogVisible = ref(false)
    const closeDialog = () => {
      emit('closeDialog')
    }
    return {
      dialogVisible,
      closeDialog
    }
  }
})
</script>

<style>
.el-dialog {
  border-radius: 10px;
}
</style>
