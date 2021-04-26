import fs from 'fs'
import util from 'util'
import { load } from 'js-yaml'

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

export async function get() {
  const dir = await readdir(`${process.cwd()}/src/routes/articles`)
  const files = await dir.reduce(async (res, file) => {
    if (file.endsWith('.md')) {
      const raw = await readFile(`${process.cwd()}/src/routes/articles/${file}`, 'utf-8')
      const front = frontmatter(raw)
      return [...await res, {
        file: file.split('.md')[0],
        ...front
      }]
    }
    return res
  }, Promise.resolve([] as { file: string, date: string }[])) 
  const body = files.sort((a, b) => {
    //@ts-ignore
    return new Date(b.date) - new Date(a.date) 
  })
  return { body }
}

function frontmatter(str) {
  const [_, fm] = str.split('---')
  const res = load(fm)
  return res
}