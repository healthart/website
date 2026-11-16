import { createContentLoader } from 'vitepress'
import { metadata, articleText } from '../content.mjs'

export default createContentLoader(['hubermanlab/*.md', 'peterattiamd/*.md', 'diaryofaceo/*.md'], {
  includeSrc: true,
  transform(pages) {
    return pages.filter(p => !/\/(?:index|new)(?:\.html)?\/?$/.test(p.url) && !p.url.endsWith('/')).map(p => {
      const src = p.src || ''
      const title = src.match(/^# (.+)$/m)?.[1] || p.frontmatter.title || ''
      const meta = metadata(src, p.url)
      const paragraphs = src.split(/^## /m)[0].split('\n').filter(s => s && !/^(#|>|原文|发布日期|转录来源|<|---)/.test(s))
      return { url: p.url, title, ...meta, detail: undefined, transcript: undefined,
        excerpt: articleText(paragraphs.join(' ')).slice(0, 120) }
    }).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
  }
})
