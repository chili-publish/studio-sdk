import { Connection } from 'penpal';
import { ConfigType, Child, SelectedFrameLayoutType } from '../types/CommonTypes';
import Connect from './interactions/connector';
import FrameProperties from './classes/frameProperties';
import { FrameProperyNames } from './utils/enums';
import AnimationController from './classes/AnimationController';

export { default as loadEditor } from './components/editor/Editor';
export { default as Connect } from './interactions/connector';
export { FrameProperyNames } from './utils/enums';
export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from '../types/AnimationTypes';

export type { BasicAnimationsType } from '../types/AnimationTypes';

export type { FrameAnimationType, EaseTweenCombinationType } from '../types/AnimationTypes';

let connection: Connection;

export class SDK {
    config: ConfigType;
    connection: Connection;
    children: Child;
    frameProperties: FrameProperties;
    animation: AnimationController;

    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.children = connection?.promise.then((child) => child) as unknown as Child;
        this.frameProperties = new FrameProperties(this.children);
        this.animation = new AnimationController(this.children, this.config);
    }

    loadEditor = () => {
        Connect(
            this.config.editorLink,
            {
                stateChanged: this.stateChanged,
                selectedFrameLayout: this.selectedFrameLayout,
                selectedFrameContent: this.selectedFrameContent,
            },
            this.setConnection,
            this.config.editorId,
        );
        this.children = connection.promise.then((child) => child) as unknown as Child;
        this.frameProperties = new FrameProperties(this.children);
        this.animation = new AnimationController(this.children, this.config);
    };

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

    getFramePropertyCalculatedValue = async (
        name: FrameProperyNames,
        value: string,
        selectedFrame: SelectedFrameLayoutType,
    ) => {
        const calculatedValue = await this.frameProperties?.getFramePropertyCalculatedValue(name, value, selectedFrame);
        return calculatedValue;
    };
}

export default SDK;
