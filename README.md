node-package-version
=================

This is small tool will check the engines.node version and uses nvm or n to install the latest version matching the string.
If it's a pretty open range like >=18.0.0 for example. It will determine and install node LTS.  


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g node-package-version
$ npv COMMAND
running command...
$ npv (--version)
node-package-version/0.0.0 darwin-x64 node-v18.17.1
$ npv --help [COMMAND]
USAGE
  $ npv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`npv fix`](#npv-fix)
* [`npv help [COMMANDS]`](#npv-help-commands)

## `npv fix`

Fix node version by using nvm or n based on package.json

```
USAGE
  $ npv fix

DESCRIPTION
  Fix node version by using nvm or n based on package.json

EXAMPLES
  $ oex fix
```

_See code: [dist/commands/fix/index.ts](https://github.com/tzdesign/node-package-version/blob/v0.0.0/dist/commands/fix/index.ts)_

## `npv help [COMMANDS]`

Display help for npv.

```
USAGE
  $ npv help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for npv.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.15/src/commands/help.ts)_
<!-- commandsstop -->
