# nsecureconf

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/PierreDemailly/nsecureconf/main/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/PierreDemailly/nsecureconf/commit-activity)
[![mit](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://github.com/PierreDemailly/nsecureconf/blob/main/LICENSE)
![build](https://img.shields.io/github/actions/workflow/status/PierreDemailly/nsecureconf/node.js.yml?style=for-the-badge)

Manage [NodeSecure](https://github.com/NodeSecure/cli) configs

## Requirements
- [Node.js](https://nodejs.org/en/) v18 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```bash
$ npm i -g nsecureconf
```

Or use [npx](https://docs.npmjs.com/cli/v7/commands/npx).

```bash
$ npx nsecureconf <command>
```

## Usage exemple

```bash
# save existing nsecure-result.json
$ cd path/to/project
$ nsecureconf save
# use another conf already saved
$ nsecureconf pick
```

## Features

- Manage multiple `nsecure-result.json` files.
- Full interactive.
- Provide default configs

## CLI

| command | short | description |
| --- | --- | --- |
| save | s | Save a new configuration from an existing `nsecure-result.json`
| pick | p | Generate a `nsecure-result.son` from an existing configuration
| list | l | List available configurations
| delete | d | Delete a configuration
| info | i | **TODO** Show config info (dependencies count, etc)

> [!NOTE]
> Configs are stored at `~/.nsecureconf/`

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=for-the-badge)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PierreDemailly"><img src="https://avatars.githubusercontent.com/u/39910767?v=4?s=100" width="100px;" alt="PierreDemailly"/><br /><sub><b>PierreDemailly</b></sub></a><br /><a href="https://github.com/PierreDemailly/nsecureconf/commits?author=PierreDemailly" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# License
MIT
