<template>
  <page-card> ${{ listData }} </page-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { listData } from './data'
export default defineComponent({
  name: 'treeViewPage',
  setup() {
    return {
      listData
    }
  }
})
</script>

<style scoped></style>
