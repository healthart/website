import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sourcePresentation, metadata } from '../.vitepress/content.mjs'
import { searchPages, resultSnippet } from '../.vitepress/search.mjs'
import { readFileSync } from 'node:fs'

const page = (url, title, text, source = 'hubermanlab') => ({ url, title, text, source, label: source })

test('search groups section hits by page and ranks title matches first', () => {
  const rows = [page('/a#one', '其他', '睡眠正文'), page('/a#two', '睡眠机制', '睡眠机制正文'), page('/b', '运动', '睡眠与恢复')]
  const result = searchPages(rows, '睡眠')
  assert.equal(result.length, 2)
  assert.equal(result[0].title, '睡眠机制')
})
test('search filters sources, requires every term, and supports empty states', () => {
  const rows = [page('/a', '睡眠与运动', '恢复'), page('/b', '睡眠', '营养', 'books')]
  assert.equal(searchPages(rows, '睡眠', 'books').length, 1)
  assert.equal(searchPages(rows, '睡眠 运动').length, 1)
  assert.equal(searchPages(rows, '').length, 0)
  assert.equal(searchPages(rows, '不存在').length, 0)
})
test('search snippet comes from matching article text', () => {
  const result = resultSnippet(page('/a', '标题', '甲'.repeat(200) + '睡眠与节律' + '乙'.repeat(200)), '睡眠')
  assert.ok(result.includes('睡眠与节律'))
  assert.ok(result.length < 150)
})
test('source presentation retains official link, date, transcript and exact scientific body', () => {
  const src = readFileSync(new URL('../hubermanlab/continuation_2026-11-05_冷热暴露与代谢冬泳研究中的做法和适用边界.md', import.meta.url), 'utf8')
  const rendered = sourcePresentation(src, 'hubermanlab/episode.md')
  assert.ok(rendered.includes('class="source-info"'))
  assert.ok(rendered.includes('<details>'))
  assert.ok(rendered.includes('2026-11-05'))
  assert.ok(rendered.includes(metadata(src, 'hubermanlab/episode.md').original))
  assert.ok(rendered.includes(metadata(src, 'hubermanlab/episode.md').transcript.url))
  assert.equal(rendered.slice(rendered.indexOf('## 确定行动指南')), src.slice(src.indexOf('## 确定行动指南')))
  assert.ok(!rendered.includes('原文链接：'))
  assert.equal(metadata(src, 'hubermanlab/episode.md').kind, '精选版')
})
test('source rendering leaves books and source indices untouched', () => {
  const src = '# 测试\n\n原文链接：https://example.com/\n\n正文'
  assert.equal(sourcePresentation(src, 'books/example.md'), src)
  assert.equal(sourcePresentation(src, 'diaryofaceo/index.md'), src)
})
test('source presentation escapes text and rejects unsafe links', () => {
  const rendered = sourcePresentation('# 标题\n\n原文标题：<script>alert(1)</script>\n\n原文链接：javascript:alert(1)\n\n## 正文\n内容', 'hubermanlab/episode.md')
  assert.ok(!rendered.includes('<script>'))
  assert.ok(!rendered.includes('href="javascript:'))
})
