import integration from "./integration";

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
window.onload = () => {
  new App();
};
