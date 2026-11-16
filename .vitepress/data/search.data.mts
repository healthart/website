import { createContentLoader } from 'vitepress'
import { sources, articleText } from '../content.mjs'

export default createContentLoader(['hubermanlab/*.md', 'peterattiamd/*.md', 'diaryofaceo/*.md', 'books/**/*.md'], {
  includeSrc: true,
  transform(pages) {
    return pages.filter(p => !p.url.endsWith('/') && !/\/(?:new|index)(?:\.html)?$/.test(p.url) && p.frontmatter.search !== false)
      .map(p => ({ url: p.url, title: p.src?.match(/^# (.+)$/m)?.[1] || p.frontmatter.title,
        source: p.url.split('/')[1], label: sources[p.url.split('/')[1]], text: articleText(p.src || '') }))
  }
})
