import { SDK } from './sdk';

export { FramePropertyNames, LayoutPropertyNames, ToolType, DownloadFormats, EnvironmentType } from './utils/enums';
export { ConnectorHttpError } from './utils/EditorResponseData';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from './types/AnimationTypes';
export { LayoutType, MeasurementUnit, LayoutIntent, PositionEnum } from './types/LayoutTypes';
export {
    BlendMode,
    FrameTypeEnum,
    VerticalAlign,
    TextDirection,
    FlowDirection,
    FitMode,
    UpdateZIndexMethod,
    ImageSourceTypeEnum,
    BarcodeSourceTypeEnum,
    AutoGrowDirection,
    AnchorTargetType,
    FrameAnchorType,
    AnchorTargetEdgeType,
} from './types/FrameTypes';
export { DocumentType } from './types/DocumentTypes';

export { ViewMode } from './types/ViewModeTypes';

export type {
    LayoutPropertiesType,
    FrameProperties,
    LayoutWithFrameProperties,
    LayoutListItemType,
    Layout,
} from './types/LayoutTypes';
export type {
    FrameLayoutType,
    FrameType,
    Frame,
    TextFrame,
    ImageFrame,
    ShapeFrame,
    BarcodeFrame,
    BarcodeSource,
    BarcodeVariableSource,
    BarcodeTextSource,
    ImageFrameSource,
    ImageFrameVariableSource,
    ImageFrameUrlSource,
    AutoGrowSettings,
    AnchorTarget,
    FrameAnchor,
    RelativeFrameAnchor,
    StartFrameAnchor,
    EndFrameAnchor,
    StartAndEndFrameAnchor,
    CenterFrameAnchor
} from './types/FrameTypes';
export { PageAnchorTarget, FrameAnchorTarget } from './types/FrameTypes';

export type {
    Variable,
    GroupVariable,
    ImageVariable,
    LongTextVariable,
    ShortTextVariable,
    ListVariable,
    ListVariableItem,
    BooleanVariable,
    NumberVariable,
    ConnectorImageVariableSource,
    DateVariable,
    DateRestriction,
    RelativeDate,
    AbsoluteDate,
    ValueWithStyle,
    PrivateData,
} from './types/VariableTypes';
export { VariableType, Day, Locale } from './types/VariableTypes';

export type { Color, DocumentColor, ColorUpdate } from './types/ColorStyleTypes';

export type { DocumentError } from './types/DocumentTypes';
export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from './types/AnimationTypes';
export type {
    ConfigType,
    InitialStateType,
    PageType,
    EditorResponse,
    SelectedLayoutFrame,
    MetaData,
    Id,
    ConnectorConfigOptions,
    ConnectorConfigValue,
} from './types/CommonTypes';
export { ConnectorConfigValueType } from './types/CommonTypes';

export type {
    TextProperties,
    SelectedTextStyle,
    TextStyle,
    AppearanceProperties,
    TextStyleUpdateType,
    UpdateStyleType,
    DisplayColor,
} from './types/TextStyleTypes';

export type { ParagraphStyle, ParagraphStyleUpdate } from './types/ParagraphStyleTypes';
export type { CharacterStyle, CharacterStyleUpdate } from './types/CharacterStyleTypes';
export type { ColorUsage, ColorUsageUpdate } from './types/ColorStyleTypes';
export { ColorUsageType } from './types/ColorStyleTypes';

export type {
    DocumentFontStyle,
    DocumentFontFamily,
    AddDocumentFontStyle,
    AddDocumentFontFamily,
} from './types/FontTypes';

export {
    SelectedTextStyleSections,
    SelectedTextStyles,
    FontWeights,
    Alignment,
    TextPosition,
    Case,
    Scripting,
} from './types/TextStyleTypes';
export { ColorType } from './types/ColorStyleTypes';
export * from './types/MediaConnectorTypes';
export * from './types/FontConnectorTypes';
export * from './types/ConnectorTypes';

export { WellKnownConfigurationKeys } from './types/ConfigurationTypes';

export * from './types/ActionTypes';

export * from './types/ShapeTypes';

export * from './types/BarcodeTypes';

export type { Viewport } from './types/ViewportTypes';

export default SDK;
