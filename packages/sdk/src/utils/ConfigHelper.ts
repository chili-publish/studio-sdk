import { DocumentAction } from '../types/ActionTypes';
import { AnimationPlaybackType, FrameAnimationType } from '../types/AnimationTypes';
import { BarcodeFrameValidationResult } from '../types/BarcodeTypes';
import { CharacterStyle } from '../types/CharacterStyleTypes';
import { DocumentColor } from '../types/ColorStyleTypes';
import { ConfigType, RuntimeConfigType, SelectedLayoutFrame, Id, AsyncError, LogLevel } from '../types/CommonTypes';
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
import { EventSubscription } from './EventSubscription';

export class ConfigHelper {
    /**
     * Creates a runtime configuration object from the provided configuration object.
     *
     * @param config The configuration object to create the runtime configuration object from.
     * @returns The runtime configuration object.
     */
    static createRuntimeConfig(config: ConfigType): RuntimeConfigType {
        // we need a reference to the clone object in the eventsubscriptions, so we need to create the object in 2 steps
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clone: RuntimeConfigType = { ...config };
        clone.logging = {
            logLevel: config.logging?.logLevel || LogLevel.error,
            logger:
                config.logging?.logger ||
                ((level, cat, msg) => {
                    if (!ConfigHelper.isLoggingEnabled(level, clone.logging?.logLevel ?? LogLevel.error)) {
                        return;
                    }

                    switch (level) {
                        case LogLevel.error:
                            console.error(`[${cat}] [${level}] ${msg}`);
                            break;
                        case LogLevel.warn:
                            console.warn(`[${cat}] [${level}] ${msg}`);
                            break;
                        default:
                            console.log(`[${cat}] [${level}] ${msg}`);
                    }
                }),
        };
        clone.handlers = {
            onAuthExpired: new EventSubscription<
                (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>
            >(() => clone.onAuthExpired, clone.logging?.logger),
            onViewportRequested: new EventSubscription<() => Viewport | null>(
                () => clone.onViewportRequested,
                clone.logging?.logger,
            ),
        };
        clone.events = {
            onActionsChanged: new EventSubscription<(state: DocumentAction[]) => void>(
                () => clone.onActionsChanged,
                clone.logging?.logger,
            ),
            onStateChanged: new EventSubscription<() => void>(() => clone.onStateChanged, clone.logging?.logger),

            onDocumentLoaded: new EventSubscription<() => void>(() => clone.onDocumentLoaded, clone.logging?.logger),
            onSelectedFramesLayoutChanged: new EventSubscription<(states: FrameLayoutType[]) => void>(
                () => clone.onSelectedFramesLayoutChanged,
                clone.logging?.logger,
            ),
            onSelectedFramesContentChanged: new EventSubscription<(state: Frame[]) => void>(
                () => clone.onSelectedFramesContentChanged,
                clone.logging?.logger,
            ),
            onPageSelectionChanged: new EventSubscription<() => void>(
                () => clone.onPageSelectionChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutPropertiesChanged: new EventSubscription<(state: LayoutPropertiesType) => void>(
                () => clone.onSelectedLayoutPropertiesChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutUnitChanged: new EventSubscription<(unit: MeasurementUnit) => void>(
                () => clone.onSelectedLayoutUnitChanged,
                clone.logging?.logger,
            ),
            onScrubberPositionChanged: new EventSubscription<(state: AnimationPlaybackType) => void>(
                () => clone.onScrubberPositionChanged,
                clone.logging?.logger,
            ),
            onFrameAnimationsChanged: new EventSubscription<(animationState: FrameAnimationType[]) => void>(
                () => clone.onFrameAnimationsChanged,
                clone.logging?.logger,
            ),
            onVariableListChanged: new EventSubscription<(variableList: Variable[]) => void>(
                () => clone.onVariableListChanged,
                clone.logging?.logger,
            ),
            onSelectedToolChanged: new EventSubscription<(tool: ToolType) => void>(
                () => clone.onSelectedToolChanged,
                clone.logging?.logger,
            ),
            onUndoStackStateChanged: new EventSubscription<(undoStackState: UndoState) => void>(
                () => clone.onUndoStackStateChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutFramesChanged: new EventSubscription<(frames: SelectedLayoutFrame[]) => void>(
                () => clone.onSelectedLayoutFramesChanged,
                clone.logging?.logger,
            ),
            onSelectedTextStyleChanged: new EventSubscription<(styles: SelectedTextStyle) => void>(
                () => clone.onSelectedTextStyleChanged,
                clone.logging?.logger,
            ),
            onColorsChanged: new EventSubscription<(colors: DocumentColor[]) => void>(
                () => clone.onColorsChanged,
                clone.logging?.logger,
            ),
            onParagraphStylesChanged: new EventSubscription<(paragraphStyles: ParagraphStyle[]) => void>(
                () => clone.onParagraphStylesChanged,
                clone.logging?.logger,
            ),
            onCharacterStylesChanged: new EventSubscription<(characterStyles: CharacterStyle[]) => void>(
                () => clone.onCharacterStylesChanged,
                clone.logging?.logger,
            ),
            onFontFamiliesChanged: new EventSubscription<(fontFamilies: DocumentFontFamily[]) => void>(
                () => clone.onFontFamiliesChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutIdChanged: new EventSubscription<(layoutId: string) => void>(
                () => clone.onSelectedLayoutIdChanged,
                clone.logging?.logger,
            ),
            onLayoutsChanged: new EventSubscription<(layouts: LayoutListItemType[]) => void>(
                () => clone.onLayoutsChanged,
                clone.logging?.logger,
            ),
            onConnectorEvent: new EventSubscription<(event: ConnectorEvent) => void>(
                () => clone.onConnectorEvent,
                clone.logging?.logger,
            ),
            onConnectorsChanged: new EventSubscription<(connectors: ConnectorInstance[]) => void>(
                () => clone.onConnectorsChanged,
                clone.logging?.logger,
            ),
            onZoomChanged: new EventSubscription<(scaleFactor: number) => void>(
                () => clone.onZoomChanged,
                clone.logging?.logger,
            ),
            onPageSizeChanged: new EventSubscription<(pageSize: PageSize) => void>(
                () => clone.onPageSizeChanged,
                clone.logging?.logger,
            ),
            onShapeCornerRadiusChanged: new EventSubscription<(cornerRadius: CornerRadiusUpdateModel) => void>(
                () => clone.onShapeCornerRadiusChanged,
                clone.logging?.logger,
            ),
            onCropActiveFrameIdChanged: new EventSubscription<(id?: Id) => void>(
                () => clone.onCropActiveFrameIdChanged,
                clone.logging?.logger,
            ),
            onAsyncError: new EventSubscription<(asyncError: AsyncError) => void>(
                () => clone.onAsyncError,
                clone.logging?.logger,
            ),
            onViewModeChanged: new EventSubscription<(tool: ViewMode) => void>(
                () => clone.onViewModeChanged,
                clone.logging?.logger,
            ),
            onBarcodeValidationChanged: new EventSubscription<
                (validationResults: BarcodeFrameValidationResult[]) => void
            >(() => clone.onBarcodeValidationChanged, clone.logging?.logger),
        };
        return clone;
    }

    private static isLoggingEnabled(level: LogLevel, logLevel: LogLevel): boolean {
        if (logLevel == LogLevel.info) {
            return true;
        }
        if (logLevel == LogLevel.warn && (level == LogLevel.warn || level == LogLevel.error)) {
            return true;
        }
        return logLevel == LogLevel.error && level == LogLevel.error;
    }
}
