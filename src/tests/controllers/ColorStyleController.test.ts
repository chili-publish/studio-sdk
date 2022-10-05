import { ColorStyleController } from '../../controllers/ColorStyleController';
import { ColorType } from '../../../types/ColorStyleTypes';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedColorStyleController: ColorStyleController;

beforeEach(() => {
    mockedColorStyleController = new ColorStyleController(MockEditorAPI);
    jest.spyOn(mockedColorStyleController, 'getColors');
    jest.spyOn(mockedColorStyleController, 'getColorById');
    jest.spyOn(mockedColorStyleController, 'createColor');
    jest.spyOn(mockedColorStyleController, 'duplicateColor');
    jest.spyOn(mockedColorStyleController, 'moveColors');
    jest.spyOn(mockedColorStyleController, 'renameColor');
    jest.spyOn(mockedColorStyleController, 'updateColor');
    jest.spyOn(mockedColorStyleController, 'updateColor');
    jest.spyOn(mockedColorStyleController, 'removeColor');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('ColorStyle', () => {
    it('Should call all of the ColorStyle Functions of EditorAPI successfully', () => {
        mockedColorStyleController.getColors();
        expect(mockedColorStyleController.getColors).toHaveBeenCalledTimes(1);

        mockedColorStyleController.getColorById('5');
        expect(mockedColorStyleController.getColorById).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.getColorById).toHaveBeenCalledWith('5');

        mockedColorStyleController.createColor();
        expect(mockedColorStyleController.createColor).toHaveBeenCalledTimes(1);

        mockedColorStyleController.duplicateColor('4');
        expect(mockedColorStyleController.duplicateColor).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.duplicateColor).toHaveBeenCalledWith('4');

        mockedColorStyleController.moveColors(2, ['1', '2']);
        expect(mockedColorStyleController.moveColors).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.moveColors).toHaveBeenCalledWith(2, ['1', '2']);

        mockedColorStyleController.renameColor('3', 'new color name');
        expect(mockedColorStyleController.renameColor).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.renameColor).toHaveBeenCalledWith('3', 'new color name');

        mockedColorStyleController.updateColor('3', { r: 1, g: 1, b: 1, colorType: ColorType.rgb });
        expect(mockedColorStyleController.updateColor).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.updateColor).toHaveBeenCalledWith('3', {
            r: 1,
            g: 1,
            b: 1,
            colorType: ColorType.rgb,
        });

        mockedColorStyleController.removeColor('4');
        expect(mockedColorStyleController.removeColor).toHaveBeenCalledTimes(1);
        expect(mockedColorStyleController.removeColor).toHaveBeenCalledWith('4');
    });
});
