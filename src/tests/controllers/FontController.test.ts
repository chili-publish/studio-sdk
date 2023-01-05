import MockEditorAPI from '../__mocks__/MockEditorAPI';
import { FontController } from '../../controllers/FontController';
import { AddDocumentFont } from '../../../types/FontTypes';

let mockedFontController: FontController;

beforeEach(() => {
    mockedFontController = new FontController(MockEditorAPI);
    jest.spyOn(mockedFontController, 'getFonts');
    jest.spyOn(mockedFontController, 'getFontById');
    jest.spyOn(mockedFontController, 'getDefaultFont');
    jest.spyOn(mockedFontController, 'removeFont');
    jest.spyOn(mockedFontController, 'addFont');
    jest.spyOn(mockedFontController, 'isFontUsed');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Font Controller', () => {
    it('calls getFonts', () => {
        mockedFontController.getFonts();
        expect(mockedFontController.getFonts).toHaveBeenCalledTimes(1);
    });

    it('calls getFontById', () => {
        const fontId = 'fontId';
        mockedFontController.getFontById(fontId);
        expect(mockedFontController.getFontById).toHaveBeenCalledTimes(1);
        expect(mockedFontController.getFontById).toHaveBeenCalledWith(fontId);
    });

    it('calls getDefaultFont', () => {
        mockedFontController.getDefaultFont();
        expect(mockedFontController.getDefaultFont).toHaveBeenCalledTimes(1);
    });

    it('calls removeFont', () => {
        const fontId = 'fontId';
        mockedFontController.removeFont(fontId);
        expect(mockedFontController.removeFont).toHaveBeenCalledTimes(1);
        expect(mockedFontController.removeFont).toHaveBeenCalledWith(fontId);
    });

    it('calls addFont', () => {
        const fontAddModel: AddDocumentFont = {
            fontFamily: 'family',
            fontId: 'fontId',
            fontStyle: 'fontStyle',
            name: 'fontName',
        };
        const connectorId = 'connectorId';

        mockedFontController.addFont(connectorId, fontAddModel);

        expect(mockedFontController.addFont).toHaveBeenCalledTimes(1);
        expect(mockedFontController.addFont).toHaveBeenCalledWith(connectorId, fontAddModel);
    });

    it('calls isFontUsed', () => {
        const fontId = 'fontId';

        mockedFontController.isFontUsed(fontId);

        expect(mockedFontController.isFontUsed).toHaveBeenCalledTimes(1);
        expect(mockedFontController.isFontUsed).toHaveBeenCalledWith(fontId);
    });
});
