/** @typedef {{ url: string, title: string, source: string, label: string, text: string }} SearchPage */

/** @param {SearchPage[]} pages @param {string} query @param {string} source */
export function searchPages(pages, query, source = '全部') {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  const matches = pages.filter(p => source === '全部' || p.source === source)
    .filter(p => terms.every(t => (p.title + ' ' + p.text).toLocaleLowerCase().includes(t)))
    .map(p => ({ ...p, score: terms.reduce((score, t) => score + (p.title.toLocaleLowerCase().includes(t) ? 20 : 0) + (p.text.toLocaleLowerCase().includes(t) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'zh-CN'))
  // Keep a single result per page, even if future loaders add section matches.
  const seen = new Set()
  return matches.filter(p => {
    const url = p.url.split('#')[0]
    if (seen.has(url)) return false
    seen.add(url)
    return true
  })
}

/** @param {SearchPage} row @param {string} query */
export function resultSnippet(row, query) {
  const term = query.trim().split(/\s+/)[0]?.toLocaleLowerCase()
  const index = row.text.toLocaleLowerCase().indexOf(term)
  const start = Math.max(0, index - 35)
  return (start ? '…' : '') + row.text.slice(start, start + 135) + (row.text.length > start + 135 ? '…' : '')
}
