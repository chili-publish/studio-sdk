import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutListItemType, LayoutPropertiesType, LayoutWithFrameProperties } from './LayoutTypes';
import type { FrameType } from './FrameTypes';
import { Frame, FrameLayoutType, FrameTypeEnum } from './FrameTypes';
import { Variable } from './VariableTypes';
import { ActionEditorEvent, DocumentAction, ToolType } from '..';
import { DocumentType, UndoState } from './DocumentTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { DocumentFont } from './FontTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { ConnectorEvent } from './ConnectorTypes';
import { PageSize } from './PageTypes';
import { SelectedTextStyle } from './TextStyleTypes';
import { CornerRadiusUpdateModel } from './ShapeTypes';
import { StudioOptionsDeltaUpdate, StudioStyling } from './ConfigurationTypes';

export type Id = string;

export type ConfigType = {
    onActionsChanged?: (state: DocumentAction[]) => void;
    onStateChanged?: () => void;
    onDocumentLoaded?: () => void;
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged?: (state: Frame) => void;
    editorLink?: string;
    editorId?: string;
    chiliEnvironmentUrl?: string;
    documentType?: DocumentType;
    studioStyling?: StudioStyling;
    studioOptions?: StudioOptionsDeltaUpdate;
    onPageSelectionChanged?: () => void;
    onSelectedLayoutPropertiesChanged?: (state: LayoutPropertiesType) => void;
    onScrubberPositionChanged?: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged?: (animationState: FrameAnimationType[]) => void;
    onVariableListChanged?: (variableList: Variable[]) => void;
    onSelectedToolChanged?: (tool: ToolType) => void;
    onUndoStackStateChanged?: (undoStackState: UndoState) => void;
    onSelectedLayoutFramesChanged?: (frames: SelectedLayoutFrame[]) => void;
    onSelectedTextStyleChanged?: (styles: SelectedTextStyle) => void;
    onColorsChanged?: (colors: DocumentColor[]) => void;
    onParagraphStylesChanged?: (paragraphStyles: ParagraphStyle[]) => void;
    onCharacterStylesChanged?: (characterStyles: CharacterStyle[]) => void;
    onFontsChanged?: (fonts: DocumentFont[]) => void;
    onSelectedLayoutIdChanged?: (layoutId: string) => void;
    onLayoutsChanged?: (layouts: LayoutListItemType[]) => void;
    onConnectorEvent?: (event: ConnectorEvent) => void;
    onZoomChanged?: (scaleFactor: number) => void;
    onPageSizeChanged?: (pageSize: PageSize) => void;
    onShapeCornerRadiusChanged?: (cornerRadius: CornerRadiusUpdateModel) => void;
    onCropActiveFrameIdChanged?: (id?: Id) => void;
    onAsyncError?: (asyncError: AsyncError) => void;
};

export interface EditorResponse<T> {
    success: boolean;
    status: number;
    data?: string | null;
    error?: string | { code: number; error: Record<string, unknown> } | null;
    parsedData: T | null;
}

export interface EditorRawAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<T>;
}

export interface EditorAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<EditorResponse<T>>;
}

export type PageType = {
    id: Id;
    number: number;
    width: number | null;
    height: number | null;
    frames: FrameType[];
};

export type InitialStateType = {
    layouts: LayoutWithFrameProperties[];
    selectedLayoutId: Id;
    pages: PageType[];
    variables: Variable[];
};

export interface PropertyState<T> {
    value: T;
    isOverride: boolean;
}

export interface SelectedLayoutFrame {
    id: Id;
    name: string;
    type: FrameTypeEnum;
    isVisible: boolean;
}

export interface MetaData {
    [key: string]: string;
}

export interface ConnectorOptions {
    [key: string]: string;
}

export enum ConnectorConfigValueType {
    text = 'text',
    boolean = 'boolean',
}

export interface ConnectorConfigValue {
    readonly name: string;
    readonly displayName: string;
    readonly type: ConnectorConfigValueType;
}

export type ConnectorConfigOptions = ConnectorConfigValue[];

export interface ActionEventErrorData {
    event: ActionEditorEvent;
    actionIds: Id[];
}

interface AsyncErrorBase {
    message: string;
}

export interface ActionAsyncError extends AsyncErrorBase {
    id?: string;
    event?: ActionEditorEvent;
    eventChain?: ActionEventErrorData[];
}

export type AsyncError = ActionAsyncError;
