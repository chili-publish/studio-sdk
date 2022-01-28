import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutType, LayoutPropertiesType } from './LayoutTypes';
import {FrameLayoutType} from './FrameTypes'
import type { FrameType } from './FrameTypes';

export type ConfigType = {
    onStateChanged: (state: string) => void;
    onSelectedFrameLayoutChanged: (state: FrameLayoutType) => void;
    onSelectedFrameContentChanged: (state: FrameType) => void;
    editorLink: string;
    editorId?: string;
    onPageSelectionChanged: () => void;
    onSelectedLayoutPropertiesChanged: (state: LayoutPropertiesType) => void;
    onScrubberPositionChanged: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged: (animationState: FrameAnimationType[]) => void;
};

type EditorResponse = {
    success: boolean;
    status: number;
};
export interface Child extends CallSender {
    addLayout: (parentId: number) => Promise<EditorResponse>;
    removeLayout: (id: number) => Promise<EditorResponse>;
    renameLayout: (id: number, layoutName: string) => Promise<EditorResponse>;
    selectLayout: (id: number) => Promise<EditorResponse>;
    duplicateLayout: (id: number) => Promise<EditorResponse>;
    resetLayout: (id: number) => Promise<EditorResponse>;
    selectFrames: (ids: number[]) => Promise<EditorResponse>;
    togglePlaybackAnimation: () => Promise<EditorResponse>;
    setFrameAnimation: (animation: string) => Promise<EditorResponse>;
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
};
