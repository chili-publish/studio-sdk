# editor-components

This repository includes the editor-sdk, the SDK is used to plugin to the Chili Publisher API and will handle the communication between workspace (React) and editor (Flutter).

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
