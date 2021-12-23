import { Child, ConfigType } from '../../types/CommonTypes';

class AnimationController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    onAnimationChanged = (animation: string) => {
        const callBack = this.config.frameAnimationsChanged;
        callBack(animation);
    };

    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.scrubberPositionChanged;
        callBack(animationPlaybackState);
    };

    setFrameAnimation = async (animation: string) => {
        const res = await this.children;
        return res.setFrameAnimation(animation);
    };

    playAnimation = async () => {
        const res = await this.children;
        return res.playAnimation();
    };

    pauseAnimation = async () => {
        const res = await this.children;
        return res.pauseAnimation();
    };

    setScrubberPosition = async (timeInMS: number) => {
        const res = await this.children;
        return res.setScrubberPosition(timeInMS);
    };

    setAnimationDuration = async (timeInMS: number) => {
        const res = await this.children;
        return res.setAnimationDuration(timeInMS);
    };
}

export default AnimationController;
