import { evaluate, round } from 'mathjs';

import { SelectedFrameLayoutType, Child } from '../../types/CommonTypes';
import { FrameProperyNames } from '../utils/enums';

class FrameProperties {
    children: Child;

    constructor(children: Child) {
        this.children = children;
    }

    setFrameHeight = async (frameId: string, value: string) => {
        const res = await this.children;
        return res.setFrameHeight(parseInt(frameId), parseFloat(value));
    };

    setFrameRotation = async (frameId: string, value: string) => {
        const res = await this.children;
        return res.setFrameRotation(parseInt(frameId), parseFloat(value));
    };

    setFrameWidth = async (frameId: string, value: string) => {
        const res = await this.children;
        return res.setFrameWidth(parseInt(frameId), parseFloat(value));
    };

    setFrameX = async (frameId: string, value: string) => {
        const res = await this.children;
        return res.setFrameX(parseInt(frameId), parseFloat(value));
    };

    setFrameY = async (frameId: string, value: string) => {
        const res = await this.children;
        return res.setFrameY(parseInt(frameId), parseFloat(value));
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
        const str = value.replace(/[^0-9,\-,+,/,*,(,),/,/,/./]/gi, '').replace(/,/gi, '.');
        if (str === null || str.length === 0) return null;
        let calc: number | null;
        try {
            calc = round(evaluate(str), 2);
        } catch (error) {
            calc = null;
        }
        switch (name) {
            case FrameProperyNames.FRAME_X: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedFrame) {
                    if (selectedFrame.x.value === calc) {
                        calc = null;
                    } else {
                        this.setFrameX(selectedFrame?.frameId.toString(), calc.toString());
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
                    } else {
                        this.setFrameY(selectedFrame?.frameId.toString(), calc.toString());
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
                    } else {
                        this.setFrameWidth(selectedFrame?.frameId.toString(), calc.toString());
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
                    } else {
                        this.setFrameHeight(selectedFrame?.frameId.toString(), calc.toString());
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
                    } else {
                        this.setFrameRotation(selectedFrame?.frameId.toString(), calc.toString());
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
export default FrameProperties;
