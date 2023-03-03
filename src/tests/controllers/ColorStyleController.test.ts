import { ColorStyleController } from '../../controllers/ColorStyleController';
import { ColorType } from '../../../types/ColorStyleTypes';
import { EditorAPI } from '../../../types/CommonTypes';
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
    it('Should call all of the ColorStyle Functions of EditorAPI successfully', async () => {
        await mockedColorStyleController.getColors();
        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);

        await mockedColorStyleController.getColorById('5');
        expect(mockEditorApi.getColorById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getColorById).toHaveBeenCalledWith('5');

        await mockedColorStyleController.createColor();
        expect(mockEditorApi.createColor).toHaveBeenCalledTimes(1);

        await mockedColorStyleController.duplicateColor('4');
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledWith('4');

        await mockedColorStyleController.moveColors(2, ['1', '2']);
        expect(mockEditorApi.moveColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveColors).toHaveBeenCalledWith(2, ['1', '2']);

        await mockedColorStyleController.renameColor('3', 'new color name');
        expect(mockEditorApi.renameColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameColor).toHaveBeenCalledWith('3', 'new color name');

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

        await mockedColorStyleController.removeColor('4');
        expect(mockEditorApi.removeColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeColor).toHaveBeenCalledWith('4');
    });
});
