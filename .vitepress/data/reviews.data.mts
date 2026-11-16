import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
export default {
  watch: ['../../latest.md'],
  load() {
    return readFileSync(resolve(process.cwd(), 'latest.md'), 'utf8').split('\n')
      .filter(line => /^\| \d{4}-\d{2}-\d{2} \|/.test(line)).map(line => {
        const cells = line.replace(/\\\|/g, '∣').split('|').slice(1, -1).map(x => x.trim())
        const official = cells[2].match(/\[([^\]]+)\]\(([^)]+)\)/)!
        const local = cells[3].match(/\[([^\]]+)\]\(([^)]+)\)/)
        const file = local ? resolve(process.cwd(), decodeURI(local[2].slice(1)) + '.md') : ''
        const title = /\/ama90\//.test(official[2]) ? 'AMA 90：禁食、生酮、药物、全身 MRI 与运动观点更新' : file ? readFileSync(file, 'utf8').match(/^# (.+)$/m)?.[1] : official[1]
        const status = /付费 AMA/.test(cells[3]) ? '付费 · 无正文' : /回链/.test(cells[3]) ? '片段 · 回链' : /Essentials/.test(cells[3]) ? '精选版 · 已核对' : /仅按本期精选/.test(cells[3]) ? '片段 · 已核对' : '全文 · 已核对'
        return { date: cells[0], source: cells[1], title, officialTitle: official[1].replace(/∣/g, '|'), official: official[2], url: local?.[2], status, detail: local?.[1] || cells[3] }
      })
  }
}
