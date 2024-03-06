import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { BarcodeController } from '../../controllers/BarcodeController';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { BarcodeSource, BarcodeSourceTypeEnum } from '../../types/FrameTypes';
import { BarcodeType } from '../../types/BarcodeTypes';

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
    describe('getBarcodeConfigurationOptions', () => {
        it('retuns valid configuration for qr code', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.qr);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for code-128', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code128);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for code-39', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code39);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for code-93', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code93);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for data matrix', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.dataMatrix);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for ean-13', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.ean13);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for ean-8', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.ean8);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for isbn', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.isbn);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for upc-a', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.upca);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
        it('retuns valid configuration for upc-e', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.upce);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: false,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
            });
        });
    });
});
