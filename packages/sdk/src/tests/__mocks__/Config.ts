import { RuntimeConfigType } from '../../types/CommonTypes';
import { DocumentType } from '../../types/DocumentTypes';
import { EventHelper } from '../../utils/EventSubscription';

export const defaultMockReturn = jest.fn().mockResolvedValue({ success: true, status: 0 });

const mockConfig: RuntimeConfigType = EventHelper.ensureSubscriptions({
    onActionsChanged: defaultMockReturn,
    onStateChanged: defaultMockReturn,
    onAuthExpired: defaultMockReturn,
    onViewportRequested: defaultMockReturn,
    onDocumentLoaded: defaultMockReturn,
    onSelectedFrameLayoutChanged: defaultMockReturn,
    onSelectedFramesLayoutChanged: defaultMockReturn,
    onSelectedFrameContentChanged: defaultMockReturn,
    onSelectedFramesContentChanged: defaultMockReturn,
    editorLink: 'https://chili-editor-dev.azurewebsites.net/',
    documentType: DocumentType.template,
    onPageSelectionChanged: defaultMockReturn,
    onSelectedLayoutPropertiesChanged: defaultMockReturn,
    onScrubberPositionChanged: defaultMockReturn,
    onFrameAnimationsChanged: defaultMockReturn,
    onVariableListChanged: defaultMockReturn,
    onSelectedToolChanged: defaultMockReturn,
    onUndoStackStateChanged: jest.fn().mockResolvedValue({ success: true, status: 0 }),
    onSelectedLayoutFramesChanged: defaultMockReturn,
    onSelectedTextStyleChanged: defaultMockReturn,
    onColorsChanged: defaultMockReturn,
    onParagraphStylesChanged: defaultMockReturn,
    onCharacterStylesChanged: defaultMockReturn,
    onFontFamiliesChanged: defaultMockReturn,
    onSelectedLayoutIdChanged: defaultMockReturn,
    onLayoutsChanged: defaultMockReturn,
    onConnectorEvent: defaultMockReturn,
    onZoomChanged: defaultMockReturn,
    onPageSizeChanged: defaultMockReturn,
    onViewModeChanged: defaultMockReturn,
});
export default mockConfig;
