# Studio SDK — `onAuthExpired` example

Demonstrates wiring `onAuthExpired` and mapping `AuthRefreshRequest` to `GrafxTokenAuthCredentials`.

## SDK types

- [`AuthRefreshRequest`](../../../packages/sdk/src/types/ConnectorTypes.ts)
- [`GrafxTokenAuthCredentials`](../../../packages/sdk/src/types/ConnectorTypes.ts)

## Handler branches

| Case                      | Request                                                           | Returns                                                                    |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| GraFx / Environment token | `type: grafxToken`                                                | `new GrafxTokenAuthCredentials(token)`                                     |
| Browser + `none`          | `type: any` + `ConnectorSupportedAuth.None`                       | `new GrafxTokenAuthCredentials(grafxToken, { Authorization: 'Bearer …' })` |

## Run locally

1. Build the SDK:

   ```bash
   cd ../../../packages/sdk && yarn install && yarn build
   ```

2. Build this example:

   ```bash
   cd ../../examples/sdk/auth-expiration-typescript-example
   npm install
   npm run build
   ```

3. Serve this folder and open `index.html`. The editor loads after startup.
