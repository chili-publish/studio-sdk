# editor-sdk

![Coverage](https://img.shields.io/badge/coverage-95.97%25-brightgreen.svg)

[![Build PR](https://github.com/chili-publish/editor-sdk/actions/workflows/pr-build.yml/badge.svg)](https://github.com/chili-publish/editor-sdk/actions/workflows/pr-build.yml) [![Publish Package](https://github.com/chili-publish/editor-sdk/actions/workflows/publish-package.yml/badge.svg)](https://github.com/chili-publish/editor-sdk/actions/workflows/publish-package.yml)

This is the Open Source CHILI publisher Editor SDK which will make your life easier when you’re working on and integrating the new CHILI publisher Editor.

The project is currently under active development, contributions are welcome in the form of [creating issues](https://github.com/chili-publish/editor-sdk/issues/new/choose) or in the form of actual contributions on the code. See our [CONTRIBUTING.md](https://github.com/chili-publis/editor-sdk/blob/develop/CONTRIBUTING.md) file to get started on your first contribution.

## Early Access Program

To integrate and start using the SDK, you will need to be accepted to the Early Access program, reach out to your contact @chili to receive more information. Once accepted, you will receive the needed credentials to configure and setup the SDK.

## Documentation

[Link to private zendesk](https://mysupport.chili-publish.com/hc/en-us/articles/4411254307868-E2-The-one-called-Editor-2)

[Link to the official SDK documentation on GitHub](https://chili-publish.github.io/editor-sdk/)\*

\*Note: the hosted documentation is always based on the latest version. To get the documentation of the release that you use, you can download the sourcecode of that release and open `/docs/index.html`.

## Overview

This repository includes the editor-sdk, the SDK is used to plugin to the CHILI publisher API and will handle the communication between integrations (workspace, etc) and editor engine.

The goal for the SDK is to be as lightweight as possible. We don’t want to store state in here, that would be hard to maintain and keep in sync with the engine. In general the SDK is an abstraction layer for the editor engine, providing a fixed API for the integrators, and flexibility for the engine to evolve.

Conceptually you can think of the SDK - Editor Engine relation as a client - server relation. The SDK will issue requests to the engine and expects a certain result. The other way around the analogy with WebSockets could be used to define how data flows from the engine to the SDK (and eventually consumers of the SDK).

![architecture diagram](https://user-images.githubusercontent.com/956362/155481965-1d2fe57b-11ec-4327-bbc3-5b4e03a01f28.png)

## Getting started

There are 2 ways of getting the SDK.

### NPM (with TS support)

The most easy approach would be installing it using a package manager like `npm` or `yarn` just do:

```bash
npm install --save @chili-publish/editor-sdk
```

or

```bash
yarn add @chili-publish/editor-sdk
```

Then you can easily import the SDK in your JS and TS files, but also the typing is included with this approach.

```typescript
// TS example
import EditorSDK from '@chili-publish/editor-sdk';
import type { Variable } from '@chili-publish/editor-sdk';
```

### Load script

The other way would be to include the sdk using the script tag just before the closure. of the body.

```html
<script src="https://path/to/sdk/latest/main.js"></script>
```

To really get started, there is a nice guide on [the official documentation page](https://chili-publish.github.io/editor-sdk/).
And you can find basic integration examples in [one of our other repositories](https://github.com/chili-publish/editor-sdk-integration-examples).

## Feedback?

If you have any feedback on the technical parts of the application, a feature request, a bug to report or a general technical question, don’t hesitate to [create a new issue](https://github.com/chili-publish/editor-sdk/issues/new/choose).

## License

This project is [MIT licensed](https://github.com/chili-publis/editor-sdk/blob/develop/LICENSE)
