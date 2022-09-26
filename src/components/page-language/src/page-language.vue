<template>
  <!-- 暂时只做选择封装，后续有时间再做表单封装 -->
  <el-divider
    >{{ title }} (
    <span style="font-size: 12px; color: #ccc"
      >请确保带<span style="color: #f56c6c">*</span>号的字段填写完整</span
    >
    )
  </el-divider>
  <el-row :gutter="12">
    <el-col :span="4">
      <div class="item-flex">
        <el-card>
          <el-tooltip
            content="第一个选项为默认语言,请确保带*号字段填写完整"
            placement="top"
          >
            <span class="item-title">多语言选择</span>
          </el-tooltip>
          <div class="wrap">
            <template v-for="item in languageBtnList" :key="item.id">
              <div class="item-wrap">
                <div
                  class="item"
                  :class="item.id === languageId && 'active'"
                  @click="handleChangeLanguage(item.id)"
                >
                  <i
                    v-if="showIcon"
                    :class="item.icon"
                    :style="{
                      color:
                        item.icon === 'el-icon-warning'
                          ? 'rgb(245, 108, 108)'
                          : 'rgb(103, 194, 58)'
                    }"
                  ></i>
                  {{ item.name }}
                </div>
                <i
                  class="el-icon-delete"
                  @click="handleDeleteItemData(item.id, item.name)"
                  v-if="item.id === languageId && 'active'"
                ></i>
              </div>
            </template>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="20">
      <slot name="formItem"></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import { infoTipBox } from '@/utils/tip-info'
export default defineComponent({
  name: 'PageLanguage',
  props: {
    title: {
      type: String,
      default: '多语言配置'
    },
    languageBtnList: {
      type: Array,
      default: () => []
    },
    languageId: {
      type: [String, Number]
    },
    languageList: {
      type: Array,
      default: () => []
    },
    editorFileName: {
      type: String,
      default: 'base/'
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  emits: ['changeLanguage', 'handleDeleteItemData'],
  setup(props, { emit }) {
    const handleChangeLanguage = (item: any) => {
      emit('changeLanguage', item)
    }
    // 深拷贝一份初始数据, 删除对象数据后重新赋值
    const backLanguageList = _.cloneDeep(props.languageList)
    const handleDeleteItemData = (item: any, name: string) => {
      infoTipBox({
        message: `您确定清空当前语言为 ${name} 的数据吗`,
        title: '一键清除'
      })
        .then(() => {
          // 用户选择清除的项目
          const selectItemIndex = props.languageList.findIndex((i: any) => {
            if (i.lid) {
              return i.lid === item
            } else {
              return i.languageId === item
            }
          })
          // // 获取用户选择清除项目的初始化值, 做重新赋值操作
          // const backSelectItem = backLanguageList.find((i: any) => {
          //   if (i.lid) {
          //     return i.lid === item
          //   } else {
          //     return i.languageId === item
          //   }
          // })
          // 子组件无法修改父组件的值, 这里去父组件操作
          // props.languageList.splice(selectItemIndex, 1, backSelectItem)
          emit('handleDeleteItemData', selectItemIndex, item)
        })
        .catch(() => console.log('用户取消操作'))
    }
    return {
      // languageItem,
      handleDeleteItemData,
      handleChangeLanguage
    }
  }
})
</script>

<style scoped lang="less">
.wrap {
  // width: 120px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  .item-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    .item {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      width: 100%;
      cursor: pointer;
      margin-right: 6px;
      i {
        margin: 0 10px 0 6px;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
  .active {
    background: #eaeaec;
    border-radius: 4px;
    color: #409eff;
  }
}
</style>
