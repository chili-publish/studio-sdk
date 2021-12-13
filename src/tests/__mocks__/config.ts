export const defaultMockReturn = jest.fn().mockResolvedValue({ success: true, status: 0 });

const mockConfig = {
    stateChanged: defaultMockReturn,
    selectedFrameLayout: defaultMockReturn,
    selectedFrameContent: defaultMockReturn,
    editorLink: 'https://chili-editor-dev.azurewebsites.net/',
    getFrameAnimation: defaultMockReturn,
    onPageSelectionChanged: defaultMockReturn,
};
export default mockConfig;
