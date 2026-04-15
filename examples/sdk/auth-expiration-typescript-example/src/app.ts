import {
  GrafxTokenAuthCredentials,
  RefreshedAuthCredendentials,
} from "@chili-publish/studio-sdk";
import {
  createOnAuthExpiredHandler,
  mockBrowserNoneInjectionRequest,
  mockGrafxTokenRefreshRequest,
} from "./authExpiredHandler";
import { initStudio } from "./integration";

const getGrafxAccessToken = async (): Promise<string> => {
  return `mock-grafx-access-token-refreshed-${Date.now()}`;
};

function setSimulateOutput(message: string): void {
  const pre = document.getElementById("simulateOutput");
  if (pre) {
    pre.textContent = message;
  }
}

window.onload = () => {
  const onAuthExpired = createOnAuthExpiredHandler({
    refreshGrafxCredentials: async () => {
      const token = await getGrafxAccessToken();
      return new GrafxTokenAuthCredentials(token);
    },
    refreshConnectorCredentials: async () => {
      const connectorToken = "placeholder-connector-access-token";
      return new RefreshedAuthCredendentials({
        Authorization: `Bearer ${connectorToken}`,
      });
    },
  });

  const simulateGrafxBtn = document.getElementById("simulateGrafx");
  const simulateBrowserNoneBtn = document.getElementById("simulateBrowserNone");

  const runSimulation = async (
    label: string,
    buildRequest: () => ReturnType<typeof mockGrafxTokenRefreshRequest>,
  ): Promise<void> => {
    const result = await onAuthExpired(buildRequest());
    setSimulateOutput(
      `${label}\n\n${result === null ? "null" : JSON.stringify(result, null, 2)}`,
    );
  };

  simulateGrafxBtn?.addEventListener("click", () => {
    void runSimulation("GraFx token", mockGrafxTokenRefreshRequest);
  });
  simulateBrowserNoneBtn?.addEventListener("click", () => {
    void runSimulation("Browser / token injection", mockBrowserNoneInjectionRequest);
  });

  void (async () => {
    setSimulateOutput("Loading editor…");
    try {
      await initStudio({
        onAuthExpired,
        getAccessTokenForInitialConfig: async () => {
          return getGrafxAccessToken();
        },
      });
      setSimulateOutput("Editor ready.");
    } catch (e) {
      console.error(e);
      setSimulateOutput(String(e));
    }
  })();
};
