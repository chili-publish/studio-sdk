import integration from "./integration";
import { createAuth0Client } from "@auth0/auth0-spa-js";

class App {
  constructor() {
    const zoomButton = document.getElementById("zoom");
    if (zoomButton) {
      zoomButton.addEventListener("click", (e: Event) =>
        integration.useZoomTool()
      );
    }

    const selectButton = document.getElementById("select");
    if (selectButton) {
      selectButton.addEventListener("click", (e: Event) =>
        integration.useSelectTool()
      );
    }

    const handButton = document.getElementById("hand");
    if (handButton) {
      handButton.addEventListener("click", (e: Event) =>
        integration.useHandTool()
      );
    }

    const playButton = document.getElementById("play");
    if (playButton) {
      playButton.addEventListener("click", (e: Event) =>
        integration.playAnimation()
      );
    }
  }
}

// Instantiate the class when the window loads
window.onload = async () => {
  new App();

  const auth0 = await createAuth0Client({
    domain: "https://login.chiligrafx-dev.com",
    clientId: "zkWRMzeEKNSoAvJ8hj4Od3sp7pUFtXOO",
    authorizationParams: {
      scope: "openid profile offline_access",
      audience: "https://chiligrafx.com",
      redirect_uri: window.location.href,
    },
    useRefreshTokens: true,
  });

  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.addEventListener("click", async (e: Event) => {
      await auth0.loginWithRedirect({
        ...(typeof window !== "undefined" && {
          appState: {
            returnTo: window.location.href,
          },
        }),
        authorizationParams: {
          prompt: "login",
          redirect_uri: window.location.href,
        },
      });
    });
  }

  if (
    location.search.includes("state=") &&
    (location.search.includes("code=") || location.search.includes("error="))
  ) {
    // Handle the redirect from Auth0
    await auth0.handleRedirectCallback();

    //window.history.replaceState({}, document.title, "/");

    // console.log(result);
    // Use result.idToken to get the ID token
    // Use result.appState to get the app state

    const isAuthenticated = await auth0.isAuthenticated();

    console.log({ isAuthenticated });
  }
};
