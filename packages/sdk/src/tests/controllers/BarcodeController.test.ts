import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { BarcodeController } from '../../controllers/BarcodeController';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { BarcodeSource, BarcodeSourceTypeEnum } from '../../types/FrameTypes';
import { BarcodeType, BarcodeCharacterSet, BarcodeErrorCorrectionLevel } from '../../types/BarcodeTypes';
import { PositionEnum } from '../../types/LayoutTypes';

let id: Id;

let mockedBarcodeController: BarcodeController;

const mockedEditorApi: EditorAPI = {
    removeBarcodeSource: async () => getEditorResponseData(castToEditorResponse(null)),
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
        it('Should be possible to enable text', async () => {
            await mockedBarcodeController.setEnableText(id, true);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(5);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(id, JSON.stringify({ enableText: true }));
        });
        it('Should be possible to disable text', async () => {
            await mockedBarcodeController.setEnableText(id, false);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(6);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ enableText: false }),
            );
        });
        it('Should be possible to set bar height', async () => {
            await mockedBarcodeController.setBarHeight(id, '10px');
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(7);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ barHeight: '10px' }),
            );
        });
        it('Should be possible to set magnification', async () => {
            await mockedBarcodeController.setMagnification(id, 10);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(8);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ magnification: 10 }),
            );
        });
        it('Should be possible to update quiet zone values combined', async () => {
            await mockedBarcodeController.setAreQuietZoneValuesCombined(id, true);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(9);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ quietZone: { areQuietZoneValuesCombined: true } }),
            );
        });
        it('Should be possible to update quiet zone value one by one', async () => {
            await mockedBarcodeController.setQuietZoneValue(id, '1px', PositionEnum.left);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(10);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ quietZone: { left: '1px' } }),
            );
        });
        it('Should be possible to update quiet zone values all at once', async () => {
            await mockedBarcodeController.setQuietZoneValue(id, '1px');
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(11);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ quietZone: { left: '1px', top: '1px', right: '1px', bottom: '1px' } }),
            );
        });
        it('Should be possible to set error correction level', async () => {
            await mockedBarcodeController.setErrorCorrectionLevel(id, BarcodeErrorCorrectionLevel.low);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(12);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ errorCorrectionLevel: BarcodeErrorCorrectionLevel.low }),
            );
        });
        it('Should be possible to set the character set', async () => {
            await mockedBarcodeController.setCharacterSet(id, BarcodeCharacterSet.utf8);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledTimes(13);
            expect(mockedEditorApi.setBarcodeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ characterSet: BarcodeCharacterSet.utf8 }),
            );
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
    describe('removeBarcodeSource', () => {
        it('Should be possible to remove the source', async () => {
            const source: BarcodeSource = { type: BarcodeSourceTypeEnum.text, text: 'test' };
            await mockedBarcodeController.setBarcodeSource(id, source);
            await mockedBarcodeController.removeBarcodeSource(id);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setBarcodeSource).toHaveBeenCalledWith(id, null);
        });
    });
    describe('getBarcodeConfigurationOptions', () => {
        it('retuns valid configuration for qr code', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.qr);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: true,
                allowedCharacterSets: [BarcodeCharacterSet.iso8859_1, BarcodeCharacterSet.utf8],
                allowedErrorCorrectionLevels: [
                    BarcodeErrorCorrectionLevel.low,
                    BarcodeErrorCorrectionLevel.medium,
                    BarcodeErrorCorrectionLevel.quartile,
                    BarcodeErrorCorrectionLevel.high,
                ],
                allowToggleText: false,
                quietZoneAlwaysCombined: true,
            });
        });
        it('retuns valid configuration for code-128', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code128);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: [
                    BarcodeCharacterSet.code128a,
                    BarcodeCharacterSet.code128b,
                    BarcodeCharacterSet.code128c,
                ],
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: true,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for gs1-128', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.gs1128);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: [
                    BarcodeCharacterSet.code128a,
                    BarcodeCharacterSet.code128b,
                    BarcodeCharacterSet.code128c,
                ],
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: true,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for code-39', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code39);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: true,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for code-93', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.code93);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: true,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for data matrix', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.dataMatrix);
            expect(options).toEqual({
                allowEnableMagnification: false,
                allowBarHeight: false,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: false,
                quietZoneAlwaysCombined: true,
            });
        });
        it('retuns valid configuration for ean-13', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.ean13);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: false,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for ean-8', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.ean8);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: false,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for upc-a', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.upca);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: false,
                quietZoneAlwaysCombined: false,
            });
        });
        it('retuns valid configuration for upc-e', () => {
            const options = mockedBarcodeController.getBarcodeConfigationOptions(BarcodeType.upce);
            expect(options).toEqual({
                allowEnableMagnification: true,
                allowBarHeight: true,
                allowQuietZone: true,
                allowedCharacterSets: undefined,
                allowedErrorCorrectionLevels: undefined,
                allowToggleText: false,
                quietZoneAlwaysCombined: false,
            });
        });
    });
});
