import { DocumentAction } from '../types/ActionTypes';
import { AnimationPlaybackType, FrameAnimationType } from '../types/AnimationTypes';
import { BarcodeFrameValidationResult } from '../types/BarcodeTypes';
import { CharacterStyle } from '../types/CharacterStyleTypes';
import { DocumentColor } from '../types/ColorStyleTypes';
import {
    ConfigType,
    RuntimeConfigType,
    SelectedLayoutFrame,
    Id,
    AsyncError
} from '../types/CommonTypes';
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
import { EventSubscription, EventSubscriptionBase } from './EventSubscription';


export class ConfigHelper {
    static createRuntimeConfig(config: ConfigType): RuntimeConfigType {
        // we need a reference to the clone object in the eventsubscriptions, so we need to create the object in 2 steps
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clone: RuntimeConfigType = { ...config };
        clone.logger = config.logger || ((level, cat, msg) => console.log(`[${cat}] [${level}] ${msg}`));
        clone.handlers = {
            onAuthExpired: new EventSubscription<
                (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>
            >(() => clone.onAuthExpired, clone.logger),
            onViewportRequested: new EventSubscription<() => Viewport | null>(
                () => clone.onViewportRequested,
                clone.logger
            ),
        };
        clone.events = {
            onActionsChanged: new EventSubscription<(state: DocumentAction[]) => void>(
                () => clone.onActionsChanged,
                clone.logger
            ),
            onStateChanged: new EventSubscription<() => void>(() => clone.onStateChanged, clone.logger),

            onDocumentLoaded: new EventSubscription<() => void>(() => clone.onDocumentLoaded, clone.logger),
            onSelectedFramesLayoutChanged: new EventSubscription<(states: FrameLayoutType[]) => void>(
                () => clone.onSelectedFramesLayoutChanged,
                clone.logger
            ),
            onSelectedFramesContentChanged: new EventSubscription<(state: Frame[]) => void>(
                () => clone.onSelectedFramesContentChanged,
                clone.logger
            ),
            onPageSelectionChanged: new EventSubscription<() => void>(() => clone.onPageSelectionChanged, clone.logger),
            onSelectedLayoutPropertiesChanged: new EventSubscription<(state: LayoutPropertiesType) => void>(
                () => clone.onSelectedLayoutPropertiesChanged,
                clone.logger
            ),
            onSelectedLayoutUnitChanged: new EventSubscription<(unit: MeasurementUnit) => void>(
                () => clone.onSelectedLayoutUnitChanged,
                clone.logger
            ),
            onScrubberPositionChanged: new EventSubscription<(state: AnimationPlaybackType) => void>(
                () => clone.onScrubberPositionChanged,
                clone.logger
            ),
            onFrameAnimationsChanged: new EventSubscription<(animationState: FrameAnimationType[]) => void>(
                () => clone.onFrameAnimationsChanged,
                clone.logger
            ),
            onVariableListChanged: new EventSubscription<(variableList: Variable[]) => void>(
                () => clone.onVariableListChanged,
                clone.logger
            ),
            onSelectedToolChanged: new EventSubscription<(tool: ToolType) => void>(
                () => clone.onSelectedToolChanged,
                clone.logger
            ),
            onUndoStackStateChanged: new EventSubscription<(undoStackState: UndoState) => void>(
                () => clone.onUndoStackStateChanged,
                clone.logger
            ),
            onSelectedLayoutFramesChanged: new EventSubscription<(frames: SelectedLayoutFrame[]) => void>(
                () => clone.onSelectedLayoutFramesChanged,
                clone.logger
            ),
            onSelectedTextStyleChanged: new EventSubscription<(styles: SelectedTextStyle) => void>(
                () => clone.onSelectedTextStyleChanged,
                clone.logger
            ),
            onColorsChanged: new EventSubscription<(colors: DocumentColor[]) => void>(
                () => clone.onColorsChanged,
                clone.logger
            ),
            onParagraphStylesChanged: new EventSubscription<(paragraphStyles: ParagraphStyle[]) => void>(
                () => clone.onParagraphStylesChanged,
                clone.logger
            ),
            onCharacterStylesChanged: new EventSubscription<(characterStyles: CharacterStyle[]) => void>(
                () => clone.onCharacterStylesChanged,
                clone.logger
            ),
            onFontFamiliesChanged: new EventSubscription<(fontFamilies: DocumentFontFamily[]) => void>(
                () => clone.onFontFamiliesChanged,
                clone.logger
            ),
            onSelectedLayoutIdChanged: new EventSubscription<(layoutId: string) => void>(
                () => clone.onSelectedLayoutIdChanged,
                clone.logger
            ),
            onLayoutsChanged: new EventSubscription<(layouts: LayoutListItemType[]) => void>(
                () => clone.onLayoutsChanged,
                clone.logger
            ),
            onConnectorEvent: new EventSubscription<(event: ConnectorEvent) => void>(
                () => clone.onConnectorEvent,
                clone.logger
            ),
            onConnectorsChanged: new EventSubscription<(connectors: ConnectorInstance[]) => void>(
                () => clone.onConnectorsChanged,
                clone.logger
            ),
            onZoomChanged: new EventSubscription<(scaleFactor: number) => void>(
                () => clone.onZoomChanged,
                clone.logger
            ),
            onPageSizeChanged: new EventSubscription<(pageSize: PageSize) => void>(
                () => clone.onPageSizeChanged,
                clone.logger
            ),
            onShapeCornerRadiusChanged: new EventSubscription<(cornerRadius: CornerRadiusUpdateModel) => void>(
                () => clone.onShapeCornerRadiusChanged,
                clone.logger
            ),
            onCropActiveFrameIdChanged: new EventSubscription<(id?: Id) => void>(
                () => clone.onCropActiveFrameIdChanged,
                clone.logger
            ),
            onAsyncError: new EventSubscription<(asyncError: AsyncError) => void>(
                () => clone.onAsyncError,
                clone.logger
            ),
            onViewModeChanged: new EventSubscription<(tool: ViewMode) => void>(
                () => clone.onViewModeChanged,
                clone.logger
            ),
            onBarcodeValidationChanged: new EventSubscription<
                (validationResults: BarcodeFrameValidationResult[]) => void
            >(() => clone.onBarcodeValidationChanged, clone.logger),
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
