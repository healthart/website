<template>
  <div class="custom-sidebar">
    <div class="sidebar-content">
      <template v-for="(group, index) in sidebarData" :key="index">
        <div class="sidebar-group">
          <div 
            class="group-title" 
            :class="{ 'collapsed': group.collapsed }"
            @click="toggleGroup(index)"
          >
            <span class="group-icon">
              <svg v-if="group.collapsed" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" stroke-width="1.5" fill="none"/>
              </svg>
              <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
              </svg>
            </span>
            {{ group.text }}
          </div>
          <div class="group-items" v-show="!group.collapsed">
            <template v-for="item in group.items" :key="item.link">
              <a 
                :href="item.link" 
                class="sidebar-link"
                :class="{ 'active': isActive(item.link) }"
              >
                <span class="link-text">----{{ item.text }}</span>
                <span v-if="item.new" class="new-badge">NEW</span>
              </a>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

interface SidebarItem {
  text: string
  link: string
  new?: boolean
}

interface SidebarGroup {
  text: string
  collapsed: boolean
  items: SidebarItem[]
}

const { site, page } = useData()
const route = useRoute()

// 侧边栏数据状态
const sidebarData = ref<SidebarGroup[]>([])

// 从VitePress配置中获取侧边栏数据
const getSidebarConfig = (): any[] => {
  const themeConfig = site.value.themeConfig
  const sidebar = themeConfig?.sidebar
  
  if (!sidebar) return []
  
  // 根据当前路径获取对应的侧边栏配置
  const currentPath = route.path
  let sidebarConfig: any[] = []
  
  // 查找匹配的侧边栏配置
  for (const [path, config] of Object.entries(sidebar)) {
    if (currentPath.startsWith(path)) {
      sidebarConfig = Array.isArray(config) ? config : []
      break
    }
  }
  
  return sidebarConfig
}

// 切换分组展开/折叠状态
const toggleGroup = (index: number) => {
  if (sidebarData.value[index]) {
    sidebarData.value[index].collapsed = !sidebarData.value[index].collapsed
  }
}

// 检查链接是否为当前活跃链接
const isActive = (link: string) => {
  return route.path === link
}

// 初始化侧边栏数据
onMounted(() => {
  const config = getSidebarConfig()
  sidebarData.value = config.map((group: any) => ({
    text: group.text,
    collapsed: group.collapsed || false,
    items: group.items || []
  }))
})
</script>

<style scoped>
.custom-sidebar {
  padding: 16px 0;
  border-right: 1px solid var(--vp-c-divider);
  height: 100%;
  overflow-y: auto;
}

.sidebar-content {
  padding: 0 24px;
}

.sidebar-group {
  margin-bottom: 16px;
}

.group-title {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
  cursor: pointer;
  user-select: none;
  transition: color 0.25s;
}

.group-title:hover {
  color: var(--vp-c-brand);
}

.group-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
  transition: transform 0.25s;
}

.group-items {
  margin-left: 20px;
  border-left: 1px solid var(--vp-c-divider-light);
}

.sidebar-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.25s;
  margin: 2px 0;
  position: relative;
}

.sidebar-link:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-default-soft);
}

.sidebar-link.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-soft);
  font-weight: 500;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--vp-c-brand);
}

.link-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.new-badge {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
  animation: pulse 2s infinite;
  margin-left: 8px;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
  }
  50% {
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.5);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar-content {
    padding: 0 16px;
  }
  
  .sidebar-link {
    padding: 8px 12px;
  }
  
  .link-text {
    font-size: 13px;
  }
}
</style>
