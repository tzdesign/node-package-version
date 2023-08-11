import {Command} from '@oclif/core'
import {sync} from 'command-exists'
import {execSync} from 'node:child_process'
import {clean, maxSatisfying, minVersion, satisfies} from 'semver'
import {findPackageJson} from '../../find-package-json'
import {generateVersions} from '../../generate-versions'

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

    const lts = execSync(`${hasN ? 'n' : 'nvm'} ls-remote --lts`).toString()
    const nodeVersion = clean(execSync('node -v').toString()) ?? ''
    const isValidNodeVersion = satisfies(nodeVersion, versionNeeded)
    const minNodeVersion = minVersion(versionNeeded)

    const validNodeVersion = maxSatisfying(
      generateVersions(minNodeVersion?.version ?? '16.0.0', lts),
      versionNeeded,
    )
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
