import { FontController } from '../../controllers/FontController';
import { AddDocumentFont } from '../../types/FontTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedFontController: FontController;

const mockedEditorApi: EditorAPI = {
    getFonts: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontById: async () => getEditorResponseData(castToEditorResponse(null)),
    getDefaultFont: async () => getEditorResponseData(castToEditorResponse(null)),
    removeFont: async () => getEditorResponseData(castToEditorResponse(null)),
    addFont: async () => getEditorResponseData(castToEditorResponse(null)),
    isFontUsed: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFontController = new FontController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getFonts');
    jest.spyOn(mockedEditorApi, 'getFontById');
    jest.spyOn(mockedEditorApi, 'getDefaultFont');
    jest.spyOn(mockedEditorApi, 'removeFont');
    jest.spyOn(mockedEditorApi, 'addFont');
    jest.spyOn(mockedEditorApi, 'isFontUsed');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FontController', () => {
    it('calls getAll method', async () => {
        await mockedFontController.getAll();
        expect(mockedEditorApi.getFonts).toHaveBeenCalledTimes(1);
    });

    it('calls getById method', async () => {
        const fontId = 'fontId';
        await mockedFontController.getById(fontId);
        expect(mockedEditorApi.getFontById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFontById).toHaveBeenCalledWith(fontId);
    });

    it('calls getDefaultFont', async () => {
        await mockedFontController.getDefault();
        expect(mockedEditorApi.getDefaultFont).toHaveBeenCalledTimes(1);
    });

    it('calls remove method', async () => {
        const fontId = 'fontId';
        await mockedFontController.remove(fontId);
        expect(mockedEditorApi.removeFont).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFont).toHaveBeenCalledWith(fontId);
    });

    it('calls add method', async () => {
        const fontAddModel: AddDocumentFont = {
            fontFamily: 'family',
            fontId: 'fontId',
            fontStyle: 'fontStyle',
            name: 'fontName',
        };
        const connectorId = 'connectorId';

        await mockedFontController.add(connectorId, fontAddModel);

        expect(mockedEditorApi.addFont).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addFont).toHaveBeenCalledWith(connectorId, JSON.stringify(fontAddModel));
    });

    it('calls isUsed method', async () => {
        const fontId = 'fontId';

        await mockedFontController.isUsed(fontId);

        expect(mockedEditorApi.isFontUsed).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.isFontUsed).toHaveBeenCalledWith(fontId);
    });
});
