import { ConfigType } from '../../../types/CommonTypes';

export const defaultMockReturn = jest.fn().mockResolvedValue({ success: true, status: 0 });

const mockConfig: ConfigType = {
    stateChanged: defaultMockReturn,
    selectedFrameLayout: defaultMockReturn,
    selectedFrameContent: defaultMockReturn,
    editorLink: 'https://chili-editor-dev.azurewebsites.net/',
    onPageSelectionChanged: defaultMockReturn,
    selectedLayoutProperties: defaultMockReturn,
    scrubberPositionChanged: defaultMockReturn,
    frameAnimationsChanged: defaultMockReturn,
};
export default mockConfig;
