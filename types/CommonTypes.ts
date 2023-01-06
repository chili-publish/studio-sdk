import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutWithFrameProperties, LayoutPropertiesType, LayoutListItemType } from './LayoutTypes';
import { Frame, FrameLayoutType, FrameTypeEnum } from './FrameTypes';
import type { FrameType } from './FrameTypes';
import { Variable } from './VariableTypes';
import { ToolType } from '../src';
import { UndoState } from './DocumentTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { DocumentFont } from './FontTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { ConnectorEvent } from './ConnectorTypes';

export type Id = string;

export type ConfigType = {
    onStateChanged?: () => void;
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged?: (state: Frame) => void;
    editorLink?: string;
    editorId?: string;
    chiliEnvironmentUrl?: string;
    onPageSelectionChanged?: () => void;
    onSelectedLayoutPropertiesChanged?: (state: LayoutPropertiesType) => void;
    onScrubberPositionChanged?: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged?: (animationState: FrameAnimationType[]) => void;
    onVariableListChanged?: (variableList: Variable[]) => void;
    onSelectedToolChanged?: (tool: ToolType) => void;
    onUndoStackStateChanged?: (undoStackState: UndoState) => void;
    onSelectedLayoutFramesChanged?: (frames: SelectedLayoutFrame[]) => void;
    onSelectedTextStyleChanged?: (styles: any) => void;
    onColorsChanged?: (colors: DocumentColor[]) => void;
    onParagraphStylesChanged?: (paragraphStyles: ParagraphStyle[]) => void;
    onCharacterStylesChanged?: (characterStyles: CharacterStyle[]) => void;
    onFontsChanged?: (fonts: DocumentFont[]) => void;
    onSelectedLayoutIdChanged?: (layoutId: string) => void;
    onLayoutsChanged?: (layouts: LayoutListItemType[]) => void;
    onConnectorStateChanged?: (event: ConnectorEvent) => void;
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
    pageId: Id;
    pageNumber: number;
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
    frameId: Id;
    frameName: string;
    frameType: FrameTypeEnum;
    included: boolean;
}

export interface MetaData {
    [key: string]: string;
}

export interface ConnectorOptions {
    [key: string]: string;
}
