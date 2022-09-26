/*
 * @Author: korealu
 * @Date: 2022-02-16 09:59:37
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-26 14:35:14
 * @Description:  注册全局组件事, 需要确保组件中 name 属性值跟命名相同
 * @FilePath: /pofi-admin/src/global/register-global-component.ts
 */
import { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import PageForm from '@/components/page-form'
import PageDialog from '@/components/page-dialog'
import PageCountry from '@/components/page-country'
import PageLanguage from '@/components/page-language'
import PageLink from '@/components/page-link'
import PagePagination from '@/base-ui/pagination'
import PageImage from '@/base-ui/image'
import PageEditorTable from '@/base-ui/table'

const components: any[] = [
  PageContent,
  PageSearch,
  PageModal,
  PageForm,
  PageDialog,
  PageCountry,
  PageLanguage,
  PageLink,
  PageImage,
  PageEditorTable,
  PagePagination
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
