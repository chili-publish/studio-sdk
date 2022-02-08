import { Connection } from 'penpal';
import Connect from './interactions/connector';
import { FrameController } from './controllers/FrameController';
import { AnimationController } from './controllers/AnimationController';
import { LayoutController } from './controllers/LayoutController';
import { UtilsController } from './controllers/UtilsController';
import { SubscriberController } from './controllers/SubscriberController';
import { DocumentController } from './controllers/DocumentController';

import type { ConfigType, Child } from '../types/CommonTypes';
import { VariableController } from './controllers/VariableController';

export { FrameProperyNames, LayoutProperyNames } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from '../types/AnimationTypes';
export { VariableType } from '../types/VariableTypes';

export type { LayoutPropertiesType, FrameProperties, LayoutType } from '../types/LayoutTypes';
export type { FrameLayoutType, FrameType } from '../types/FrameTypes';
export type { Variable } from '../types/VariableTypes';

export type { DocumentError } from '../types/DocumentTypes';
export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from '../types/AnimationTypes';
export type { ConfigType, InitialStateType, PageType } from '../types/CommonTypes';

let connection: Connection;

export class SDK {
    config: ConfigType;
    connection: Connection;

    /**
     * @ignore
     */
    children: Child;

    layout: LayoutController;
    frame: FrameController;
    animation: AnimationController;
    document: DocumentController;
    variable: VariableController;
    utils: UtilsController;
    private subscriber: SubscriberController;

    /**
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.children = connection?.promise.then((child) => {
            return child;
        }) as unknown as Child;

        this.layout = new LayoutController(this.children, this.config);
        this.frame = new FrameController(this.children, this.config);
        this.animation = new AnimationController(this.children, this.config);
        this.document = new DocumentController(this.children, this.config);
        this.variable = new VariableController(this.children, this.config);
        this.utils = new UtilsController();
        this.subscriber = new SubscriberController(this.config);
    }

    /**
     * This method will initiate the editor, running this will result in the editor restarting
     * It will generate an iframe in the document
     */
    loadEditor = () => {
        Connect(
            this.config.editorLink,
            {
                onStateChanged: this.subscriber.onStateChanged,
                onSelectedFrameContentChanged: this.subscriber.onSelectedFrameContentChanged,
                onSelectedFrameLayoutChanged: this.subscriber.onSelectedFrameLayoutChanged,
                onSelectedLayoutPropertiesChanged: this.subscriber.onSelectedLayoutPropertiesChanged,
                onOpenLayoutPropertiesPanelChange: this.subscriber.onPageSelectionChanged,
                onScrubberPositionChanged: this.subscriber.onAnimationPlaybackChanged,
                onFrameAnimationsChanged: this.subscriber.onAnimationChanged,
                onVariableListChanged: this.subscriber.onVariableListChanged,
            },
            this.setConnection,
            this.config.editorId,
        );
        this.children = connection?.promise.then((child) => {
            return child;
        }) as unknown as Child;

        this.layout = new LayoutController(this.children, this.config);
        this.frame = new FrameController(this.children, this.config);
        this.animation = new AnimationController(this.children, this.config);
        this.document = new DocumentController(this.children, this.config);
        this.variable = new VariableController(this.children, this.config);
        this.utils = new UtilsController();
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
