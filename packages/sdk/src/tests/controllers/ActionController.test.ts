import { ActionEditorEvent, ActionTrigger } from '../../types/ActionTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { ActionController } from '../../controllers/ActionController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedActionController: ActionController;

const mockEditorApi: EditorAPI = {
    getActions: async () => getEditorResponseData(castToEditorResponse(null)),
    getActionById: async () => getEditorResponseData(castToEditorResponse(null)),
    createAction: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateAction: async () => getEditorResponseData(castToEditorResponse(null)),
    removeAction: async () => getEditorResponseData(castToEditorResponse(null)),
    renameAction: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionScript: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionTriggers: async () => getEditorResponseData(castToEditorResponse(null)),
    moveActions: async () => getEditorResponseData(castToEditorResponse(null)),
    setActionTypeError: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedActionController = new ActionController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getActions');
    jest.spyOn(mockEditorApi, 'getActionById');
    jest.spyOn(mockEditorApi, 'createAction');
    jest.spyOn(mockEditorApi, 'duplicateAction');
    jest.spyOn(mockEditorApi, 'removeAction');
    jest.spyOn(mockEditorApi, 'renameAction');
    jest.spyOn(mockEditorApi, 'updateActionScript');
    jest.spyOn(mockEditorApi, 'updateActionTriggers');
    jest.spyOn(mockEditorApi, 'moveActions');
    jest.spyOn(mockEditorApi, 'setActionTypeError');
});

afterAll(() => {
    jest.restoreAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the ActionController functions of child successfully', () => {
    it('Should call the getActions method', async () => {
        await mockedActionController.getAll();
        expect(mockEditorApi.getActions).toHaveBeenCalledTimes(1);
    });

    it('Should call the getAction method', async () => {
        await mockedActionController.getById('5');
        expect(mockEditorApi.getActionById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getActionById).toHaveBeenCalledWith('5');
    });

    it('should call createAction function of EditorAPI with no params provided', async () => {
        await mockedActionController.create();
        expect(mockEditorApi.createAction).toHaveBeenCalledTimes(1);
    });

    it('should call duplicateAction function of EditorAPI with the provided id', async () => {
        await mockedActionController.duplicate('0');
        expect(mockEditorApi.duplicateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateAction).toHaveBeenCalledWith('0');
    });

    it('should call renameAction function of EditorAPI with the provided params', async () => {
        await mockedActionController.rename('0', 'new name');
        expect(mockEditorApi.renameAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameAction).toHaveBeenCalledWith('0', 'new name');
    });

    it('should call removeAction function of EditorAPI', async () => {
        await mockedActionController.remove('0');
        expect(mockEditorApi.removeAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeAction).toHaveBeenCalledWith('0');
    });

    it('should call updateActionTriggers function of EditorAPI', async () => {
        const triggers: ActionTrigger[] = [
            {
                event: ActionEditorEvent.frameMoved,
                triggers: ['1', '2'],
            },
        ];

        await mockedActionController.updateTriggers('0', triggers);
        expect(mockEditorApi.updateActionTriggers).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateActionTriggers).toHaveBeenCalledWith('0', JSON.stringify(triggers));
    });

    it('should call updateActionScript function of EditorAPI', async () => {
        const script = 'let a = 1';
        await mockedActionController.updateScript('0', script);
        expect(mockEditorApi.updateActionScript).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateActionScript).toHaveBeenCalledWith('0', script);
    });

    it('should call moveActions function of EditorAPI', async () => {
        const order = 0;
        const ids = ['test1', 'test2'];
        await mockedActionController.move(order, ids);
        expect(mockEditorApi.moveActions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveActions).toHaveBeenCalledWith(order, ids);
    });

    it('should call removeAction function of EditorAPI', async () => {
        await mockedActionController.setTypeError('0', true);
        expect(mockEditorApi.setActionTypeError).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setActionTypeError).toHaveBeenCalledWith('0', true);
    });
});
