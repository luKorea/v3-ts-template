<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header
          class="page-header"
          :style="{ backgroundColor: navHeaderBgColor }"
        >
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <nav-tags></nav-tags>
        <el-main class="page-content">
          <!-- <el-card> -->
          <transition
            appear
            appear-active-class="animate__animated animate__pulse"
            enter-active-class="animate__animated animate__fadeIn"
            name="fade"
          >
            <router-view v-slot="{ Component }">
              <keep-alive v-if="$route.meta.cache">
                <component :is="Component"></component>
              </keep-alive>
              <component :is="Component" v-else></component>
              <!-- <component
                :is="Component"
                v-if="$route.meta.cache == 0"
              ></component> -->
            </router-view>
          </transition>
          <!-- </el-card> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import NavTags from '@/components/nav-tags'
import { handleChangeEnv } from '@/utils'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    NavTags
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    const store = useStore()
    const navHeaderBgColor = computed(() => {
      return handleChangeEnv(store.state.login.userInfo.env).color
    })

    return {
      isCollapse,
      handleFoldChange,
      navHeaderBgColor
    }
  }
})
</script>

<style scoped lang="less">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 96px);
  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  // background: linear-gradient(90deg, #a9c9ff, #ffbbec);
  color: #fff;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
