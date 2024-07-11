import { CallSender } from 'penpal';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { LayoutListItemType, LayoutPropertiesType, LayoutWithFrameProperties, MeasurementUnit } from './LayoutTypes';
import type { FrameType } from './FrameTypes';
import { Frame, FrameLayoutType, FrameTypeEnum } from './FrameTypes';
import { Variable } from './VariableTypes';
import { ActionEditorEvent, ConnectorInstance, DocumentAction, DocumentFontFamily, ToolType, ViewMode } from '..';
import { DocumentType, UndoState } from './DocumentTypes';
import { DocumentColor } from './ColorStyleTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { BarcodeFrameValidationResult } from './BarcodeTypes';
import { AuthCredentials, AuthRefreshRequest, ConnectorEvent } from './ConnectorTypes';
import { PageSize } from './PageTypes';
import { SelectedTextStyle } from './TextStyleTypes';
import { CornerRadiusUpdateModel } from './ShapeTypes';
import { StudioOptionsDeltaUpdate, StudioStyling } from './ConfigurationTypes';
import { Viewport } from './ViewportTypes';
import { EventSubscription } from '../utils/EventSubscription';

export type Id = string;

export type BaseConfigType = {
    editorLink?: string;
    editorId?: string;
    chiliEnvironmentUrl?: string;
    documentType?: DocumentType;
    studioStyling?: StudioStyling;
    studioOptions?: StudioOptionsDeltaUpdate;
    enableNextSubscribers?: {
        onVariableListChanged: boolean;
    };
};

export type ManagedCallbacksConfigType = {
    events: {
        onActionsChanged: EventSubscription<(state: DocumentAction[]) => void>;
        onStateChanged: EventSubscription<() => void>;
        onAuthExpired: EventSubscription<(authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>>;
        onViewportRequested: EventSubscription<() => Viewport | null>;
        onDocumentLoaded: EventSubscription<() => void>;
        onSelectedFramesLayoutChanged: EventSubscription<(states: FrameLayoutType[]) => void>;
        onSelectedFramesContentChanged: EventSubscription<(state: Frame[]) => void>;
        onPageSelectionChanged: EventSubscription<() => void>;
        onSelectedLayoutPropertiesChanged: EventSubscription<(state: LayoutPropertiesType) => void>;
        onSelectedLayoutUnitChanged: EventSubscription<(unit: MeasurementUnit) => void>;
        onScrubberPositionChanged: EventSubscription<(state: AnimationPlaybackType) => void>;
        onFrameAnimationsChanged: EventSubscription<(animationState: FrameAnimationType[]) => void>;
        onVariableListChanged: EventSubscription<(variableList: Variable[]) => void>;
        onSelectedToolChanged: EventSubscription<(tool: ToolType) => void>;
        onUndoStackStateChanged: EventSubscription<(undoStackState: UndoState) => void>;
        onSelectedLayoutFramesChanged: EventSubscription<(frames: SelectedLayoutFrame[]) => void>;
        onSelectedTextStyleChanged: EventSubscription<(styles: SelectedTextStyle) => void>;
        onColorsChanged: EventSubscription<(colors: DocumentColor[]) => void>;
        onParagraphStylesChanged: EventSubscription<(paragraphStyles: ParagraphStyle[]) => void>;
        onCharacterStylesChanged: EventSubscription<(characterStyles: CharacterStyle[]) => void>;
        onFontFamiliesChanged: EventSubscription<(fontFamilies: DocumentFontFamily[]) => void>;
        onSelectedLayoutIdChanged: EventSubscription<(layoutId: string) => void>;
        onLayoutsChanged: EventSubscription<(layouts: LayoutListItemType[]) => void>;
        onConnectorEvent: EventSubscription<(event: ConnectorEvent) => void>;
        onConnectorsChanged: EventSubscription<(connectors: ConnectorInstance[]) => void>;
        onZoomChanged: EventSubscription<(scaleFactor: number) => void>;
        onPageSizeChanged: EventSubscription<(pageSize: PageSize) => void>;
        onShapeCornerRadiusChanged: EventSubscription<(cornerRadius: CornerRadiusUpdateModel) => void>;
        onCropActiveFrameIdChanged: EventSubscription<(id?: Id) => void>;
        onAsyncError: EventSubscription<(asyncError: AsyncError) => void>;
        onViewModeChanged: EventSubscription<(tool: ViewMode) => void>;
        onBarcodeValidationChanged: EventSubscription<(validationResults: BarcodeFrameValidationResult[]) => void>;
    };
};

export type InitialCallbacksConfigType = {
    /**
     * @deprecated use `events.onActionsChanged` instead
     */
    onActionsChanged?: (state: DocumentAction[]) => void;

    /**
     * @deprecated use `events.onStateChanged` instead
     */
    onStateChanged?: () => void;

    /**
     * @deprecated use `events.onAuthExpired` instead
     */
    onAuthExpired?: (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>;

    /**
     * @deprecated use `events.onViewportRequested` instead
     */
    onViewportRequested?: () => Viewport | null;

    /**
     * @deprecated use `events.onDocumentLoaded` instead
     */
    onDocumentLoaded?: () => void;

    /**
     * @deprecated use `events.onSelectedFramesLayoutChanged` instead
     */
    onSelectedFramesLayoutChanged?: (states: FrameLayoutType[]) => void;

    /**
     * @deprecated use `events.onSelectedFramesContentChanged` instead
     */
    onSelectedFramesContentChanged?: (state: Frame[]) => void;

    /**
     * @deprecated use `events.onPageSelectionChanged` instead
     */
    onPageSelectionChanged?: () => void;

    /**
     * @deprecated use `events.onSelectedLayoutPropertiesChanged` instead
     */
    onSelectedLayoutPropertiesChanged?: (state: LayoutPropertiesType) => void;

    /**
     * @deprecated use `events.onSelectedLayoutUnitChanged` instead
     */
    onSelectedLayoutUnitChanged?: (unit: MeasurementUnit) => void;

    /**
     * @deprecated use `events.onScrubberPositionChanged` instead
     */
    onScrubberPositionChanged?: (state: AnimationPlaybackType) => void;

    /**
     * @deprecated use `events.onFrameAnimationsChanged` instead
     */
    onFrameAnimationsChanged?: (animationState: FrameAnimationType[]) => void;

    /**
     * @deprecated use `events.onVariableListChanged` instead
     */
    onVariableListChanged?: (variableList: Variable[]) => void;

    /**
     * @deprecated use `events.onSelectedToolChanged` instead
     */
    onSelectedToolChanged?: (tool: ToolType) => void;

    /**
     * @deprecated use `events.onUndoStackStateChanged` instead
     */
    onUndoStackStateChanged?: (undoStackState: UndoState) => void;

    /**
     * @deprecated use `events.onSelectedLayoutFramesChanged` instead
     */
    onSelectedLayoutFramesChanged?: (frames: SelectedLayoutFrame[]) => void;

    /**
     * @deprecated use `events.onSelectedTextStyleChanged` instead
     */
    onSelectedTextStyleChanged?: (styles: SelectedTextStyle) => void;

    /**
     * @deprecated use `events.onColorsChanged` instead
     */
    onColorsChanged?: (colors: DocumentColor[]) => void;

    /**
     * @deprecated use `events.onParagraphStylesChanged` instead
     */
    onParagraphStylesChanged?: (paragraphStyles: ParagraphStyle[]) => void;

    /**
     * @deprecated use `events.onCharacterStylesChanged` instead
     */
    onCharacterStylesChanged?: (characterStyles: CharacterStyle[]) => void;

    /**
     * @deprecated use `events.onFontFamiliesChanged` instead
     */
    onFontFamiliesChanged?: (fontFamilies: DocumentFontFamily[]) => void;

    /**
     * @deprecated use `events.onSelectedLayoutIdChanged` instead
     */
    onSelectedLayoutIdChanged?: (layoutId: string) => void;

    /**
     * @deprecated use `events.onLayoutsChanged` instead
     */
    onLayoutsChanged?: (layouts: LayoutListItemType[]) => void;

    /**
     * @deprecated use `events.onConnectorEvent` instead
     */
    onConnectorEvent?: (event: ConnectorEvent) => void;

    /**
     * @deprecated use `events.onConnectorsChanged` instead
     */
    onConnectorsChanged?: (connectors: ConnectorInstance[]) => void;

    /**
     * @deprecated use `events.onZoomChanged` instead
     */
    onZoomChanged?: (scaleFactor: number) => void;

    /**
     * @deprecated use `events.onPageSizeChanged` instead
     */
    onPageSizeChanged?: (pageSize: PageSize) => void;

    /**
     * @deprecated use `events.onShapeCornerRadiusChanged` instead
     */
    onShapeCornerRadiusChanged?: (cornerRadius: CornerRadiusUpdateModel) => void;

    /**
     * @deprecated use `events.onCropActiveFrameIdChanged` instead
     */
    onCropActiveFrameIdChanged?: (id?: Id) => void;

    /**
     * @deprecated use `events.onAsyncError` instead
     */
    onAsyncError?: (asyncError: AsyncError) => void;

    /**
     * @deprecated use `events.onViewModeChanged` instead
     */
    onViewModeChanged?: (tool: ViewMode) => void;

    /**
     * @deprecated use `events.onBarcodeValidationChanged` instead
     */
    onBarcodeValidationChanged?: (validationResults: BarcodeFrameValidationResult[]) => void;
    /**
     * @deprecated use `onSelectedFramesLayoutChanged` instead
     *
     */
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    /**
     * @deprecated use `onSelectedFramesContentChanged` instead
     */
    onSelectedFrameContentChanged?: (state: Frame | null) => void;
};

export type ConfigType = InitialCallbacksConfigType & BaseConfigType;
export type RuntimeConfigType = ConfigType & ManagedCallbacksConfigType;

export type EditorResponseError = string;

export interface EditorResponse<T> {
    success: boolean;
    status: number;
    data?: string | null;
    error?: EditorResponseError | null;
    parsedData: T | null;
}

export interface EditorRawAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<T>;
}

export interface EditorAPI extends CallSender {
    [index: string]: <T>(...args: unknown[]) => Promise<EditorResponse<T>>;
}

export type PageType = {
    id: Id;
    number: number;
    width: number | null;
    height: number | null;
    frames: FrameType[];
};

export type InitialStateType = {
    layouts: LayoutWithFrameProperties[];
    selectedLayoutId: Id;
    pages: PageType[];
    variables: Variable[];
};

export interface PropertyState<T> {
    value: T;
    isOverride: boolean;
    isReadOnly: boolean;
}

export interface SelectedLayoutFrame {
    id: Id;
    name: string;
    type: FrameTypeEnum;
    isVisible: boolean;
}

export interface MetaData {
    [key: string]: string | boolean;
}

export interface ConnectorOptions {
    [key: string]: string | boolean;
}

export enum ConnectorConfigValueType {
    text = 'text',
    boolean = 'boolean',
}

export interface ConnectorConfigValue {
    readonly name: string;
    readonly displayName: string;
    readonly type: ConnectorConfigValueType;
}

export type ConnectorConfigOptions = ConnectorConfigValue[];

export interface ActionEventErrorData {
    event: ActionEditorEvent;
    actionIds: Id[];
}

interface AsyncErrorBase {
    message: string;
}

export interface ActionAsyncError extends AsyncErrorBase {
    id?: string;
    event?: ActionEditorEvent;
    eventChain?: ActionEventErrorData[];
}

export type AsyncError = ActionAsyncError;
