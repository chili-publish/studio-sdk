import {
  createOnAuthExpiredHandler,
  mockBrowserNoneInjectionRequest,
  mockGrafxTokenRefreshRequest,
} from "./authExpiredHandler";
import { initStudio } from "./integration";

const GRAFX_TOKEN_INITIAL = "mock-grafx-access-token";

const getGrafxAccessToken = async (forceRefresh: boolean): Promise<string | null> => {
  if (forceRefresh) {
    return `mock-grafx-access-token-refreshed-${Date.now()}`;
  }
  return GRAFX_TOKEN_INITIAL;
};

function setSimulateOutput(message: string): void {
  const pre = document.getElementById("simulateOutput");
  if (pre) {
    pre.textContent = message;
  }
}

window.onload = () => {
  const onAuthExpired = createOnAuthExpiredHandler({
    getGrafxAccessToken,
    getConnectorAccessTokenForInjection: async () => {
      return "placeholder-connector-access-token";
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
          const t = await getGrafxAccessToken(false);
          return t ?? "";
        },
      });
      setSimulateOutput("Editor ready.");
    } catch (e) {
      console.error(e);
      setSimulateOutput(String(e));
    }
  })();
};
