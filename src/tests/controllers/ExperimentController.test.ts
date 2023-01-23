import { ExperimentController } from '../../controllers/ExperimentController';
import mockEditorAPI from '../__mocks__/MockEditorAPI';
import mockConfig from '../__mocks__/config';
import { mockImageVariableSource } from '../__mocks__/MockImageFrameSource';
import { SDK } from '../../index';
import { mockSelectFrame } from '../__mocks__/FrameProperties';

let mockedExperiments: ExperimentController;
beforeEach(() => {
    mockedExperiments = new ExperimentController(mockEditorAPI);
    jest.spyOn(mockedExperiments, 'insertTextVariable');
    jest.spyOn(mockedExperiments, 'enterTextEditMode');
    jest.spyOn(mockedExperiments, 'exitTextEditMode');
    jest.spyOn(mockedExperiments, 'insertImageVariableToFrame');
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

        mockedExperiments.insertImageVariableToFrame('image-frame-id', 'variable-id');
        expect(mockedExperiments.insertImageVariableToFrame).toHaveBeenCalledTimes(1);
        expect(mockedExperiments.insertImageVariableToFrame).toHaveBeenCalledWith('image-frame-id', 'variable-id');
    });
});

describe('Set ImageFrameSource from variable', () => {
    const mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockEditorAPI;

    beforeAll(() => {
        jest.clearAllMocks();
    });

    it('insertImageVariableToFrame() redirects to EditorAPI.setImageSource() with ImageVariableSource param', async () => {
        const variableId = mockImageVariableSource.variableId;
        const frameId = mockSelectFrame.frameId;
        await mockedExperiments.insertImageVariableToFrame(frameId, variableId);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(
            frameId,
            JSON.stringify(mockImageVariableSource),
        );
    });
});
