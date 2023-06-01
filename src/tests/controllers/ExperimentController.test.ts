import { ExperimentController } from '../../controllers/ExperimentController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedExperimentController: ExperimentController;

const mockedEditorApi: EditorAPI = {
    insertTextVariable: async () => getEditorResponseData(castToEditorResponse(null)),
    enterTextEditMode: async () => getEditorResponseData(castToEditorResponse(null)),
    exitTextEditMode: async () => getEditorResponseData(castToEditorResponse(null)),
    insertImageVariableToFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageSource: async () => getEditorResponseData(castToEditorResponse(null)),
};
beforeEach(() => {
    mockedExperimentController = new ExperimentController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'insertTextVariable');
    jest.spyOn(mockedEditorApi, 'enterTextEditMode');
    jest.spyOn(mockedEditorApi, 'exitTextEditMode');
    jest.spyOn(mockedEditorApi, 'insertImageVariableToFrame');
    jest.spyOn(mockedEditorApi, 'setImageSource');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('ExperimentController', () => {
    it('Should call insertTextVariable correctly', async () => {
        await mockedExperimentController.insertTextVariable('5');
        expect(mockedEditorApi.insertTextVariable).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.insertTextVariable).toHaveBeenCalledWith('5');
    });

    it('Should call enterTextEditMode correctly', async () => {
        await mockedExperimentController.enterTextEditMode('5');
        expect(mockedEditorApi.enterTextEditMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.enterTextEditMode).toHaveBeenCalledWith('5');
    });

    it('Should call exitTextEditMode correctly', async () => {
        await mockedExperimentController.exitTextEditMode();
        expect(mockedEditorApi.exitTextEditMode).toHaveBeenCalledTimes(1);
    });
    it('Should call insertImageVariable correctly and set the imageSource as side effect', async () => {
        await mockedExperimentController.insertImageVariableToFrame('image-frame-id', 'variable-id');
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(
            'image-frame-id',
            JSON.stringify({ variableId: 'variable-id', type: 'variable' }),
        );
        expect(mockedEditorApi.insertImageVariableToFrame).not.toHaveBeenCalled();
    });
});
