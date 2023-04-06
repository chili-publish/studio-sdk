import { ColorStyleController } from '../../controllers/ColorStyleController';
import { ColorType } from '../../types/ColorStyleTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedColorStyleController: ColorStyleController;

const mockEditorApi: EditorAPI = {
    getColors: async () => getEditorResponseData(castToEditorResponse(null)),
    getColorById: async () => getEditorResponseData(castToEditorResponse(null)),
    createColor: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateColor: async () => getEditorResponseData(castToEditorResponse(null)),
    moveColors: async () => getEditorResponseData(castToEditorResponse(null)),
    renameColor: async () => getEditorResponseData(castToEditorResponse(null)),
    updateColor: async () => getEditorResponseData(castToEditorResponse(null)),
    removeColor: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedColorStyleController = new ColorStyleController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getColors');
    jest.spyOn(mockEditorApi, 'getColorById');
    jest.spyOn(mockEditorApi, 'createColor');
    jest.spyOn(mockEditorApi, 'duplicateColor');
    jest.spyOn(mockEditorApi, 'moveColors');
    jest.spyOn(mockEditorApi, 'renameColor');
    jest.spyOn(mockEditorApi, 'updateColor');
    jest.spyOn(mockEditorApi, 'removeColor');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('ColorStyleController', () => {
    it('Should call the getColors method', async () => {
        await mockedColorStyleController.getColors();
        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);
    });
    it('Should call the getColorById method', async () => {
        await mockedColorStyleController.getColorById('5');
        expect(mockEditorApi.getColorById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getColorById).toHaveBeenCalledWith('5');
    });
    it('Should call the createColor method', async () => {
        await mockedColorStyleController.createColor();
        expect(mockEditorApi.createColor).toHaveBeenCalledTimes(1);
    });
    it('Should call the duplicateColor method', async () => {
        await mockedColorStyleController.duplicateColor('4');
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledWith('4');
    });
    it('Should call the moveColors method', async () => {
        await mockedColorStyleController.moveColors(2, ['1', '2']);
        expect(mockEditorApi.moveColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveColors).toHaveBeenCalledWith(2, ['1', '2']);
    });
    it('Should call the renameColor method', async () => {
        await mockedColorStyleController.renameColor('3', 'new color name');
        expect(mockEditorApi.renameColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameColor).toHaveBeenCalledWith('3', 'new color name');
    });
    it('Should call the updateColor method', async () => {
        await mockedColorStyleController.updateColor('3', { r: 1, g: 1, b: 1, colorType: ColorType.rgb });
        expect(mockEditorApi.updateColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateColor).toHaveBeenCalledWith(
            '3',
            JSON.stringify({
                r: 1,
                g: 1,
                b: 1,
                colorType: ColorType.rgb,
            }),
        );
    });
    it('Should call the removeColor method', async () => {
        await mockedColorStyleController.removeColor('4');
        expect(mockEditorApi.removeColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeColor).toHaveBeenCalledWith('4');
    });
});
