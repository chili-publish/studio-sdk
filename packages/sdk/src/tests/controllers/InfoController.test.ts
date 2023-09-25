import { InfoController } from '../../controllers/InfoController';

const mockedExperimentController: InfoController = new InfoController();

jest.mock(
    '../../../editor-engine.json',
    () => ({
        current: '0.1.7',
    }),
    { virtual: true },
);

jest.mock(
    '../../../package.json',
    () => ({
        version: '0.1.0',
    }),
    { virtual: true },
);

describe('InfoController', () => {
    it('Should return the current engine version', async () => {
        expect(mockedExperimentController.currentEngineVersion).toBe('0.1.7');
    });

    it('Should return the SDK version', async () => {
        expect(mockedExperimentController.currentSDKVersion).toBe('0.1.0');
    });
});
