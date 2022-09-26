<template>
  <div class="uploadWrapper" style="display: flex">
    <Vuedraggable
      class="vue-draggable"
      :class="{ disabled: disabled }"
      v-model="imgList"
      @start="onDragStart"
      @end="onDragEnd"
      :item-key="getItemKey"
    >
      <!-- 拖拽元素 -->
      <template #item="{ element, index }">
        <div
          class="draggable-item"
          :style="{ width: showWidth + 'px', height: showHeight + 'px' }"
        >
          <el-image
            v-if="element.type === 'image'"
            :src="element.url"
            fit="cover"
            :preview-src-list="[element.url]"
          ></el-image>
          <!-- <el-image
            v-if="element.type === 'image'"
            :src="element.url"
            fit="cover"
            :preview-src-list="[element.url]"
          ></el-image>
          <video
            v-else-if="element.type === 'video'"
            controls
            style="width: 200px; height: 200px"
            :src="element.url"
          ></video>
          <div
            style="width: 126px; height: 126px; cursor: pointer"
            v-else-if="element.type === 'other'"
            @click="openNewWindow(element.url)"
          >
            <el-tooltip content="其他文件" placement="top">
              <i
                style="width: 100%; height: 100%"
                class="el-icon-document hg-flex hg-items-center hg-justify-center"
              ></i>
            </el-tooltip>
          </div> -->
          <div class="shadow" @click="onRemoveHandler(index)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>

      <!-- 禁用层遮罩 -->
      <template #header v-if="disabled">
        <div class="disabledShadow"></div>
      </template>

      <!-- 上传按钮 -->
      <template #footer>
        <el-upload
          ref="uploadRef"
          class="uploadBox"
          v-show="!limit || imgList.length < limit"
          :style="{ width: showWidth + 'px', height: showHeight + 'px' }"
          :show-file-list="false"
          :multiple="!isSingle"
          :limit="999"
          :disabled="disabled"
          :http-request="startUpload"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          :drag="true"
          v-bind="otherOptions"
        >
          <i class="el-icon-plus uploadIcon">
            <span class="uploading" v-show="isUploading"
              >正在上传... {{ progress }}</span
            >
            <span
              class="limitTxt"
              v-if="isShowLimit && !isUploading && limit && !isSingle"
            >
              最多{{ limit }}张
            </span>
          </i>
        </el-upload>
      </template>
    </Vuedraggable>
    <!-- <div
      id="oss-player"
      style="width: 400px; height: 200px"
      ref="ossPlayerRef"
      v-show="imgList.length > 0"
    ></div> -->
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, defineComponent, nextTick } from 'vue'
import Vuedraggable from 'vuedraggable'
import { fileTypeIsImage, createUniqueString } from '@/utils/index'
import { errorTip, infoTipBox, warnTip, successTip } from '@/utils/tip-info'
import axios from 'axios'
import { getVideoAddressToken, getVideoToken } from '@/service/upload/index'

export default defineComponent({
  props: {
    fileTypeName: {
      type: String,
      default: 'help/'
    },
    value: {
      type: Array,
      default: () => []
    },
    otherOptions: {
      type: Object,
      default: () => ({})
    },
    // 限制上传图片的最大数量
    limit: {
      type: Number,
      default: 0
    },
    // 限制数量文字是否展示
    isShowLimit: {
      type: Boolean,
      default: true
    },
    // 限制单张图片的文件存储大小最大值(kb)
    maxSize: {
      type: Number,
      default: 0
    },
    // 图片显示的宽度(px)
    showWidth: {
      type: Number,
      default: 126
    },
    // 图片显示的高度(px)
    showHeight: {
      type: Number,
      default: 126
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 限定图片分辨率宽度值(px)
    screenWidth: {
      type: Number,
      default: 0
    },
    // 限定图片分辨率高度值(px)
    screenHeight: {
      type: Number,
      default: 0
    },
    // 限制图片分辨率宽度最大值(px)
    maxScreenWidth: {
      type: Number,
      default: 0
    },
    // 限制图片分辨率高度最大值(px)
    maxScreenHeight: {
      type: Number,
      default: 0
    }
  },
  components: {
    Vuedraggable
  },
  emits: ['update:value', 'getData'],
  setup(props, { emit }) {
    let client = ref<any>()
    const ossPlayerRef = ref<any>()
    const isUploading = ref(false) // 正在上传状态
    const isFirstMount = ref(true) // 控制防止重复回显
    const uploadRef = ref<any>(null)
    const openNewWindow = (url: string) => {
      console.log(url, 'url')
      window.open(url, '_blank')
    }
    const fileName = ref<any>('上传的文件名')
    // 图片数组数据
    const imgList = computed({
      get(): any {
        // 此处代码目的为判断文件类型，显示不同组件
        if (props.value && props.value.length > 0) {
          props.value.forEach((item: any) => {
            let name = item.name
            if (item.name && item.name.indexOf('?')) {
              name = item.name.split('?')[0]
            }
            item['type'] = fileTypeIsImage(name)
          })
        }
        return props.value
      },
      set(val: any) {
        emit('update:value', val)
      }
    })
    // 是否是单图上传
    const isSingle = computed(() => {
      return +props.limit === 1
    })
    watch(
      props.value,
      () => {
        if (!isFirstMount.value) {
          return
        }
        // 异步数据的回显
        if (props.value.length > 0) {
          syncElUpload()
        }
      },
      { deep: true }
    )

    // mounted事件
    let player = ref<any>()
    onMounted(() => {
      // 同步数据的回显
      if (props.value.length > 0) {
        syncElUpload()
        initPlay((props.value[0] as any).url)
      }
    })
    // 同步el-upload数据
    function syncElUpload(val?: any) {
      const list: any = val || imgList.value
      if (uploadRef.value) {
        uploadRef.value.uploadFiles = list.map((v: any, i: number) => {
          return {
            name: v.url,
            url: v.url,
            percentage: 100,
            status: 'success',
            uid: createUniqueString()
          }
        })
      }
      isFirstMount.value = false
    }
    const initPlay = (source: any) => {
      console.log(source)
      // new (window as any).Aliplayer({
      //   id: 'oss-player',
      //   width: '100%',
      //   source: source
      // })
    }

    // 阿里云视频上传逻辑
    const file = ref<any>()
    const progress = ref<any>() // 进度条
    const uploader = ref<any>()
    const uploadDisabled = ref<boolean>(false)
    const statusText = ref<string>()
    const fileChange = (e: any) => {
      file.value = e
      if (!file.value) {
        alert('请先选择需要上传的文件!')
        return
      }
      let params = JSON.stringify({
        Vod: {
          Title: e.name
        }
      })
      let userData = JSON.stringify(params)
      if (uploader.value) {
        uploader.value.stopUpload()
        uploadDisabled.value = false
        statusText.value = ''
      }
      uploader.value = createUploader()
      // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
      console.log(userData, uploader.value, 'uploader.value')
      uploader.value.addFile(file.value, null, null, null, userData)
    }
    const videoKey = ref<any>()
    // 开始上传
    const startUpload = () => {
      // 然后调用 startUpload 方法, 开始上传
      if (uploader.value !== null) {
        uploader.value.startUpload()
        uploadDisabled.value = true
      }
    }
    const createUploader = () => {
      var uploaders = new (window as any).AliyunUpload.Vod({
        timeout: 60000,
        partSize: Math.round(1048576),
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'ap-northeast-1', // ap-northeast-1
        userId: '5637822018970889', // video@5637822018970889.onaliyun.com
        // 添加文件成功
        addFileSuccess: function (uploadInfo: any) {
          statusText.value = '添加文件成功, 等待上传...'
          uploadDisabled.value = false
          console.log('addFileSuccess: ' + uploadInfo.file.name)
        },
        // 开始上传
        onUploadstarted: function (uploadInfo: any) {
          console.log(uploadInfo, 'ionfo')
          statusText.value = '文件开始上传...'
          // 第一步,获取token
          getVideoToken().then((res) => {
            if (!res.result) {
              const {
                accessKeyId,
                accessKeySecret,
                securityToken: secretToken,
                fileName
              } = res.data
              // 第二步,获取授权地址, 将获取到的fileName进行拼接
              getVideoAddressToken({
                fileName: fileName + '.' + uploadInfo.file.name.split('.').pop()
              }).then((res) => {
                if (!res.result) {
                  const {
                    uploadAddress: UploadAddress,
                    uploadAuth: UploadAuth,
                    videoId: VideoId
                  } = res.data
                  console.log(res.data, 'data')
                  uploader.value.setUploadAuthAndAddress(
                    uploadInfo,
                    UploadAuth,
                    UploadAddress,
                    VideoId
                  )
                }
              })
              console.log(uploader.value.setSTSToken, 'uploader')
              uploader.value.setSTSToken(
                uploadInfo,
                accessKeyId,
                accessKeySecret,
                secretToken
              )
            }
          })
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          statusText.value = '文件上传成功!'
          fileName.value = uploadInfo.file.name
          console.log(uploadInfo, 'uploadInfo---')
          successTip('文件上传成功')
          initPlay(uploadInfo.videoId)
          emit('update:value', [
            ...props.value,
            {
              name: uploadInfo.file.name,
              url: uploadInfo.videoId
            }
          ])
          imgList.value.push({
            name: uploadInfo.file.name,
            url: uploadInfo.videoId
          })
          emit('getData', imgList.value)
          console.log(videoKey.value, 'videoKey')
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          statusText.value = '文件上传失败!'
          errorTip(message)
          isUploading.value = false
          console.log(uploader.value, 'upload')
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo: any, code: any, message: any) {
          statusText.value = '文件上传失败'
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (
          uploadInfo: any,
          totalSize: any,
          aprogress: any
        ) {
          let progressPercent = Math.ceil(aprogress * 100) + '%'
          progress.value = progressPercent
          statusText.value = '文件上传中...'
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          statusText.value = '文件超时...'
          getVideoToken().then((res) => {
            if (!res.result) {
              const {
                accessKeyId,
                accessKeySecret,
                securityToken: secretToken,
                expiration
              } = res.data
              uploader.value.resumeUploadWithSTSToken(
                accessKeyId,
                accessKeySecret,
                secretToken,
                expiration
              )
            }
          })
        },
        // 全部文件上传结束
        async onUploadEnd(uploadInfo: any) {
          statusText.value = '文件上传完毕'
          isUploading.value = false
          console.log('onUploadEnd: uploaded all the files')
        }
      })
      return uploaders
    }

    // 上传图片之前
    function beforeUpload(file: any) {
      isFirstMount.value = false
      isUploading.value = true
      fileChange(file)
    }
    // 上传完单张图片
    function onSuccess(res: any, file: any) {
      isUploading.value = false
    }

    // 上传出错
    function onError(err: any, file: any) {
      errorTip(file.name + ' 上传失败')
      isUploading.value = false
      console.log(err)
    }

    // 移除单张图片
    function onRemoveHandler(index: number) {
      infoTipBox({
        title: '文件移除',
        message: '确定删除该资源?'
      }).then(() => {
        imgList.value.splice(index, 1)
        syncElUpload()
      })
    }

    // 超限
    function onExceed() {
      // uploadRef.value.abort() // 取消剩余接口请求
      syncElUpload()
      warnTip(`图片超限，最多可上传${props.limit}张图片`)
    }

    function onDragStart(e: any) {
      e.target.classList.add('hideShadow')
    }
    function onDragEnd(e: any) {
      e.target.classList.remove('hideShadow')
    }

    function getItemKey() {
      return createUniqueString()
    }
    return {
      ossPlayerRef,
      fileName,
      isSingle,
      isUploading,
      isFirstMount,
      uploadRef,
      imgList,
      getItemKey,
      onDragEnd,
      onDragStart,
      onExceed,
      onSuccess,
      onError,
      beforeUpload,
      onRemoveHandler,
      openNewWindow,
      // 阿里云视频点播
      fileChange,
      startUpload,
      progress,
      uploadDisabled,
      statusText
    }
  }
})
</script>

<style lang="less" scoped>
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
      border-bottom-left-radius: 6px;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }

  &.disabled {
    position: relative;

    .disabledShadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(255, 255, 255, 0.4);

      &:hover {
        cursor: not-allowed;
      }
    }
  }
}

:deep(.el-upload) {
  width: 100%;
  height: 100%;
}

// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 12px;
    text-align: center;
    color: #aaa;
  }
}
</style>
