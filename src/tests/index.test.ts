import { SDK } from '../index';
import mockConfig from './__mocks__/config';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);

    jest.spyOn(mockedSDK, 'loadEditor');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call all of the frame properties methods of editorAPI successfully', async () => {
        mockedSDK.loadEditor();
        expect(mockedSDK.loadEditor).toHaveBeenCalledTimes(1);
    });
});
