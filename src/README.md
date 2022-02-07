# EDITOR-SDK GETTING STARTED

In this overview, we provide you with a small guide which should get you started on working / integrating with the SDK.
After the getting started is working, you can look further at the documentation to search for methods and listers that you need.
If you have any questions, do not hesitate to reach out to any of the chili team-members.

Happy coding and enjoy the **spicy** ride.

## General Structure

The SDK consist of controllers which are individual Javascript classes and methods of these classes.
Currently there are 5 different controllers:

-   AnimationController
-   FrameController
-   LayoutsController
-   UtilsController
-   DocumentController

These controllers are exposing the methods for each part of the document in a structured way, you can get a more detailed overview of all methods in the modules itself.

<br/>

## Getting started
This will get you started on integrating the sdk in your own application.
We don't want to opinionate the stack you use, so for the examples we start from a vanilla stack using only html and JavaScript, but the use of TypeScript is strongly encouraged and fully supported. The types are also bundled together with the code.

If you want an example on integration with React, we can help you out as well, just reach out.

<br/>

### Initialise the SDK
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
    editorLink: "https://link/to/the/editor", // Will be provided
    editorId: 'chili-editor-example' // if not provided, default will be 'chili-editor'
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

<div id="chili-editor-example" ></div>

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

TBI

<br/>

### Sending data to the editor
TBI

<br/>

### Recap
TBI
