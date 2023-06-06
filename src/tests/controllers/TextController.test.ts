import { TextController } from '../../controllers/TextController';
import { EditorAPI, Id } from '../../types/CommonTypes';
import { TextType } from '../../types/TextTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';

let frameId: Id;

describe('TextSelectionController', () => {
    let mockedTextStyleController: TextController;

    const mockEditorApi: EditorAPI = {
        getTextByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
        setTextByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
        selectTextByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedTextStyleController = new TextController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'getTextByFrameId');
        jest.spyOn(mockEditorApi, 'setTextByFrameId');
        jest.spyOn(mockEditorApi, 'selectTextByFrameId');

        frameId = mockSelectFrame.frameId;
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Should call getTextByFrameId of EditorAPI successfully', async () => {
        await mockedTextStyleController.getText(frameId, TextType.formatted);
        expect(mockEditorApi.getTextByFrameId).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getTextByFrameId).toHaveBeenCalledWith(frameId, TextType.formatted);
    });

    it('Should call setTextByFrameId of EditorAPI successfully', async () => {
        const text = 'myText';

        await mockedTextStyleController.setText(frameId, text);
        expect(mockEditorApi.setTextByFrameId).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setTextByFrameId).toHaveBeenCalledWith(frameId, text);
    });

    it('Should call selectTextByFrameId of EditorAPI successfully', async () => {
        const startIndex = 2;
        const length = 3;

        await mockedTextStyleController.selectText(frameId, startIndex, length);
        expect(mockEditorApi.selectTextByFrameId).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.selectTextByFrameId).toHaveBeenCalledWith(frameId, startIndex, length);

    });
});
