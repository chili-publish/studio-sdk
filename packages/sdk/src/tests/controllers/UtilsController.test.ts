import { UtilsController } from '../../controllers/UtilsController';
import { EnvironmentType } from '../../utils/enums';
import * as calculationUtils from '../../utils/getCalculatedValue';

describe('UtilsController', () => {
    let mockedUtilsController: UtilsController;

    beforeEach(() => {
        mockedUtilsController = new UtilsController();
        jest.spyOn(calculationUtils, 'getCalculatedValue');
        jest.spyOn(calculationUtils, 'round');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Makes calculation within a string', async () => {
        const calc = await mockedUtilsController.calculateFromString('1 * 1', 1);
        expect(calc.parsedData).toEqual(1);
        expect(calculationUtils.getCalculatedValue).toHaveBeenCalledWith('1 * 1', 1);
    });

    it('Makes round operation', async () => {
        const calc = await mockedUtilsController.round(15.123, 3);
        expect(calc.parsedData).toEqual(15.123);
        expect(calculationUtils.round).toHaveBeenCalledWith(15.123, 3);
    });

    it('Makes correct environmentAPI urls', async () => {
        let calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.SANDBOX,
            environment: 'ft-nostress',
            version: '1',
        });
        expect(calculatedUrl).toBe(
            'https://ft-nostress.chili-publish-sandbox.online/grafx/api/v1/environment/ft-nostress',
        );
        calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.PRODUCTION,
            environment: 'ft-nocool',
            version: '7',
        });
        expect(calculatedUrl).toBe('https://ft-nocool.chili-publish.online/grafx/api/v7/environment/ft-nocool');
        calculatedUrl = await mockedUtilsController.createEnvironmentBaseURL({
            type: EnvironmentType.PRODUCTION,
            environment: 'ft-nocool',
            version: '7',
        });
    });
});
