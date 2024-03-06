import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { BarcodeController } from '../../controllers/BarcodeController';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { BarcodeSource, BarcodeSourceTypeEnum } from '../../types/FrameTypes';

let id: Id;

let mockedBarcodeController: BarcodeController;

const mockedEditorApi: EditorAPI = {
    setBarcodeProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setBarcodeSource: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedBarcodeController = new BarcodeController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'setBarcodeProperties');
    jest.spyOn(mockedEditorApi, 'setBarcodeSource');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('BarcodeController', () => {
    describe('setBarcodeProperties', () => {
        it('Should be possible to enable background', async () => {
            await mockedBarcodeController.setEnableBackground(id, true);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ enableBackground: true }),
            );
        });
        it('Should be possible to set the barcode frame background color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, type: ColorUsageType.local };
            await mockedBarcodeController.setBackgroundColor(id, color);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ backgroundColor: color }),
            );
        });
        it('Should be possible to enable bars', async () => {
            await mockedBarcodeController.setEnableBars(id, true);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(3);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(id, JSON.stringify({ enableBars: true }));
        });
        it('Should be possible to set the bar color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, type: ColorUsageType.local };
            await mockedBarcodeController.setBarColor(id, color);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(id, JSON.stringify({ barColor: color }));
        });
    });
    describe('setBarcodeSource', () => {
        it('Should be possible to set source to text', async () => {
            const source: BarcodeSource = { type: BarcodeSourceTypeEnum.text, text: 'test' };
            await mockedBarcodeController.setBarcodeSource(id, source);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledWith(id, JSON.stringify(source));
        });
        it('Should be possible to set source to variable', async () => {
            const source: BarcodeSource = { type: BarcodeSourceTypeEnum.variable, id: 'test' };
            await mockedBarcodeController.setBarcodeSource(id, source);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledWith(id, JSON.stringify(source));
        });
    });
});
