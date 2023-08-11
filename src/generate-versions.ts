import {lte, inc, minVersion, SemVer} from 'semver'

export function generateVersions(
  startVersion: string,
  endVersion: string,
): string[] {
  const versions = []
  let currentVersion = minVersion(startVersion)

  while (currentVersion && lte(currentVersion.version, endVersion)) {
    versions.push(currentVersion.format())

    const newCurrent =
      currentVersion.patch === 100 ?
        inc(currentVersion, 'minor') :
        (currentVersion.minor === 100 ?
          inc(currentVersion, 'major') :
          inc(currentVersion, 'patch'))

    if (newCurrent) {
      currentVersion = new SemVer(newCurrent) // Convert to SemVer object
    }
  }

  return versions
}
