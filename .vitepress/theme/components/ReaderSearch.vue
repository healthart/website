<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vitepress'
import { searchPages, resultSnippet } from '../../search.mjs'
type SearchPage = Parameters<typeof searchPages>[0][number]
const router = useRouter()
const dialog = ref<HTMLDialogElement>()
const input = ref<HTMLInputElement>()
const trigger = ref<HTMLButtonElement>()
const query = ref('')
const source = ref('全部')
const rows = ref<SearchPage[]>([])
const ready = ref(false)
const failed = ref(false)
const active = ref(0)
const limit = ref(40)
const sources = [['全部', '全部栏目'], ['hubermanlab', 'Huberman Lab'], ['peterattiamd', 'Peter Attia'], ['diaryofaceo', 'Diary Of A CEO'], ['books', '图书与方案']]
const results = computed(() => searchPages(rows.value, query.value, source.value))
async function load() {
  failed.value = false
  try { rows.value = (await import('../../data/search.data.mts')).data; ready.value = true }
  catch { failed.value = true }
}
async function open() {
  if (!dialog.value?.open) dialog.value?.showModal()
  await nextTick()
  input.value?.focus()
  if (!ready.value) load()
}
function close() { dialog.value?.close(); trigger.value?.focus() }
function reset() { active.value = 0; limit.value = 40 }
async function navigate(event: KeyboardEvent) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    active.value = Math.max(0, Math.min(Math.min(limit.value, results.value.length) - 1, active.value + (event.key === 'ArrowDown' ? 1 : -1)))
    await nextTick()
    document.getElementById('search-result-' + active.value)?.scrollIntoView({ block: 'nearest' })
  } else if (event.key === 'Enter' && results.value[active.value]) {
    event.preventDefault(); router.go(results.value[active.value].url); close()
  }
}
function hotkey(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); open() }
}
onMounted(() => window.addEventListener('keydown', hotkey))
onBeforeUnmount(() => window.removeEventListener('keydown', hotkey))
</script>
<template>
  <button ref="trigger" class="reader-search-trigger" aria-label="搜索全站内容" aria-haspopup="dialog" @click="open"><span aria-hidden="true">⌕</span> 搜索</button>
  <dialog ref="dialog" class="reader-search" aria-labelledby="reader-search-title" @click="e => { if (e.target === dialog) close() }" @close="trigger?.focus()">
    <div class="search-heading"><h2 id="reader-search-title">搜索健康知识</h2><button class="text-button" @click="close">关闭</button></div>
    <label class="field-label">主题或关键词<input ref="input" v-model="query" type="search" placeholder="搜索睡眠、训练、营养……" autocomplete="off" aria-controls="search-results" @input="reset" @keydown="navigate" /></label>
    <label class="field-label search-source">来源栏目<select v-model="source" @change="reset"><option v-for="s in sources" :key="s[0]" :value="s[0]">{{ s[1] }}</option></select></label>
    <p v-if="failed" role="alert">搜索内容加载失败。<button class="text-button" @click="load">重新加载</button></p>
    <p v-else-if="!ready" role="status">正在加载搜索内容……</p>
    <p v-else class="result-count" role="status">{{ query.trim() ? `找到 ${results.length} 篇内容` : '输入关键词查找文章和图书' }}</p>
    <ul id="search-results" class="search-results" aria-label="搜索结果">
      <li v-for="(r, i) in results.slice(0, limit)" :key="r.url"><a :id="'search-result-' + i" :href="r.url" :class="{ selected: i === active }" :aria-current="i === active ? 'true' : undefined" @click="close" @focus="active = i"><span class="eyebrow">{{ r.label }}</span><h3>{{ r.title }}</h3><p>{{ resultSnippet(r, query) }}</p></a></li>
    </ul>
    <p v-if="ready && query.trim() && !results.length" class="empty-state">没有找到“{{ query }}”。换一个关键词，或选择“全部栏目”。</p>
    <button v-if="results.length > limit" class="more-button" @click="limit += 40">显示更多结果</button>
    <p class="search-help">↑ ↓ 选择结果 · 回车打开 · 退出键关闭</p>
  </dialog>
</template>
