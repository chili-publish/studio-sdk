import { SDK } from '../index';
import mockConfig from './__mocks__/config';
import mockChild, { mockSelectFrame } from './__mocks__/FrameProperties';
import { FrameProperyNames } from '../utils/enums';
import FrameProperties from '../classes/frameProperties';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK, 'removeLayout');
    jest.spyOn(mockedSDK, 'addLayout');
    jest.spyOn(mockedSDK, 'renameLayout');
    jest.spyOn(mockedSDK, 'selectLayout');
    jest.spyOn(mockedSDK, 'duplicateLayout');
    jest.spyOn(mockedSDK, 'resetLayout');
    jest.spyOn(mockedSDK, 'stateChanged');
    jest.spyOn(mockedSDK, 'resetFrameSize');
    jest.spyOn(mockedSDK, 'selectedFrameLayout');
    jest.spyOn(mockedSDK, 'selectedFrameContent');
    jest.spyOn(mockedSDK, 'selectFrame');
    jest.spyOn(mockedSDK, 'selectMultipleFrames');
    jest.spyOn(mockedSDK, 'getFramePropertyCalculatedValue');
    jest.spyOn(mockedSDK.frameProperties, 'getFramePropertyCalculatedValue');
    mockedSDK.children = mockChild;
    mockedSDK.frameProperties = new FrameProperties(mockChild);
    mockedSDK.frameProperties.getFramePropertyCalculatedValue = jest.fn().mockResolvedValue(true);
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the frame properties methods of child successfully', async () => {
        mockedSDK.stateChanged('sdsd');
        expect(mockedSDK.config.stateChanged).toHaveBeenCalledTimes(1);

        await mockedSDK.removeLayout('1');

        expect(mockedSDK.children.removeLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.addLayout('1');

        expect(mockedSDK.children.addLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.renameLayout('1', 'TEST');

        expect(mockedSDK.children.renameLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.selectLayout('1');

        expect(mockedSDK.children.selectLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.duplicateLayout('1');

        expect(mockedSDK.children.duplicateLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.resetLayout('1');

        expect(mockedSDK.children.resetLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.resetFrameSize('1');

        expect(mockedSDK.children.resetFrameSize).toHaveBeenCalledTimes(1);

        await mockedSDK.selectedFrameLayout('1dssfdfsdfdsfds');

        expect(mockedSDK.config.selectedFrameLayout).toHaveBeenCalledTimes(2);

        await mockedSDK.selectedFrameContent('1');

        expect(mockedSDK.config.selectedFrameContent).toHaveBeenCalledTimes(3);

        await mockedSDK.selectFrame('1');

        expect(mockedSDK.children.selectFrames).toHaveBeenCalledTimes(1);

        await mockedSDK.selectMultipleFrames(['1']);

        expect(mockedSDK.children.selectFrames).toHaveBeenCalledTimes(2);

        await mockedSDK.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_X, '2', mockSelectFrame);

        expect(mockedSDK.frameProperties.getFramePropertyCalculatedValue).toHaveBeenCalledTimes(1);
    });
});
