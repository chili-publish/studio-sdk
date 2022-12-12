import { ExperimentController } from '../../controllers/ExperimentController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedExperiments: ExperimentController;
beforeEach(() => {
    mockedExperiments = new ExperimentController(MockEditorAPI);
    jest.spyOn(mockedExperiments, 'insertTextVariable');
    jest.spyOn(mockedExperiments, 'enterTextEditMode');
    jest.spyOn(mockedExperiments, 'exitTextEditMode');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Experiments', () => {
    it('Should call all of the Functions of EditorAPI successfully', () => {
        mockedExperiments.insertTextVariable('5');
        expect(mockedExperiments.insertTextVariable).toHaveBeenCalledTimes(1);
        expect(mockedExperiments.insertTextVariable).toHaveBeenCalledWith('5');

        mockedExperiments.enterTextEditMode('5');
        expect(mockedExperiments.enterTextEditMode).toHaveBeenCalledTimes(1);
        expect(mockedExperiments.enterTextEditMode).toHaveBeenCalledWith('5');

        mockedExperiments.exitTextEditMode();
        expect(mockedExperiments.exitTextEditMode).toHaveBeenCalledTimes(1);
    });
});
