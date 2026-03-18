# lrapi

## Contents

- [Requirements](#requirements)
- [Configuration](#configuration)
- [Api Routes](#api-routes)

## Requirements

Most requirements to run this project, are included in the `package.json` file. These can be installed with either `npm install`, `yarn install`, or your package manager of choice.

##### Requirements through the package manager

- chalk - version in project: 5.6.2,
- express - version in project: 5.2.1
- tedious - version in project: 19.2.1

##### Requirements for building

- typescript

##### Requirements for developing

- @types/express
- @types/node

## Configuration

Configuration is done via a `.json` file within the userfolder of your operating system. A sample config will be found at the root of this repository.

- Windows: `$USERPROFILE/lrapi/lrapi.json`
- POSIX: `$HOME/lrapi/lrapi.json`
