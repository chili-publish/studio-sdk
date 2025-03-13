import { Id } from '../types/CommonTypes';
import { StudioStyling } from '../types/ConfigurationTypes';
import { WebSocketNodeConnectionProvider } from './WebSocketNodeConnectionProvider';
import { StudioConnection } from './base/StudioConnection';
import { PenpalConnectionProvider } from './PenpalConnectionProvider';

const Connect = (
    editorLink: string,
    params: ConfigParameterTypes,
    setConnection: (connection: StudioConnection) => void,
    editorId = 'chili-editor',
    styling?: StudioStyling,
) => {
    const isBrowser = typeof window !== 'undefined';
    const connectionProvider = isBrowser ? new PenpalConnectionProvider() : new WebSocketNodeConnectionProvider();
    connectionProvider.createConnection(editorLink, params, setConnection, editorId, styling);
};

export interface ConfigParameterTypes {
    onActionsChanged: (state: string) => void;
    onStateChanged: (state: string) => void;
    onAuthExpired: (authRefreshRequest: string) => Promise<string | null>;
    onViewportRequested: () => string | null;
    onDocumentLoaded: () => void;
    onSelectedFramesContentChanged: (state: string) => void;
    onSelectedFramesLayoutChanged: (state: string) => void;
    onSelectedLayoutPropertiesChanged: (state: string) => void;
    onSelectedLayoutUnitChanged: (state: string) => void;
    onPageSelectionChanged: (id: Id) => void;
    onScrubberPositionChanged: (state: string) => void;
    onFrameAnimationsChanged: (state: string) => void;
    onVariableListChanged: (state: string) => void;
    onSelectedToolChanged: (state: string) => void;
    onUndoStateChanged: (state: string) => void;
    onSelectedLayoutFramesChanged: (state: string) => void;
    onSelectedTextStyleChanged: (styles: string) => void;
    onColorsChanged: (colors: string) => void;
    onParagraphStylesChanged: (paragraphStyles: string) => void;
    onCharacterStylesChanged: (characterStyles: string) => void;
    onFontFamiliesChanged: (fonts: string) => void;
    onSelectedLayoutIdChanged: (id: string) => void;
    onLayoutsChanged: (layouts: string) => void;
    onConnectorEvent: (state: string) => void;
    onConnectorsChanged: (state: string) => void;
    onZoomChanged: (scaleFactor: string) => void;
    onSelectedPageIdChanged: (pageId: string) => void;
    onPagesChanged: (pages: string) => void;
    onPageSnapshotInvalidated: (pageId: string) => void;
    onPageSizeChanged: (scaleFactor: string) => void;
    onShapeCornerRadiusChanged: (cornerRadius: string) => void;
    onCropActiveFrameIdChanged: (id?: Id) => void;
    onAsyncError: (asyncError: string) => void;
    onViewModeChanged: (viewMode: string) => void;
    onBarcodeValidationChanged: (validationResults: string) => void;
    onDataSourceIdChanged: (connectorId?: Id) => void;
    onDocumentIssueListChanged: (documentIssues: string) => void;
    onCustomUndoDataChanged: (customData: string) => void;
    onEngineEditModeChanged: (engineEditMode: string) => void;
}

export default Connect;
