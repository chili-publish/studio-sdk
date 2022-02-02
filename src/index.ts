import { Connection } from 'penpal';
import Connect from './interactions/connector';
import { FrameController } from './controllers/FrameController';
import { AnimationController } from './controllers/AnimationController';
import { LayoutController } from './controllers/LayoutController';
import { UtilsController } from './controllers/UtilsController';
import { SubscriberController } from './controllers/SubscriberController';

export { default as loadEditor } from './components/editor/Editor';
export { default as Connect } from './interactions/connector';

export { FrameProperyNames, LayoutProperyNames } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from '../types/AnimationTypes';

export type { LayoutPropertiesType, FrameProperties, LayoutType } from '../types/LayoutTypes';
export type { FrameLayoutType, FrameType } from '../types/FrameTypes';

export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from '../types/AnimationTypes';
import type { ConfigType, Child } from '../types/CommonTypes';

let connection: Connection;

export class SDK {
    config: ConfigType;
    connection: Connection;
    children: Child;

    layout: LayoutController;
    frame: FrameController;
    animation: AnimationController;
    utils: UtilsController;
    subscriber: SubscriberController;

    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.children = connection?.promise.then((child) => {
            return child;
        }) as unknown as Child;

        this.layout = new LayoutController(this.children, this.config);
        this.frame = new FrameController(this.children, this.config);
        this.animation = new AnimationController(this.children, this.config);
        this.utils = new UtilsController();
        this.subscriber = new SubscriberController(this.config);
    }

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
        this.utils = new UtilsController();
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
