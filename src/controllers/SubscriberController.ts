import { ConfigType } from '../../types/CommonTypes';
import { ToolType } from '../utils/enums';

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
        callBack && callBack(JSON.parse(animation));
    };

    /**
     * Listener on the playbackstate of the animation, it contains the current time of the playback (in miliseconds) and a flag that describes if the animation is currently playing
     * @param animationPlaybackState Stringified array of AnimationPlaybackType
     */
    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.onScrubberPositionChanged;
        callBack && callBack(JSON.parse(animationPlaybackState));
    };

    /**
     * Listener on the state of the currently selected layout, if its properties are changed, this listener will get triggered with the new properties
     * @param properties Stringified object of LayoutPropertiesType
     */
    onSelectedLayoutPropertiesChanged = (properties: string) => {
        const callBack = this.config.onSelectedLayoutPropertiesChanged;
        callBack && callBack(JSON.parse(properties));
    };

    /**
     * Listener on the state of the currently selected frame, if this changes, this listener will get triggered with the updates
     * @param layout Stringified object of FrameLayoutType
     */
    onSelectedFrameLayoutChanged = (frame: string) => {
        const callBack = this.config.onSelectedFrameLayoutChanged;
        callBack && callBack(JSON.parse(frame));
    };

    /**
     * Listener on the state of the currently selected frame, it contains some basic information on the type of frame it is
     * @param layout Stringified object of FrameType
     */
    onSelectedFrameContentChanged = (frame: string) => {
        const callBack = this.config.onSelectedFrameContentChanged;
        callBack && callBack(JSON.parse(frame));
    };

    /**
     * A listener on the general state of the document, gets triggered everytime a change is done on the document.
     */
    onStateChanged = () => {
        const callBack = this.config.onStateChanged;
        callBack && callBack();
    };

    /**
     * To be implemented, gets triggered when clicking on the pageTitle on the canvas.
     */
    onPageSelectionChanged = () => {
        const callBack = this.config.onPageSelectionChanged;
        callBack && callBack();
    };

    /**
     * Listener on when variables change
     * @param variablesJson Stringified array of Variable
     */
    onVariableListChanged = (variablesJson: string) => {
        const callBack = this.config.onVariableListChanged;
        callBack && callBack(JSON.parse(variablesJson));
    };

    /**
     * Listener on when the tool has changed by the canvas
     * @param tool The string representation of a certain tool
     */
    onSelectedToolChanged = (tool: string) => {
        const callBack = this.config.onSelectedToolChanged;
        callBack && callBack(tool as ToolType);
    };

    /**
     * Listener on state changes
     * @param undoState Stringified object of UndoState
     */
    onUndoStateChanged = (undoState: string) => {
        const callBack = this.config.onUndoStackStateChanged;
        callBack && callBack(JSON.parse(undoState));
    };

    /**
     * Listener on the state of the currently selected layout's frames, if this changes, this listener will get triggered with the updates
     * @param frames Stringified object of Frames
     */
    onSelectedLayoutFramesChanged = (frames: string) => {
        const callBack = this.config.onSelectedLayoutFramesChanged;
        callBack && callBack(JSON.parse(frames));
    };

    /**
     * Listener on the state of the currently selected text's styles, if this changes, this listener will get triggered with the updates
     * @param styles Stringified object of styles
     */
    onSelectedTextStyleChanged = (styles: string) => {
        const callBack = this.config.onSelectedTextStyleChanged;
        callBack && callBack(JSON.parse(styles));
    };

    /**
     * Listener on the state of the currently selected color's styles, if this changes, this listener will get triggered with the updates
     * @param colors Stringified object of colors
     */
    onColorsChanged = (colors: string) => {
        const callBack = this.config.onColorsChanged;
        callBack && callBack(JSON.parse(colors));
    };

    /**
     * Listener on paragraph styles, if this changes, this listener will get triggered with the updates
     * @param paragraphStyles Stringified object of paragraph styles
     */
    onParagraphStylesChanged = (paragraphStyles: string) => {
        const callBack = this.config.onParagraphStylesChanged;
        callBack && callBack(JSON.parse(paragraphStyles));
    };

    /**
     * Listener on character styles, if this changes, this listener will get triggered with the updates
     * @param characterStyles Stringified object of character styles
     */
    onCharacterStylesChanged = (characterStyles: string) => {
        const callBack = this.config.onCharacterStylesChanged;
        callBack && callBack(JSON.parse(characterStyles));
    };

    /**
     * Listener on fonts, if this changes, this listener will get triggered with the updates
     * @param fonts Stringified object of fonts
     */
    onFontsChanged = (fonts: string) => {
        const callBack = this.config.onFontsChanged;
        callBack && callBack(JSON.parse(fonts));
    };

    /**
     * Listener on selected layout id, this listener will get triggered when a different layout is selected.
     * @param layoutId the currently selected layout id
     */
    onSelectedLayoutIdChanged = (layoutId: string) => {
        const callBack = this.config.onSelectedLayoutIdChanged;
        callBack && callBack(layoutId);
    };

    /**
     * Listener on layouts, this listener will get triggered when a (sub)layout is
     * - added
     * - removed
     * - renamed
     * - duplicted
     * @param layouts Stringified object of layouts
     */
    onLayoutsChanged = (layouts: string) => {
        const callBack = this.config.onLayoutsChanged;
        callBack && callBack(JSON.parse(layouts));
    };

    /**
     * Listener on connector events, this listener will get triggered when a connector emits one of those events
     * - reloadRequired
     * - authChanged
     * - unloaded
     * - stateChanged
     * 
     * stateChanged - this event will be triggered by connector states: loading, loaded, running, ready, error
     * @param connectorEvent Stringified object of ConnectorEvent
     */
    onConnectorStateChanged = (connectorEvent: string) => {
        const callBack = this.config.onConnectorStateChanged;
        callBack && callBack(JSON.parse(connectorEvent));
    };
}
