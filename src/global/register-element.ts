/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-08-11 11:56:06
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-element.ts
 */
import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElIcon,
  ElTooltip,
  ElCard,
  ElDivider,
  ElScrollbar,
  ElTag,
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElSubmenu,
  ElTabPane,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElDrawer,
  ElInputNumber,
  ElCheckboxButton,
  ElUpload,
  ElRadioGroup,
  ElCheckboxGroup,
  ElDescriptions,
  ElDescriptionsItem,
  ElBadge,
  ElProgress,
  ElTimeline,
  ElTimelineItem,
  ElButtonGroup,
  ElCascader,
  ElStep,
  ElSteps,
  ElEmpty,
  ElPopconfirm,
  ElOptionGroup,
  ElSwitch,
  ElTimePicker
} from 'element-plus'

const components = [
  ElTimePicker,
  ElSwitch,
  ElTag,
  ElOptionGroup,
  ElPopconfirm,
  ElEmpty,
  ElSteps,
  ElStep,
  ElCascader,
  ElTimeline,
  ElTimelineItem,
  ElProgress,
  ElLink,
  ElButtonGroup,
  ElBadge,
  ElDescriptions,
  ElDescriptionsItem,
  ElCheckbox,
  ElCheckboxGroup,
  ElIcon,
  ElTooltip,
  ElCard,
  ElDivider,
  ElScrollbar,
  ElTag,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxButton,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElDrawer,
  ElInputNumber,
  ElCheckbox,
  ElCheckboxButton,
  ElUpload
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
