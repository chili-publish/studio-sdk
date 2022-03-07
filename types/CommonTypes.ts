import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutWithFrameProperties, LayoutPropertiesType } from './LayoutTypes';
import { FrameLayoutType } from './FrameTypes';
import type { FrameType } from './FrameTypes';
import { Variable } from './VariableTypes';
import { ToolType } from '../src/utils/enums';

export type ConfigType = {
    onStateChanged: (state: InitialStateType) => void;
    onSelectedFrameLayoutChanged: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged: (state: FrameType) => void;
    editorLink: string;
    editorId?: string;
    onPageSelectionChanged: () => void;
    onSelectedLayoutPropertiesChanged: (state: LayoutPropertiesType) => void;
    onScrubberPositionChanged: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged: (animationState: FrameAnimationType[]) => void;
    onVariableListChanged: (variableList: Variable[]) => void;
    onSelectedToolChanged: (tool: ToolType) => void;
};

export type EditorResponse = {
    success: boolean;
    status: number;
    data?: unknown;
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