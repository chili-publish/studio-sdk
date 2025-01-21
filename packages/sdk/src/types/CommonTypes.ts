import { CallSender } from 'penpal';
import { ActionEditorEvent, ConnectorInstance, DocumentAction, DocumentFontFamily, ToolType, ViewMode } from '..';
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
import { EngineEditing } from './EngineEditingType';

export type Id = string;

export type ConfigType = {
    onActionsChanged?: (state: DocumentAction[]) => void;
    onStateChanged?: () => void;
    onAuthExpired?: (authRefreshRequest: AuthRefreshRequest) => Promise<AuthCredentials | null>;
    onViewportRequested?: () => Viewport | null;
    onDocumentLoaded?: () => void;
    /**
     * @deprecated use `onSelectedFramesLayoutChanged` instead
     *
     */
    onSelectedFrameLayoutChanged?: (state: FrameLayoutType) => void;
    onSelectedFramesLayoutChanged?: (states: FrameLayoutType[]) => void;
    /**
     * @deprecated use `onSelectedFramesContentChanged` instead
     */
    onSelectedFrameContentChanged?: (state: Frame | null) => void;
    onSelectedFramesContentChanged?: (state: Frame[]) => void;
    editorLink?: string;
    editorId?: string;
    chiliEnvironmentUrl?: string;
    documentType?: DocumentType;
    studioStyling?: StudioStyling;
    studioOptions?: StudioOptionsDeltaUpdate;
    onPageSelectionChanged?: (id: Id) => void;
    onSelectedLayoutPropertiesChanged?: (state: LayoutPropertiesType) => void;
    onSelectedLayoutUnitChanged?: (unit: MeasurementUnit) => void;
    onScrubberPositionChanged?: (state: AnimationPlaybackType) => void;
    onFrameAnimationsChanged?: (animationState: FrameAnimationType[]) => void;
    onVariableListChanged?: (variableList: Variable[]) => void;
    onSelectedToolChanged?: (tool: ToolType) => void;
    onUndoStackStateChanged?: (undoStackState: UndoState) => void;
    onCustomUndoDataChanged?: (customData: Record<string, string>) => void;
    onSelectedLayoutFramesChanged?: (frames: SelectedLayoutFrame[]) => void;
    onSelectedTextStyleChanged?: (styles: SelectedTextStyle) => void;
    onColorsChanged?: (colors: DocumentColor[]) => void;
    onParagraphStylesChanged?: (paragraphStyles: ParagraphStyle[]) => void;
    onCharacterStylesChanged?: (characterStyles: CharacterStyle[]) => void;
    onFontFamiliesChanged?: (fontFamilies: DocumentFontFamily[]) => void;
    onSelectedLayoutIdChanged?: (layoutId: string) => void;
    onLayoutsChanged?: (layouts: LayoutListItemType[]) => void;
    onConnectorEvent?: (event: ConnectorEvent) => void;
    onConnectorsChanged?: (connectors: ConnectorInstance[]) => void;
    onZoomChanged?: (scaleFactor: number) => void;
    onSelectedPageIdChanged?: (pageId: Id) => void;
    onPagesChanged?: (pages: Page[]) => void;
    onPageSnapshotInvalidated?: (page: Id) => void;
    onPageSizeChanged?: (pageSize: PageSize) => void;
    onShapeCornerRadiusChanged?: (cornerRadius: CornerRadiusUpdateModel) => void;
    onCropActiveFrameIdChanged?: (id?: Id) => void;
    onAsyncError?: (asyncError: AsyncError) => void;
    onViewModeChanged?: (tool: ViewMode) => void;
    onBarcodeValidationChanged?: (validationResults: BarcodeFrameValidationResult[]) => void;
    onDataSourceIdChanged?: (connectorId?: Id) => void;
    onDocumentIssueListChanged?: (documentIssues: DocumentIssue[]) => void;
    onEngineEditingModeChanged?: (engineEditing: EngineEditing) => void;

    enableNextSubscribers?: {
        onVariableListChanged: boolean;
    };
};

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

export type PrivateData = Record<string, string>;
