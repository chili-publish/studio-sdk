import { DocumentAction } from './ActionTypes';
import { BasicAnimationsEmphasisType, BasicAnimationsIntroType, BasicAnimationsOutroType } from './AnimationTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ActionEventErrorData, Id } from './CommonTypes';
import { BlendMode, FrameTypeEnum } from './FrameTypes';
import { LayoutIntent, LayoutType } from './LayoutTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { ShapeProperties } from './ShapeTypes';
import { Variable } from './VariableTypes';

export type DocumentError = { error: Record<string, unknown>; code: number };

export enum DocumentIssueTypeEnum {
    overflow = 'overflow',
    fontLoading = 'fontLoading',
    actionRegister = 'actionRegister',
    actionExecution = 'actionExecution',
    actionCircular = 'actionCircular',
}

export type OverflowDocumentIssue = {
    frameId: Id;
    type: DocumentIssueTypeEnum.overflow;
};

export type FontLoadingDocumentIssue = {
    fontId: string;
    name: string;
    type: DocumentIssueTypeEnum.fontLoading;
};

export type ActionExecutionDocumentIssue = {
    actionId: string;
    type: DocumentIssueTypeEnum.actionExecution;
};

export type ActionRegisterDocumentIssue = {
    actionId: string;
    type: DocumentIssueTypeEnum.actionRegister;
};

export type ActionCircularDocumentIssue = {
    eventChain: ActionEventErrorData[];
    type: DocumentIssueTypeEnum.actionCircular;
};

export type DocumentIssue =
    | OverflowDocumentIssue
    | FontLoadingDocumentIssue
    | ActionExecutionDocumentIssue
    | ActionRegisterDocumentIssue
    | ActionCircularDocumentIssue;

export type UndoState = {
    canUndo: boolean;
    canRedo: boolean;
    undoItemName: OperationName;
    redoItemName: OperationName;
};

export type OperationName = { translationKey: number; name: string };

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 *
 * This type should give a clear indication of how the JSON document is structured. This could help you with building a test document yourself.
 */
export interface ChiliDocument {
    selectedLayoutId: string;
    properties?: TemplateDocumentProperties | ProjectDocumentProperties;
    pages: DocumentPage[];
    layouts: (ChildLayout | TopLayout)[];
    stylekit: DocumentStylekit;
    variables: Variable[];
    actions: DocumentAction[];
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface DocumentPage {
    id: string;
    number: number;
    frames: (ImageFrame | TextFrame | ShapeFrame)[];
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface DocumentFrame {
    id: string;
    name: string;
    type: FrameTypeEnum;
    blendMode: BlendMode;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ImageFrame extends DocumentFrame {
    src: ImageFrameUrlSource | ImageFrameConnectorSource | ImageFrameVariableSource;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ShapeFrame extends DocumentFrame {
    shapeProperties: ShapeProperties;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface TextFrame extends DocumentFrame {
    textContent: string;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    numberOfColumns: number;
    columnGap: number;
    textDirection: string;
    flowDirection: string;
    verticalAlign: string;
    textStroke: boolean;
    textStrokeWeight: number;
    textStrokeColor: number;
    hasClippingPath: boolean;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export enum ImageFrameSourceType {
    url = 'url',
    assetProvider = 'assetProvider',
    variable = 'variable',
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ImageFrameSource {
    type: ImageFrameSourceType;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ImageFrameUrlSource extends ImageFrameSource {
    url: string;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ImageFrameConnectorSource extends ImageFrameSource {
    id: string;
    assetId: string;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */ export interface ImageFrameVariableSource extends ImageFrameSource {
    id: string;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface Layout {
    id: string;
    name: string;
    frameProperties: (ChildFrameProperty | TopFrameProperty)[];
    width?: number;
    height?: number;
    childLayouts: string[];
    type: LayoutType;
    frameAnimations?: FrameAnimation[];
    timelineLengthMs?: number;
    animated?: boolean;
    intent?: LayoutIntent;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface TopLayout extends Layout {
    frameAnimations: FrameAnimation[];
    timelineLengthMs: number;
    animated: boolean;
    intent: LayoutIntent;
    width: number;
    height: number;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ChildLayout extends Layout {
    parentId: Id;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export enum FramePropertiesType {
    top = 'top',
    child = 'child',
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface FrameProperty {
    id: Id;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotationDegrees?: number;
    rotationOriginY?: number;
    scaleX?: number;
    scaleY?: number;
    isVisible?: boolean;
    type: FramePropertiesType;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export type ChildFrameProperty = FrameProperty;

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface TopFrameProperty extends FrameProperty {
    x: number;
    y: number;
    width: number;
    height: number;
    rotationDegrees: number;
    rotationOriginY: number;
    scaleX: number;
    scaleY: number;
    isVisible: boolean;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface FrameAnimation {
    id: Id;
    from: number;
    to: number;
    basicAnimations: BasicAnimations;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface BasicAnimations {
    intro?: BasicAnimationsIntroType;
    emphasis?: BasicAnimationsEmphasisType;
    outro?: BasicAnimationsOutroType;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface DocumentStylekit {
    colors: DocumentColor[];
    characterStyles: DocumentCharacterStyle[];
    paragraphStyles: DocumentParagraphStyle[];
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export type DocumentCharacterStyle = CharacterStyle;
/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export type DocumentParagraphStyle = ParagraphStyle;

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface DocumentVariable extends Variable {
    parentId: Id;
    name: string;
    label: string;
    isReadonly: boolean;
    isRequired: boolean;
    value: string;
    defaultValue: string;
}

export enum DocumentType {
    project = 'project',
    template = 'template',
    component = 'component',
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface DocumentProperties {
    type: DocumentType;
}

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export type TemplateDocumentProperties = DocumentProperties;

/**
 * @deprecated This is no longer kept up to date and will be removed in the future.
 */
export interface ProjectDocumentProperties extends DocumentProperties {
    templateId: string;
}

export type DocumentLoadOptions = {
    keepConnectors: boolean;
};
