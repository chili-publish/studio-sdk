import integration from "./integration";
import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";

// init client
async function initializeAuth0() {
  return await createAuth0Client({
    domain: "https://login.chiligrafx-dev.com",
    clientId: "zkWRMzeEKNSoAvJ8hj4Od3sp7pUFtXOO",
    authorizationParams: {
      scope: "openid profile offline_access",
      audience: "https://chiligrafx.com",
      redirect_uri: window.location.href,
    },
    useRefreshTokens: true,
    cacheLocation: "localstorage",
  });
}

// handle redirect callback
async function handleRedirectCallback(auth0: Auth0Client) {
  if (
    location.search.includes("state=") &&
    (location.search.includes("code=") || location.search.includes("error="))
  ) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.origin);
    return await auth0.isAuthenticated();
  }
  return false;
}

// redirect login
async function redirectToLogin(auth0: Auth0Client) {
  await auth0.loginWithRedirect({
    appState: {
      returnTo: window.location.href,
    },
    authorizationParams: {
      prompt: "login",
      redirect_uri: window.location.href,
    },
  });
}

function initializePRPage(isAuthenticated: boolean, auth0: Auth0Client) {
  const initButton = document.getElementById("init");
  if (initButton) {
    initButton.addEventListener("click", async () => {
      if (isAuthenticated) {
        const pr = (<HTMLInputElement>document.getElementById("pr")).value;
        const accessToken = await auth0.getTokenSilently();
        integration.init(accessToken, pr);
      }
    });
  }
}

window.onload = async () => {
  const auth0 = await initializeAuth0();

  // redirect flow
  const isAuthenticated =
    (await auth0.isAuthenticated()) || (await handleRedirectCallback(auth0));

  // login if not authenticated
  if (!isAuthenticated) {
    await redirectToLogin(auth0);
    return;
  }

  (<HTMLInputElement>document.getElementById("init")).disabled = false;
  initializePRPage(isAuthenticated, auth0);
};
