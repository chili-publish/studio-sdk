import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { ClipboardController } from '../../controllers/ClipboardController';

describe('ClipboardController', () => {
    let mockedClipboardController: ClipboardController;

    const clipboardValue = 'a json string frame';
    const writeText = jest.fn().mockResolvedValue('');;
    const readText = jest.fn().mockResolvedValue(clipboardValue);

    Object.assign(navigator, {
        clipboard: {
            writeText,
            readText,
        },
    });

    const mockEditorApi: EditorAPI = {
        copyFrames: async () => getEditorResponseData(castToEditorResponse(null)),
        cutFrames: async () => getEditorResponseData(castToEditorResponse(null)),
        pasteFrames: async () => getEditorResponseData(castToEditorResponse(null)),
        getClipboardContentType: async () => getEditorResponseData(castToEditorResponse(null)),
    };


    beforeEach(() => {
        mockedClipboardController = new ClipboardController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'copyFrames');
        jest.spyOn(mockEditorApi, 'cutFrames');
        jest.spyOn(mockEditorApi, 'pasteFrames');
        jest.spyOn(mockEditorApi, 'getClipboardContentType');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls copyFrames with a copy operation', async () => {
        await mockedClipboardController.copyFrames(['1']);
        expect(mockEditorApi.copyFrames).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.copyFrames).toHaveBeenCalledWith(['1']);
        expect(writeText).toHaveBeenCalledTimes(1);
    });

    it('calls cutFrames with a cut operation', async () => {
        await mockedClipboardController.cutFrames(['1']);
        expect(mockEditorApi.cutFrames).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.cutFrames).toHaveBeenCalledWith(['1']);
        expect(writeText).toHaveBeenCalledTimes(2);
    });

    it('calls pasteFrames with a paste operation', async () => {
        await mockedClipboardController.pasteFrames();
        expect(readText).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.pasteFrames).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.pasteFrames).toHaveBeenCalledWith(clipboardValue);
    });

    it('calls getClipboardContentType', async () => {
        await mockedClipboardController.getContentType();
        expect(readText).toHaveBeenCalledTimes(2);
        expect(mockEditorApi.getClipboardContentType).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getClipboardContentType).toHaveBeenCalledWith(clipboardValue);
    });
});
