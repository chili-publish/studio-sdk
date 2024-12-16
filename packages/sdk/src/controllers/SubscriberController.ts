import { Id, RuntimeConfigType } from '../types/CommonTypes';
import { WellKnownConfigurationKeys } from '../types/ConfigurationTypes';
import { MeasurementUnit } from '../types/LayoutTypes';
import { ListVariable, ListVariableItem, Variable, VariableType } from '../types/VariableTypes';
import { ViewMode } from '../types/ViewModeTypes';
import { ConnectorCompatibilityTools } from '../utils/ConnectorCompatibilityTools';
import { ToolType } from '../utils/Enums';

/**
 * The SubscriberController is responsible for all listeners which can influence the application-state from outside.
 * Callbacks inside this controller can be set by `window.SDK.subscriber.{method-name}`
 */
export class SubscriberController {
    /**
     * @ignore
     */
    private config: RuntimeConfigType;

    /**
     * @ignore
     */
    private localConfig: Map<string, string>;

    /**
     * @ignore
     */
    constructor(config: RuntimeConfigType, localConfig: Map<string, string>) {
        this.config = config;
        this.localConfig = localConfig;
    }

    /**
     * Listener on actions, if this changes, this listener will get triggered with the updates
     * @param actions Stringified array of DocumentAction type
     */
    onActionsChanged = (actions: string) => {
        this.config.events.onActionsChanged.trigger(JSON.parse(actions));
    };

    /**
     * Listener on when a certain animation gets changed
     * @param animation Stringified array of FrameAnimationType
     */
    onAnimationChanged = (animation: string) => {
        this.config.events.onFrameAnimationsChanged.trigger(JSON.parse(animation));
    };

    /**
     * Listener on the playback state of the animation, it contains the current time of the playback (in milliseconds) and a flag that describes if the animation is currently playing
     * @param animationPlaybackState Stringified array of AnimationPlaybackType
     */
    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        this.config.events.onScrubberPositionChanged.trigger(JSON.parse(animationPlaybackState));
    };

    /**
     * Listener on the state of the currently selected layout, if its properties are changed, this listener will get triggered with the new properties
     * @param layoutProperties Stringified object of LayoutPropertiesType
     */
    onSelectedLayoutPropertiesChanged = (layoutProperties: string) => {
        this.config.events.onSelectedLayoutPropertiesChanged.trigger(JSON.parse(layoutProperties));
    };

    /**
     * Listener on the unit of the currently active layout. If you switch between layouts with different units, this listener will get triggered with the new unit
     * If you switch the unit of a layout this listener will get triggered with the new unit
     *
     * @param unit Stringified object of MeasurementUnit
     */
    onSelectedLayoutUnitChanged = (unit: string) => {
        this.config.events.onSelectedLayoutUnitChanged.trigger(unit as MeasurementUnit);
    };

    /**
     * Listener on the state of the currently selected frames, if this changes, this listener will get triggered with the updates
     * @param framesLayout Stringified array of FrameLayoutType objects
     */
    onSelectedFramesLayoutChanged = (framesLayout: string) => {
        const frames = JSON.parse(framesLayout);
        this.config.events.onSelectedFramesLayoutChanged.trigger(frames);

        const singleFrameCallBack = this.config.onSelectedFrameLayoutChanged;
        singleFrameCallBack && singleFrameCallBack(frames.length > 1 ? undefined : frames[0]);
    };

    /**
     * Listener on the state of the currently selected frame, it contains some basic information on the type of frame it is
     * @param framesContent Stringified array of Frame objects
     */
    onSelectedFramesContentChanged = (framesContent: string) => {
        const frames = JSON.parse(framesContent);
        this.config.events.onSelectedFramesContentChanged.trigger(frames);

        const singleFrameCallBack = this.config.onSelectedFrameContentChanged;
        singleFrameCallBack && singleFrameCallBack(frames.length > 1 ? null : frames[0]);
    };

    /**
     * Listener on the general state of the document, gets triggered every time a change is done on the document.
     */
    onStateChanged = () => {
        this.config.events.onStateChanged.trigger();
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
     * @param authRefreshRequest Stringified object of AuthRefreshRequest
     */
    onAuthExpired = async (authRefreshRequest: string) => {
        const authCredentials = await this.config.handlers.onAuthExpired.trigger(JSON.parse(authRefreshRequest));
        return authCredentials != null ? JSON.stringify(authCredentials) : null;
    };

    /**
     * Listener on viewport request.
     * The callback should resolve to the visible viewport. If the
     * listener is not defined, the viewport will take full size.
     *
     * When this emits it means that the engine requested the viewport for a
     * zoom to page call.
     */
    onViewportRequested = () => {
        const viewport = this.config.handlers.onViewportRequested.trigger();
        return viewport != null ? JSON.stringify(viewport) : null;
    };

    /**
     * Listener on when the document is fully loaded.
     */
    onDocumentLoaded = () => {
        this.config.events.onDocumentLoaded.trigger();
    };

    /**
     * To be implemented, gets triggered when clicking on the pageTitle on the canvas.
     */
    onPageSelectionChanged = (id: Id) => {
        this.config.events.onPageSelectionChanged.trigger(id);
    };

    /**
     * Listener on when variables change
     * @param variablesJson Stringified array of Variable
     */
    onVariableListChanged = (variablesJson: string) => {
        const parsed = JSON.parse(variablesJson) as Variable[];

        const updated = parsed.map((variable) =>
            variable.type === VariableType.list
                ? {
                      ...variable,
                      items: ((variable as ListVariable).items as unknown as ListVariableItem[]).map(
                          (item) => item.value,
                      ),
                      selected: ((variable as ListVariable).selected as unknown as ListVariableItem | undefined)?.value,
                  }
                : variable,
        );

        this.config.events.onVariableListChanged.trigger(updated);
    };

    /**
     * Listener on when the tool has changed by the canvas
     * @param tool the string representation of a certain tool
     */
    onSelectedToolChanged = (tool: string) => {
        this.config.events.onSelectedToolChanged.trigger(tool as ToolType);
    };

    /**
     * Listener on state changes
     * @param undoState Stringified object of UndoState
     */
    onUndoStateChanged = (undoState: string) => {
        this.config.events.onUndoStackStateChanged.trigger(JSON.parse(undoState));
    };

    /**
     * Listener on the state of the currently selected layout's frames, if this changes, this listener will get triggered with the updates
     * @param layoutFrames Stringified object of Frames
     */
    onSelectedLayoutFramesChanged = (layoutFrames: string) => {
        this.config.events.onSelectedLayoutFramesChanged.trigger(JSON.parse(layoutFrames));
    };

    /**
     * Listener on the state of the currently selected text's styles, if this changes, this listener will get triggered with the updates
     * @param styles Stringified object of styles
     */
    onSelectedTextStyleChanged = (styles: string) => {
        this.config.events.onSelectedTextStyleChanged.trigger(JSON.parse(styles));
    };

    /**
     * Listener on the state of the currently selected color's styles, if this changes, this listener will get triggered with the updates
     * @param colors Stringified object of colors
     */
    onColorsChanged = (colors: string) => {
        this.config.events.onColorsChanged.trigger(JSON.parse(colors));
    };

    /**
     * Listener on paragraph styles, if this changes, this listener will get triggered with the updates
     * @param paragraphStyles Stringified object of paragraph styles
     */
    onParagraphStylesChanged = (paragraphStyles: string) => {
        this.config.events.onParagraphStylesChanged.trigger(JSON.parse(paragraphStyles));
    };

    /**
     * Listener on character styles, if this changes, this listener will get triggered with the updates
     * @param characterStyles Stringified object of character styles
     */
    onCharacterStylesChanged = (characterStyles: string) => {
        this.config.events.onCharacterStylesChanged.trigger(JSON.parse(characterStyles));
    };

    /**
     * Listener on fonts, if this changes, this listener will get triggered with the updates
     * @param fonts Stringified object of font families
     */
    onFontFamiliesChanged = (fonts: string) => {
        this.config.events.onFontFamiliesChanged.trigger(JSON.parse(fonts));
    };

    /**
     * Listener on selected layout id, this listener will get triggered when a different layout is selected.
     * @param id the currently selected layout id
     */
    onSelectedLayoutIdChanged = (id: Id) => {
        this.config.events.onSelectedLayoutIdChanged.trigger(id);
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
        this.config.events.onLayoutsChanged.trigger(JSON.parse(layouts));
    };

    /**
     * Listener on scale factor of the canvas, this listener will get triggered when a zoom is applied to the canvas
     * @param zoom Stringified scale factor
     */
    onZoomChanged = (zoom: string) => {
        this.config.events.onZoomChanged.trigger(JSON.parse(zoom));
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
        this.config.events.onConnectorEvent.trigger(JSON.parse(connectorEvent));
    };

    /**
     * Listener on connectors, if this changes, this listener will get triggered with the updates
     * @param connectors Stringified array of ConnectorInstance type
     */
    onConnectorsChanged = (connectors: string) => {
        const connectorCompatibilityTools = new ConnectorCompatibilityTools();
        const compatibleConnectors = connectorCompatibilityTools.makeMultipleConnectorsBackwardsCompatible(
            JSON.parse(connectors),
            this.localConfig.get(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl),
        );
        this.config.events.onConnectorsChanged.trigger(compatibleConnectors);
    };

    /**
     * @experimental
     * Listener on when the selectedPageID is changed.
     * @param pageId Stringified pageId
     */
    onSelectedPageIdChanged = (pageId: string) => {
        this.config.events.onSelectedPageIdChanged.trigger(pageId);
    };

    /**
     * @experimental
     * Listener on pages list, this listener will get triggered when the pages are updated.
     * @param pages Stringified object of the pages
     */
    onPagesChanged = (pages: string) => {
        this.config.events.onPagesChanged.trigger(JSON.parse(pages));
    };

    /**
     * @experimental
     * Listener on pages snapshots, this will fire when a page snapshot is invalidated and should be updated.
     * @param page id of the page
     */
    onPageSnapshotInvalidated = (page: Id) => {
        this.config.events.onPageSnapshotInvalidated.trigger(page);
    };
    /**
     * Listener on page size, this listener will get triggered when the page size is changed, while the document is a `project`.
     * This will not emit anything if your document is a `template`.
     * @param pageSize Stringified object of the PageSize
     */
    onPageSizeChanged = (pageSize: string) => {
        this.config.events.onPageSizeChanged.trigger(JSON.parse(pageSize));
    };

    /**
     * Listener on corner radii of rectangle and polygon shapes, this listener will get triggered when any corner radius is changed
     * @param cornerRadius Stringified object of the CornerRadius
     */
    onShapeCornerRadiusChanged = (cornerRadius: string) => {
        this.config.events.onShapeCornerRadiusChanged.trigger(JSON.parse(cornerRadius));
    };

    /**
     * Listener of editor entering / exiting the crop mode
     * @param id frame id when entering / null when exiting
     */
    onCropActiveFrameIdChanged = (id?: Id) => {
        this.config.events.onCropActiveFrameIdChanged.trigger(id);
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
        this.config.events.onAsyncError.trigger(JSON.parse(asyncError));
    };

    /**
     * Listener on when the view mode has changed
     * @param viewMode the string representation of a view mode
     */
    onViewModeChanged = (viewMode: string) => {
        this.config.events.onViewModeChanged.trigger(viewMode as ViewMode);
    };

    /**
     * Listener on when barcode frames change their validation state
     *
     * @param validationResults the json string representation of the validation results
     */
    onBarcodeValidationChanged = (validationResults: string) => {
        this.config.events.onBarcodeValidationChanged.trigger(JSON.parse(validationResults));
    };

    /**
     * Listener on when the data source has changed
     *
     * @param connectorId the id of the data connector
     */
    onDataSourceIdChanged = (connectorId?: Id) => {
        this.config.events.onDataSourceIdChanged.trigger(connectorId);
    };

    /**
     * Listener on document issues, if this changes, this listener will get triggered with the updates
     * @param documentIssues Stringified object of document issues
     */
    onDocumentIssueListChanged = (documentIssues: string) => {
        this.config.events.onDocumentIssueListChanged.trigger(JSON.parse(documentIssues));
    };
}
