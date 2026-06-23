// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { useData, type Theme } from 'vitepress'
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
  setup() {
    if (typeof window === 'undefined') return
    if (window.location.pathname !== '/diaryofaceo/' && window.location.pathname !== '/diaryofaceo') return

    const { site } = useData()
    const navItems = site.value.themeConfig?.nav || []
    const diaryItem = navItems.find((item: { text?: string; link?: string }) => item.text === 'Diary Of A CEO')
    if (diaryItem?.link) window.location.replace(diaryItem.link + window.location.search + window.location.hash)
  },
  enhanceApp({ app, router, siteData }) {
    // 覆盖默认的 VPLink 组件
    app.component('VPLink', CustomSidebarLink)
    app.component('Waline', Waline)
    app.component('YouTube', YouTube)

    const redirectDiaryRoot = (to: string) => {
      if (typeof window === 'undefined') return false
      const targetUrl = new URL(to, window.location.origin)
      if (targetUrl.pathname !== '/diaryofaceo/' && targetUrl.pathname !== '/diaryofaceo') return false

      const navItems = siteData.value.themeConfig?.nav || []
      const diaryItem = navItems.find((item: { text?: string; link?: string }) => item.text === 'Diary Of A CEO')
      const target = diaryItem?.link
      if (!target || target === targetUrl.pathname) return false

      window.location.replace(target + targetUrl.search + targetUrl.hash)
      return true
    }

    const previousBeforeRouteChange = router.onBeforeRouteChange
    router.onBeforeRouteChange = async (to) => {
      if (redirectDiaryRoot(to)) return false
      return previousBeforeRouteChange?.(to)
    }
  }
} satisfies Theme
