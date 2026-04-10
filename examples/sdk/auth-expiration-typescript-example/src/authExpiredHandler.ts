import type { AuthCredentials, AuthRefreshRequest } from "@chili-publish/studio-sdk";
import {
  AuthRefreshTypeEnum,
  ConnectorSupportedAuth,
  ConnectorType,
  GrafxTokenAuthCredentials,
  RefreshedAuthCredendentials,
} from "@chili-publish/studio-sdk";

export interface AuthExpiredHandlerDeps {
  getGrafxAccessToken: (forceRefresh: boolean) => Promise<string | null>;
  refreshConnectorAuthForProxy: (
    request: AuthRefreshRequest,
  ) => Promise<Record<string, string> | null>;
  getConnectorAccessTokenForInjection: () => Promise<string | null>;
}

export const createOnAuthExpiredHandler = (
  deps: AuthExpiredHandlerDeps,
): ((request: AuthRefreshRequest) => Promise<AuthCredentials | null>) => {
  return async (request: AuthRefreshRequest): Promise<AuthCredentials | null> => {
    try {
      if (request.type === AuthRefreshTypeEnum.grafxToken) {
        const token = await deps.getGrafxAccessToken(true);
        if (token) {
          return new GrafxTokenAuthCredentials(token);
        }
        return null;
      }

      if (request.type === AuthRefreshTypeEnum.any && request.headerValue) {
        const headers = await deps.refreshConnectorAuthForProxy(request);
        if (headers && Object.keys(headers).length > 0) {
          return new RefreshedAuthCredendentials(headers);
        }
        return null;
      }

      if (
        request.type === AuthRefreshTypeEnum.any &&
        !request.headerValue &&
        request.connectorDefinition.supportedAuthentication.browser.includes(ConnectorSupportedAuth.None)
      ) {
        const grafxToken = await deps.getGrafxAccessToken(true);
        const connectorToken = await deps.getConnectorAccessTokenForInjection();
        if (grafxToken && connectorToken) {
          return new GrafxTokenAuthCredentials(grafxToken, {
            Authorization: `Bearer ${connectorToken}`,
          });
        }
        return null;
      }

      console.warn("Unsupported auth refresh request:", request);
      return null;
    } catch (error) {
      console.error("onAuthExpired failed:", error);
      return null;
    }
  };
};

const sampleConnectorDefinitionStatic = {
  id: "sample-connector",
  name: "Sample media connector",
  type: ConnectorType.media,
  supportedAuthentication: {
    browser: [ConnectorSupportedAuth.StaticKey],
    server: [ConnectorSupportedAuth.StaticKey],
  },
};

const sampleConnectorDefinitionNone = {
  id: "sample-connector-none",
  name: "Sample media connector",
  type: ConnectorType.media,
  supportedAuthentication: {
    browser: [ConnectorSupportedAuth.None],
    server: [ConnectorSupportedAuth.None],
  },
};

export const mockGrafxTokenRefreshRequest = (): AuthRefreshRequest => ({
  connectorId: "local-connector-id",
  remoteConnectorId: "remote-connector-id",
  type: AuthRefreshTypeEnum.grafxToken,
  headerValue: null,
  connectorDefinition: sampleConnectorDefinitionStatic,
});

export const mockProxyConnectorRefreshRequest = (): AuthRefreshRequest => ({
  connectorId: "local-connector-id",
  remoteConnectorId: "remote-connector-id",
  type: AuthRefreshTypeEnum.any,
  headerValue: "Static, 1234",
  connectorDefinition: sampleConnectorDefinitionStatic,
});

export const mockBrowserNoneInjectionRequest = (): AuthRefreshRequest => ({
  connectorId: "local-connector-id",
  remoteConnectorId: "remote-connector-id",
  type: AuthRefreshTypeEnum.any,
  headerValue: null,
  connectorDefinition: sampleConnectorDefinitionNone,
});
