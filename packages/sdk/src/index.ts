import { SDK } from './sdk';

export { ConnectorHttpError } from './utils/EditorResponseData';
export { DownloadFormats, EnvironmentType, FramePropertyNames, LayoutPropertyNames, ToolType } from './utils/Enums';

export {
    BasicAnimationsEmphasisStyles,
    EaseTypes,
    ShakeDirections,
    SlideDirections,
    TweenTypes,
} from './types/AnimationTypes';
export {
    AnchorTargetEdgeType,
    AnchorTargetType,
    AutoGrowDirection,
    BarcodeSourceTypeEnum,
    BlendMode,
    CropType,
    FitMode,
    FitModePosition,
    FlowDirection,
    FrameAnchorType,
    FrameTypeEnum,
    ImageSourceTypeEnum,
    TextDirection,
    UpdateZIndexMethod,
    VerticalAlign,
} from './types/FrameTypes';
export { ConstraintMode, LayoutIntent, LayoutType, MeasurementUnit, PositionEnum } from './types/LayoutTypes';
export type { LayoutAspect, ResizableLayoutProperties, ResizableLayoutPropertiesUpdate } from './types/LayoutTypes';

export { DocumentIssueTypeEnum, DocumentType } from './types/DocumentTypes';

export { ViewMode } from './types/ViewModeTypes';

export { FrameAnchorTarget, PageAnchorTarget } from './types/FrameTypes';
export type {
    AnchorTarget,
    AutoGrowSettings,
    DropShadowSettings,
    BarcodeFrame,
    BarcodeSource,
    BarcodeTextSource,
    BarcodeVariableSource,
    CenterFrameAnchor,
    EndFrameAnchor,
    Frame,
    FrameAnchor,
    FrameLayoutType,
    FrameType,
    ImageFrame,
    ImageFrameSource,
    ImageFrameUrlSource,
    ImageFrameVariableSource,
    RelativeFrameAnchor,
    ShapeFrame,
    StartAndEndFrameAnchor,
    StartFrameAnchor,
    TextFrame,
} from './types/FrameTypes';
export type {
    FrameProperties,
    Layout,
    LayoutListItemType,
    LayoutPreset,
    LayoutPropertiesType,
    LayoutWithFrameProperties,
} from './types/LayoutTypes';

export {
    Day,
    Locale,
    VariableType,
    VariableVisibilityOperator,
    VariableVisibilityTargetType,
    VariableVisibilityType,
} from './types/VariableTypes';

export type {
    AbsoluteDate,
    BooleanVariable,
    ConnectorImageVariableSource,
    DateRestriction,
    DateVariable,
    GroupVariable,
    ImageVariable,
    ListVariable,
    ListVariableItem,
    LongTextVariable,
    NumberVariable,
    RelativeDate,
    ShortTextVariable,
    ValueWithStyle,
    Variable,
    VariableVisibility,
    VariableVisibilityConditional,
    VariableVisibilityConditionValue,
    VariableVisibilityLayout,
    VariableWithValue,
} from './types/VariableTypes';

export type { Color, ColorUpdate, DocumentColor } from './types/ColorStyleTypes';

export type {
    AnimationPlaybackType,
    BasicAnimationsType,
    EaseTweenCombinationType,
    FrameAnimationPropertiesType,
    FrameAnimationType,
} from './types/AnimationTypes';
export { ActionAsyncError, DataRowAsyncError } from './types/CommonTypes';
export type {
    ConfigType,
    EditorResponse,
    Id,
    InitialStateType,
    PageType,
    PrivateData,
    SelectedLayoutFrame,
} from './types/CommonTypes';
export type {
    ActionCircularDocumentIssue,
    ActionExecutionDocumentIssue,
    ActionRegisterDocumentIssue,
    DocumentError,
    DocumentIssue,
    FontLoadingDocumentIssue,
    OverflowDocumentIssue,
} from './types/DocumentTypes';

export type {
    AppearanceProperties,
    DisplayColor,
    SelectedTextStyle,
    TextProperties,
    TextStyle,
    TextStyleUpdateType,
    UpdateStyleType,
} from './types/TextStyleTypes';

export type { CharacterStyle, CharacterStyleUpdate } from './types/CharacterStyleTypes';
export { ColorUsageType } from './types/ColorStyleTypes';
export type { ColorUsage, ColorUsageUpdate } from './types/ColorStyleTypes';
export { GradientUsageType } from './types/GradientStyleTypes';
export type { DocumentGradient, GradientDefinition, GradientUpdate } from './types/GradientStyleTypes';
export type { ParagraphStyle, ParagraphStyleUpdate, NumericListStyle, NumericListNumberingStyle} from './types/ParagraphStyleTypes';

export type {
    AddDocumentFontFamily,
    AddDocumentFontStyle,
    DocumentFontFamily,
    DocumentFontStyle,
    CharacterPreview,
} from './types/FontTypes';

export { ColorType } from './types/ColorStyleTypes';
export * from './types/ConnectorTypes';
export * from './types/DataConnectorTypes';
export * from './types/FontConnectorTypes';
export { GradientType } from './types/GradientStyleTypes';
export * from './types/MediaConnectorTypes';
export {
    Alignment,
    Case,
    FontWeights,
    Scripting,
    SelectedTextStyles,
    SelectedTextStyleSections,
    TextPosition,
    MarkedListType,
} from './types/TextStyleTypes';

export { WellKnownConfigurationKeys } from './types/ConfigurationTypes';

export type {
    APIBrandKit,
    APIBrandKitMedia,
    BrandKitCharacterStyle,
    BrandKitColor,
    BrandKitFont,
    BrandKitMedia,
    BrandKitParagraphStyle,
    CMYK,
    CMYKColorValue,
    HEXColorValue,
    RGB,
    RGBColorValue,
    SpotCMYKColorValue,
    SpotHEXColorValue,
    SpotRGBColorValue,
    StudioBrandKit,
} from './types/BrandKitTypes';

export * from './types/ActionTypes';

export * from './types/ShapeTypes';

export * from './types/BarcodeTypes';

export type { Viewport } from './types/ViewportTypes';

export * from './types/PageTypes';

export * from './types/EngineEditModeTypes';

export default SDK;

export * as Next from './next';
