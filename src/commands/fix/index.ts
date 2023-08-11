import {Command} from '@oclif/core'
import {sync} from 'command-exists'
import {execSync} from 'node:child_process'
import {
  SemVer,
  clean,
  lte,
  maxSatisfying,
  satisfies,
} from 'semver'
import {findPackageJson} from '../../find-package-json'

export default class Fix extends Command {
  static description =
    'Fix node version by using nvm or n based on package.json';

  static examples = [];

  static flags = {};

  static args = {};

  async run(): Promise<void> {
    await this.parse(Fix)
    const pgk = await findPackageJson()
    const versionNeeded = (pgk?.engines?.node ?? '') as string

    const hasNvm = sync('nvm')
    const hasN = sync('n')
    const hasNode = sync('node')

    if (hasNode === false) throw new Error('node not found')
    if (hasN === false && hasNvm === false)
      throw new Error('n or nvm not found')

    const nodeManager = hasN ? 'n' : 'nvm'
    const lts = execSync(`${nodeManager} ls-remote --lts`).toString()
    const allVersions = execSync(`${nodeManager} ls-remote --all`)
    .toString()
    .split('\n')
    .filter(v => {
      if (v.trim() === '') return false

      const sem = new SemVer(v)
      return lte(sem, lts)
    })

    const nodeVersion = clean(execSync('node -v').toString()) ?? ''
    const isValidNodeVersion = satisfies(nodeVersion, versionNeeded)

    const validNodeVersion = maxSatisfying(allVersions, versionNeeded)

    if (hasN && isValidNodeVersion === false) {
      this.log(`changing version with n to ${validNodeVersion}`)
      await execSync(`n ${validNodeVersion}`)
    } else if (hasNvm && isValidNodeVersion === false) {
      this.log(`changing version with nvm to ${validNodeVersion}`)
      execSync(
        `nvm install ${validNodeVersion} && nvm use ${validNodeVersion}`,
      )
    }
  }
}
