import { ActionEditorEvent, ActionTrigger, SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { ActionController } from '../../controllers/ActionController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.action = new ActionController(mockChild);

    jest.spyOn(mockedSDK.action, 'createAction');
    jest.spyOn(mockedSDK.action, 'removeAction');
    jest.spyOn(mockedSDK.action, 'updateActionScript');
    jest.spyOn(mockedSDK.action, 'updateActionTriggers');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Should call all of the ActionController functions of child successfully', () => {
    it('should call createAction function of EditorAPI with no params provided', async () => {
        await mockedSDK.action.createAction();
        expect(mockedSDK.editorAPI.createAction).toHaveBeenCalledTimes(1);
    });

    it('should call removeAction function of EditorAPI', async () => {
        await mockedSDK.action.removeAction('0');
        expect(mockedSDK.editorAPI.removeAction).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.removeAction).toHaveBeenCalledWith('0');
    });

    it('should call updateActionTriggers function of EditorAPI', async () => {
        const triggers: ActionTrigger[] = [
            {
                event: ActionEditorEvent.frameMoved,
                triggers: ['1', '2'],
            },
        ];

        await mockedSDK.action.updateActionTriggers('0', triggers);
        expect(mockedSDK.editorAPI.updateActionTriggers).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.updateActionTriggers).toHaveBeenCalledWith('0', JSON.stringify(triggers));
    });

    it('should call updateActionScript function of EditorAPI', async () => {
        const script = 'let a = 1';
        await mockedSDK.action.updateActionScript('0', script);
        expect(mockedSDK.editorAPI.updateActionScript).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.updateActionScript).toHaveBeenCalledWith('0', script);
    });
});
