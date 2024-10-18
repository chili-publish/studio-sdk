import { ActionDeltaUpdate, ActionEditorEvent, ActionTrigger } from '../../types/ActionTypes';
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
    updateAction: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionScript: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionTriggers: async () => getEditorResponseData(castToEditorResponse(null)),
    moveActions: async () => getEditorResponseData(castToEditorResponse(null)),
    setActionTypeError: async () => getEditorResponseData(castToEditorResponse(null)),
    disableActions: async () => getEditorResponseData(castToEditorResponse(null)),
    enableActions: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedActionController = new ActionController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getActions');
    jest.spyOn(mockEditorApi, 'getActionById');
    jest.spyOn(mockEditorApi, 'createAction');
    jest.spyOn(mockEditorApi, 'duplicateAction');
    jest.spyOn(mockEditorApi, 'removeAction');
    jest.spyOn(mockEditorApi, 'renameAction');
    jest.spyOn(mockEditorApi, 'updateAction');
    jest.spyOn(mockEditorApi, 'updateActionScript');
    jest.spyOn(mockEditorApi, 'updateActionTriggers');
    jest.spyOn(mockEditorApi, 'moveActions');
    jest.spyOn(mockEditorApi, 'setActionTypeError');
    jest.spyOn(mockEditorApi, 'disableActions');
    jest.spyOn(mockEditorApi, 'enableActions');
});

afterEach(() => {
    jest.restoreAllMocks();
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
        const name = 'new name';
        const update: ActionDeltaUpdate = {
            name: name,
        };
        await mockedActionController.rename('0', name);
        expect(mockEditorApi.updateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateAction).toHaveBeenCalledWith('0', JSON.stringify(update));
    });

    it('should call removeAction function of EditorAPI', async () => {
        await mockedActionController.remove('0');
        expect(mockEditorApi.removeAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeAction).toHaveBeenCalledWith('0');
    });

    it('should call updateAction function of EditorAPI', async () => {
        const update: ActionDeltaUpdate = {
            script: '',
            name: '',
            hasTypeError: true,
            triggers: [
                {
                    event: ActionEditorEvent.frameMoved,
                    triggers: ['1', '2'],
                },
            ],
        };

        await mockedActionController.update('0', update);
        expect(mockEditorApi.updateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateAction).toHaveBeenCalledWith('0', JSON.stringify(update));
    });

    it('should call updateActionTriggers function of EditorAPI', async () => {
        const triggers: ActionTrigger[] = [
            {
                event: ActionEditorEvent.frameMoved,
                triggers: ['1', '2'],
            },
        ];
        const update: ActionDeltaUpdate = {
            triggers: triggers,
        };

        await mockedActionController.updateTriggers('0', triggers);
        expect(mockEditorApi.updateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateAction).toHaveBeenCalledWith('0', JSON.stringify(update));
    });

    it('should call updateAction function of EditorAPI', async () => {
        const script = 'let a = 1';
        const update: ActionDeltaUpdate = {
            script: script,
        };
        await mockedActionController.updateScript('0', script);
        expect(mockEditorApi.updateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateAction).toHaveBeenCalledWith('0', JSON.stringify(update));
    });

    it('should call moveActions function of EditorAPI', async () => {
        const order = 0;
        const ids = ['test1', 'test2'];
        await mockedActionController.move(order, ids);
        expect(mockEditorApi.moveActions).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveActions).toHaveBeenCalledWith(order, ids);
    });

    it('should call updateAction function of EditorAPI', async () => {
        const update: ActionDeltaUpdate = {
            hasTypeError: true,
        };
        await mockedActionController.setTypeError('0', true);
        expect(mockEditorApi.updateAction).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateAction).toHaveBeenCalledWith('0', JSON.stringify(update));
    });

    it('Should call the disableActions method', async () => {
        await mockedActionController.disable();
        expect(mockEditorApi.disableActions).toHaveBeenCalledTimes(1);
    });

    it('Should call the enableActions method', async () => {
        await mockedActionController.enable();
        expect(mockEditorApi.enableActions).toHaveBeenCalledTimes(1);
    });
});
