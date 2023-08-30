# studio-sdk

![Coverage](https://img.shields.io/badge/coverage-96.74%25-brightgreen.svg)

[![Build PR](https://github.com/chili-publish/studio-sdk/actions/workflows/pr-build.yml/badge.svg)](https://github.com/chili-publish/studio-sdk/actions/workflows/pr-build.yml) [![Publish Package](https://github.com/chili-publish/studio-sdk/actions/workflows/publish-package.yml/badge.svg)](https://github.com/chili-publish/studio-sdk/actions/workflows/publish-package.yml)

This is the Open Source GraFx Studio SDK which will make your life easier when you’re working on and integrating GraFx Studio.

The project is currently under active development, contributions are welcome in the form of [creating issues](https://github.com/chili-publish/studio-sdk/issues/new/choose) or in the form of actual contributions on the code. See our [CONTRIBUTING.md](https://github.com/chili-publish/studio-sdk/blob/develop/CONTRIBUTING.md) file to get started on your first contribution.

## Documentation

[Link to functional documentation and getting started](https://docs.chiligrafx.com)

[Link to the official SDK documentation on GitHub](https://chili-publish.github.io/studio-sdk/)\*

\*Note: the hosted documentation is always based on the latest version. To get the documentation of the release that you use, you can download the sourcecode of that release and open `/docs/index.html`.

## Overview

Welcome to our repository, which houses the Studio-SDK, a critical component designed to seamlessly integrate with GraFx Studio. This SDK plays a pivotal role in facilitating communication between various integrations such as workspaces and the core editor engine.

Our primary objective with this SDK is to maintain its lightweight nature. We are committed to avoiding state storage within the SDK, as it can complicate maintenance and synchronization with the engine. Essentially, the SDK serves as an abstraction layer for the editor engine. It delivers a consistent API for integrators while providing the engine with the flexibility to grow and adapt.

To better understand the relationship between the SDK and the Studio Engine, consider it analogous to a client-server relationship. The SDK makes requests to the engine and anticipates specific results. Conversely, the data flow from the engine to the SDK (and ultimately, to the SDK consumers) can be likened to the operation of WebSockets.

Please refer to the architecture diagram below for a visual representation of this interaction:

![architecture diagram](https://user-images.githubusercontent.com/956362/155481965-1d2fe57b-11ec-4327-bbc3-5b4e03a01f28.png)

We warmly invite developers to explore, utilize, and contribute to this project. Your involvement will help us to continually refine and enhance our SDK, ensuring it remains a robust, reliable, and efficient tool for all GraFx Studio integrations.

## Getting started

There are 2 ways of getting the SDK.

### NPM (with TS support)

The most easy approach would be installing it using a package manager like `npm` or `yarn` just do:

```bash
npm install --save @chili-publish/studio-sdk
```

or

```bash
yarn add @chili-publish/studio-sdk
```

Then you can easily import the SDK in your JS and TS files, but also the typing is included with this approach.

```typescript
// TS example
import EditorSDK from '@chili-publish/studio-sdk';
import type { Variable } from '@chili-publish/studio-sdk';
```

### Load script

The other way would be to include the sdk using the script tag just before the closure. of the body.

```html
<script src="https://path/to/sdk/latest/main.js"></script>
```

To really get started, there is a nice guide on [the official documentation page](https://chili-publish.github.io/studio-sdk/).
And you can find basic integration examples in [one of our other repositories](https://github.com/chili-publish/studio-sdk-integration-examples).

## Contribute?

See [CONTRIBUTING.md](https://github.com/chili-publish/studio-sdk/blob/main/CONTRIBUTING.md) for more information on how to contribute to this project.

## Feedback?

If you have any feedback on the technical parts of the application, a feature request, a bug to report or a general technical question, don’t hesitate to [create a new issue](https://github.com/chili-publish/studio-sdk/issues/new/choose).

## License

This project is [MIT licensed](https://github.com/chili-publish/studio-sdk/blob/main/LICENSE)
