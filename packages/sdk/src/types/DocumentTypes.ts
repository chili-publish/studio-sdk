import { BasicAnimationsEmphasisType, BasicAnimationsIntroType, BasicAnimationsOutroType } from './AnimationTypes';
import { DocumentColor } from './ColorStyleTypes';
import { Id } from './CommonTypes';
import { BlendMode, FrameTypeEnum } from './FrameTypes';
import { LayoutIntent, LayoutType } from './LayoutTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { Variable } from './VariableTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { DocumentAction } from './ActionTypes';
import { ShapeProperties } from './ShapeTypes';

export type DocumentError = { error: Record<string, unknown>; code: number };

export type UndoState = {
    canUndo: boolean;
    canRedo: boolean;
    undoItemName: OperationName;
    redoItemName: OperationName;
};

export type OperationName = { translationKey: number; name: string };

/**
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

export interface DocumentPage {
    id: string;
    number: number;
    frames: (ImageFrame | TextFrame | ShapeFrame)[];
}

export interface DocumentFrame {
    id: string;
    name: string;
    type: FrameTypeEnum;
    blendMode: BlendMode;
    constrainProportions: boolean;
}

export interface ImageFrame extends DocumentFrame {
    src: ImageFrameUrlSource | ImageFrameConnectorSource | ImageFrameVariableSource;
}

export interface ShapeFrame extends DocumentFrame {
    shapeProperties: ShapeProperties;
}

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

export enum ImageFrameSourceType {
    url = 'url',
    assetProvider = 'assetProvider',
    variable = 'variable',
}

export interface ImageFrameSource {
    type: ImageFrameSourceType;
}

export interface ImageFrameUrlSource extends ImageFrameSource {
    url: string;
}

export interface ImageFrameConnectorSource extends ImageFrameSource {
    id: string;
    assetId: string;
}

export interface ImageFrameVariableSource extends ImageFrameSource {
    id: string;
}

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

export interface TopLayout extends Layout {
    frameAnimations: FrameAnimation[];
    timelineLengthMs: number;
    animated: boolean;
    intent: LayoutIntent;
    width: number;
    height: number;
}

export interface ChildLayout extends Layout {
    parentId: Id;
}

export enum FramePropertiesType {
    top = 'top',
    child = 'child',
}
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

export type ChildFrameProperty = FrameProperty;
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

export interface FrameAnimation {
    id: Id;
    from: number;
    to: number;
    basicAnimations: BasicAnimations;
}

export interface BasicAnimations {
    intro?: BasicAnimationsIntroType;
    emphasis?: BasicAnimationsEmphasisType;
    outro?: BasicAnimationsOutroType;
}

export interface DocumentStylekit {
    colors: DocumentColor[];
    characterStyles: DocumentCharacterStyle[];
    paragraphStyles: DocumentParagraphStyle[];
}

export type DocumentCharacterStyle = CharacterStyle;
export type DocumentParagraphStyle = ParagraphStyle;

export interface DocumentVariable extends Variable {
    parentId: Id;
    name: string;
    label: string;
    isVisible: boolean;
    isReadonly: boolean;
    isRequired: boolean;
    value: string;
    defaultValue: string;
}

export enum DocumentType {
    project = 'project',
    template = 'template',
}

export interface DocumentProperties {
    type: DocumentType;
}

export type TemplateDocumentProperties = DocumentProperties;

export interface ProjectDocumentProperties extends DocumentProperties {
    templateId: string;
}

export type DocumentLoadOptions = {
    keepConnectors?: boolean;
};
