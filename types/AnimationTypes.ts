export enum SlideDirections {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom',
    topLeft = 'topLeft',
    topRight = 'topRight',
    bottomLeft = 'bottomLeft',
    bottomRight = 'bottomRight',
}

export enum ShakeDirections {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export enum EaseTypes {
    easeIn = 'easeIn',
    easeOut = 'easeOut',
    easeInOut = 'easeInOut',
}

export enum TweenTypes {
    quadratic = 'Quadratic',
    cubic = 'Cubic',
    quartic = 'Quartic',
    quintic = 'Quintic',
    sine = 'Sine',
    exponential = 'Exponential',
    circular = 'Circular',
    elastic = 'Elastic',
    bounce = 'Bounce',
    back = 'Back',
}

export enum BasicAnimationsEmphasisStyles {
    bounce = 'bounce',
    flash = 'flash',
    headshake = 'headShake',
    heartbeat = 'heartbeat',
    pulse = 'pulse',
    rubberBand = 'rubberBand',
    vertical = 'vertical',
    horizontal = 'horizontal',
    swing = 'swing',
    tada = 'tada',
}

export type EaseTweenCombinationType = `${EaseTypes}${TweenTypes}` | 'noEase';

export type BasicAnimationsIntroOutroStylesType = {
    slide?: {
        slideDirection: SlideDirections;
        offsetPercent: number;
    };
    rotation?: {
        angleDegrees: number;
        numberOfRotations?: number;
    };
    scale?: {
        scalePercent: number;
    };
    fade?: boolean;
};

export type BasicAnimationsIntroType = {
    from: number;
    to: number;
    ease: EaseTweenCombinationType;
    styles: BasicAnimationsIntroOutroStylesType;
};

export type BasicAnimationsEmphasisType = {
    from: number;
    to: number;
    ease: EaseTweenCombinationType;
    styles: {
        bounce?: boolean;
        flash?: boolean;
        pulse?: boolean;
        rubberBand?: boolean;
        shake: {
            shakeDirection: ShakeDirections;
        };
        vertical: boolean;
        horizontal: boolean;
        headshake?: boolean;
        swing?: boolean;
        tada?: boolean;
        heartbeat?: boolean;
    };
};

export type BasicAnimationsOutroType = {
    from: number;
    to: number;
    ease: EaseTweenCombinationType;
    styles: BasicAnimationsIntroOutroStylesType;
};

export type BasicAnimationsType = {
    intro?: BasicAnimationsIntroType;
    emphasis?: BasicAnimationsEmphasisType;
    outro?: BasicAnimationsOutroType;
};

export type FrameAnimationPropertiesType = {
    frameId: number;
    from: number;
    to: number;
    basicAnimations: BasicAnimationsType;
    advancedAnimations?: unknown; // TBI
};
export type FrameAnimationType = {
    animation: FrameAnimationPropertiesType;
    isOverride: boolean;
};

export type AnimationPlaybackType = {
    currentAnimationTimeMs: number;
    animationIsPlaying: boolean;
} | null;
