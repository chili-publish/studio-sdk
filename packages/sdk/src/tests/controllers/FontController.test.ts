import { FontController } from '../../controllers/FontController';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { AddDocumentFontFamily, AddDocumentFontStyle } from '../../types/FontTypes';

let mockedFontController: FontController;

const mockedEditorApi: EditorAPI = {
    addFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
    removeFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
    addFontStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    removeFontStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontFamilies: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontFamilyById: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontStyleById: async () => getEditorResponseData(castToEditorResponse(null)),
    getDefaultFontStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    getDefaultFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
    isFontFamilyUsed: async () => getEditorResponseData(castToEditorResponse(null)),
    isFontStyleUsed: async () => getEditorResponseData(castToEditorResponse(null)),
    moveFontFamilies: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFontController = new FontController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'addFontFamily');
    jest.spyOn(mockedEditorApi, 'removeFontFamily');
    jest.spyOn(mockedEditorApi, 'addFontStyle');
    jest.spyOn(mockedEditorApi, 'removeFontStyle');
    jest.spyOn(mockedEditorApi, 'getFontFamilies');
    jest.spyOn(mockedEditorApi, 'getFontStyles');
    jest.spyOn(mockedEditorApi, 'getFontFamilyById');
    jest.spyOn(mockedEditorApi, 'getFontStyleById');
    jest.spyOn(mockedEditorApi, 'getDefaultFontStyle');
    jest.spyOn(mockedEditorApi, 'getDefaultFontFamily');
    jest.spyOn(mockedEditorApi, 'isFontFamilyUsed');
    jest.spyOn(mockedEditorApi, 'isFontStyleUsed');
    jest.spyOn(mockedEditorApi, 'moveFontFamilies');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FontController', () => {
    it('calls addFontFamily method', async () => {
        const connectorId = 'id';
        const fontFamily: AddDocumentFontFamily = {
            name: 'name',
            fontFamilyId: 'id',
        };

        await mockedFontController.addFontFamily(connectorId, fontFamily);
        expect(mockedEditorApi.addFontFamily).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addFontFamily).toHaveBeenCalledWith(connectorId, JSON.stringify(fontFamily));
    });

    it('calls removeFontFamily method', async () => {
        const id = 'id';

        await mockedFontController.removeFontFamily(id);
        expect(mockedEditorApi.removeFontFamily).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFontFamily).toHaveBeenCalledWith(id);
    });

    it('calls addFontStyle method', async () => {
        const connectorId = 'id';
        const fontStyle: AddDocumentFontStyle = {
            name: 'name',
            fontStyleId: 'id',
            fontFamilyId: 'id',
        };

        await mockedFontController.addFontStyle(connectorId, fontStyle);
        expect(mockedEditorApi.addFontStyle).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addFontStyle).toHaveBeenCalledWith(connectorId, JSON.stringify(fontStyle));
    });

    it('calls removeFontStyle method', async () => {
        const id = 'id';

        await mockedFontController.removeFontStyle(id);
        expect(mockedEditorApi.removeFontStyle).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFontStyle).toHaveBeenCalledWith(id);
    });

    it('calls getFontFamilies method', async () => {
        await mockedFontController.getFontFamilies();
        expect(mockedEditorApi.getFontFamilies).toHaveBeenCalledTimes(1);
    });

    it('calls getFontStyles method', async () => {
        const id = 'id';

        await mockedFontController.getFontStyles(id);
        expect(mockedEditorApi.getFontStyles).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFontStyles).toHaveBeenCalledWith(id);
    });

    it('calls getFontFamilyById method', async () => {
        const id = 'id';

        await mockedFontController.getFontFamilyById(id);
        expect(mockedEditorApi.getFontFamilyById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFontFamilyById).toHaveBeenCalledWith(id);
    });

    it('calls getFontFamilyById method', async () => {
        const id = 'id';

        await mockedFontController.getFontStyleById(id);
        expect(mockedEditorApi.getFontStyleById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFontStyleById).toHaveBeenCalledWith(id);
    });

    it('calls getDefaultFontStyle method', async () => {
        await mockedFontController.getDefaultFontStyle();
        expect(mockedEditorApi.getDefaultFontStyle).toHaveBeenCalledTimes(1);
    });

    it('calls getDefaultFontFamily method', async () => {
        await mockedFontController.getDefaultFontFamily();
        expect(mockedEditorApi.getDefaultFontFamily).toHaveBeenCalledTimes(1);
    });

    it('calls isFontFamilyUsed method', async () => {
        const id = 'id';

        await mockedFontController.isFontFamilyUsed(id);
        expect(mockedEditorApi.isFontFamilyUsed).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.isFontFamilyUsed).toHaveBeenCalledWith(id);
    });

    it('calls isFontStyleUsed method', async () => {
        const id = 'id';

        await mockedFontController.isFontStyleUsed(id);
        expect(mockedEditorApi.isFontStyleUsed).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.isFontStyleUsed).toHaveBeenCalledWith(id);
    });

    it('calls moveFontFamilies method', async () => {
        const ids = ['id', 'id2', 'id3'];
        const order = 1;

        await mockedFontController.moveFontFamilies(order, ids);
        expect(mockedEditorApi.moveFontFamilies).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.moveFontFamilies).toHaveBeenCalledWith(order, ids);
    });
});
