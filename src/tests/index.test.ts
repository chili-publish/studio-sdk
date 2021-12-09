import { SDK } from '../index';
import mockConfig from './__mocks__/config';
import mockChild from './__mocks__/FrameProperties';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);

    jest.spyOn(mockedSDK, 'stateChanged');

    mockedSDK.children = mockChild;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the frame properties methods of child successfully', async () => {
        mockedSDK.stateChanged('sdsd');
        expect(mockedSDK.config.stateChanged).toHaveBeenCalledTimes(1);
    });
});
