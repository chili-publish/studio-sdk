# GraFx Studio Connectors

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/chili-publish/grafx-connector-template/blob/main/LICENSE)

GraFx Studio Connectors is an innovative concept that enables seamless integration with any third-party application capable of serving Studio-compliant resources. We aim to provide a solution that is simple to explain, easy to develop, and maintainable.

## 🌐 General Connector Concept

Our high-level technical goals for the Studio Connectors are:

- Written in popular and easily understood scripting languages (TS, JS).
- Capable of running connector logic in both client (browser) and server contexts.
- Secure and isolated from the browser.
- Enforces memory and CPU limits to ensure an optimal user experience.
- Small footprint with high performance.

### 📐 Schematic
![Connector Architecture Overview](./docs/assets/Connectors.png)

### 🔒 Authentication
We've decoupled authentication and authorization from the connector. You should not store application secrets or anything that allows malicious use of the API you want to connect to inside the connector code. We support several basic authentication methods:

- HTTP Header
- OAuth2 Client Credentials
- OAuth2 Resource Owner Password Credentials

You can choose an authentication method for both client (browser) and server side individually. We provide the tools for secure implementation, but the end responsibility lies with the connector author.

### QuickJs
We use [QuickJS](https://bellard.org/quickjs/) to execute all user-provided scripts, which acts as a Virtual Machine, ensuring the script can never access anything outside the VM. This allows us to restrict the available APIs to the connector developers, ensuring the connector code can safely run both on client (browser) and server (during output generation).

## Connector.js 
This repository contains examples of Typescript connectors that can be transpiled to a Javascript module. The current connector API is in version 1.0 and is the minimal APIs needed for a full-featured Media browser and things like Dynamic Asset Providers. We need your feedback! If you think you're missing critical stuff to implement your connector, let us know! Feel free to [open a ticket on the SDK repo](https://github.com/chili-publish/editor-sdk/issues/new/choose).

## Connector.json
This is the wrapper adding metadata to the connector script. This Json can be uploadded using the experimental Connector endpoints of the Environment API. Reach out to your Customer Success contacts to help you set this up. Later this year we will provide a UI to manage connectors on the GraFx platform.

## 📚 SDK Documentation
[Check out the official SDK documentation on GitHub](https://chili-publish.github.io/studio-sdk/)

## 📬 Feedback?
We'd love to hear from you! If you have any technical feedback, feature requests, bugs to report, or general technical questions, don’t hesitate to [create a new issue in the SDK repository](https://github.com/chili-publish/editor-sdk/issues/new/choose).

## 📄 License
This project is [MIT licensed](https://github.com/chili-publish/grafx-connector-template/blob/main/LICENSE).
