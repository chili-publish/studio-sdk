# EDITOR-SDK GETTING STARTED

In this overview, we provide you with a small guide which should get you started on working / integrating with the SDK.
After the getting started is working, you can look further at the documentation to search for methods and listers that you need.
If you have any questions, do not hesitate to reach out to any of the chili team-members.

Happy coding and enjoy the **spicy** ride.

## General Structure

The SDK consist of controllers which are individual Javascript classes and methods of these classes.
Currently there are 7 different controllers:

-   AnimationController
-   FrameController
-   LayoutController
-   UtilsController
-   DocumentController
-   VariableController
-   ToolController

These controllers are exposing the methods for each part of the document in a structured way, you can get a more detailed overview of all methods in the modules itself.

<br/>

## Getting started

This will get you started on integrating the sdk in your own application.
We don't want to opinionate the stack you use, so for the examples we start from a vanilla stack using only html and JavaScript, but the use of TypeScript is strongly encouraged and fully supported. The types are also bundled together with the code.

If you want an example on integration with React, we can help you out as well, just reach out.

<br/>

### Initialise the SDK

There are 2 ways of including the SDK, you can use npm or yarn:

#### Using a package manager

The most easy approach would be installing it using a package manager like `npm` or `yarn` just do:

```bash
npm install --save @chili-publish/editor-sdk
```

or

```bash
yarn add @chili-publish/editor-sdk
```

Then you can easily import the SDK in your JS and TS files, but also the typing is included with this approach.

Example in `integration.js`:

```typescript
// TS example
import EditorSDK from '@chili-publish/editor-sdk';
import type { Variable } from '@chili-publish/editor-sdk';
```

If you want to pin yourself to a certain version of the SDK you can add one of our tags at the end. f.e. `npm install --save @chili-publish/editor-sdk@v0.0.1`.
To check our versions and tags, go to [our package on npmjs ](https://www.npmjs.com/package/@chili-publish/editor-sdk/v/0.47.1?activeTab=versions) or take [the title of our github release](https://github.com/chili-publish/editor-sdk/releases), this is always in sync with the tagname that is used.

#### Using the script tag

Once you have received access to the SDK, you will receive a link the SDK javascript file that you need to include inside your html.

We recommend including the script in a script tag, right before the closing tag of the body (`</body>`) but keep in mind that your integration script should come below the SDK inclusion.

Example in `index.html`:

```html
<html>
    <head>
        {# all of your head metadata and stylesheets should come here #}
    </head>
    <body>
        <h1>My first integration</h1>
        {# all of your custom html #}
        <script src="https://path/to/sdk/latest/main.js"></script>
        <script src="integration.js"></script>
    </body>
</html>
```

In the integration script we then need to initialise the SDK with certain parameters and values.

Example in `integration.js`:

```javascript
const sdk = new EditorSDK({
    editorLink: 'https://link/to/the/editor', // Will be provided
    editorId: 'chili-editor-example', // if not provided, default will be 'chili-editor'
});
```

The SDK is now initialised and ready to be used.
If you want to make the SDK available in the console you can bind the sdk property to the window, this can be handy, but this isn't necessary.

Example in `integration.js`:

```javascript
window.SDK = sdk;

// or it can be done in one go:
window.SDK = new EditorSDK({
    // ... see example above
});
```

<br/>

### Get an instance of the editor on your page

As you will see, there is no editor yet in your application, therefore you'll need to give the SDK the command to load the editor dynamically in your html. The `editorId` you provided or the default one, will be used as a target of where the editor will be injected, so you need to create an (preferably) empty `<div>` with the same id as used for editorId or the default id.

Example in `index.html`:

```html
{# all of the html above #}
<h1>My first integration</h1>

<div id="chili-editor-example"></div>

{# all of your custom html #}

<script src="https://path/to/sdk/latest/main.js"></script>
{# all of the html below #}
```

The SDK should also be aware that there is now room in the html for injecting the editor, so you should call the `loadEditor` method in your integration script.

Example in `integration.js`:

```javascript
// at the bottom
window.SDK.loadEditor();
```

If you now refresh your page in the browser you will see And like magic an instance of the editor gets loaded on your very own page.

<br/>

### Retrieving data from the editor

For retrieving the data, there are 2 ways. For starters we can retrieve data using global listeners, that are configured on initialisation of the SDK.

Below you can find an example for tools:

```javascript
const sdk = new EditorSDK({
    onSelectedToolChanged: (tool) => {
        // here you can do stuff with the newly selected tool
    },
    editorLink: 'https://link/to/the/editor', // Will be provided
    editorId: 'chili-editor-example', // if not provided, default will be 'chili-editor'
});
```

Another way is to retrieve state using a getter. For now only in VariableController there are already some getters available, but in the future we'll provide lots of others on all different aspects.
That way we have multiple ways of retrieving data from the current state.

```javascript
// Retrieve a list of all variables
window.SDK.variable.getVariableList();
```

To check all ways of accessing data, check the controllers in detail, there you see every method available.

<br/>

### Sending data to the editor

Sending data is fairly easy, you just run a method from a controller, with or without parameters.

Below you find an example on changing the tool:

```javascript
// Set the Hand tool
window.SDK.tool.setHandTool();
```

Or an example with a parameter:

```javascript
// Add a new layout whom inherits from layout with ID 2
window.SDK.layout.addLayout(2);
```

<br/>

### Recap

So to recap, you first need to initialise the SDK and Editor, then add an empty div with the ID that you want to pass through the SDK to inject the Editor in.
Then you're ready to go, if you initialise some listeners with callbacks or use a getter you can easily retrieve data on change or on request.
To send data you just call the sdk method, with or without parameters (depends on the method).
