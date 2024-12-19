import { DocumentAction } from '../types/ActionTypes';
import { AnimationPlaybackType, FrameAnimationType } from '../types/AnimationTypes';
import { BarcodeFrameValidationResult } from '../types/BarcodeTypes';
import { CharacterStyle } from '../types/CharacterStyleTypes';
import { DocumentColor } from '../types/ColorStyleTypes';
import {
    AsyncError,
    ConfigType,
    Id,
    LogLevel,
    MaybePromise,
    RuntimeConfigType,
    SelectedLayoutFrame,
} from '../types/CommonTypes';
import { AuthCredentials, AuthRefreshRequest, ConnectorEvent, ConnectorInstance } from '../types/ConnectorTypes';
import { DocumentIssue, UndoState } from '../types/DocumentTypes';
import { DocumentFontFamily } from '../types/FontTypes';
import { Frame, FrameLayoutType } from '../types/FrameTypes';
import { LayoutListItemType, LayoutPropertiesType, MeasurementUnit } from '../types/LayoutTypes';
import { Page, PageSize } from '../types/PageTypes';
import { ParagraphStyle } from '../types/ParagraphStyleTypes';
import { CornerRadiusUpdateModel } from '../types/ShapeTypes';
import { SelectedTextStyle } from '../types/TextStyleTypes';
import { Variable } from '../types/VariableTypes';
import { ViewMode } from '../types/ViewModeTypes';
import { Viewport } from '../types/ViewportTypes';
import { EngineCallbackHandler } from './EngineCallbackHandler';
import { EngineEvent } from './EngineEvent';
import { ToolType } from './Enums';

export class ConfigHelper {
    /**
     * Creates a runtime configuration object from the provided configuration object.
     *
     * @param config The configuration object to create the runtime configuration object from.
     * @returns The runtime configuration object.
     */
    static createRuntimeConfig(config: ConfigType): RuntimeConfigType {
        // we need a reference to the clone object in the engineEvent, so we need to create the object in 2 steps
        const clone: RuntimeConfigType = { ...config } as RuntimeConfigType;
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
            onAuthExpired: new EngineCallbackHandler<
                (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>
            >(() => clone.onAuthExpired, clone.logging?.logger),
            onViewportRequested: new EngineCallbackHandler<() => Viewport | null>(
                () => clone.onViewportRequested,
                clone.logging?.logger,
            ),
        };
        clone.events = {
            onActionsChanged: new EngineEvent<(state: DocumentAction[]) => MaybePromise<void>>(
                () => clone.onActionsChanged,
                clone.logging?.logger,
            ),
            onStateChanged: new EngineEvent<() => MaybePromise<void>>(
                () => clone.onStateChanged,
                clone.logging?.logger,
            ),

            onDocumentLoaded: new EngineEvent<() => MaybePromise<void>>(
                () => clone.onDocumentLoaded,
                clone.logging?.logger,
            ),
            onSelectedFramesLayoutChanged: new EngineEvent<(states: FrameLayoutType[]) => MaybePromise<void>>(
                () => clone.onSelectedFramesLayoutChanged,
                clone.logging?.logger,
            ),
            onSelectedFramesContentChanged: new EngineEvent<(state: Frame[]) => MaybePromise<void>>(
                () => clone.onSelectedFramesContentChanged,
                clone.logging?.logger,
            ),
            onPageSelectionChanged: new EngineEvent<(id: Id) => MaybePromise<void>>(
                () => clone.onPageSelectionChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutPropertiesChanged: new EngineEvent<(state: LayoutPropertiesType) => MaybePromise<void>>(
                () => clone.onSelectedLayoutPropertiesChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutUnitChanged: new EngineEvent<(unit: MeasurementUnit) => MaybePromise<void>>(
                () => clone.onSelectedLayoutUnitChanged,
                clone.logging?.logger,
            ),
            onScrubberPositionChanged: new EngineEvent<(state: AnimationPlaybackType) => MaybePromise<void>>(
                () => clone.onScrubberPositionChanged,
                clone.logging?.logger,
            ),
            onFrameAnimationsChanged: new EngineEvent<(animationState: FrameAnimationType[]) => MaybePromise<void>>(
                () => clone.onFrameAnimationsChanged,
                clone.logging?.logger,
            ),
            onVariableListChanged: new EngineEvent<(variableList: Variable[]) => MaybePromise<void>>(
                () => clone.onVariableListChanged,
                clone.logging?.logger,
            ),
            onSelectedToolChanged: new EngineEvent<(tool: ToolType) => MaybePromise<void>>(
                () => clone.onSelectedToolChanged,
                clone.logging?.logger,
            ),
            onUndoStackStateChanged: new EngineEvent<(undoStackState: UndoState) => MaybePromise<void>>(
                () => clone.onUndoStackStateChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutFramesChanged: new EngineEvent<(frames: SelectedLayoutFrame[]) => MaybePromise<void>>(
                () => clone.onSelectedLayoutFramesChanged,
                clone.logging?.logger,
            ),
            onSelectedTextStyleChanged: new EngineEvent<(styles: SelectedTextStyle) => MaybePromise<void>>(
                () => clone.onSelectedTextStyleChanged,
                clone.logging?.logger,
            ),
            onColorsChanged: new EngineEvent<(colors: DocumentColor[]) => MaybePromise<void>>(
                () => clone.onColorsChanged,
                clone.logging?.logger,
            ),
            onParagraphStylesChanged: new EngineEvent<(paragraphStyles: ParagraphStyle[]) => MaybePromise<void>>(
                () => clone.onParagraphStylesChanged,
                clone.logging?.logger,
            ),
            onCharacterStylesChanged: new EngineEvent<(characterStyles: CharacterStyle[]) => MaybePromise<void>>(
                () => clone.onCharacterStylesChanged,
                clone.logging?.logger,
            ),
            onFontFamiliesChanged: new EngineEvent<(fontFamilies: DocumentFontFamily[]) => MaybePromise<void>>(
                () => clone.onFontFamiliesChanged,
                clone.logging?.logger,
            ),
            onSelectedLayoutIdChanged: new EngineEvent<(layoutId: string) => MaybePromise<void>>(
                () => clone.onSelectedLayoutIdChanged,
                clone.logging?.logger,
            ),
            onLayoutsChanged: new EngineEvent<(layouts: LayoutListItemType[]) => MaybePromise<void>>(
                () => clone.onLayoutsChanged,
                clone.logging?.logger,
            ),
            onConnectorEvent: new EngineEvent<(event: ConnectorEvent) => MaybePromise<void>>(
                () => clone.onConnectorEvent,
                clone.logging?.logger,
            ),
            onConnectorsChanged: new EngineEvent<(connectors: ConnectorInstance[]) => MaybePromise<void>>(
                () => clone.onConnectorsChanged,
                clone.logging?.logger,
            ),
            onZoomChanged: new EngineEvent<(scaleFactor: number) => MaybePromise<void>>(
                () => clone.onZoomChanged,
                clone.logging?.logger,
            ),
            onSelectedPageIdChanged: new EngineEvent<(pageId: Id) => MaybePromise<void>>(
                () => clone.onSelectedPageIdChanged,
                clone.logging.logger,
            ),
            onPagesChanged: new EngineEvent<(pages: Page[]) => MaybePromise<void>>(
                () => clone.onPagesChanged,
                clone.logging.logger,
            ),
            onPageSnapshotInvalidated: new EngineEvent<(pageId: Id) => MaybePromise<void>>(
                () => clone.onPageSnapshotInvalidated,
                clone.logging.logger,
            ),
            onPageSizeChanged: new EngineEvent<(pageSize: PageSize) => MaybePromise<void>>(
                () => clone.onPageSizeChanged,
                clone.logging?.logger,
            ),
            onShapeCornerRadiusChanged: new EngineEvent<(cornerRadius: CornerRadiusUpdateModel) => MaybePromise<void>>(
                () => clone.onShapeCornerRadiusChanged,
                clone.logging?.logger,
            ),
            onCropActiveFrameIdChanged: new EngineEvent<(id?: Id) => MaybePromise<void>>(
                () => clone.onCropActiveFrameIdChanged,
                clone.logging?.logger,
            ),
            onAsyncError: new EngineEvent<(asyncError: AsyncError) => MaybePromise<void>>(
                () => clone.onAsyncError,
                clone.logging?.logger,
            ),
            onViewModeChanged: new EngineEvent<(tool: ViewMode) => MaybePromise<void>>(
                () => clone.onViewModeChanged,
                clone.logging?.logger,
            ),
            onBarcodeValidationChanged: new EngineEvent<
                (validationResults: BarcodeFrameValidationResult[]) => MaybePromise<void>
            >(() => clone.onBarcodeValidationChanged, clone.logging?.logger),
            onDataSourceIdChanged: new EngineEvent<(connectorId?: Id) => MaybePromise<void>>(
                () => clone.onDataSourceIdChanged,
                clone.logging.logger,
            ),
            onDocumentIssueListChanged: new EngineEvent<(documentIssues: DocumentIssue[]) => MaybePromise<void>>(
                () => clone.onDocumentIssueListChanged,
                clone.logging.logger,
            ),
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
