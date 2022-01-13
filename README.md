# editor-sdk

![Statements](https://img.shields.io/badge/statements-81.6%25-yellow.svg) ![Branches](https://img.shields.io/badge/branches-67.55%25-red.svg) ![Functions](https://img.shields.io/badge/functions-74.53%25-red.svg) ![Lines](https://img.shields.io/badge/lines-81.92%25-yellow.svg)

[![Build PR](https://github.com/chili-publish/editor-sdk/actions/workflows/pr-build.yml/badge.svg)](https://github.com/chili-publish/editor-sdk/actions/workflows/pr-build.yml) [![Publish Package](https://github.com/chili-publish/editor-sdk/actions/workflows/publish-package.yml/badge.svg)](https://github.com/chili-publish/editor-sdk/actions/workflows/publish-package.yml)


This repository includes the editor-sdk, the SDK is used to plugin to the Chili Publisher API and will handle the communication between workspace (React) and editor (Flutter).

## Versioning

Versioning is handled automatically, but you can have a say in what version needs to be updated by including following words in the title of your PR:
- Fix or FIX: updates the patch version (when you add a minor fix without breaking changes) This is the default too
- Feature or FEATURE: updates the minor version (when you add a new feature / call for example)
- Breaking or BREAKING: updates the major version (only use this when there will be compatibility issues with previous versions)

## Publish package

be sure to add your Github Personal Access token to your local .npmrc file (npmrc file for windows, ~/.npmrc for mac and linux)

### Login to the chili organization

`npm login --scope=@chili-publish --registry=https://npm.pkg.github.com`

also make sure to change the version of the package

### Publish when done

`yarn build`
then
`npm publish`

## Scripts

### Make production build

`yarn build`

### Run linter

`yarn lint`
