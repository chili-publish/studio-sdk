# STUDIO-SDK Documentation

Welcome to the SDK documentation, if you want to be absolutely 100% sure that you have the latest and greatest SDK documentation at your hand, we could redirect you to the [Github Pages deployment of our SDK documentation](https://chili-publish.github.io/studio-sdk/index.html), but this one is great as well.

So on these pages you'll find some very technical but super handy descriptions of all the functions available in the controllers, as well as the exported enums and other configuration params.

## Next

The 'Next' section of the SDK provides a glimpse of what’s to come. We’ll include the latest and most cutting-edge features in this section, allowing you to prepare for upcoming changes.

By doing this, we can introduce breaking changes without disrupting your integration when you update. Our goal is to maintain stability for the major version while still allowing flexibility for innovation. When a major update occurs, the functions and additions from this section will be moved to the main part of the SDK.

### Imports

**Deprecated:** If you’re using the next controller, consider importing the typings from the next types as well. These (breaking) typings are accessible in your application by referencing @chili-publish/studio-sdk/lib/src/next, for example:

```ts
import type { ListVariable } from '@chili-publish/studio-sdk/lib/src/next';
```

NOTE: the above import method is deprecated and will be removed in next major release. Consider using root import with the `Next` namespace instead

```ts
import type { Next } '@chili-publish/studio-sdk';

const variable: Next.ListVariable = {...}
```

### Event stream

In addition, `Next` version of event stream is available when specifying `enableNextSubscribers`

```ts
import StudioSDK from '@chili-publish/studio-sdk';

const sdk = new StudioSDK({
    enableNextSubscribers: {
        onVariableListChanged: true,
    },
});
```

## Enums, Types, Interfaces and general Methods

If you want to check out some types, interfaces and general methods, you can find them all bundled [under the modules page](modules).

## Eventual Consistency

Because of the nature of an async stream, be aware that you may react on an item that has an old state.  
Eventual consistency means that you will _eventually_ get the correct state from the stream.

See: https://en.wikipedia.org/wiki/Eventual_consistency
