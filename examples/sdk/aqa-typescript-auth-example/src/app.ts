import integration from "./integration";
import { createAuth0Client } from "@auth0/auth0-spa-js";

// Instantiate the class when the window loads
window.onload = async () => {
  let isAuthenticated = false;
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

    isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      document.getElementById("login").remove();
      (<HTMLInputElement>document.getElementById("init")).disabled = false;
    }
  }

  const initButton = document.getElementById("init");
  if (initButton) {
    initButton.addEventListener("click", async (e: Event) => {
      if (isAuthenticated) {
        const pr = (<HTMLInputElement>document.getElementById("pr")).value;
        const accessToken = await auth0.getTokenSilently();
        integration.init(accessToken, pr);
      }
    });
  }
};
