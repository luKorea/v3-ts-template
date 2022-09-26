<template>
  <div
    ref="editorRef"
    class="hy-editor"
    :style="{ width: width ? `${width}px` : '100%' }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import type Editor from 'wangeditor'
import WangEditor from 'wangeditor'
import ColorMenu from './components/colorMenu'
import BgColorMenu from './components/bgColorMenu'
import { colorList } from './color'
// 菜单 key ，各个菜单不能重复
const colorMenuKey = 'colorMenuKey'
const bgColorMenuKey = 'BgColorMenu'
// 注册菜单
WangEditor.registerMenu(colorMenuKey, ColorMenu)
WangEditor.registerMenu(bgColorMenuKey, BgColorMenu)
export interface EditorInfo {
  html: string
  text: string
}

import { clientSendFile } from '@/hooks/use-oss-config'
import { watch } from 'vue'
import { useOSSConfig } from '@/hooks/use-oss-config'
import OSS from 'ali-oss'
import { successTip, warnTip, errorTip, infoTip } from '@/utils/tip-info'
import { showLoading, hideLoading } from '@/utils'
export default defineComponent({
  components: {},
  props: {
    // 默认显示的文本
    defaultHtmlStr: {
      type: String,
      default: '请输入正文'
    },
    // 数据双向绑定
    value: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 0
    },
    focus: {
      type: Boolean,
      default: false
    },
    // 图片文件名设置,根据不用模块设置不用的名字
    fileTypeName: {
      type: String,
      default: 'help/'
    }
  },
  emits: ['update:value'],

  setup(props, { emit }) {
    const client = ref<any>()
    const editorRef = ref<HTMLDivElement | null>(null)
    const isInitContent = ref<boolean>(false)
    const content = reactive<EditorInfo>({
      html: '',
      text: ''
    })
    const instance = ref<Editor | null>(null)
    // watch(
    //   () => props.value,
    //   () => {
    //     initEditorContent(props.value, false)
    //   }
    // )

    onMounted(() => {
      setClient()
      createWangEditor()
    })

    onBeforeUnmount(() => {
      if (!instance.value) return
      instance.value.destroy()
      instance.value = null
    })
    const CDN_HOST = ref<any>()
    const setClient = () => {
      useOSSConfig().then((res) => {
        if (res) {
          CDN_HOST.value = res.host
          client.value = new OSS({
            region: 'oss-cn-hongkong',
            stsToken: res.securityToken,
            bucket: res.bucketName,
            ...res
          })
        }
      })
    }
    const setEditorValue = () => {
      initEditorContent(props.value, false)
    }
    const uploadOptions = (resultFiles: any, insertFn: any, type = 'image') => {
      setClient()
      if (client.value !== null) {
        showLoading('开始上传,请稍等')
        console.log(client.value, 'log')
        clientSendFile(
          client.value,
          props.fileTypeName,
          client.value?.options!.fileName,
          resultFiles[0]
        )
          .then((res: any) => {
            console.log(res, 'info-url')
            let url = null
            if (type === 'video') {
              url = CDN_HOST.value + '/' + res.name
            } else {
              url =
                CDN_HOST.value + '/' + res.name + '?x-oss-process=style/fun_hd'
              // url = res.res.requestUrls[0].split('?')[0]
            }
            console.log(url, 'url')
            // console.log(res.res.requestUrls[0].split('?')[0], '图片')
            // 后续再改
            // console.log(insertFn, 'fn')
            insertFn(url)
          })
          .catch((err: any) => {
            console.log(err)
          })
          .finally(() => hideLoading())
      }
    }
    const createWangEditor = () => {
      instance.value = new WangEditor(editorRef.value)
      setEditorConfig()
      instance.value.create()
      initEditorContent(props.value)
      // create 之后才能初始化
      // initEditorContent(props.defaultHtmlStr)
    }

    const initEditorContent = (htmlStr: string, isFocus = false) => {
      if (!instance.value) return
      // editor.config.focus = isFocus
      // if (!htmlStr) return
      isInitContent.value = true
      const editor: Editor = instance.value as Editor
      editor.txt.html(htmlStr)
    }

    const setEditorConfig = () => {
      if (!instance.value) return
      const editor: Editor = instance.value as Editor
      // 配置错误提示
      // 配置element ui message提示
      editor.config.customAlert = (s: any, t: any) => {
        switch (t) {
          case 'success':
            successTip(s)
            break
          case 'info':
            warnTip(s)
            break
          case 'warning':
            warnTip(s)
            break
          case 'error':
            errorTip(s)
            break
          default:
            infoTip(s)
            break
        }
      }
      // 设置颜色
      // editor.config.colors = colorList()
      editor.config.uploadFileName = props.fileTypeName
      editor.config.placeholder = '请输入内容'
      // 一次最多上传图片的数量
      // editor.config.uploadImgMaxLength = 1
      editor.config.customUploadImg = function (
        resultFiles: any,
        insertFn: any
      ) {
        uploadOptions(resultFiles, insertFn)
      }
      // 自定义视频播放器
      // editor.config.cu = function (resultFiles: any) {
      //   editor.cmd['do'](
      //     'insertHTML',
      //     '<video src="' +
      //       resultFiles +
      //       '" controls="controls" style="max-width:100%"></video>'
      //   )
      // }
      // 配置视频上传
      editor.config.uploadVideoAccept = [
        'mp4',
        'm2v',
        'mkv',
        'rmvb',
        'wmv',
        'avi',
        'flv',
        'mov',
        'm4v'
      ]
      editor.config.showLinkVideo = true // 隐藏插入网络视频的功能
      // 视频上传
      editor.config.customUploadVideo = function (
        resultFiles: any,
        insertFn: any
      ) {
        uploadOptions(resultFiles, insertFn, 'video')
      }
      // 自定义视频播放器
      editor.config.customInsertVideo = function (resultFiles: any) {
        editor.cmd['do'](
          'insertHTML',
          '<video src="' +
            resultFiles +
            '" controls="controls" style="max-width:100%"></video>'
        )
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      // 设置编辑区域高度为 500px
      editor.config.height = props.height
      // 设计z-index
      editor.config.zIndex = props.zIndex
      // 取消自动 focus
      // editor.config.focus = props.focus
      // 配置 onchange 回调函数
      editor.config.onchangeTimeout = 500 // 修改为 500ms
      editor.config.onchange = function (newHtml: string) {
        content.html = newHtml
        content.text = editor.txt.text()
        if (!isInitContent.value) {
          emit('update:value', content.html)
          // emit('update:value', `<div>${content.html}</div>`)
        }
        isInitContent.value = false
      }
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        // 'foreColor',
        // 'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo'
      ]
      console.log(editor.config, 'editor.config')
    }

    return {
      editorRef,
      setEditorValue
    }
  }
})
</script>

<style lang="less" scoped>
.hy-editor {
  text-align: left;
}
</style>

<style>
.w-e-text-container .placeholder {
  z-index: 1;
}
.w-e-droplist {
  height: 200px;
  /* width: 174px !important; */
  overflow: hidden;
  overflow-y: scroll;
}
.item-color {
  display: flex;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
}
.info .w-e-list {
  display: flex;
  flex-wrap: wrap;
}
.info .w-e-item {
  margin: 4px 0 0 4px;
}
.bColor {
  li {
    width: 15px;
    display: inline-block;
    margin: 0 2px;
    li {
      display: block;
      width: 15px;
      height: 15px;
      transition: all 0.3s ease;
      margin: 0;
    }
    li:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
      transform: scale(1.3);
    }
  }
}
</style>
