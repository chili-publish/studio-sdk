import { FrameAnimationPropertiesType } from '../../types/AnimationTypes';
import { Child, ConfigType } from '../../types/CommonTypes';

class AnimationController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    setFrameAnimation = async (animation: FrameAnimationPropertiesType) => {
        const res = await this.children;
        return res.setFrameAnimation(JSON.stringify(animation));
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
    resetFrameAnimation = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameAnimation(frameId);
    };
}

export default AnimationController;
