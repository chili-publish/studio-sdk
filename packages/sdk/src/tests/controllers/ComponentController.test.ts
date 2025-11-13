import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ComponentController } from '../../controllers/ComponentController';

let id: Id;

let mockedComponentController: ComponentController;

const mockedEditorApi: EditorAPI = {
    linkComponentVariable: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedComponentController = new ComponentController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'linkComponentVariable');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('ComponentController', () => {
    describe('linkComponentVariable', () => {
        it('Should be possible to link variable', async () => {
            await mockedComponentController.linkVariable(id, 'target-variable-id', 'source-variable-id');
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledWith(
                id,
                'target-variable-id',
                'source-variable-id',
            );
        });
        it('Should be possible to unlink variable', async () => {
            await mockedComponentController.linkVariable(id, 'target-variable-id');
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.linkComponentVariable).toHaveBeenCalledWith(id, 'target-variable-id', undefined);
        });
    });
});
