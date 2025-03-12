import { ExperimentController } from '../../controllers/ExperimentController';
import { EditorAPI, Id } from '../../types/CommonTypes';
import { TextType } from '../../types/TextTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';

let mockedExperimentController: ExperimentController;
let frameId: Id;

const mockedEditorApi: EditorAPI = {
    insertTextVariable: async () => getEditorResponseData(castToEditorResponse(null)),
    enterTextEditMode: async () => getEditorResponseData(castToEditorResponse(null)),
    exitTextEditMode: async () => getEditorResponseData(castToEditorResponse(null)),
    insertImageVariableToFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageSource: async () => getEditorResponseData(castToEditorResponse(null)),
    getTextByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
    setTextByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
    selectTextById: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedExperimentController = new ExperimentController(Promise.resolve(mockedEditorApi));
    jest.spyOn(mockedEditorApi, 'insertTextVariable');
    jest.spyOn(mockedEditorApi, 'enterTextEditMode');
    jest.spyOn(mockedEditorApi, 'exitTextEditMode');
    jest.spyOn(mockedEditorApi, 'insertImageVariableToFrame');
    jest.spyOn(mockedEditorApi, 'setImageSource');
    jest.spyOn(mockedEditorApi, 'getTextByFrameId');
    jest.spyOn(mockedEditorApi, 'setTextByFrameId');
    jest.spyOn(mockedEditorApi, 'selectTextById');

    frameId = mockSelectFrame.id;
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
            JSON.stringify({ id: 'variable-id', type: 'variable' }),
        );
        expect(mockedEditorApi.insertImageVariableToFrame).not.toHaveBeenCalled();
    });

    it('Should call getTextByFrameId of EditorAPI successfully', async () => {
        await mockedExperimentController.getText(frameId, TextType.formatted);
        expect(mockedEditorApi.getTextByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getTextByFrameId).toHaveBeenCalledWith(frameId, TextType.formatted);
    });

    it('Should call setTextByFrameId of EditorAPI successfully', async () => {
        const text = 'myText';

        await mockedExperimentController.setText(frameId, text);
        expect(mockedEditorApi.setTextByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setTextByFrameId).toHaveBeenCalledWith(frameId, text);
    });

    it('Should call selectTextByFrameId of EditorAPI successfully', async () => {
        const startIndex = 2;
        const length = 3;

        await mockedExperimentController.selectText(frameId, startIndex, length);
        expect(mockedEditorApi.selectTextById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectTextById).toHaveBeenCalledWith(frameId, startIndex, length);
    });
});
