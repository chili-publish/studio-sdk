import StudioSDK, { AuthRefreshRequest, AuthCredentials } from "@chili-publish/studio-sdk";

const STUDIO_DOCUMENT = `{"selectedLayoutId":"0","sdkVersion":"1.6.2","engineVersion":"1.4.1","documentVersion":"0.3.3","properties":{"type":"template"},"pages":[{"id":"0","number":0,"frames":[{"id":"1","name":"Frame 1","shapeProperties":{"enableFill":true,"fillColor":{"color":{"r":255,"g":154,"b":154,"type":"rgb"},"opacity":1,"type":"local"},"enableStroke":true,"strokeWeight":1000,"strokeColor":{"color":{"r":0,"g":0,"b":0,"type":"rgb"},"type":"local"},"allCornersSame":true},"type":"shape","src":{"type":"rectangle","cornerRadius":{"type":"none"}},"blendMode":"normal","constrainProportions":false},{"id":"2","name":"Q","type":"text","constrainProportions":false,"textContent":[{"type":"paragraph"},{"type":"span"},{"text":"How do you greet a programmer who is learning a new language?","type":"text"}],"paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5000,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"middle","textStroke":false,"textStrokeWeight":1000,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"normal"},{"id":"3","name":"A","type":"text","constrainProportions":false,"textContent":[{"type":"paragraph","style":{"textAlign":"center"}},{"type":"span"},{"text":"Hello, worldinhabbitant","type":"text"}],"paddingLeft":0,"paddingTop":0,"paddingRight":0,"paddingBottom":0,"numberOfColumns":1,"columnGap":5000,"textDirection":"leftToRight","flowDirection":"horizontal","verticalAlign":"middle","textStroke":false,"textStrokeWeight":1000,"textStrokeColor":0,"hasClippingPath":false,"blendMode":"normal"}]}],"layouts":[{"id":"0","name":"Default","frameProperties":[{"id":"1","x":10000,"y":10000,"width":280000,"height":180000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":false},{"id":"2","x":20000,"y":19000,"width":260000,"height":160000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":true},{"id":"3","x":20000,"y":19000,"width":260000,"height":160000,"rotationDegrees":0,"rotationOriginY":0,"scaleX":1,"scaleY":1,"isVisible":true,"fitMode":"fill","type":"top","minCopyfitting":0.1,"maxCopyfitting":10,"enableCopyfitting":true}],"width":300000,"height":200000,"childLayouts":[],"type":"top","frameAnimations":[{"id":"1","from":0,"to":5000,"basicAnimations":{}},{"id":"2","from":0,"to":2500,"basicAnimations":{"outro":{"from":1500,"to":2500,"ease":"noEase","styles":{"slide":{"direction":"right","offsetPercent":100}}}}},{"id":"3","from":2500,"to":5000,"basicAnimations":{"intro":{"from":0,"to":1000,"ease":"noEase","styles":{"slide":{"direction":"left","offsetPercent":100}}}}}],"timelineLengthMs":5000,"unit":"px","intent":"digitalAnimated","fillColor":{"color":{"r":255,"g":255,"b":255,"type":"rgb"},"opacity":1,"type":"local"}}],"stylekit":{"colors":[],"characterStyles":[],"paragraphStyles":[],"fontFamilies":[]},"variables":[],"connectors":[{"id":"grafx-media","name":"GraFx Media","source":{"source":"local","url":"grafx-media.json"},"options":{},"mappings":[]},{"id":"grafx-fonts","name":"GraFx Fonts","source":{"source":"local","url":"grafx-fonts.json"},"options":{},"mappings":[]}],"actions":[]}`;

export interface StudioInitOptions {
  onAuthExpired: (request: AuthRefreshRequest) => Promise<AuthCredentials | null>;
  getAccessTokenForInitialConfig: () => Promise<string>;
}

const zoomToPage = async (sdk: InstanceType<typeof StudioSDK>) => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const rect = iframe?.getBoundingClientRect();
  const width = Math.floor(rect?.width ?? 800);
  const height = Math.floor(rect?.height ?? 600);
  await sdk.canvas.zoomToPage(null, 0, 0, width, height);
};

export const initStudio = async (
  options: StudioInitOptions,
): Promise<InstanceType<typeof StudioSDK>> => {
  const sdk = new StudioSDK({
    editorId: "chili-editor-example",
    onAuthExpired: options.onAuthExpired,
  });

  sdk.loadEditor();

  const token = await options.getAccessTokenForInitialConfig();
  await sdk.configuration.setValue("GRAFX_AUTH_TOKEN", token);

  await sdk.document.load(STUDIO_DOCUMENT);
  await zoomToPage(sdk);

  return sdk;
};
