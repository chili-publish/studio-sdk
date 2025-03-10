import { CallSender } from 'penpal';
import { ActionEditorEvent, ConnectorInstance, DocumentAction, DocumentFontFamily, ToolType, ViewMode } from '..';
import { EngineCallbackHandler } from '../utils/EngineCallbackHandler';
import { EngineEvent } from '../utils/EngineEvent';
import { AnimationPlaybackType, FrameAnimationType } from './AnimationTypes';
import { BarcodeFrameValidationResult } from './BarcodeTypes';
import { CharacterStyle } from './CharacterStyleTypes';
import { DocumentColor } from './ColorStyleTypes';
import { StudioOptionsDeltaUpdate, StudioStyling } from './ConfigurationTypes';
import { AuthCredentials, AuthRefreshRequest, ConnectorEvent } from './ConnectorTypes';
import { DocumentIssue, DocumentType, UndoState } from './DocumentTypes';
import type { FrameType } from './FrameTypes';
import { Frame, FrameLayoutType, FrameTypeEnum } from './FrameTypes';
import { LayoutListItemType, LayoutPropertiesType, LayoutWithFrameProperties, MeasurementUnit } from './LayoutTypes';
import { Page, PageSize } from './PageTypes';
import { ParagraphStyle } from './ParagraphStyleTypes';
import { CornerRadiusUpdateModel } from './ShapeTypes';
import { SelectedTextStyle } from './TextStyleTypes';
import { Variable } from './VariableTypes';
import { Viewport } from './ViewportTypes';
import { EngineEditMode } from './EngineEditModeTypes';

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
    logging?: {
        logLevel?: LogLevel;
        logger?: LoggerFunction;
    };
};

export type LoggerFunction = (logLevel: LogLevel, category: LogCategory, message: string) => void;

export enum LogLevel {
    info = 'info',
    warn = 'warn',
    error = 'error',
}

export enum LogCategory {
    general = 'general',
    connector = 'connector',
    event = 'event',
    engine = 'engine',
}

/**
 * Defines the behavior when encountering an error in the event / handler callback.
 */
export enum CallbackErrorBehavior {
    /**
     * Throws an error when encountering an error in a callback.
     */
    throw = 'throw',

    /**
     * Logs the error when encountering an error in a callback.
     */
    log = 'log',
}

export type MaybePromise<T> = T | Promise<T>;

export type ManagedCallbacksConfigType = {
    handlers: {
        onAuthExpired: EngineCallbackHandler<
            (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>
        >;
        onViewportRequested: EngineCallbackHandler<() => Viewport | null>;
    };
    events: {
        onActionsChanged: EngineEvent<(state: DocumentAction[]) => MaybePromise<void>>;
        onStateChanged: EngineEvent<() => MaybePromise<void>>;
        onDocumentLoaded: EngineEvent<() => MaybePromise<void>>;
        onSelectedFramesLayoutChanged: EngineEvent<(states: FrameLayoutType[]) => MaybePromise<void>>;
        onFramesLayoutChanged: EngineEvent<(states: FrameLayoutType[]) => MaybePromise<void>>;
        onSelectedFramesContentChanged: EngineEvent<(state: Frame[]) => MaybePromise<void>>;
        onPageSelectionChanged: EngineEvent<(id: Id) => MaybePromise<void>>;
        onSelectedLayoutPropertiesChanged: EngineEvent<(state: LayoutPropertiesType) => MaybePromise<void>>;
        onSelectedLayoutUnitChanged: EngineEvent<(unit: MeasurementUnit) => MaybePromise<void>>;
        onScrubberPositionChanged: EngineEvent<(state: AnimationPlaybackType) => MaybePromise<void>>;
        onFrameAnimationsChanged: EngineEvent<(animationState: FrameAnimationType[]) => MaybePromise<void>>;
        onVariableListChanged: EngineEvent<(variableList: Variable[]) => MaybePromise<void>>;
        onSelectedToolChanged: EngineEvent<(tool: ToolType) => MaybePromise<void>>;
        onUndoStackStateChanged: EngineEvent<(undoStackState: UndoState) => MaybePromise<void>>;
        onSelectedLayoutFramesChanged: EngineEvent<(frames: SelectedLayoutFrame[]) => MaybePromise<void>>;
        onSelectedTextStyleChanged: EngineEvent<(styles: SelectedTextStyle) => MaybePromise<void>>;
        onColorsChanged: EngineEvent<(colors: DocumentColor[]) => MaybePromise<void>>;
        onParagraphStylesChanged: EngineEvent<(paragraphStyles: ParagraphStyle[]) => MaybePromise<void>>;
        onCharacterStylesChanged: EngineEvent<(characterStyles: CharacterStyle[]) => MaybePromise<void>>;
        onFontFamiliesChanged: EngineEvent<(fontFamilies: DocumentFontFamily[]) => MaybePromise<void>>;
        onSelectedLayoutIdChanged: EngineEvent<(layoutId: string) => MaybePromise<void>>;
        onLayoutsChanged: EngineEvent<(layouts: LayoutListItemType[]) => MaybePromise<void>>;
        onConnectorEvent: EngineEvent<(event: ConnectorEvent) => MaybePromise<void>>;
        onConnectorsChanged: EngineEvent<(connectors: ConnectorInstance[]) => MaybePromise<void>>;
        onZoomChanged: EngineEvent<(scaleFactor: number) => MaybePromise<void>>;
        onSelectedPageIdChanged: EngineEvent<(pageId: Id) => MaybePromise<void>>;
        onPagesChanged: EngineEvent<(pages: Page[]) => MaybePromise<void>>;
        onPageSnapshotInvalidated: EngineEvent<(pageId: Id) => MaybePromise<void>>;
        onPageSizeChanged: EngineEvent<(pageSize: PageSize) => MaybePromise<void>>;
        onShapeCornerRadiusChanged: EngineEvent<(cornerRadius: CornerRadiusUpdateModel) => MaybePromise<void>>;
        onCropActiveFrameIdChanged: EngineEvent<(id?: Id) => MaybePromise<void>>;
        onAsyncError: EngineEvent<(asyncError: AsyncError) => MaybePromise<void>>;
        onViewModeChanged: EngineEvent<(tool: ViewMode) => MaybePromise<void>>;
        onBarcodeValidationChanged: EngineEvent<
            (validationResults: BarcodeFrameValidationResult[]) => MaybePromise<void>
        >;
        onDataSourceIdChanged: EngineEvent<(connectorId?: Id) => MaybePromise<void>>;
        onDocumentIssueListChanged: EngineEvent<(documentIssues: DocumentIssue[]) => MaybePromise<void>>;
        onCustomUndoDataChanged: EngineEvent<(customData: Record<string, string>) => MaybePromise<void>>;
        onEngineEditModeChanged: EngineEvent<(engineEditMode: EngineEditMode) => MaybePromise<void>>;
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
     * @deprecated use `onSelectedFramesLayoutChanged` instead
     *
     */
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;

    /**
     * @deprecated use `events.onSelectedFramesLayoutChanged` instead
     */
    onSelectedFramesLayoutChanged?: (states: FrameLayoutType[]) => void;

    /**
     * @deprecated use `events.onFramesLayoutChanged` instead
     */
    onFramesLayoutChanged?: (states: FrameLayoutType[]) => void;

    /**
     * @deprecated use `onSelectedFramesContentChanged` instead
     */
    onSelectedFrameContentChanged?: (state: Frame | null) => void;

    /**
     * @deprecated use `events.onSelectedFramesContentChanged` instead
     */
    onSelectedFramesContentChanged?: (state: Frame[]) => void;

    /**
     * @deprecated use `events.onPageSelectionChanged` instead
     */
    onPageSelectionChanged?: (id: Id) => void;

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
     *
     * @deprecated use `events.onSelectedPageIdChanged` instead
     */
    onSelectedPageIdChanged?: (pageId: Id) => void;

    /**
     *
     * @deprecated use `events.onPagesChanged` instead
     */
    onPagesChanged?: (pages: Page[]) => void;

    /**
     *
     * @deprecated use `events.onPageSnapshotInvalidated` instead
     */
    onPageSnapshotInvalidated?: (page: Id) => void;

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
     * @deprecated use `events.onDataSourceIdChanged` instead
     */
    onDataSourceIdChanged?: (connectorId?: Id) => void;

    /**
     * @deprecated use `events.onDocumentIssueListChanged` instead
     */
    onDocumentIssueListChanged?: (documentIssues: DocumentIssue[]) => void;

    /**
     * @deprecated use `events.onCustomUndoDataChanged` instead
     */
    onCustomUndoDataChanged?: (customData: Record<string, string>) => void;

    /**
     * @deprecated use `events.onEngineEditModeChanged` instead
     */
    onEngineEditModeChanged?: (engineEditMode: EngineEditMode) => void;
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

export interface HasOverrideState {
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
    type: AsyncErrorType;
    message: string;
}

export class ActionAsyncError implements AsyncErrorBase {
    type: AsyncErrorType;
    id?: string;
    event?: ActionEditorEvent;
    eventChain?: ActionEventErrorData[];
    message: string;

    constructor(message: string, id?: string, event?: ActionEditorEvent, eventChain?: ActionEventErrorData[]) {
        this.type = AsyncErrorType.action;
        this.message = message;
        this.id = id;
        this.event = event;
        this.eventChain = eventChain;
    }
}

export class DataRowAsyncError implements AsyncErrorBase {
    type: AsyncErrorType;
    count: number;
    exceptions: EditorExceptionDto[];
    message: string;

    constructor(count: number, message: string, exceptions: EditorExceptionDto[]) {
        this.type = AsyncErrorType.dataRow;
        this.count = count;
        this.message = message;
        this.exceptions = exceptions;
        Object.setPrototypeOf(this, DataRowAsyncError.prototype);
    }
}

export enum AsyncErrorType {
    action = 'action',
    dataRow = 'dataRow',
}

export interface EditorExceptionDto {
    type: string;
    code: number;
    message: string;
}

export type AsyncError = ActionAsyncError | DataRowAsyncError;

export type PrivateData = Record<string, string>;
