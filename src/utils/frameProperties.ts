// This ESLint disable is needed to parse the integers correctly. TODO: Once calls accept strings instead of numbers, remove parsing
/* eslint-disable radix */
import { evaluate } from 'mathjs';

import { SelectedFrameLayoutType, Child } from '../../types/CommonTypes';

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

    calculateInputValue = (name: string, value: string, selectedFrame: SelectedFrameLayoutType) => {
        const str = value.replace(/[^0-9,\-,+,/,*,(,)]/gi, '');
        if (str === null || str.length === 0) return null;
        let calc: number | null;
        try {
            calc = evaluate(str);
        } catch (error) {
            calc = null;
        }
        /* eslint-disable prettier/prettier */
        switch (name) {
        case 'frameX': {
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

        case 'frameY': {
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

        case 'width': {
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

        case 'height': {
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

        case 'frameRotation': {
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
