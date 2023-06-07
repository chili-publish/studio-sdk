import { FrameAnimationPropertiesType } from '../types/AnimationTypes';
import { EditorAPI, Id } from '../types/CommonTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The AnimationController is responsible for all communication regarding Animations.
 * Methods inside this controller can be called by `window.SDK.animation.{method-name}`
 */
export class AnimationController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(children: EditorAPI) {
        this.#editorAPI = children;
    }

    /**
     * This method returns all animations on current layout
     * @returns
     */
    getAnimationsOnSelectedLayout = async () => {
        const res = await this.#editorAPI;
        return res
            .getAnimationsOnSelectedLayout()
            .then((result) => getEditorResponseData<FrameAnimationPropertiesType[]>(result));
    };

    /**
     * This method returns an animation for a given frame and layout IDs
     * @param frameId The ID of a specific frame
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getAnimationByFrameId = async (frameId: Id, layoutId?: Id) => {
        const res = await this.#editorAPI;
        return res
            .getAnimationByFrameId<string>(frameId, layoutId)
            .then((result) => getEditorResponseData<FrameAnimationPropertiesType>(result));
    };

    /**
     * This method returns the animations for a given layout ID
     * @param layoutId The ID of a specific layout
     * @returns
     */
    getAnimationsByLayoutId = async (layoutId: Id) => {
        const res = await this.#editorAPI;
        return res
            .getAnimationsByLayoutId(layoutId)
            .then((result) => getEditorResponseData<FrameAnimationPropertiesType>(result));
    };

    /**
     * This method sets the animation state for a certain Frame
     * @param animation
     * @returns
     */
    setFrameAnimation = async (animation: FrameAnimationPropertiesType) => {
        const res = await this.#editorAPI;
        return res
            .setFrameAnimation(JSON.stringify(animation))
            .then((result) =>
                getEditorResponseData<FrameAnimationPropertiesType>({ ...result, data: JSON.stringify(animation) }),
            );
    };

    /**
     * This method triggers the animation to play
     * @returns
     */
    playAnimation = async () => {
        const res = await this.#editorAPI;
        return res.playAnimation().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method triggers the animation to pause
     * @returns
     */
    pauseAnimation = async () => {
        const res = await this.#editorAPI;
        return res.pauseAnimation().then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method sets the animation time to a certain time, expressed in milliseconds
     * @param timeInMS The time expressed in milliseconds
     * @returns
     */
    setScrubberPosition = async (timeInMS: number) => {
        const res = await this.#editorAPI;
        return res.setScrubberPosition(timeInMS);
    };

    /**
     * This method sets the total and maximum duration of the animation, expressed in milliseconds
     * @param timeInMS The time expressed in milliseconds
     * @returns
     */
    setAnimationDuration = async (timeInMS: number) => {
        const res = await this.#editorAPI;
        return res.setAnimationDuration(timeInMS).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * This method resets the animation to its initial state
     * @param frameId The ID of a certain frame
     * @returns
     */
    resetFrameAnimation = async (frameId: Id) => {
        const res = await this.#editorAPI;
        return res.resetFrameAnimation(frameId);
    };

    /**
     * This method resets the layout's animations and animation duration to its initial state
     * @returns
     */
    resetAnimation = async () => {
        const res = await this.#editorAPI;
        return res.resetAnimation();
    };
}
