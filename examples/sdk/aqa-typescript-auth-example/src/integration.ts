const STUDIO_DOCUMENT = `{"selectedLayoutId":"0","sdkVersion":"1.6.2","engineVersion":"1.4.1","documentVersion":"0.3.3","properties":{"type":"template"},"pages":[{"id":"0","number":0,"frames":[{"id":"1","name":"Frame 1","shapeProperties":{"enableFill":true,"fillColor":{"color":{"r":255,"g":154,"b":154,"type":"rgb"},"opacity":1,"type":"local"},"enableStroke":true,"strokeWeight":1000,"strokeColor":{"color":{"r":0,"g":0,"b":0,"type":"rgb"},"type":"local"},"allCornersSame":true},"type":"shape","src":{"type":"rectangle","cornerRadius":{"type":"none"}},"blendMode":"normal","constrainProportions":false},{"id":"2","name":"Q","type":"text","constrainProportions":false,"textContent":[{"type":"paragraph"},{"type":"span"},{"text":"How do you greet a programmer who is learning a new language?","type":"text"}],"paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5000,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"middle","textStroke":false,"textStrokeWeight":1000,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"normal"},{"id":"3","name":"A","type":"text","constrainProportions":false,"textContent":[{"type":"paragraph","style":{"textAlign":"center"}},{"type":"span"},{"text":"Hello, worldinhabbitant","type":"text"}],"paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5000,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"middle","textStroke":false,"textStrokeWeight":1000,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"normal"}]}],"layouts":[{"id":"0","name":"Default","frameProperties":[{"id":"1","x":10000,"y":10000,"width":280000,"height":180000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":false},{"id":"2","x":20000,"y":19000,"width":260000,"height":160000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":true},{"id":"3","x":20000,"y":19000,"width":260000,"height":160000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":true}],"width":300000,"height":200000,"childLayouts":[],"type":"top","frameAnimations":[{"id":"1","from":0,"to":5000,"basicAnimations":{}},{"id":"2","from":0,"to":2500,"basicAnimations":{"outro":{"from":1500,"to":2500,"ease":"noEase","styles":{"slide":{"direction":"right","offsetPercent":100}}}}},{"id":"3","from":2500,"to":5000,"basicAnimations":{"intro":{"from":0,"to":1000,"ease":"noEase","styles":{"slide":{"direction":"left","offsetPercent":100}}}}}],"timelineLengthMs":5000,"unit":"px","intent":"digitalAnimated","fillColor":{"color":{"r":255,"g":255,"b":255,"type":"rgb"},"opacity":1,"type":"local"}}],"stylekit":{"colors":[],"characterStyles":[],"paragraphStyles":[],"fontFamilies":[]},"variables":[],"connectors":[{"id":"grafx-media","name":"GraFx Media","source":{"source":"local","url":"grafx-media.json"},"options":{},"mappings":[]},{"id":"grafx-fonts","name":"GraFx Fonts","source":{"source":"local","url":"grafx-fonts.json"},"options":{},"mappings":[]}],"actions":[]}`;

let SELECTED_LAYOUT_ID: string;

import StudioSDK, { Frame } from "@chili-publish/studio-sdk";
import type {
  FrameLayoutType,
  LayoutListItemType,
  ToolType,
} from "@chili-publish/studio-sdk";

let accessToken: string | null = null;

const authenticate = (newAccessToken: string) => {
  accessToken = newAccessToken;
};

// Initialise SDK
const SDK = new StudioSDK({
  onLayoutsChanged: (layouts) => {
    onLayoutsChanged(layouts);
  },
  onSelectedLayoutIdChanged: (id) => {
    onSelectedLayoutChanged(id);
  },
  onSelectedFrameLayoutChanged: (selectedFrameLayout) => {
    onFrameLayoutChange(selectedFrameLayout);
  },
  onSelectedFrameContentChanged: (selectedFrameContent) => {
    onFrameContentChange(selectedFrameContent);
  },
  onSelectedToolChanged: (tool) => {
    onToolChanged(tool);
  },
  editorId: "chili-editor-example",
});

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

// Initialize editor
SDK.loadEditor();

// Load document
const loadDocument = async () => {
  await SDK.document.load(STUDIO_DOCUMENT);
  zoomToPage();
};
loadDocument();

console.log({ accessToken });

// Tool selection and change available on window
const useSelectTool = () => {
  SDK.tool.setSelect();
};

const useHandTool = () => {
  SDK.tool.setHand();
};

const useZoomTool = () => {
  SDK.tool.setZoom();
};

const onToolChanged = (tool: ToolType) => {
  if (tool) {
    const toolLabel = document.getElementById("toolLabel");
    toolLabel.textContent = "Selected tool: " + tool;
  }
};

// Play animation
const playAnimation = async () => {
  SDK.animation.play();
};

// Functions on frame selection
const onFrameContentChange = (selectedFrameContent: Frame) => {
  if (selectedFrameContent) {
    const frameTitleInput = document.getElementById("frameTitle");
    frameTitleInput.setAttribute("value", selectedFrameContent.name);

    const frameTypeInput = document.getElementById("frameType");
    frameTypeInput.setAttribute("value", selectedFrameContent.type);
  }
};
const onFrameLayoutChange = (selectedFrameLayout: FrameLayoutType) => {
  if (selectedFrameLayout) {
    const frameXInput = document.getElementById("frameX");
    frameXInput.setAttribute("value", String(selectedFrameLayout.x.value));

    const frameYInput = document.getElementById("frameY");
    frameYInput.setAttribute("value", String(selectedFrameLayout.y.value));

    const frameWidthInput = document.getElementById("frameWidth");
    frameWidthInput.setAttribute(
      "value",
      String(selectedFrameLayout.width.value)
    );

    const frameHeightInput = document.getElementById("frameHeight");
    frameHeightInput.setAttribute(
      "value",
      String(selectedFrameLayout.height.value)
    );
  }
};

// Select a layout
const onLayoutClick = (id: string) => {
  SDK.layout.select(id);
};
// Function on when a layout has been changed
const onLayoutsChanged = (layouts: LayoutListItemType[]) => {
  if (layouts && layouts.length) {
    const listContainer = document.getElementById("layoutList");
    // Empty list on rerender
    listContainer.innerHTML = "";

    // loop all layouts and render them + add dynamic onClick handler
    layouts.map((layout) => {
      const item = document.createElement("li");
      item.setAttribute("class", "layout-item");
      if (layout.id === SELECTED_LAYOUT_ID) {
        //@ts-ignore
        item.classList = `${item.classList} selected`;
      }
      item.setAttribute("id", `layout ${layout.id} ${layout.name}`);
      item.onclick = () => onLayoutClick(layout.id);
      const itemText = document.createTextNode(layout.name);
      item.appendChild(itemText);
      listContainer.appendChild(item);
    });
  }
};

const onSelectedLayoutChanged = (id: string) => {
  console.log(`Selected layout: ${id}`);
  SELECTED_LAYOUT_ID = id;
};

export default {
  authenticate,
  useSelectTool,
  useHandTool,
  useZoomTool,
  playAnimation,
  onLayoutClick,
};
