import { Connection } from 'penpal';
import { ConfigType, Child } from '../types/CommonTypes';
import Connect from './interactions/connector';
import FrameController from './controllers/FrameController';
import AnimationController from './controllers/AnimationController';
import LayoutController from './controllers/LayoutController';

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

    layout: LayoutController;
    frame: FrameController;
    animation: AnimationController;

    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.children = connection?.promise.then((child) => child) as unknown as Child;

        this.layout = new LayoutController(this.children);
        this.frame = new FrameController(this.children, this.config);
        this.animation = new AnimationController(this.children, this.config);
    }

    loadEditor = () => {
        Connect(
            this.config.editorLink,
            {
                stateChanged: this.stateChanged,
                selectedFrameContent: this.frame.selectedFrameContent,
                selectedFrameLayout: this.frame.selectedFrameLayout,
            },
            this.setConnection,
            this.config.editorId,
        );
        this.children = connection.promise.then((child) => child) as unknown as Child;

        this.layout = new LayoutController(this.children);
        this.frame = new FrameController(this.children, this.config);
        this.animation = new AnimationController(this.children, this.config);
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };

    stateChanged = (document: string) => {
        const callBack = this.config.stateChanged;
        callBack(document);
    };
}

export default SDK;
