# Contributing

Hi there! We're thrilled that you'd like to contribute to our SDK. We definitely could use your help to keep this SDK great.

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

Sure, here's a more detailed yet concise version of the setup instructions in markdown format:

## Local Development Setup

This section provides a step-by-step guide on how to set up this project for local development.

### Prerequisites

Before you begin, ensure you have the following software installed on your local machine:

* Node.js: This is the runtime environment that will allow you to execute the project. You can download it from [here](https://nodejs.org/).
* Yarn: This is the package manager we use for managing project dependencies. If you haven't installed Yarn already, you can do so globally by running the following command in your terminal:

```bash
npm install -g yarn
```

### Building the SDK

To create a release build of the SDK, use the command `yarn build`. If you want to start a development build and server, use `yarn start`.

### Building the Documentation

After installing all the necessary dependencies, you can build the Typedoc documentation. This will generate a detailed description of the project's types and interfaces. To do this, simply run the following command:

```bash
npx typedoc --hideBreadcrumbs
```

We hope these instructions make your setup process smooth and straightforward. Happy coding!

## Submitting a pull request

1. [Fork](https://github.com/chili-publish/studio-sdk/fork) and clone this repository
2. Create a new branch: `git checkout -b my-branch-name` \*
3. Make your change and remember to add tests
4. Build the project locally and run local tests
5. Push to your fork and [submit a pull request](https://github.com/chili-publish/studio-sdk/compare)
6. Pat yourself on the back and wait for your pull request to be reviewed and get merged.

\*replace my-branch-name with something specific. We use the prefixes fix and feature in our branches to indicate what they represent. An example for a branch that fixes a bug in playAnimation f.e. could be `fix/play-animation-fixdescription`

## Acceptance criteria

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

-   Write tests.
-   Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, submit them as separate pull requests.
-   Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).
-   Prefix the title with [Fix] or [Feature] to describe what the scope is

## Resources

-   [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
-   [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
-   [GitHub Help](https://help.github.com/)
