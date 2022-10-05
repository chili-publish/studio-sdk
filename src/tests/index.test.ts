import { SDK } from '../index';
import mockConfig from './__mocks__/config';
import MockEditorAPI from './__mocks__/MockEditorAPI';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);

    jest.spyOn(mockedSDK, 'loadEditor');

    mockedSDK.editorAPI = MockEditorAPI;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the frame properties methods of editorAPI successfully', async () => {
        mockedSDK.loadEditor();
        expect(mockedSDK.loadEditor).toHaveBeenCalledTimes(1);
    });
});
