import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK } from '../../index';
import { UtilsController } from '../../controllers/UtilsController';
import * as calculationUtils from '../../utils/getCalculatedValue';

describe('utils controller', () => {
    let mockedSDK: SDK;
    beforeEach(() => {
        mockedSDK = new SDK(mockConfig);
        mockedSDK.editorAPI = mockChild;
        mockedSDK.utils = new UtilsController();
        jest.spyOn(calculationUtils, 'getCalculatedValue');
        jest.spyOn(calculationUtils, 'round');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Makes calculation within a string', async () => {
        const calc = await mockedSDK.utils.calculateFromString('1 * 1', 1);
        expect(calc).toEqual(1);
        expect(calculationUtils.getCalculatedValue).toHaveBeenCalledWith('1 * 1', 1);
    });

    it('Makes round operation', async () => {
        const calc = await mockedSDK.utils.round(15.123, 3);
        expect(calc).toEqual(15.123);
        expect(calculationUtils.round).toHaveBeenCalledWith(15.123, 3);
    });
});
