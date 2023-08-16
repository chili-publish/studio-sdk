import { EditorAPI } from '../../types/CommonTypes';
import { ColorConversionController } from '../../controllers/ColorConversionController';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { Color, CMYKColor, ColorType } from '../../types/ColorStyleTypes';

let mockedColorConversionController: ColorConversionController;

const mockedEditorApi: EditorAPI = {
    colorToRgb: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedColorConversionController = new ColorConversionController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'colorToRgb');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('ColorConversionController', () => {
    it('Should be possible to convert color to rgb', async () => {
        await mockedColorConversionController.convertToRgb({c: 0.2, m: 0.3, y: 0.4, k: 0.5, type: ColorType.cmyk});
        expect(mockedEditorApi.colorToRgb).toHaveBeenCalledTimes(1);
    });
});
