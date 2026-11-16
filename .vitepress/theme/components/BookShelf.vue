<script setup lang="ts">
const featured = [
  { title: 'Protocols', subtitle: '7 章图解 · 47 条方案', status: '全书解析', note: '依据完整英文电子书与注释整理。', cover: 'cover-protocols-en.jpg', url: '/books/protocols-huberman#illustrated-guide' },
  { title: '超越百岁', subtitle: '17 章图解 · 长寿与生活质量', status: '逐章导读', note: '对照所提供的中文电子书，医学机制另行核对。译文版本未确认。', cover: 'cover-outlive-cn.jpg', url: '/books/Outlive: The Science and Art of Longevity' }
]
const old = [
  { title: '良好的能量', en: 'Good Energy', url: 'Good Energy: The Surprising Connection Between Metabolism and Limitless Health' },
  { title: '绝佳时间', en: 'Life Time', url: 'Life Time: The New Science of the Body Clock, and How It Can Revolutionize Your Sleep and Health' },
  { title: '我们为什么要睡觉', en: 'Why We Sleep', url: 'Why We Sleep: Unlocking the Power of Sleep and Dreams' },
  { title: '高级马拉松训练', en: 'Advanced Marathoning', url: 'Advanced Marathoning- 2nd Edition' },
  { title: '战斗细胞', en: 'Immune', url: 'Immune: A Journey into the Mysterious System That Keeps You Alive' },
  { title: '肠子的小心思', en: 'Darm mit Charme', url: 'Darm mit Charme: Alles uber ein unterschatztes Organ' },
  { title: '仿制药的真相', en: 'Bottle of Lies', url: 'Bottle of Lies: The Inside Story of the Generic Drug Boom' },
  { title: '疗愈的饮食与断食', en: 'Healing Diet, Healing Fast', url: 'Healing Diet, Healing Fast' },
  { title: '贪婪的多巴胺', en: 'The Molecule of More', url: 'The Molecule of More' },
  { title: '成瘾', en: 'Dopamine Nation', url: 'Dopamine Nation' },
  { title: '成瘾的深渊', en: 'Never Enough', url: 'Never Enough: The Neuroscience and Experience of Addiction' },
  { title: '思维漫游', en: 'Mindwandering', url: 'Mindwandering' }
]
</script>
<template>
  <h2 id="illustrated-books">逐章图解</h2>
  <div class="book-grid">
    <a v-for="b in featured" :key="b.url" :href="encodeURI(b.url)" class="book-card"><img :src="'/images/books/longevity-reading/' + b.cover" :alt="'《' + b.title + '》封面'" width="160" height="225" /><div><span class="status">{{ b.status }}</span><h3>{{ b.title }}</h3><p>{{ b.subtitle }}</p><p class="section-note">{{ b.note }}</p><span class="card-action">阅读图解 →</span></div></a>
  </div>
  <h2 id="public-protocol">公开方案</h2>
  <a class="reading-card protocol-card" href="/books/huberman-protocol/foundational-fitness"><div class="book-type" aria-hidden="true">一周<br />训练计划</div><div><span class="status">已核对官方资料</span><h3>Huberman 基础健身 Protocol</h3><p>力量、耐力与恢复的周安排，逐项对照官方通讯和计划 PDF。</p><span class="card-action">阅读方案 →</span></div></a>
  <h2 id="early-outlines">书籍旧稿</h2>
  <div class="book-index">
    <a v-for="b in old" :key="b.url" :href="'/books/' + encodeURI(b.url)" class="book-index-item">
      <h3>{{ b.title }}</h3>
      <p>{{ b.en }}</p>
    </a>
  </div>
</template>
