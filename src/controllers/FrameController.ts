import { FrameProperyNames } from '..';
import { SelectedFrameLayoutType, Child, ConfigType } from '../../types/CommonTypes';
import { getCalculatedValue } from '../utils/getCalculatedValue';

class FrameController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    resetFrameSize = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameSize(parseInt(frameId));
    };

    selectFrame = async (frameId: string) => {
        const res = await this.children;
        return res.selectFrames([parseInt(frameId)]);
    };

    selectMultipleFrames = async (frameIds: string[]) => {
        const res = await this.children;
        return res.selectFrames(frameIds.map((frameId) => parseInt(frameId)));
    };

    setFrameHeight = async (value: string, selectedFrame: SelectedFrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.HEIGHT, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        return res.setFrameHeight(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameRotation = async (value: string, selectedFrame: SelectedFrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_ROTATION, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        return res.setFrameRotation(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameWidth = async (value: string, selectedFrame: SelectedFrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.WIDTH, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        return res.setFrameWidth(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameX = async (value: string, selectedFrame: SelectedFrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_X, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        return res.setFrameX(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    setFrameY = async (value: string, selectedFrame: SelectedFrameLayoutType) => {
        const res = await this.children;
        const calc = this.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_Y, value, selectedFrame);
        if (calc === null) {
            return null;
        }
        return res.setFrameY(selectedFrame?.frameId, parseFloat(calc.toString()));
    };

    resetFrameX = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameX(parseInt(frameId));
    };

    resetFrameY = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameY(parseInt(frameId));
    };

    resetFrameRotation = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameRotation(parseInt(frameId));
    };

    resetFrameWidth = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameWidth(parseInt(frameId));
    };

    resetFrameHeight = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameHeight(parseInt(frameId));
    };

    setFrameVisibility = async (frameId: string, value: boolean) => {
        const res = await this.children;
        return res.setFrameVisibility(parseInt(frameId), value);
    };
    getFramePropertyCalculatedValue = (
        name: FrameProperyNames,
        value: string,
        selectedFrame: SelectedFrameLayoutType,
    ) => {
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
