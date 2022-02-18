import { ConfigType } from '../../types/CommonTypes';
import { Tools } from '../utils/enums';

/**
 * The SubscriberController is responsible for all listeners which can influence the aplication-state from outside.
 * Callbacks inside this controller can be set by `window.SDK.subscriber.{method-name}`
 */
export class SubscriberController {
    /**
     * @ignore
     */
    private config: ConfigType;

    /**
     * @ignore
     */
    constructor(config: ConfigType) {
        this.config = config;
    }

    /**
     * Listener on when a certain animation gets changed
     * @param animation Stringified array of FrameAnimationType
     */
    onAnimationChanged = (animation: string) => {
        const callBack = this.config.onFrameAnimationsChanged;
        callBack(JSON.parse(animation));
    };

    /**
     * Listener on the playbackstate of the animation, it contains the current time of the playback (in miliseconds) and a flag that describes if the animation is currently playing
     * @param animationPlaybackState Stringified array of AnimationPlaybackType
     */
    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.onScrubberPositionChanged;
        callBack(JSON.parse(animationPlaybackState));
    };

    /**
     * Listener on the state of the currently selected layout, if its properties are changed, this listener will get triggered with the new properties
     * @param properties Stringified object of LayoutPropertiesType
     */
    onSelectedLayoutPropertiesChanged = (properties: string) => {
        const callBack = this.config.onSelectedLayoutPropertiesChanged;
        callBack(JSON.parse(properties));
    };

    /**
     * Listener on the state of the currently selected frame, if this changes, this listener will get triggered with the updates
     * @param layout Stringified object of FrameLayoutType
     */
    onSelectedFrameLayoutChanged = (frame: string) => {
        const callBack = this.config.onSelectedFrameLayoutChanged;
        callBack(JSON.parse(frame));
    };

    /**
     * Listener on the state of the currently selected frame, it contains some basic information on the type of frame it is
     * @param layout Stringified object of FrameType
     */
    onSelectedFrameContentChanged = (frame: string) => {
        const callBack = this.config.onSelectedFrameContentChanged;
        callBack(JSON.parse(frame));
    };

    /**
     * A listener on the general state of the document, gets triggered everytime a change is done on the document. Use with care, very expensive operation
     * @param document String value of the document, typed as InitialStateType
     */
    onStateChanged = (document: string) => {
        const callBack = this.config.onStateChanged;
        callBack(JSON.parse(document));
    };

    /**
     * To be implemented, gets triggered when clicking on the pageTitle on the canvas.
     */
    onPageSelectionChanged = () => {
        const callBack = this.config.onPageSelectionChanged;
        callBack();
    };

    /**
     * Listener on when variables change
     * @param variablesJson Stringified array of Variable
     */
    onVariableListChanged = (variablesJson: string) => {
        const callBack = this.config.onVariableListChanged;
        callBack(JSON.parse(variablesJson));
    };

    /**
     * Listener on when the tool has changed by the canvas
     * @param tool The string representation of a certain tool
     */
    onSelectedToolChanged = (tool: string) => {
        const callBack = this.config.onSelectedToolChanged;
        callBack(tool as Tools);
    };
}
