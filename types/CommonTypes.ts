import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutType, LayoutPropertiesType } from './LayoutTypes';
import { FrameLayoutType } from './FrameTypes';
import type { FrameType } from './FrameTypes';
import {Variable} from "./VariableTypes";
import { Tools } from '../src/utils/enums';

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
    onSelectedToolChanged: (tool: Tools) => void;
};

export type EditorResponse = {
    success: boolean;
    status: number;
    data?: unknown;
};
export interface Child extends CallSender {
    [index: string]: (...args: unknown[]) => Promise<EditorResponse>;
}

export type PageType = {
    pageNumber: number;
    width: number | null;
    height: number | null;
    frames: FrameType[];
};

export type InitialStateType = {
    layouts: LayoutType[];
    selectedLayoutId: number;
    pages: PageType[];
    variables: Variable[];
};
