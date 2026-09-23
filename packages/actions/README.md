# Actions package

Build output of this package will be copied to our CDN using following logic:

- https://.../actions/{apiVersion}/actions.d.ts
    - `apiVersion` is a property defined in the `package.json` file of this package
- https://.../actions/{sdkVersion}/actionsHelpers.js
    - `sdkVersion` is the official sdk version as defined in the `package.json` file in the root of this repository
- https://.../actions/{engineVersion}/actionsHelpers.d.ts
    - `engineVersion` is the compatible engine version at build time. This version is stored in the packages/sdk/studio-engine.json file

## Actions.d.ts

This is the main output file of the `actions` package. It contains all the types and interfaces that are used by the `actions` feature
in GraFx Studio.

The contents of this file are copied to the `out/` directory on build.

## ActionsHelpers.ts

This file contains helper functions that are used by the `actions` feature in GraFx Studio.

The `.ts` file is compiled to both a `.js` and `.d.ts` file. The javascript file is used during action execution.
The type definitions can be used to provide autocomplete and type checking in GraFx Studio's action editor.

## Compressing for GPT format (Experimental)

`scripts/compress.mjs` writes Genie-facing copies of the action typings:

- `Actions.genie.d.ts` / `ActionHelpers.genie.d.ts` — same declarations as the editor typings, with every `@deprecated` API removed (including union members that only referenced a removed type). GraFx Genie loads these from the CDN as LLM context.
- `Actions.json` / `ActionHelpers.json` — a minified JSON AST of those stripped declarations.
