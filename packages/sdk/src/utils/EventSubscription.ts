/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentAction } from '../types/ActionTypes';
import { AnimationPlaybackType, FrameAnimationType } from '../types/AnimationTypes';
import { BarcodeFrameValidationResult } from '../types/BarcodeTypes';
import { CharacterStyle } from '../types/CharacterStyleTypes';
import { DocumentColor } from '../types/ColorStyleTypes';
import { ConfigType, RuntimeConfigType, SelectedLayoutFrame, Id, AsyncError } from '../types/CommonTypes';
import { AuthCredentials, AuthRefreshRequest, ConnectorEvent, ConnectorInstance } from '../types/ConnectorTypes';
import { UndoState } from '../types/DocumentTypes';
import { DocumentFontFamily } from '../types/FontTypes';
import { FrameLayoutType, Frame } from '../types/FrameTypes';
import { LayoutPropertiesType, MeasurementUnit, LayoutListItemType } from '../types/LayoutTypes';
import { PageSize } from '../types/PageTypes';
import { ParagraphStyle } from '../types/ParagraphStyleTypes';
import { CornerRadiusUpdateModel } from '../types/ShapeTypes';
import { SelectedTextStyle } from '../types/TextStyleTypes';
import { Variable } from '../types/VariableTypes';
import { ViewMode } from '../types/ViewModeTypes';
import { Viewport } from '../types/ViewportTypes';
import { ToolType } from './Enums';

class EventSubscriptionBase {}

export class SingleSubscription<T extends (...args: any[]) => any> extends EventSubscriptionBase {
    protected callbacks: Map<string, T> = new Map();
    protected legacyEventHandler: (() => T | undefined) | undefined;

    constructor(legacyEventHandler?: () => T | undefined) {
        super();
        this.legacyEventHandler = legacyEventHandler;
    }

    /**
     * Executes the registered callbacks with the provided arguments.
     *
     * @param args The arguments to pass to the callbacks.
     * @returns The result of executing the callbacks.
     */
    trigger(...args: Parameters<T>): any {
        let result;

        if (this.legacyEventHandler) {
            const callback = this.legacyEventHandler();
            if (callback) {
                result = callback(...args);
            }
        }

        for (const callback of this.callbacks.values()) {
            result = callback(...args);
        }

        return result;
    }
}

export class EventSubscription<T extends (...args: any[]) => any> extends SingleSubscription<T> {
    constructor(legacyEventHandler?: () => T | undefined) {
        super(legacyEventHandler);
    }

    /**
     * Registers a callback function with an optional key.
     *
     * @param callback - The callback function to register.
     * @param key - An optional key to associate with the callback.
     * @returns The generated or provided key associated with the callback.
     */
    registerCallback(callback: T, key?: string): string {
        const callbackName = key || this.generateUniqueName();
        this.callbacks.set(callbackName, callback);
        return callbackName;
    }

    /**
     * Removes the callback associated with the specified name from the subscription.
     * @param name - The name of the callback to remove.
     */
    unsubscribeCallback(name: string): void {
        this.callbacks.delete(name);
    }

    trigger(...args: Parameters<T>): any {
        let result;

        if (this.legacyEventHandler) {
            const callback = this.legacyEventHandler();
            if (callback) {
                result = callback(...args);
            }
        }

        for (const callback of this.callbacks.values()) {
            result = callback(...args);
        }

        return result;
    }

    // Generate a unique name for unnamed callbacks
    private generateUniqueName(): string {
        return `callback_${Math.random().toString(36).substr(2, 9)}`;
    }
}

export class EventHelper {
    static ensureSubscriptions(config: ConfigType): RuntimeConfigType {
        // we need a reference to the clone object in the eventsubscriptions, so we need to create the object in 2 steps
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clone: RuntimeConfigType = { ...config };
        clone.handlers = {
            onAuthExpired: new EventSubscription<
                (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>
            >(() => clone.onAuthExpired),
            onViewportRequested: new EventSubscription<() => Viewport | null>(() => clone.onViewportRequested),
        };
        clone.events = {
            onActionsChanged: new EventSubscription<(state: DocumentAction[]) => void>(() => clone.onActionsChanged),
            onStateChanged: new EventSubscription<() => void>(() => clone.onStateChanged),

            onDocumentLoaded: new EventSubscription<() => void>(() => clone.onDocumentLoaded),
            onSelectedFramesLayoutChanged: new EventSubscription<(states: FrameLayoutType[]) => void>(
                () => clone.onSelectedFramesLayoutChanged,
            ),
            onSelectedFramesContentChanged: new EventSubscription<(state: Frame[]) => void>(
                () => clone.onSelectedFramesContentChanged,
            ),
            onPageSelectionChanged: new EventSubscription<() => void>(() => clone.onPageSelectionChanged),
            onSelectedLayoutPropertiesChanged: new EventSubscription<(state: LayoutPropertiesType) => void>(
                () => clone.onSelectedLayoutPropertiesChanged,
            ),
            onSelectedLayoutUnitChanged: new EventSubscription<(unit: MeasurementUnit) => void>(
                () => clone.onSelectedLayoutUnitChanged,
            ),
            onScrubberPositionChanged: new EventSubscription<(state: AnimationPlaybackType) => void>(
                () => clone.onScrubberPositionChanged,
            ),
            onFrameAnimationsChanged: new EventSubscription<(animationState: FrameAnimationType[]) => void>(
                () => clone.onFrameAnimationsChanged,
            ),
            onVariableListChanged: new EventSubscription<(variableList: Variable[]) => void>(
                () => clone.onVariableListChanged,
            ),
            onSelectedToolChanged: new EventSubscription<(tool: ToolType) => void>(() => clone.onSelectedToolChanged),
            onUndoStackStateChanged: new EventSubscription<(undoStackState: UndoState) => void>(
                () => clone.onUndoStackStateChanged,
            ),
            onSelectedLayoutFramesChanged: new EventSubscription<(frames: SelectedLayoutFrame[]) => void>(
                () => clone.onSelectedLayoutFramesChanged,
            ),
            onSelectedTextStyleChanged: new EventSubscription<(styles: SelectedTextStyle) => void>(
                () => clone.onSelectedTextStyleChanged,
            ),
            onColorsChanged: new EventSubscription<(colors: DocumentColor[]) => void>(() => clone.onColorsChanged),
            onParagraphStylesChanged: new EventSubscription<(paragraphStyles: ParagraphStyle[]) => void>(
                () => clone.onParagraphStylesChanged,
            ),
            onCharacterStylesChanged: new EventSubscription<(characterStyles: CharacterStyle[]) => void>(
                () => clone.onCharacterStylesChanged,
            ),
            onFontFamiliesChanged: new EventSubscription<(fontFamilies: DocumentFontFamily[]) => void>(
                () => clone.onFontFamiliesChanged,
            ),
            onSelectedLayoutIdChanged: new EventSubscription<(layoutId: string) => void>(
                () => clone.onSelectedLayoutIdChanged,
            ),
            onLayoutsChanged: new EventSubscription<(layouts: LayoutListItemType[]) => void>(
                () => clone.onLayoutsChanged,
            ),
            onConnectorEvent: new EventSubscription<(event: ConnectorEvent) => void>(() => clone.onConnectorEvent),
            onConnectorsChanged: new EventSubscription<(connectors: ConnectorInstance[]) => void>(
                () => clone.onConnectorsChanged,
            ),
            onZoomChanged: new EventSubscription<(scaleFactor: number) => void>(() => clone.onZoomChanged),
            onPageSizeChanged: new EventSubscription<(pageSize: PageSize) => void>(() => clone.onPageSizeChanged),
            onShapeCornerRadiusChanged: new EventSubscription<(cornerRadius: CornerRadiusUpdateModel) => void>(
                () => clone.onShapeCornerRadiusChanged,
            ),
            onCropActiveFrameIdChanged: new EventSubscription<(id?: Id) => void>(
                () => clone.onCropActiveFrameIdChanged,
            ),
            onAsyncError: new EventSubscription<(asyncError: AsyncError) => void>(() => clone.onAsyncError),
            onViewModeChanged: new EventSubscription<(tool: ViewMode) => void>(() => clone.onViewModeChanged),
            onBarcodeValidationChanged: new EventSubscription<
                (validationResults: BarcodeFrameValidationResult[]) => void
            >(() => clone.onBarcodeValidationChanged),
        };
        return clone;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static triggerEvent(event: EventSubscriptionBase | Function | undefined, ...args: any[]): any {
        if (!event) {
            return;
        }

        if (event instanceof EventSubscription) {
            return event.trigger(...args);
        } else if (event instanceof Function) {
            return event(...args);
        }

        throw new Error('Invalid event type');
    }
}
