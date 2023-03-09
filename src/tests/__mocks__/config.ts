import { ConfigType } from '../../../types/CommonTypes';
import { DocumentType } from '../../../types/DocumentTypes';

export const defaultMockReturn = jest.fn().mockResolvedValue({ success: true, status: 0 });

const mockConfig: ConfigType = {
    onActionsChanged: defaultMockReturn,
    onStateChanged: defaultMockReturn,
    onSelectedFrameLayoutChanged: defaultMockReturn,
    onSelectedFrameContentChanged: defaultMockReturn,
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
    onFontsChanged: defaultMockReturn,
    onSelectedLayoutIdChanged: defaultMockReturn,
    onLayoutsChanged: defaultMockReturn,
    onConnectorEvent: defaultMockReturn,
    onZoomChanged: defaultMockReturn,
    onPageSizeChanged: defaultMockReturn,
};
export default mockConfig;
