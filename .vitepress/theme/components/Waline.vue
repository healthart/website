<template>
  <div class="waline-container">
    <div id="waline" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import { init } from '@waline/client'
import '@waline/client/style'

export default {
  name: 'Waline',
  setup() {
    const route = useRoute()
    const { isDark } = useData()
    let walineInstance = null

    const initWaline = () => {
      if (walineInstance) {
        walineInstance.update()
        return
      }
      
      walineInstance = init({
        el: '#waline',
        serverURL: 'https://waline-weld-iota.vercel.app', // 替换为你的 Waline 服务端地址
        path: route.path,
        lang: 'zh-CN',
        login: 'disable',
        dark: isDark.value,
        // 以下是可选配置项
        meta: ['mail'],
        requiredMeta: ['mail'],
        noCopyright: true,
        reaction: false,
      })
    }

    onMounted(() => {
      initWaline()
    })

    onBeforeUnmount(() => {
      if (walineInstance) {
        walineInstance.destroy()
        walineInstance = null
      }
    })

    watch(
      () => route.path,
      () => {
        // 路由变化时更新评论
        setTimeout(initWaline, 100)
      }
    )

    // 监听主题变化
    watch(
      () => isDark.value,
      (newVal) => {
        if (walineInstance) {
          walineInstance.update({
            dark: newVal
          })
        }
      }
    )
  }
}
</script>

<style>
#wl-mail {
  font-size: .8rem;
}
.waline-container {
  margin-top: 30px;
  /* background-color: #c32; */
}
.wl-panel {
  margin: 0;
  border-radius: 8px;
}
.wl-editor {
  padding: 8px;
}
</style>