<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      ref="formRef"
      :label-width="labelWidth"
      label-position="top"
      :model="modelValue"
      class="animate__animated animate__fadeIn"
    >
      <el-row :gutter="16">
        <template v-for="item in formItems" :key="item.label">
          <template v-if="item.type === 'divider'">
            <el-divider style="width: 100%">{{ item.label }}</el-divider>
          </template>
          <el-col v-bind="colLayout" v-if="!item.isHidden">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <!--扩展数字插槽-->
              <template v-if="item.type === 'inputSlot'">
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                  :data-clipboard-text="'测试一下'"
                >
                  <template #prepend v-if="item.prepend">{{
                    item.prepend
                  }}</template>
                  <template #append v-if="item.append">
                    <div
                      style="cursor: pointer"
                      v-if="item.otherOptions?.isCopy"
                      @click="copyTextInfo(modelValue[`${item.field}`])"
                    >
                      {{ item.append }}
                    </div>
                    <div
                      style="cursor: pointer"
                      v-else-if="item.otherOptions?.isLink"
                      @click="openLink(modelValue[`${item.field}`])"
                    >
                      {{ item.append }}
                    </div>
                    <div
                      v-else-if="
                        !item.otherOptions?.isLink && !item.otherOptions?.isCopy
                      "
                    >
                      {{ item.append }}
                    </div>
                  </template>
                </el-input>
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input
                  clearable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  type="textarea"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'number'">
                <!-- :precision="2" -->
                <el-input
                  type="number"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  style="width: 100%"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                />
              </template>
              <template v-if="item.type === 'inputNumber'">
                <div class="hg-flex">
                  <div
                    class="hg-mr-1"
                    style="min-width: 50px"
                    v-if="item.prepend"
                  >
                    {{ item.prepend }}
                  </div>
                  <!-- :precision="2" -->
                  <el-input-number
                    :placeholder="item.placeholder"
                    v-bind="item.otherOptions"
                    :model-value="modelValue[`${item.field}`]"
                    style="width: 100%"
                    @update:modelValue="handleValueChange($event, item.field)"
                    @keyup.enter="handleKeyUp"
                    @clear="handleClear"
                    type="number"
                  >
                  </el-input-number>
                  <div
                    class="hg-ml-1"
                    v-if="item.append"
                    style="min-width: 40px"
                  >
                    {{ item.append }}
                  </div>
                </div>
              </template>
              <template v-else-if="item.type === 'switch'">
                <el-switch
                  v-bind="item.otherOptions"
                  :active-value="1"
                  :inactive-value="0"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  class="hg-flex"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                  @change="handleChangeSelect"
                  @clear="handleClear"
                >
                  <el-radio
                    v-for="option in item.options"
                    :label="option.value"
                    :key="option.value"
                  >
                    {{ option.title }}
                  </el-radio>
                </el-radio-group>
              </template>

              <template v-else-if="item.type === 'checkbox'">
                <el-checkbox-group
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  class="hg-flex hg-flex-wrap"
                >
                  <el-checkbox
                    v-for="option in item.options"
                    :label="option.value"
                    :key="option.value"
                  >
                    {{ option.title }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  clearable
                  filterable
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @change="handleChangeSelect($event, item.field, item.options)"
                  @clear="handleClear"
                  :disabled="item.disabled"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 远程搜索下拉框 selectRemote -->
              <template v-else-if="item.type === 'selectRemote'">
                <el-select
                  clearable
                  filterable
                  remote
                  reserve-keyword
                  :placeholder="item.placeholder"
                  :remote-method="handleRemoteMethod($event, item.field)"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>

              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  v-if="showCascader"
                  :options="item.options"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  clearable
                  filterable
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-cascader>
              </template>

              <template v-else-if="item.type === 'treeSelect'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                >
                  <el-option style="height: auto">
                    <el-tree
                      :data="item.options"
                      highlight-current
                      check-on-click-node
                      :props="{ label: 'title', children: 'children' }"
                    />
                  </el-option>
                </el-select>
              </template>

              <template
                v-else-if="
                  item.type === 'datepicker' ||
                  item.type === 'datetimerange' ||
                  item.type === 'date' ||
                  item.type === 'datetime' ||
                  item.type === 'daterange'
                "
              >
                <div class="hg-flex">
                  <div
                    class="hg-mr-1"
                    style="min-width: 50px"
                    v-if="item.prepend"
                  >
                    {{ item.prepend }}
                  </div>
                  <el-date-picker
                    style="width: 100%"
                    :type="item.type"
                    v-bind="item.otherOptions"
                    :model-value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  ></el-date-picker>
                  <div
                    class="hg-ml-1"
                    v-if="item.append"
                    style="min-width: 40px"
                  >
                    {{ item.append }}
                  </div>
                </div>
              </template>
              <template v-else-if="item.type === 'timePicker'">
                <div class="hg-flex">
                  <div
                    class="hg-mr-1"
                    style="min-width: 50px"
                    v-if="item.prepend"
                  >
                    {{ item.prepend }}
                  </div>
                  <el-time-picker
                    style="width: 100%"
                    :type="item.type"
                    v-bind="item.otherOptions"
                    :model-value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  ></el-time-picker>
                  <div
                    class="hg-ml-1"
                    v-if="item.append"
                    style="min-width: 40px"
                  >
                    {{ item.append }}
                  </div>
                </div>
              </template>
              <!-- 后续完善 -->
              <template v-else-if="item.type === 'editor'">
                <el-col :span="24">
                  <hy-editor
                    v-bind="item.otherOptions"
                    v-model:value="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  />
                </el-col>
              </template>
              <template v-else-if="item.type === 'upload'">
                <hy-upload
                  v-bind="item.otherOptions"
                  v-model:value="modelValue[`${item.field}`]"
                  @getData="handleUploadData($event, item.field)"
                />
              </template>
              <template v-if="item.type === 'inputRange'">
                <el-input
                  clearable
                  placeholder="请输入起始值"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.startValue}`]"
                  @update:modelValue="
                    handleValueChange($event, item.startValue)
                  "
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                  style="width: 49%"
                />
                <span style="margin: 0 1px">-</span>
                <el-input
                  clearable
                  placeholder="请输入结束值"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.endValue}`]"
                  @update:modelValue="handleValueChange($event, item.endValue)"
                  @keyup.enter="handleKeyUp"
                  @clear="handleClear"
                  style="width: 49%"
                />
              </template>

              <!-- 扩展自定义插槽 -->
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName" :scope="item"> </slot>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <slot name="other"></slot>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'
import type { ElForm } from 'element-plus'

import HyEditor from '@/base-ui/editor'
import HyUpload from '@/base-ui/upload'
import { copyText } from '@/utils'

export default defineComponent({
  components: {
    HyEditor,
    HyUpload
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: [
    'update:modelValue',
    'changeSelect',
    'changeInput',
    'changeClear',
    'remoteMethod',
    'uploadData'
  ],
  setup(props, { emit }) {
    type FormInstance = InstanceType<typeof ElForm>
    const formRef = ref<FormInstance>()
    const otherFormRef = ref<FormInstance>()
    const showCascader = ref<boolean>(false)
    setTimeout(() => {
      showCascader.value = true
    }, 500)
    // 更新表单数据
    const handleValueChange = (value: any, field: string) => {
      console.log(value, field)
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    // 事件处理
    // 1. 监听用户enter事件
    const handleKeyUp = () => emit('changeInput')
    // 2. 监听用户enter回车事件
    const handleClear = () => emit('changeClear')
    // 3. 监听用户选中事件
    /**
     * @param item 当前行数据
     * @param field 用户点击的下拉框
     * @param data 当前行的数据
     */
    const handleChangeSelect = (item: any, field: string, data: any) => {
      emit('changeSelect', {
        value: item,
        field: field,
        data: data
      })
    }
    // 远程搜索事件
    const handleRemoteMethod = (item: any, field: string) => {
      emit('remoteMethod', {
        value: item,
        field: field
      })
    }
    // 上传组件数据获取
    const handleUploadData = (data: any, filed: string) => {
      emit('uploadData', {
        value: data,
        field: filed
      })
    }

    const copyTextInfo = (value: any) => {
      copyText(value)
    }
    const openLink = (item: any) => {
      window.open(`http://www.baidu.com/s?wd=${item}`, '_blank')
    }
    return {
      copyTextInfo,
      openLink,
      showCascader,
      formRef,
      otherFormRef,
      handleKeyUp,
      handleClear,
      handleValueChange,
      handleChangeSelect,
      handleRemoteMethod,
      handleUploadData
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 10px;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0 !important;
  line-height: 30px !important;
}
</style>
