// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Waline from './components/Waline.vue'
import CustomSidebarLink from './components/CustomSidebarLink.vue'
import YouTube from './components/YouTube.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Waline),
      'sidebar-nav-before': () => h(CustomSidebarLink)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 覆盖默认的 VPLink 组件
    app.component('VPLink', CustomSidebarLink)
    app.component('Waline', Waline)
    app.component('YouTube', YouTube)
  }
} satisfies Theme
