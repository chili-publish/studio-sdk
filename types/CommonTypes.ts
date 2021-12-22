import { CallSender } from 'penpal';
import { FrameAnimationType } from './AnimationTypes';

export type ConfigType = {
    stateChanged: (state: string) => void;
    selectedFrameLayout: (state: string) => void;
    selectedFrameContent: (state: string) => void;
    editorLink: string;
    editorId?: string;
    onPageSelectionChanged: () => void;
    selectedLayoutProperties: (state: string) => void;
    scrubberPositionChanged: (state: string) => void;
    frameAnimationsChanged: (animationState: string) => void;
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
export type SelectedFrameLayoutType = {
    frameId: number;
    layoutId: number;
    x: { value: number; isOverride: boolean };
    y: { value: number; isOverride: boolean };
    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
    rotationDegrees: { value: number; isOverride: boolean };
    scaleX: { value: number; isOverride: boolean };
    scaleY: { value: number; isOverride: boolean };
    included: { value: boolean; isOverride: boolean };
} | null;

export type selectedLayoutPropertiesType = {
    layoutId: number;

    width: { value: number; isOverride: boolean };
    height: { value: number; isOverride: boolean };
} | null;
