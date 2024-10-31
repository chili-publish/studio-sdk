import type StudioSDK from "@chili-publish/studio-sdk";
import { uint8ArrayToBase64 } from "./utils";
import { ListVariable } from "@chili-publish/studio-sdk";

let abortController: AbortController | null = null;
declare global {
  interface Window {
    SDK: StudioSDK;
  }
}

const clearLayouts = () => {
  const layoutList = document.getElementById("layouts");

  if (layoutList) {
    layoutList.innerHTML = "";
  }
};

const generateSnaps = async () => {
  if (abortController) {
    abortController.abort(); // Cancel the previous execution if it's still running
  }
  abortController = new AbortController();
  const signal = abortController.signal;
  clearLayouts();
  const layouts = (await window.SDK.layout.getAll()).parsedData;
  console.log(layouts);

  const layoutList = document.getElementById("layouts");
  for (const layout of layouts) {
    if (signal.aborted) {
      console.log("Operation aborted");
      return;
    }
    await window.SDK.undoManager.record("selectlayout", async () => {
      await window.SDK.layout.select(layout.id);
      const container = document.createElement("article");
      const itemTitle = document.createElement("h2");
      itemTitle.textContent = layout.name;
  
      const itemImg = document.createElement("img");
      const imgFromSDK = await window.SDK.layout.getSelectedSnapshot();
      const base64String = uint8ArrayToBase64(imgFromSDK);
  
      console.log(`data:image/png;base64,${base64String}`);
      itemImg.setAttribute("src", `data:image/png;base64,${base64String}`);
      itemImg.setAttribute("alt", layout.name);
      console.log(layout.name);
  
      container.appendChild(itemTitle);
      container.appendChild(itemImg);
      layoutList.appendChild(container);
    })
    
  }
};

const generateVariable = async () => {
  const variable = (await window.SDK.variable.getByName("Agent"))
    .parsedData as ListVariable;
  console.log(variable);

  const variableList = document.getElementById("variables");
  const input = document.createElement("select");
  input.id = "agent";
  const label = document.createElement("label");
  label.setAttribute("for", "agent");
  label.textContent = `${variable.name}:`;

  variableList.appendChild(label);
  for (const option of variable.items) {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.textContent = option;
    input.appendChild(newOption);
  }
  input.value = variable.items[0];
  variableList.appendChild(input);

  input.addEventListener("change", async (event) => {
    const target = event.target as HTMLSelectElement;
    await window.SDK.variable.setValue(variable.id, target.value);
    generateSnaps();
  });
};

const executeSDK = async (accessToken: string) => {
  // Initialise SDK
  //@ts-ignore
  const SDK = new StudioSDK.default({
    editorId: "chili-editor-example",
  });

  const STUDIO_DOCUMENT = await (
    await fetch(
    // TO REPLACE
      "https://cp-qkm-097.chili-publish.online/grafx/api/v1/environment/cp-qkm-097/templates/e9472b19-ab54-44a2-9c9b-199634bdbcab/download",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  ).json();

  window.SDK = SDK;
  const zoomToPage = async () => {
    const zoomParams: {
      pageId: null;
      left: number;
      top: number;
      width: number;
      height: number;
    } = {
      pageId: null,
      left: 0,
      top: 0,
      width: Math.floor(
        document.getElementsByTagName("iframe")?.[0]?.getBoundingClientRect()
          .width
      ),
      height: Math.floor(
        document.getElementsByTagName("iframe")?.[0]?.getBoundingClientRect()
          .height
      ),
    };

    await SDK.canvas.zoomToPage(
      zoomParams.pageId,
      zoomParams.left,
      zoomParams.top,
      zoomParams.width,
      zoomParams.height
    );
  };

  SDK.loadEditor();
  await SDK.configuration.setValue("GRAFX_AUTH_TOKEN", accessToken);
  await SDK.configuration.setValue(
    "ENVIRONMENT_API",
    // TO REPLACE
    "https://cp-qkm-097.chili-publish.online/grafx/api/v1/environment/cp-qkm-097"
  );

  // Load document
  const loadDocument = async () => {
    await SDK.document.load(STUDIO_DOCUMENT);
    zoomToPage();
  };
  await loadDocument();
  await generateVariable();
  await generateSnaps();
};

const loadScript = async (url: string, callback: () => void) => {
  return new Promise((resolve, reject) => {
    if (url) {
      try {
        const scriptTag = window.document.createElement("script");
        scriptTag.src = url;
        // Set up onload event
        scriptTag.onload = () => {
          resolve(scriptTag);
          callback(); // Call the callback function
        };
        window.document.body.appendChild(scriptTag);
      } catch (e) {
        console.error("Error loading script:", e);
      }
    }
  });
};

const init = async (accessToken: string) => {
  let url =
    "https://stgrafxstudioprdpublic.blob.core.windows.net/sdk/latest/main.js";

  loadScript(url, () => {
    executeSDK(accessToken);
  });
};

export default {
  init,
};
