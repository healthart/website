<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as records } from '../../data/reviews.data.mts'
const source = ref('全部')
const filtered = computed(() => records.filter(r => source.value === '全部' || r.source === source.value))
</script>
<template>
  <label class="field-label review-filter">节目来源<select v-model="source"><option>全部</option><option v-for="s in [...new Set(records.map(r => r.source))]" :key="s">{{ s }}</option></select></label>
  <p class="result-count" role="status">{{ filtered.length }} 条记录 · 发布日期均为北京时间</p>
  <div class="review-list">
    <article v-for="r in filtered" :key="r.official" class="episode-card review-card">
      <div class="source-line"><span>{{ r.source }}</span><time :datetime="r.date">{{ r.date }}</time></div>
      <h2><a v-if="r.url" :href="r.url">{{ r.title }}</a><span v-else>{{ r.title }}</span></h2>
      <div class="review-actions"><span class="status">{{ r.status }}</span><a :href="r.official" target="_blank" rel="noreferrer">官方节目 ↗</a></div>
      <details><summary>核对范围与原文标题</summary><p>{{ r.detail }}</p><p lang="en">{{ r.officialTitle }}</p></details>
    </article>
  </div>
</template>
