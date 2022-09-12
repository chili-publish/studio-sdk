import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutWithFrameProperties, LayoutPropertiesType } from './LayoutTypes';
import { FrameLayoutType } from './FrameTypes';
import type { FrameType } from './FrameTypes';
import { Variable } from './VariableTypes';
import { ToolType } from '../src/utils/enums';
import { ChiliDocument, UndoState } from './DocumentTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';

export type ConfigType = {
    onStateChanged?: (state: InitialStateType) => void;
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged?: (state: FrameType) => void;
    editorLink: string;
    editorId?: string;
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
};

export type EditorResponse = {
    success: boolean;
    status: number;
    data?: string;
    error?: string;
};
export interface EditorAPI extends CallSender {
    [index: string]: (...args: unknown[]) => Promise<EditorResponse>;
}

export type PageType = {
    pageId: number;
    pageNumber: number;
    width: number | null;
    height: number | null;
    frames: FrameType[];
};

export type InitialStateType = {
    layouts: LayoutWithFrameProperties[];
    selectedLayoutId: number;
    pages: PageType[];
    variables: Variable[];
};

export interface PropertyState<T> {
    value: T;
    isOverride: boolean;
}

export interface SelectedLayoutFrame {
    frameId: number;
    frameName: string;
    included: boolean;
}
