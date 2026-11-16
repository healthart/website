export const sources = {
  hubermanlab: 'Huberman Lab',
  peterattiamd: 'Peter Attia',
  diaryofaceo: 'The Diary Of A CEO',
  books: '图书与公开方案'
}

export function plain(text = '') {
  return text.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '').replace(/[*#>`_]/g, '').replace(/\s+/g, ' ').trim()
}

export function metadata(src, path) {
  const source = path.replace(/^\//, '').split('/')[0]
  const header = src.split(/^## /m)[0]
  const detail = header.match(/^> 来源状态[：:]\s*(.+)$/m)?.[1] || ''
  const original = header.match(/^原文链接[：:]\s*(\S+)/m)?.[1] || ''
  const originalTitle = header.match(/^原文标题[：:]\s*(.+)/m)?.[1] || ''
  const date = header.match(/^发布日期[：:]\s*(\d{4}-\d{2}-\d{2})/m)?.[1] || path.match(/continuation_(\d{4}-\d{2}-\d{2})/)?.[1] || ''
  const transcript = header.match(/^转录来源[：:]\s*\[([^\]]+)\]\(([^)]+)\)/m)
  let kind = '早期整理', scope = '来源信息见官方节目。'
  if (/Essentials/i.test(originalTitle) || /Essentials.*(?:全文|完整)|精选版.*(?:全文|完整)/i.test(detail)) {
    kind = '精选版'; scope = detail ? '核对本期 Essentials 精选版。' : '本期为 Essentials 精选版。'
  } else if (/仅.*(?:片段|预览)|仅覆盖|受限预览/.test(detail)) {
    kind = '片段解析'; scope = '解析范围为公开片段或预览。'
  } else if (/公开重播全文/.test(detail)) {
    kind = '公开重播'; scope = '核对本次公开重播的全文转录。'
  } else if (/完整节目转录复核/.test(detail)) {
    kind = '完整节目'; scope = '核对完整节目转录。'
  } else if (detail) {
    kind = '来源核对'; scope = plain(detail.split(/[；;]/)[0]) + '。'
  }
  return { source, label: sources[source] || source, detail, original, originalTitle, date, kind, scope,
    transcript: transcript ? { title: transcript[1], url: transcript[2] } : null }
}

export function articleText(src) {
  return plain(src.replace(/^# .+$/gm, '').replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^>.*$/gm, '')
    .replace(/^(?:原文标题|原文链接|发布日期|转录来源|原书标题|原书作者)[：:].*$/gm, ''))
}

const escape = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]))
const safeURL = (s) => /^https?:\/\//.test(s) ? escape(s) : ''

// Source text stays in Markdown for the existing discovery and content-sync tools.
// Only its presentation changes, before Markdown is parsed.
export function sourcePresentation(src, path) {
  if (!/^(hubermanlab|peterattiamd|diaryofaceo)\//.test(path) || /\/(index|new)\.md$/.test(path)) return src
  const m = metadata(src, path)
  if (!m.original) return src
  const end = src.search(/^## /m)
  let header = end < 0 ? src : src.slice(0, end)
  const body = end < 0 ? '' : src.slice(end)
  header = header.replace(/^(?:原文标题|原文链接|发布日期|转录来源)[：:].*\n?/gm, '')
    .replace(/^> 来源状态[：:].*\n?/gm, '')
  const card = `<section class="source-info" aria-label="节目信息"><div class="source-line"><a href="/${m.source}/">${escape(m.label)}</a>${m.date ? `<time datetime="${m.date}">${m.date} · 北京时间</time>` : '<span>发布日期未记录</span>'}<span class="status">${escape(m.kind)}</span></div><p>${escape(m.scope)} <a href="${safeURL(m.original)}" target="_blank" rel="noreferrer">查看官方节目 ↗</a></p><details><summary>来源与核对详情</summary><p>${escape(m.originalTitle)}</p>${m.transcript ? `<p><a href="${safeURL(m.transcript.url)}" target="_blank" rel="noreferrer">查看转录或字幕 ↗</a></p>` : ''}${m.detail ? `<p>${escape(m.detail)}</p>` : ''}</details></section>`
  return header.replace(/^(# .+)$/m, `$1\n\n${card}\n`) + body
}
