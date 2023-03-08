import { ActionEditorEvent, ActionTrigger } from '../../../types/ActionTypes';
import { EditorAPI } from '../../../types/CommonTypes';
import { ActionController } from '../../controllers/ActionController';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedActionController: ActionController;

const mockEditorApi: EditorAPI = {
    createAction: async () => getEditorResponseData(castToEditorResponse(null)),
    removeAction: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionScript: async () => getEditorResponseData(castToEditorResponse(null)),
    updateActionTriggers: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedActionController = new ActionController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'createAction');
    jest.spyOn(mockEditorApi, 'removeAction');
    jest.spyOn(mockEditorApi, 'updateActionScript');
    jest.spyOn(mockEditorApi, 'updateActionTriggers');
});

afterAll(() => {
    jest.restoreAllMocks();
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the ActionController functions of child successfully', () => {
    it('should call createAction function of EditorAPI with no params provided', async () => {
        await mockedActionController.createAction();
        expect(mockEditorApi.createAction).toHaveBeenCalledTimes(1);
    });

    it('should call removeAction function of EditorAPI', async () => {
        await mockedActionController.removeAction('0');
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

        await mockedActionController.updateActionTriggers('0', triggers);
        expect(mockEditorApi.updateActionTriggers).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateActionTriggers).toHaveBeenCalledWith('0', JSON.stringify(triggers));
    });

    it('should call updateActionScript function of EditorAPI', async () => {
        const script = 'let a = 1';
        await mockedActionController.updateActionScript('0', script);
        expect(mockEditorApi.updateActionScript).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateActionScript).toHaveBeenCalledWith('0', script);
    });
});
