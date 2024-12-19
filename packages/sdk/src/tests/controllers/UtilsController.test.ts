import { UtilsController } from '../../controllers/UtilsController';
import { EnvironmentType } from '../../utils/Enums';
import * as MathUtils from '../../utils/MathUtils';

describe('UtilsController', () => {
    let mockedUtilsController: UtilsController;

    beforeEach(() => {
        mockedUtilsController = new UtilsController();
        jest.spyOn(MathUtils, 'round');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Makes round operation', async () => {
        const calc = await mockedUtilsController.round(15.123, 3);
        expect(calc.parsedData).toEqual(15.123);
        expect(MathUtils.round).toHaveBeenCalledWith(15.123, 3);
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
