import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { searchPages, resultSnippet } from '../.vitepress/search.mjs'

const root = resolve('.vitepress/dist')
const routes = ['index.html', 'start.html', 'hubermanlab/index.html', 'peterattiamd/index.html', 'diaryofaceo/index.html', 'latest.html', 'books/index.html', 'books/protocols-huberman.html', 'hubermanlab/continuation_2026-11-05_冷热暴露与代谢冬泳研究中的做法和适用边界.html', 'about.html']
const read = file => readFileSync(resolve(root, file), 'utf8')

test('reading entry pages build and their local links and images resolve', () => {
  for (const route of routes) {
    const html = read(route)
    for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      const url = match[1].replace(/&amp;/g, '&')
      if (/^(https?:|mailto:|data:|javascript:|#)/.test(url)) continue
      const path = decodeURIComponent(url.split(/[?#]/)[0])
      if (!path) continue
      const target = resolve(path.startsWith('/') ? root : dirname(resolve(root, route)), path.replace(/^\//, ''))
      assert.ok([target, target + '.html', resolve(target, 'index.html')].some(existsSync), `${route}: missing ${url}`)
    }
    assert.ok(!html.includes('On this page'))
    assert.ok(!html.includes('>Appearance<'))
    assert.ok(!html.includes('aria-label="mobile navigation"'))
    assert.ok(!html.includes('Sidebar Navigation'))
    assert.ok(html.includes('© 2025–2026 Health Art'))
    assert.ok(!html.includes('class="pager-link'))
  }
})
test('programme roots are catalogues and review records render as 40 cards', () => {
  for (const source of ['hubermanlab', 'peterattiamd', 'diaryofaceo']) {
    const html = read(`${source}/index.html`)
    assert.equal((html.match(/class="episode-card"/g) || []).length, 18)
    assert.equal((html.match(/reading-card compact/g) || []).length, 3)
  }
  const review = read('latest.html')
  assert.equal((review.match(/episode-card review-card/g) || []).length, 40)
  assert.ok(!review.includes('<table'))
  assert.ok(review.includes('付费 · 无正文'))
})
test('book graphics and the corrected bold sentence survive the build', () => {
  const book = read('books/protocols-huberman.html')
  assert.ok(book.includes('<strong>适应信号在训练期间就会启动，之后的修复和重塑继续进行。</strong>'))
  assert.ok(!book.includes('**适应信号'))
  for (let i = 1; i <= 7; i++) assert.ok(book.includes(`fig-h0${i}.png`))
  assert.equal((read('books/index.html').match(/class="book-index-item"/g) || []).length, 12)
  assert.ok(!read('books/index.html').includes('旧稿 · 待核对'))
  assert.ok(!read('books/index.html').includes('class="old-book-card"'))
  assert.ok(!read('books/index.html').includes('<ul class="book-index">'))
  assert.ok(existsSync(resolve(root, 'favicon.ico')))
})
test('built search index returns unique sleep pages, useful snippets and source filters', async () => {
  const name = readdirSync(resolve(root, 'assets/chunks')).find(n => n.startsWith('search.data.'))
  const { data } = await import('data:text/javascript;base64,' + Buffer.from(readFileSync(resolve(root, 'assets/chunks', name), 'utf8')).toString('base64'))
  assert.equal(new Set(data.map(p => p.url)).size, data.length)
  const results = searchPages(data, '睡眠')
  assert.ok(results.length > 20)
  assert.ok(results.every(r => resultSnippet(r, '睡眠').length > 10))
  for (const source of ['hubermanlab', 'peterattiamd', 'diaryofaceo', 'books']) {
    const filtered = searchPages(data, '睡眠', source)
    assert.ok(filtered.length > 0)
    assert.ok(filtered.every(r => r.source === source))
  }
  console.log(`Built search: ${data.length} pages; 睡眠: ${results.length} unique pages`)
})
