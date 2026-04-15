# Studio SDK — `onAuthExpired` example

Demonstrates wiring `onAuthExpired` and mapping `AuthRefreshRequest` to `GrafxTokenAuthCredentials` / `RefreshedAuthCredendentials`.

## SDK types

- [`AuthRefreshRequest`](../../../packages/sdk/src/types/ConnectorTypes.ts)
- [`GrafxTokenAuthCredentials`](../../../packages/sdk/src/types/ConnectorTypes.ts) / [`RefreshedAuthCredendentials`](../../../packages/sdk/src/types/ConnectorTypes.ts)

## Handler branches

The handler dispatches on `request.type` and delegates credential construction to callbacks:

| `request.type` | Callback                     | Expected return type           |
| --------------- | ---------------------------- | ------------------------------ |
| `grafxToken`    | `refreshGrafxCredentials`     | `GrafxTokenAuthCredentials`    |
| `any`           | `refreshConnectorCredentials` | `RefreshedAuthCredendentials`  |

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
