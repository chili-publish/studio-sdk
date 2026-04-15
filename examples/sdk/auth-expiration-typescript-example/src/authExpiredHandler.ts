import type {
  AuthCredentials,
  AuthRefreshRequest,
} from "@chili-publish/studio-sdk";
import {
  AuthRefreshTypeEnum,
  ConnectorSupportedAuth,
  ConnectorType,
} from "@chili-publish/studio-sdk";

export interface AuthExpiredHandlerCallbacks {
  refreshGrafxCredentials: () => Promise<AuthCredentials | null>;
  refreshConnectorCredentials: (
    request: AuthRefreshRequest,
  ) => Promise<AuthCredentials | null>;
}

export const createOnAuthExpiredHandler = (
  deps: AuthExpiredHandlerCallbacks,
): ((request: AuthRefreshRequest) => Promise<AuthCredentials | null>) => {
  return async (
    request: AuthRefreshRequest,
  ): Promise<AuthCredentials | null> => {
    try {
      if (request.type === AuthRefreshTypeEnum.grafxToken) {
        return await deps.refreshGrafxCredentials();
      }

      if (request.type === AuthRefreshTypeEnum.any) {
        return await deps.refreshConnectorCredentials(request);
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

export const mockBrowserNoneInjectionRequest = (): AuthRefreshRequest => ({
  connectorId: "local-connector-id",
  remoteConnectorId: "remote-connector-id",
  type: AuthRefreshTypeEnum.any,
  headerValue: null,
  connectorDefinition: sampleConnectorDefinitionNone,
});
