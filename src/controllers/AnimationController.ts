import { FrameAnimationPropertiesType } from '../../types/AnimationTypes';
import { Child } from '../../types/CommonTypes';

/**
 * The AnimationController is responsible for all communication regarding Animations.
 * Methods inside this controller can be called by `window.SDK.animation.{method-name}`
 */
export class AnimationController {
    /**
     * @ignore
     */
    private children: Child;

    /**
     * @ignore
     */
    constructor(children: Child) {
        this.children = children;
    }

    /**
     * This method sets the animation state for a certain Frame
     * @param animation
     * @returns
     */
    setFrameAnimation = async (animation: FrameAnimationPropertiesType) => {
        const res = await this.children;
        return res.setFrameAnimation(JSON.stringify(animation));
    };

    /**
     * This method triggers the animation to play
     * @returns
     */
    playAnimation = async () => {
        const res = await this.children;
        return res.playAnimation();
    };

    /**
     * This method triggers the animation to pause
     * @returns
     */
    pauseAnimation = async () => {
        const res = await this.children;
        return res.pauseAnimation();
    };

    /**
     * This method sets the animation time to a certain time, expressed in miliseconds
     * @param timeInMS The time expressed in miliseconds
     * @returns
     */
    setScrubberPosition = async (timeInMS: number) => {
        const res = await this.children;
        return res.setScrubberPosition(timeInMS);
    };

    /**
     * This method sets the total and maximum duration of the animation
     * @param timeInMS The time expressed in miliseconds
     * @returns
     */
    setAnimationDuration = async (timeInMS: number) => {
        const res = await this.children;
        return res.setAnimationDuration(timeInMS);
    };

    /**
     * This method resets the animation to its initial state
     * @param frameId The id of a certain frame
     * @returns
     */
    resetFrameAnimation = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameAnimation(frameId);
    };
}
