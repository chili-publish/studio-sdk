import { GradientStyleController } from '../../controllers/GradientStyleController';
import { EditorAPI } from '../../types/CommonTypes';
import { GradientType } from '../../types/GradientStyleTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedGradientStyleController: GradientStyleController;

const mockEditorApi: EditorAPI = {
    getGradients: async () => getEditorResponseData(castToEditorResponse(null)),
    getGradientById: async () => getEditorResponseData(castToEditorResponse(null)),
    createGradient: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateGradient: async () => getEditorResponseData(castToEditorResponse(null)),
    moveGradients: async () => getEditorResponseData(castToEditorResponse(null)),
    renameGradient: async () => getEditorResponseData(castToEditorResponse(null)),
    updateGradient: async () => getEditorResponseData(castToEditorResponse(null)),
    removeGradient: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedGradientStyleController = new GradientStyleController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getGradients');
    jest.spyOn(mockEditorApi, 'getGradientById');
    jest.spyOn(mockEditorApi, 'createGradient');
    jest.spyOn(mockEditorApi, 'duplicateGradient');
    jest.spyOn(mockEditorApi, 'moveGradients');
    jest.spyOn(mockEditorApi, 'renameGradient');
    jest.spyOn(mockEditorApi, 'updateGradient');
    jest.spyOn(mockEditorApi, 'removeGradient');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('GradientStyleController', () => {
    it('Should call the getAll method', async () => {
        await mockedGradientStyleController.getAll();
        expect(mockEditorApi.getGradients).toHaveBeenCalledTimes(1);
    });
    it('Should call the getById method', async () => {
        await mockedGradientStyleController.getById('5');
        expect(mockEditorApi.getGradientById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getGradientById).toHaveBeenCalledWith('5');
    });
    it('Should call the create method', async () => {
        await mockedGradientStyleController.create();
        expect(mockEditorApi.createGradient).toHaveBeenCalledTimes(1);
    });
    it('Should call the duplicate method', async () => {
        await mockedGradientStyleController.duplicate('4');
        expect(mockEditorApi.duplicateGradient).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateGradient).toHaveBeenCalledWith('4');
    });
    it('Should call the move method', async () => {
        await mockedGradientStyleController.move(2, ['1', '2']);
        expect(mockEditorApi.moveGradients).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveGradients).toHaveBeenCalledWith(2, ['1', '2']);
    });
    it('Should call the rename method', async () => {
        await mockedGradientStyleController.rename('3', 'new gradient name');
        expect(mockEditorApi.renameGradient).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameGradient).toHaveBeenCalledWith('3', 'new gradient name');
    });
    it('Should call the update method', async () => {
        await mockedGradientStyleController.update('3', { colors: [], stops: [], type: GradientType.linear });
        expect(mockEditorApi.updateGradient).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateGradient).toHaveBeenCalledWith(
            '3',
            JSON.stringify({
                colors: [],
                stops: [],
                type: GradientType.linear,
            }),
        );
    });
    it('Should call the remove method', async () => {
        await mockedGradientStyleController.remove('4');
        expect(mockEditorApi.removeGradient).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeGradient).toHaveBeenCalledWith('4');
    });
});
