// This ESLint disable is needed to parse the integers correctly. TODO: Once calls accept strings instead of numbers, remove parsing
/* eslint-disable radix */
import { Connection } from 'penpal';
import { ConfigType, Child } from '../types/CommonTypes';
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
        return res.selectFames([parseInt(frameId)]);
    };

    selectMultipleFrame = async (frameIds: string[]) => {
        const res = await this.children;
        return res.selectFames(frameIds.map((frameId) => parseInt(frameId)));
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
}

export default SDK;
