import { FrameProperyNames } from '../index';
import type { Child, ConfigType } from '../../types/CommonTypes';
import type { FrameLayoutType } from '../../types/FrameTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';

class FrameController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    resetFrameSize = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameSize(frameId);
    };

    selectFrame = async (frameId: number) => {
        const res = await this.children;
        return res.selectFrames([frameId]);
    };

    selectMultipleFrames = async (frameIds: number[]) => {
        const res = await this.children;
        return res.selectFrames(frameIds);
    };

    setFrameHeight = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.HEIGHT, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.height.value) return null;

        return res.setFrameHeight(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameRotation = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_ROTATION, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.rotationDegrees.value) return null;

        return res.setFrameRotation(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameWidth = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.WIDTH, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.width.value) return null;

        return res.setFrameWidth(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameX = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_X, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.x.value) return null;

        return res.setFrameX(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameY = async (value: string, selectedFrame: FrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_Y, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        if (calc === selectedFrame?.y.value) return null;

        return res.setFrameY(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    resetFrameX = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameX(frameId);
    };

    resetFrameY = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameY(frameId);
    };

    resetFrameRotation = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameRotation(frameId);
    };

    resetFrameWidth = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameWidth(frameId);
    };

    resetFrameHeight = async (frameId: number) => {
        const res = await this.children;
        return res.resetFrameHeight(frameId);
    };

    setFrameVisibility = async (frameId: number, value: boolean) => {
        const res = await this.children;
        return res.setFrameVisibility(frameId, value);
    };
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
export default FrameController;
