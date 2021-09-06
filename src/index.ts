/* eslint-disable no-console */
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
        Connect(config.editorLink, { stateChanged: this.stateChanged }, this.setConnection);
        this.children = connection.promise.then((child) => child) as unknown as Child;
    }

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };

    removeLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.removeLayout(layoutId);
    };

    addLayout = async (parentId: number) => {
        const res = await this.children;
        return res.addLayout(parentId);
    };

    renameLayout = async (layoutId: number, layoutName: string) => {
        const res = await this.children;
        return res.renameLayout(layoutId, layoutName);
    };

    selectLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.selectLayout(layoutId);
    };

    stateChanged = (document: string) => {
        const callBack = this.config.stateChanged;
        callBack(document);
    };
}

export default SDK;
