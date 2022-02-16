import { FrameProperyNames } from '../index';
import type { Child, ConfigType } from '../../types/CommonTypes';
import type { FrameLayoutType } from '../../types/FrameTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';

/**
 * The FrameController is responsible for all communication regarding Frames.
 * Methods inside this controller can be called by `window.SDK.frame.{method-name}`
 */
export class FrameController {
    /**
     * @ignore
     */
    children: Child;
    /**
     * @ignore
     */
    config: ConfigType;

    /**
     * @ignore
     */
    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    /**
     * This method will reset the frame size (width and height) to the frame's original value
     * @param frameId The ID of a specific frame
     * @returns
     */
    resetFrameSize = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameSize(frameId);
    };

    /**
     * This method will select a specific frame
     * @param frameId The ID of a specific frame
     * @returns
     */
    selectFrame = async (frameId: number) => {
        const res = await this.children;
        return res.selectFrames([frameId]);
    };

    /**
     * This method will select multipleFrames
     * @param frameIds An array of all IDs you want to select
     * @returns
     */
    selectMultipleFrames = async (frameIds: number[]) => {
        const res = await this.children;
        return res.selectFrames(frameIds);
    };

    /**
     * This method will set the height of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2) The notation is in pixels
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    setFrameHeight = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.HEIGHT, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.height.value) return null;

        return res.setFrameHeight(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the rotation angle of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is degrees
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    setFrameRotation = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_ROTATION, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.rotationDegrees.value) return null;

        return res.setFrameRotation(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the width of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is in pixels
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    setFrameWidth = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.WIDTH, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.width.value) return null;

        return res.setFrameWidth(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the x value of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is in pixels
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    setFrameX = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_X, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.x.value) return null;

        return res.setFrameX(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the y value of a specific frame
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is in pixels
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    setFrameY = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_Y, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.y.value) return null;

        return res.setFrameY(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    /**
     * This method will reset properties of a specific frame to their original values
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrame = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrame(frameId);
    };
    /**
     * This method will reset the x value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameX = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameX(frameId);
    };

    /**
     * This method will reset the y value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameY = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameY(frameId);
    };

    /**
     * This method will reset the rotation value of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameRotation = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameRotation(frameId);
    };

    /**
     * This method will reset the width of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameWidth = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameWidth(frameId);
    };

    /**
     * This method will reset the height of a specific frame to its original value
     * @param frameId The ID of the frame that needs to get reset
     * @returns
     */
    resetFrameHeight = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameHeight(frameId);
    };

    /**
     * This method will set the visibility property of a specified frame. If set to false the frame will be invisible and vice versa.
     * @param frameId The ID of the frame that needs to get updated
     * @param value True means the frame gets visible, false means the frame gets invisible
     * @returns
     */
    setFrameVisibility = async (frameId: number, value: boolean) => {
        const res = await this.children;
        return res.setFrameVisibility(frameId, value);
    };

    /**
     * This method will trigger a calculation with logic built in, based on its parameters
     * @param name The name of the property of whom the calculation is for
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is dependent on the frame property that triggers this calculation
     * @param selectedFrame The frame that is selected with all it's properties
     * @returns
     */
    getFramePropertyCalculatedValue = (name: FrameProperyNames, value: string, selectedFrame: FrameLayoutType) => {
        let calc = getCalculatedValue(value);
        switch (name) {
            case FrameProperyNames.FRAME_X: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.x.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            case FrameProperyNames.FRAME_Y: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.y.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            case FrameProperyNames.WIDTH: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.width.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            case FrameProperyNames.HEIGHT: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.height.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            case FrameProperyNames.FRAME_ROTATION: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.rotationDegrees.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            default:
                break;
        }
        return calc;
    };
}
