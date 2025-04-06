<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href?: string
  noIcon?: boolean
  target?: string
  rel?: string
}>()

const altText = computed(() => {
  return `导航到该页面`
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="rel"
    :alt="altText"
    class="vp-link"
  >
    <slot />
  </a>
  <span v-else class="vp-link">
    <slot />
  </span>
</template>

<style scoped>
.VPLink {
  background-color: #c32;
  display: block;
  padding: 6px 0;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s;
}

.vp-link:hover {
  color: var(--vp-c-brand);
}
</style>
