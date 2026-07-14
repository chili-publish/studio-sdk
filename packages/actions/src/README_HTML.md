# Actions Documentation

Welcome to the Actions documentation. If you want to be absolutely sure you have the latest version, open the [GitHub Pages deployment](https://chili-publish.github.io/studio-sdk/actions/index.html) — but this one is great as well.

Actions run inside GraFx Studio when something happens in the document (a variable changes, a layout is selected, a frame moves, and so on). On these pages you'll find the APIs and helpers you use while writing those scripts: the global `studio` and `triggers` objects, the controllers they expose, and the helper functions that wrap common patterns.

## Getting started

Inside an action you always have:

-   [`studio`](variables/types_Actions.studio.html) — root API for frames, variables, layouts, pages, and brand kit
-   [`triggers`](variables/types_Actions.triggers-1.html) — what caused this action to run
-   [`console`](variables/types_Actions.console-1.html) — simple logging while debugging

Start from [`ActionApi`](interfaces/types_Actions.ActionApi.html) and [`Triggers`](interfaces/types_Actions.Triggers.html) if you want the full picture.

## Controllers (`studio.*`)

-   [Frames](interfaces/types_Actions.FramesController.html) — `studio.frames`
-   [Variables](interfaces/types_Actions.VariablesController.html) — `studio.variables`
-   [Layouts](interfaces/types_Actions.LayoutsController.html) — `studio.layouts`
-   [Pages](interfaces/types_Actions.PageController.html) — `studio.pages`
-   [Brand kit](interfaces/types_Actions.BrandKit.html) — `studio.brandKit`

## Helpers

Prefer helpers when you can — they handle lookups and type checks for you. Browse the full list under [functions](modules/src_ActionHelpers.html), including:

-   Trigger helpers — e.g. `getTriggeredVariableName`, `getTriggeredFrameName`
-   Variable get/set helpers — text, number, date, list, image, visibility, …
-   Frame and layout helpers — position, size, visibility, `selectLayout`, …
-   Page and color helpers — page size, `hex` / `rgb` / `cmyk`, brand-kit copies

## Types, interfaces and modules

All Action API types and helper signatures are also listed under [modules](modules).

## Related docs

Looking for the embeddable Studio SDK (host app integration)? See the [SDK documentation](https://chili-publish.github.io/studio-sdk/index.html).
