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
    it('Should call the getAll method', async () => {
        await mockedColorStyleController.getAll();
        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);
    });
    it('Should call the getById method', async () => {
        await mockedColorStyleController.getById('5');
        expect(mockEditorApi.getColorById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getColorById).toHaveBeenCalledWith('5');
    });
    it('Should call the create method', async () => {
        await mockedColorStyleController.create();
        expect(mockEditorApi.createColor).toHaveBeenCalledTimes(1);
    });
    it('Should call the duplicate method', async () => {
        await mockedColorStyleController.duplicate('4');
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateColor).toHaveBeenCalledWith('4');
    });
    it('Should call the move method', async () => {
        await mockedColorStyleController.move(2, ['1', '2']);
        expect(mockEditorApi.moveColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveColors).toHaveBeenCalledWith(2, ['1', '2']);
    });
    it('Should call the rename method', async () => {
        await mockedColorStyleController.rename('3', 'new color name');
        expect(mockEditorApi.renameColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameColor).toHaveBeenCalledWith('3', 'new color name');
    });
    it('Should call the update method', async () => {
        await mockedColorStyleController.update('3', { r: 1, g: 1, b: 1, type: ColorType.rgb });
        expect(mockEditorApi.updateColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateColor).toHaveBeenCalledWith(
            '3',
            JSON.stringify({
                r: 1,
                g: 1,
                b: 1,
                type: ColorType.rgb,
            }),
        );
    });
    it('Should call the remove method', async () => {
        await mockedColorStyleController.remove('4');
        expect(mockEditorApi.removeColor).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeColor).toHaveBeenCalledWith('4');
    });
});
