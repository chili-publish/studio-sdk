import { SDK } from './sdk';

export { FrameProperyNames, LayoutProperyNames, ToolType, DownloadFormats } from './utils/enums';
export { LayoutType } from './types/LayoutTypes';
export { VariableType, ImageVariableSourceType } from './types/VariableTypes';

export type { Color, DocumentColor, ColorUpdate } from './types/ColorStyleTypes';
export { ColorType } from './types/ColorStyleTypes';

export type { DocumentError } from './types/DocumentTypes';
export * from './types/MediaConnectorTypes';
export * from './types/FontConnectorTypes';
export * from './types/ConnectorTypes';
export * from './types/ActionTypes';
export { WellKnownConfigurationKeys } from './types/ConfigurationTypes';
export type { ParagraphStyle, ParagraphStyleUpdate } from './types/ParagraphStyleTypes';
export type { CharacterStyle, CharacterStyleUpdate } from './types/CharacterStyleTypes';
export type { ColorUsage, ColorUsageUpdate, ColorUsageType } from './types/ColorStyleTypes';
export type { DocumentFont, AddDocumentFont } from './types/FontTypes';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from './types/AnimationTypes';

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

export type { LayoutPropertiesType, FrameProperties, LayoutWithFrameProperties, LayoutListItemType} from './types/LayoutTypes';

export type {
    FrameLayoutType,
    FrameType,
    Frame,
    TextFrame,
    ImageFrame,
    ShapeFrame,
    ImageFrameSource,
    ShapeType,
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

export {
    SelectedTextStyleSections,
    SelectedTextStyles,
    FontWeights,
    Alignment,
    TextPosition,
    Case,
    Scripting,
} from './types/TextStyleTypes';

export default SDK;