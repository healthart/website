<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as articles } from '../../data/catalog.data.mts'
const props = defineProps<{ source: string; featured?: string[] }>()
const query = ref('')
const limit = ref(18)
const selection = ref('全部')
const all = computed(() => articles.filter(a => a.source === props.source))
const shown = computed(() => all.value.filter(a => (!query.value || (a.title + a.excerpt).includes(query.value)) &&
  (selection.value === '全部' || a.kind === selection.value)))
const featuredArticles = computed(() => (props.featured || []).map(url => all.value.find(a => decodeURI(a.url).replace(/\.html$/, '') === url)).filter(Boolean))
</script>
<template>
  <section v-if="featuredArticles.length" aria-label="推荐阅读">
    <h2 id="recommended">从这些内容读起</h2>
    <div class="reading-grid">
      <a v-for="a in featuredArticles" :key="a.url" :href="a.url" class="reading-card compact"><span class="eyebrow">{{ a.kind }}</span><h3>{{ a.title }}</h3><span class="card-action">阅读解析 →</span></a>
    </div>
  </section>
  <section aria-label="栏目节目">
    <h2 id="episodes">节目列表</h2>
    <p class="section-note">按已收录的节目发布日期排列，早期未记录日期的内容列在后面。</p>
    <div class="catalog-tools">
      <label class="field-label">查找节目<input v-model="query" type="search" placeholder="输入主题或标题" @input="limit = 18" /></label>
      <label class="field-label">内容类型<select v-model="selection" @change="limit = 18"><option>全部</option><option v-for="kind in [...new Set(all.map(a => a.kind))]" :key="kind">{{ kind }}</option></select></label>
    </div>
    <p class="result-count" role="status">{{ shown.length }} 篇解析<span v-if="query"> · “{{ query }}”</span></p>
    <div class="episode-list">
      <article v-for="a in shown.slice(0, limit)" :key="a.url" class="episode-card">
        <div class="source-line"><time v-if="a.date" :datetime="a.date">{{ a.date }}</time><span v-else>日期未记录</span><span class="status">{{ a.kind }}</span></div>
        <h3><a :href="a.url">{{ a.title }}</a></h3>
        <p v-if="a.excerpt">{{ a.excerpt }}</p>
      </article>
    </div>
    <p v-if="!shown.length" class="empty-state">没有匹配的节目。换一个主题词，或选择“全部”内容类型。</p>
    <button v-if="shown.length > limit" class="more-button" @click="limit += 24">再显示 24 篇</button>
    <p class="section-note"><a href="/latest">查看核对记录 →</a> · 日期均为北京时间</p>
  </section>
</template>
