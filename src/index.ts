import { SDK } from './sdk';

export { FrameProperyNames, LayoutProperyNames, ToolType, DownloadFormats } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from './types/AnimationTypes';
export { LayoutType } from './types/LayoutTypes';
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
export { VariableType, ImageVariableSourceType } from './types/VariableTypes';

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
    VariableMoves,
    UrlImageVariableSource,
    MediaConnectorImageVariableSource,
    ImageVariableSource,
} from './types/VariableTypes';
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

export type { DocumentFont, AddDocumentFont } from './types/FontTypes';

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
