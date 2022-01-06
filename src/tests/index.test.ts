import { SDK } from '../index';
import mockConfig from './__mocks__/config';
import mockChild from './__mocks__/FrameProperties';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);

    jest.spyOn(mockedSDK, 'onStateChanged');
    jest.spyOn(mockedSDK, 'loadEditor');

    mockedSDK.children = mockChild;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the frame properties methods of child successfully', async () => {
        mockedSDK.onStateChanged('sdsd');
        mockedSDK.loadEditor();
        expect(mockedSDK.config.onStateChanged).toHaveBeenCalledTimes(1);
        expect(mockedSDK.loadEditor).toHaveBeenCalledTimes(1);
    });
});
