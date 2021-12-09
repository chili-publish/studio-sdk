import { FrameAnimationType } from '../../types/AnimationTypes';
import { Child, ConfigType } from '../../types/CommonTypes';

class AnimationController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    onAnimationChanged = (animation: FrameAnimationType) => {
        const callBack = this.config.getFrameAnimation;
        callBack(animation);
    };

    setFrameAnimation = async (animation: FrameAnimationType) => {
        const res = await this.children;
        return res.setFrameAnimation(animation);
    };

    playAnimation = async () => {
        const res = await this.children;
        console.log(res);
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
}

export default AnimationController;
