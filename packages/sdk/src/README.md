# STUDIO-SDK Documentation

Welcome to the SDK documentation, if you want to be absolutely 100% sure that you have the latest and greatest SDK documentation at your hand, we could redirect you to the [Github Pages deployment of our SDK documentation](https://chili-publish.github.io/studio-sdk/index.html), but this one is great as well.

So on these pages you'll find some very technical but super handy descriptions of all the functions available in the controllers, as well as the exported enums and other configuration params.

## Next

The next section of the SDK gives you a glimpse of the future. We're going to put the latest and newest into our next section so that you can prepare yourself for what's coming.
This enables us to introduce new features that are breaking, without breaking your integration when you'd update.
This way our major version can stay stable for longer, without sacrificing the flexibility we need, to innovate.
Together with a major update, the functions and additions in this part of the SDK will be moved to the main part.
If you're using the next controller, you might need to import the typings also from the next types.
The (breaking) typings are accessible in your application by referencing @chili-publish/studio-sdk/lib/src/next.
f.e. `import type { ListVariable } from '@chili-publish/studio-sdk/lib/src/next';`

## The document

We have made an effort to type the document that is used by the editor-engine as ChiliDocument.
You can find the entire definition [on this page](interfaces/types_DocumentTypes.ChiliDocument.md).

## Enums, Types, Interfaces and general Methods

If you want to check out some types, interfaces and general methods, you can find them all bundled [under the modules page](modules).
