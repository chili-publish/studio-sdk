# editor-sdk

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
