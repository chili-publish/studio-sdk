# SDK Documentation

Welcome to the SDK documentation, if you want to be absolutely 100% sure that you have the latest and greatest SDK documentation at your hand, we could redirect you to the [Github Pages deployment of our SDK documentation](https://chili-publish.github.io/studio-sdk/index.html), but this one is great as well.

So on these pages you'll find some very technical but super handy descriptions of all the functions available in the controllers, as well as the exported enums and other configuration params.

## Controllers

-   [Default methods (SDK)](modules/index.html)
-   [ActionController](classes/controllers_ActionController.ActionController.html)
-   [AnimationController](classes/controllers_AnimationController.AnimationController.html)
-   [CanvasController](classes/controllers_CanvasController.CanvasController.html)
-   [CharacterStyleController](classes/controllers_CharacterStyleController.CharacterStyleController.html)
-   [ColorStyleController](classes/controllers_ColorStyleController.ColorStyleController.html)
-   [ConfigurationController](classes/controllers_ConfigurationController.ConfigurationController.html)
-   [ConnectorController](classes/controllers_ConnectorController.ConnectorController.html)
-   [DebugController](classes/controllers_DebugController.DebugController.html)
-   [DocumentController](classes/controllers_DocumentController.DocumentController.html)
-   [FontConnectorController](classes/controllers_FontConnectorController.FontConnectorController.html)
-   [FontController](classes/controllers_FontController.FontController.html)
-   [FrameController](classes/controllers_FrameController.FrameController.html)
-   [LayoutController](classes/controllers_LayoutController.LayoutController.html)
-   [MediaConnectorController](classes/controllers_MediaConnectorController.MediaConnectorController.html)
-   [PageController](classes/controllers_PageController.PageController.html)
-   [ParagraphStyleController](classes/controllers_ParagraphStyleController.ParagraphStyleController.html)
-   [SubscriberController](classes/controllers_SubscriberController.SubscriberController.html)
-   [TextStyleController](classes/controllers_TextStyleController.TextStyleController.html)
-   [ToolController](classes/controllers_ToolController.ToolController.html)

## The document

We have made an effort to type the document that is used by the editor-engine as ChiliDocument.
You can find the entire definition [on this page](interfaces/types_DocumentTypes.ChiliDocument.html).

## Enums, Types, Interfaces and general Methods

If you want to check out some types, interfaces and general methods, you can find them all bundled [under the modules page](modules).

## Eventual Consistency

Because of the nature of an async stream, be aware that you may react on an item that has an old state.  
Eventual consistency means that you will _eventually_ get the correct state from the stream.

See: https://en.wikipedia.org/wiki/Eventual_consistency
