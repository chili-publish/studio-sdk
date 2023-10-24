import { SDK } from './sdk';

export { FramePropertyNames, LayoutPropertyNames, ToolType, DownloadFormats, EnvironmentType } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from './types/AnimationTypes';
export { LayoutType, MeasurementUnit } from './types/LayoutTypes';
export {
    BlendMode,
    FrameTypeEnum,
    VerticalAlign,
    TextDirection,
    FlowDirection,
    FitMode,
    UpdateZIndexMethod,
    ImageSourceTypeEnum,
} from './types/FrameTypes';
export { DocumentType } from './types/DocumentTypes';

export type {
    LayoutPropertiesType,
    FrameProperties,
    LayoutWithFrameProperties,
    LayoutListItemType,
} from './types/LayoutTypes';
export type {
    FrameLayoutType,
    FrameType,
    Frame,
    TextFrame,
    ImageFrame,
    ShapeFrame,
    ImageFrameSource,
    ImageFrameVariableSource,
    ImageFrameUrlSource,
} from './types/FrameTypes';
export type {
    Variable,
    GroupVariable,
    ImageVariable,
    LongTextVariable,
    ShortTextVariable,
    ListVariable,
    BooleanVariable,
    ConnectorImageVariableSource,
} from './types/VariableTypes';
export { VariableType } from './types/VariableTypes';

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
} from './types/CommonTypes';

export type {
    TextProperties,
    TextStyle,
    AppearanceProperties,
    TextStyleUpdateType,
    UpdateStyleType,
    DisplayColor,
} from './types/TextStyleTypes';

export type { ParagraphStyle, ParagraphStyleUpdate } from './types/ParagraphStyleTypes';
export type { CharacterStyle, CharacterStyleUpdate } from './types/CharacterStyleTypes';
export type { ColorUsage, ColorUsageUpdate, ColorUsageType } from './types/ColorStyleTypes';

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

export default SDK;
