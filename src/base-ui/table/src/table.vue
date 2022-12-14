<template>
  <div class="hy-table table-container" ref="HyTableRef">
    <el-card>
      <template #header v-if="showHeader">
        <div class="header">
          <slot name="header">
            <slot name="titleHandler">
              <div class="flex-title">
                <div class="title">
                  {{ title }}
                </div>
              </div>
            </slot>
            <div class="handler">
              <el-input
                v-if="showSearch"
                size="mini"
                v-model="search"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                style="margin-right: 10px"
                clearable
              ></el-input>
              <slot name="otherHandler"></slot>
              <slot name="headerHandler"></slot>
            </div>
          </slot>
        </div>
      </template>
      <el-table
        :data="filterTableData"
        :show-summary="showSummary"
        :sum-text="sumText"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :summary-method="summaryMethod"
        v-bind="childrenProps"
        empty-text="暂时没有其他数据"
        ref="tableRef"
        class="animate__animated animate__fadeIn"
      >
        <el-table-column
          v-if="handleDraw"
          label="拖拽排序"
          align="center"
          width="100"
        >
          <template #default>
            <i class="el-icon-menu sortTable" style="cursor: all-scroll"></i>
            <!-- <i class="el-icon-menu"></i> -->
          </template>
        </el-table-column>
        <!-- :reserve-selection="true" -->
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          :reserve-selection="childrenProps.isReserve ? true : false"
          width="60"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="propItem in propList" :key="propItem.prop">
          <el-table-column
            v-bind="propItem"
            :align="propItem.align ? propItem.align : 'center'"
            show-overflow-tooltip
            v-if="!propItem.isHidden"
          >
            <template #default="scope">
              <!-- 动态插槽，动态作用域插槽 -->
              <slot
                :name="propItem.slotName"
                :row="scope.row"
                :prop="propItem.prop"
              >
                <template v-if="!propItem.editInfo">
                  {{ scope.row[propItem.prop] }}
                </template>
                <template v-else>
                  <template v-if="propItem.editInfo.type === 'input'">
                    <el-input
                      :placeholder="propItem.placeholder"
                      v-model="scope.row[propItem.prop]"
                      :disabled="propItem.editInfo.disabled"
                      clearable
                    ></el-input>
                  </template>
                  <!-- 扩展自定义输入框格式组件 -->
                  <template v-if="propItem.editInfo.type === 'inputFixed'">
                    <el-input
                      :placeholder="propItem.placeholder"
                      v-model="scope.row[propItem.prop]"
                      :disabled="propItem.editInfo.disabled"
                      :type="propItem.editInfo.inputType"
                      clearable
                    >
                      <template #prepend v-if="propItem.editInfo.prependName">{{
                        propItem.editInfo.prependName
                      }}</template>
                      <template #append v-if="propItem.editInfo.appendName">{{
                        propItem.editInfo.appendName
                      }}</template>
                    </el-input>
                  </template>
                  <template
                    v-else-if="propItem.editInfo.type === 'inputNumber'"
                  >
                    <el-input-number
                      v-model="scope.row[propItem.prop]"
                      :placeholder="propItem.placeholder"
                      :disabled="propItem.editInfo.disabled"
                      clearable
                      style="width: 100%"
                      v-bind="propItem.editInfo.otherOptions"
                    ></el-input-number>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'textarea'">
                    <el-input
                      type="textarea"
                      clearable
                      v-bind="propItem.editInfo.otherOptions"
                      v-model="scope.row[propItem.prop]"
                      :placeholder="propItem.placeholder"
                      :disabled="propItem.editInfo.disabled"
                    ></el-input>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'select'">
                    <el-select
                      v-bind="propItem.editInfo.otherOptions"
                      style="width: 100%"
                      v-model="scope.row[propItem.prop]"
                      clearable
                      filterable
                      :disabled="propItem.editInfo.disabled"
                    >
                      <el-option
                        v-for="option in propItem.editInfo.options"
                        :key="option.value"
                        :value="option.value"
                        :label="option.title"
                        >{{ option.title }}</el-option
                      >
                    </el-select>
                  </template>
                  <template
                    v-else-if="
                      propItem.editInfo.type === 'datepicker' ||
                      propItem.editInfo.type === 'datetimerange' ||
                      propItem.editInfo.type === 'date' ||
                      propItem.editInfo.type === 'datetime'
                    "
                  >
                    <el-date-picker
                      style="width: 100%"
                      :type="propItem.editInfo.type"
                      v-bind="propItem.editInfo.otherOptions"
                      v-model="scope.row[propItem.prop]"
                      @change="handleChangeDatePicker(scope.row)"
                    ></el-date-picker>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'upload'">
                    <hyUpload
                      :limit="1"
                      :showWidth="80"
                      :showHeight="80"
                      v-model:value="scope.row[propItem.prop]"
                      :fileTypeName="propItem.editInfo.fileTypeName"
                    ></hyUpload>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'other'">
                    <slot
                      :name="propItem.editInfo.slotName"
                      :row="scope.row"
                    ></slot>
                  </template>
                  <template v-else-if="propItem.editInfo.type === 'handler'">
                    <slot name="handler" :row="scope.row"></slot>
                  </template>
                </template>
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 40, 60, 80, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import SortTable from 'sortablejs'
import { ElTable } from 'element-plus'
import hyUpload from '@/base-ui/upload'

export default defineComponent({
  name: 'PageEditorTable',
  components: {
    hyUpload
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '400px'
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示多选
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示总计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 显示文字方向
    summaryTextPosition: {
      type: String,
      default: 'right'
    },
    sumText: {
      type: String,
      default: '合计'
    },
    // 控制需要展示合计的行
    propertyList: {
      type: Array,
      default: () => [] // {field: '需要进行合并的字段', units: '合并字段的后缀名'}
    },
    // 分页数据
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({
        isReserve: false
      })
    },
    // 展示底部分页器
    showFooter: {
      type: Boolean,
      default: true
    },
    // 控制表格是否可以拖动
    handleDraw: {
      type: Boolean,
      default: false
    },
    editTableDraw: {
      type: Boolean,
      default: false
    },
    threeInfo: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    editTableRef: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page', 'drawTable', 'changePicker'],
  setup(props, { emit }) {
    const itemKey = Math.random()
    const tableData = computed(() => {
      return props.listData
    })
    const HyTableRef = ref()
    const tableRef = ref<InstanceType<typeof ElTable>>()
    const search = ref('')
    const expandRow = ref<any>([])
    // 目前只做树形搜索
    const filterTableData = computed(() => {
      console.log(props.listData, 'demo', tableRef.value, 'valuie')
      if (search.value !== '') {
        setExpandRow(props.listData)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        expandRow.value = expandRow.value.join(',').split(',')
        return handleTreeData(props.listData, search.value)
      } else {
        return props.listData
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
    onMounted(() => {
      if (props.handleDraw) {
        handleSortTable()
      }
    })
    // TODO 表格拖动
    const handleSortTable = () => {
      console.log(tableRef?.value?.tableId)
      // console.log(document.getElementById(tableRef?.value?.tableId), 'valiue')
      const element = document.getElementsByTagName('tbody')
      const tableSort = ref<HTMLElement | null>()
      // 后续改传ref
      if (props.editTableDraw && props.threeInfo) {
        tableSort.value = element[2]
      } else if (props.editTableDraw && element.length > 1) {
        tableSort.value = element[1]
      } else {
        tableSort.value = element[0]
      }
      new SortTable(tableSort.value, {
        animation: 300,
        handle: '.sortTable',
        onEnd(evt: any) {
          let data = [...props.listData]
          data.splice(evt.newIndex, 0, data.splice(evt.oldIndex, 1)[0])
          const newArray = data.slice(0)
          emit('drawTable', newArray)
        }
      })
      console.log(tableSort.value, '排序表格')
    }
    // 多选操作
    const handleSelectionChange = (value: any) => emit('selectionChange', value)
    // 监听日期选择器
    const handleChangeDatePicker = (item: any) => emit('changePicker', item)
    // 分页操作
    const handleCurrentChange = (currentPage: number) =>
      emit('update:page', { ...props.page, currentPage })
    const handleSizeChange = (pageSize: number) =>
      emit('update:page', { ...props.page, pageSize })
    // 合计行函数
    const summaryMethod = (param: any) => {
      if (props.showSummary) {
        const { columns, data } = param
        const sums: string[] = []
        columns.forEach((item: any, index: number) => {
          let selectField: any = props.propertyList.find(
            (i: any) => i.field === item.property
          )
          if (index === 0) {
            sums[index] = props.sumText
            return
          } else if (selectField && item.property === selectField.field) {
            const values = data.map((i: any) => Number(i[item.property]))
            if (!values.includes(NaN)) {
              if (props.summaryTextPosition === 'left') {
                sums[index] =
                  selectField.units +
                  values.reduce(
                    (pre: any, next: any) => (pre * 10 + next * 10) / 10,
                    0
                  )
              } else {
                sums[index] =
                  values.reduce(
                    (pre: any, next: any) => (pre * 10 + next * 10) / 10,
                    0
                  ) + selectField.units
              }
              return
            } else {
              sums[index] = ''
              return
            }
          }
        })
        return sums
      }
    }
    return {
      expandRow,
      HyTableRef,
      filterTableData,
      search,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      handleChangeDatePicker,
      tableRef,
      tableData,
      summaryMethod,
      itemKey
    }
  }
})
</script>

<style scoped lang="less">
.table-container {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
</style>

<style>
.el-popper.is-dark {
  max-width: 220px !important;
  line-height: 20px;
}
.expanded .el-tooltip {
  color: #4666f19d !important;
  font-weight: 800;
}
</style>
