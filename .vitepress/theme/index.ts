import { h, onMounted, nextTick, watch } from 'vue'
import { useData, useRoute, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Waline from './components/Waline.vue'
import YouTube from './components/YouTube.vue'
import ReaderSearch from './components/ReaderSearch.vue'
import SiteFooter from './components/SiteFooter.vue'
import SourceCatalog from './components/SourceCatalog.vue'
import ReviewRecords from './components/ReviewRecords.vue'
import BookShelf from './components/BookShelf.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const { frontmatter } = useData()
      return () => h(DefaultTheme.Layout, null, {
        'nav-bar-content-before': () => h(ReaderSearch),
        'doc-after': () => frontmatter.value.comments === false ? null : h(Waline),
        'layout-bottom': () => h(SiteFooter)
      })
    }
  },
  setup() {
    const route = useRoute()
    // These two accessibility labels are hardcoded in VitePress 1.6.
    const localize = async () => {
      await nextTick()
      document.querySelector('.VPNavBarHamburger')?.setAttribute('aria-label', '打开或收起导航')
      document.querySelector('.VPNavBarExtra button')?.setAttribute('aria-label', '更多选项')
      const sidebarLabel = document.querySelector('#sidebar-aria-label')
      if (sidebarLabel) sidebarLabel.textContent = '栏目导航'
    }
    onMounted(localize)
    watch(() => route.path, localize)
  },
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
    app.component('SourceCatalog', SourceCatalog)
    app.component('ReviewRecords', ReviewRecords)
    app.component('BookShelf', BookShelf)
  }
} satisfies Theme
