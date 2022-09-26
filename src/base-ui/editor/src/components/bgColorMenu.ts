import type Editor from 'wangeditor'
import WangEditor from 'wangeditor'
import { getCommonSelectList } from '@/service/common'
const { $, DropListMenu } = WangEditor
let data: any = []
getCommonSelectList('editorColorList').then((res: any) => {
  if (!res.result) {
    data = res.data.rows.map((item: any) => {
      return {
        $elem: $(
          `<span class="item-color" title='${item.color}' style='background-color: ${item.color}'></span>`
        ),
        value: item.color
      }
    })
  }
})
export default class BgColorMenu extends DropListMenu {
  constructor(editor: any) {
    const $elem = $(
      '<div class="w-e-menu info" data-title="背景颜色"><i class="w-e-icon-paint-brush"></i></div>'
    )
    // droplist 配置
    const dropListConf = {
      width: 174,
      title: '设置背景颜色',
      type: 'list',
      list: data,
      // droplist 每个 item 的点击事件
      clickHandler: (value: any) => {
        // value 参数即 dropListConf.list 中配置的 value
        console.log(value)
        this.command(value)
      }
    }
    super($elem, editor, dropListConf)
  }
  command(value: any) {
    // this.editor.cmd.do('foreColor', value)
    const editor = this.editor as any
    const isEmptySelection = editor.selection.isSelectionEmpty()
    const $selectionElem =
      editor.selection.getSelectionContainerElem()?.elems[0]
    if ($selectionElem == null) return
    const isFont = $selectionElem?.nodeName.toLowerCase() !== 'p'
    const isSameColor = $selectionElem?.getAttribute('color') === value
    if (isEmptySelection) {
      if (isFont && !isSameColor) {
        const $elems = editor.selection.getSelectionRangeTopNodes()
        editor.selection.createRangeByElem($elems[0])
        editor.selection.moveCursor($elems[0].elems[0])
      }
      editor.selection.setRangeToContainerElem($selectionElem)
      // 插入空白选区
      editor.selection.createEmptyRange()
    }
    // 获取选区范围的文字
    const $selectionText = editor.selection.getSelectionText()
    // 如果设置的是 a 标签就特殊处理一下，避免回车换行设置颜色无效的情况
    // 只处理选中a标签内全部文字的情况，因为选中部分文字不存在换行颜色失效的情况
    if (
      $selectionElem.nodeName === 'A' &&
      $selectionElem.textContent === $selectionText
    ) {
      // 创建一个相当于占位的元素
      const _payloadElem = $('<span>&#8203;</span>').getNode()
      // 添加到a标签之后
      $selectionElem.appendChild(_payloadElem)
    }
    editor.cmd.do('backColor', value)
    if (isEmptySelection) {
      // 需要将选区范围折叠起来
      editor.selection.collapseRange()
      editor.selection.restoreSelection()
    }
  }
  // 菜单是否需要激活
  tryChangeActive() {
    // const reg = /^h/i
    // const cmdValue = this.editor.cmd.queryCommandValue('foreColor')
    // if (reg.test(cmdValue)) {
    //   // 选区处于标题内，激活菜单
    //   this.active()
    // } else {
    //   // 否则，取消激活
    //   this.unActive()
    // }
  }
}
