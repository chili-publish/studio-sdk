export type FrameLayoutType = {
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

export type FrameType = {
    frameId: number;
    frameName: string;
    frameType: 'image';
    imageUrl: string;
    blendMode: string;
};