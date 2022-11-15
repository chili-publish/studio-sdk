import { ExperimentController } from '../../controllers/ExperimentController';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedExperiments: ExperimentController;
beforeEach(() => {
    mockedExperiments = new ExperimentController(MockEditorAPI);
    jest.spyOn(mockedExperiments, 'insertTextVariable');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Experiments', () => {
    it('Should call all of the Functions of EditorAPI successfully', () => {
        mockedExperiments.insertTextVariable('5');
        expect(mockedExperiments.insertTextVariable).toHaveBeenCalledTimes(1);
        expect(mockedExperiments.insertTextVariable).toHaveBeenCalledWith('5');
    });
});
