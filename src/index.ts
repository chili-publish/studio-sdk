// This ESLint disable is needed to parse the integers correctly. TODO: Once calls accept strings instead of numbers, remove parsing
/* eslint-disable radix */
import { Connection } from 'penpal';
import { evaluate } from 'mathjs';
import { ConfigType, Child, SelectedFrameLayoutType } from '../types/CommonTypes';
import Connect from './interactions/connector';

export { default as Editor } from './components/editor/Editor';
export { default as Connect } from './interactions/connector';

let connection: Connection;

export class SDK {
    config: ConfigType;

    connection: Connection;

    children: Child;

    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        Connect(
            config.editorLink,
            {
                stateChanged: this.stateChanged,
                selectedFrameLayout: this.selectedFrameLayout,
                selectedFrameContent: this.selectedFrameContent,
            },
            this.setConnection,
        );
        this.children = connection.promise.then((child) => child) as unknown as Child;
    }

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };

    removeLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.removeLayout(parseInt(layoutId));
    };

    addLayout = async (parentId: string) => {
        const res = await this.children;
        return res.addLayout(parseInt(parentId));
    };

    renameLayout = async (layoutId: string, layoutName: string) => {
        const res = await this.children;
        return res.renameLayout(parseInt(layoutId), layoutName);
    };

    selectLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.selectLayout(parseInt(layoutId));
    };

    duplicateLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.duplicateLayout(parseInt(layoutId));
    };

    resetLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.resetLayout(parseInt(layoutId));
    };

    stateChanged = (document: string) => {
        const callBack = this.config.stateChanged;
        callBack(document);
    };

    resetFrameSize = async (frameId: string) => {
        const res = await this.children;
        return res.resetFrameSize(parseInt(frameId));
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

    selectedFrameLayout = (document: string) => {
        const callBack = this.config.selectedFrameLayout;
        callBack(document);
    };

    selectedFrameContent = (document: string) => {
        const callBack = this.config.selectedFrameContent;
        callBack(document);
    };

    selectFrame = async (frameId: string) => {
        const res = await this.children;
        return res.selectFrames([parseInt(frameId)]);
    };

    selectMultipleFrames = async (frameIds: string[]) => {
        const res = await this.children;
        return res.selectFrames(frameIds.map((frameId) => parseInt(frameId)));
    };

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

    setFrameVisibility = async (frameId: string, value: boolean) => {
        const res = await this.children;
        return res.setFrameVisibility(parseInt(frameId), value);
    };

    /* eslint-disable prettier/prettier */
    getCalculatedValue = async (name: string, value: string, selectedFrame: SelectedFrameLayoutType) => {
        const str = value.replace(/[^0-9,\-,+,/,*,(,)]/gi, '');
        if (str === null || str.length === 0) return null;
        let calc: number | null;
        try {
            calc = evaluate(str);
        } catch (error) {
            calc = null;
        }

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

export default SDK;
