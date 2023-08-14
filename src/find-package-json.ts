import {readFileSync} from 'node:fs'
import {join, resolve} from 'node:path'

export async function findPackageJson(
  cwd?: string,
): Promise<Record<string, any> | undefined> {
  const startDir = cwd || process.env.INIT_CWD || process.cwd()
  let dir = startDir
  let prevDir
  do {
    try {
      const path = join(dir, 'package.json')
      const content = readFileSync(path, 'utf8')
      return JSON.parse(content)
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code !== 'ENOENT'
      )
        throw error
    }

    prevDir = dir
    dir = resolve(dir, '..')
  } while (prevDir !== dir)

  return undefined
}
