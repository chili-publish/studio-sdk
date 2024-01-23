import { ConfigType, Id } from '../types/CommonTypes';
import { AuthRefreshTypeEnum as AuthRefreshTypeEnum } from '../types/ConnectorTypes';
import { MeasurementUnit } from '../types/LayoutTypes';
import { ToolType } from '../utils/enums';

/**
 * The SubscriberController is responsible for all listeners which can influence the application-state from outside.
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
     * Listener on actions, if this changes, this listener will get triggered with the updates
     * @param actions Stringified array of DocumentAction type
     */
    onActionsChanged = (actions: string) => {
        const callBack = this.config.onActionsChanged;
        callBack && callBack(JSON.parse(actions));
    };

    /**
     * Listener on when a certain animation gets changed
     * @param animation Stringified array of FrameAnimationType
     */
    onAnimationChanged = (animation: string) => {
        const callBack = this.config.onFrameAnimationsChanged;
        callBack && callBack(JSON.parse(animation));
    };

    /**
     * Listener on the playback state of the animation, it contains the current time of the playback (in milliseconds) and a flag that describes if the animation is currently playing
     * @param animationPlaybackState Stringified array of AnimationPlaybackType
     */
    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.onScrubberPositionChanged;
        callBack && callBack(JSON.parse(animationPlaybackState));
    };

    /**
     * Listener on the state of the currently selected layout, if its properties are changed, this listener will get triggered with the new properties
     * @param layoutProperties Stringified object of LayoutPropertiesType
     */
    onSelectedLayoutPropertiesChanged = (layoutProperties: string) => {
        const callBack = this.config.onSelectedLayoutPropertiesChanged;
        callBack && callBack(JSON.parse(layoutProperties));
    };

    /**
     * Listener on the unit of the currently active layout. If you switch between layouts with different units, this listener will get triggered with the new unit
     * If you switch the unit of a layout this listener will get triggered with the new unit
     *
     * @param unit Stringified object of MeasurementUnit
     */
    onSelectedLayoutUnitChanged = (unit: string) => {
        const callBack = this.config.onSelectedLayoutUnitChanged;
        callBack && callBack(unit as MeasurementUnit);
    };

    /**
     * Listener on the state of the currently selected frames, if this changes, this listener will get triggered with the updates
     * @param framesLayout Stringified array of FrameLayoutType objects
     */
    onSelectedFramesLayoutChanged = (framesLayout: string) => {
        const frames = JSON.parse(framesLayout);
        const multiFrameCallBack = this.config.onSelectedFramesLayoutChanged;
        multiFrameCallBack && multiFrameCallBack(frames);

        const singleFrameCallBack = this.config.onSelectedFrameLayoutChanged;
        singleFrameCallBack && singleFrameCallBack(frames.length > 1 ? undefined : frames[0]);
    };

    /**
     * Listener on the state of the currently selected frame, it contains some basic information on the type of frame it is
     * @param framesContent Stringified array of Frame objects
     */
    onSelectedFramesContentChanged = (framesContent: string) => {
        const frames = JSON.parse(framesContent);
        const multiFrameCallBack = this.config.onSelectedFramesContentChanged;
        multiFrameCallBack && multiFrameCallBack(frames);

        const singleFrameCallBack = this.config.onSelectedFrameContentChanged;
        singleFrameCallBack && singleFrameCallBack(frames.length > 1 ? null : frames[0]);
    };

    /**
     * Listener on the general state of the document, gets triggered every time a change is done on the document.
     */
    onStateChanged = () => {
        const callBack = this.config.onStateChanged;
        callBack && callBack();
    };

    /**
     * Listener on authentication expiration.
     * The callback should resolve to the refreshed authentication. If the
     * listener is not defined, the http requests from the connector will return
     * 401 with no refetch of assets.
     *
     * When this emits it means either:
     * - the grafxToken needs to be renewed
     * - any other authentication needs to be renewed (user impersonation, static..)
     *
     * @param connectorId connector id
     * @param type type of auth renewal needed
     * @param headerValue the value of the chili proxy authorization header. This
     *      will notify that the dam authentication expired if it went through the
     *      proxy.
     *      Example: "Static, 1234", "OAuthClientCredentials, 5678"
     *      If the http request did not go through the proxy, headerValue is null.
     */
    onAuthExpired = (connectorId: string, type: AuthRefreshTypeEnum, headerValue: string | null) => {
        const callBack = this.config.onAuthExpired;

        return callBack
            ? callBack(connectorId, type, headerValue).then((auth) => JSON.stringify(auth))
            : new Promise<string | null>((resolve) => resolve(null));
    };

    /**
     * Listener on when the document is fully loaded.
     */
    onDocumentLoaded = () => {
        const callBack = this.config.onDocumentLoaded;
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
     * @param tool the string representation of a certain tool
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
     * @param layoutFrames Stringified object of Frames
     */
    onSelectedLayoutFramesChanged = (layoutFrames: string) => {
        const callBack = this.config.onSelectedLayoutFramesChanged;
        callBack && callBack(JSON.parse(layoutFrames));
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
     * @param fonts Stringified object of font families
     */
    onFontFamiliesChanged = (fonts: string) => {
        const callBack = this.config.onFontFamiliesChanged;
        callBack && callBack(JSON.parse(fonts));
    };

    /**
     * Listener on selected layout id, this listener will get triggered when a different layout is selected.
     * @param id the currently selected layout id
     */
    onSelectedLayoutIdChanged = (id: Id) => {
        const callBack = this.config.onSelectedLayoutIdChanged;
        callBack && callBack(id);
    };

    /**
     * Listener on layouts, this listener will get triggered when a (sub)layout is
     * - created
     * - removed
     * - renamed
     * - duplicated
     * @param layouts Stringified object of layouts
     */
    onLayoutsChanged = (layouts: string) => {
        const callBack = this.config.onLayoutsChanged;
        callBack && callBack(JSON.parse(layouts));
    };

    /**
     * Listener on scale factor of the canvas, this listener will get triggered when a zoom is applied to the canvas
     * @param zoom Stringified scale factor
     */
    onZoomChanged = (zoom: string) => {
        const callBack = this.config.onZoomChanged;
        callBack && callBack(JSON.parse(zoom));
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
    onConnectorEvent = (connectorEvent: string) => {
        const callBack = this.config.onConnectorEvent;
        callBack && callBack(JSON.parse(connectorEvent));
    };

    /**
     * Listener on page size, this listener will get triggered when the page size is changed, while the document is a `project`.
     * This will not emit anything if your document is a `template`.
     * @param pageSize Stringified object of the PageSize
     */
    onPageSizeChanged = (pageSize: string) => {
        const callBack = this.config.onPageSizeChanged;
        callBack && callBack(JSON.parse(pageSize));
    };

    /**
     * Listener on corner radii of rectangle and polygon shapes, this listener will get triggered when any corner radius is changed
     * @param cornerRadius Stringified object of the CornerRadius
     */
    onShapeCornerRadiusChanged = (cornerRadius: string) => {
        const callBack = this.config.onShapeCornerRadiusChanged;
        callBack && callBack(JSON.parse(cornerRadius));
    };

    /**
     * Listener of editor entering / exiting the crop mode
     * @param id frame id when entering / null when exiting
     */
    onCropActiveFrameIdChanged = (id?: Id) => {
        const callBack = this.config.onCropActiveFrameIdChanged;
        callBack && callBack(id);
    };

    /**
     * Listener on async errors.
     * Async errors are thrown at times not directly tied to SDK calls.
     * e.g. Getting an action error triggered after a late event.
     *
     * If this is an `ActionAsyncError`:
     * - `id` refers to the action id
     * - `event` refers to the event that triggered the action
     * - `eventChain` refers the chain of events that lead to the action, first
     * item being the closest parent.
     * @param asyncError error triggered asynchronously
     */
    onAsyncError = (asyncError: string) => {
        const callBack = this.config.onAsyncError;
        callBack && callBack(JSON.parse(asyncError));
    };
}
