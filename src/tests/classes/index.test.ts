import { SDK } from '../../index';
import mockConfig from '../__mocs__/config';
import { mockFrmeAnimation } from '../__mocs__/animations';
import { FrameAnimationType } from '../../../types/AnimationTypes';
import mockChild, { mockSelectFrame } from '../__mocs__/FrameProperties';
import { FrameProperyNames } from '../../utils/enums';
import FrameProperties from '../../classes/frameProperties';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK, 'onAnimationChanged');
    jest.spyOn(mockedSDK, 'togglePlaybackAnimation');
    jest.spyOn(mockedSDK, 'setFrameAnimation');
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
    mockedAnimation = mockFrmeAnimation;
    mockedSDK.children = mockChild;
    mockedSDK.frameProperties = new FrameProperties(mockChild);
    mockedSDK.frameProperties.getFramePropertyCalculatedValue = jest.fn().mockResolvedValue(true);
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the animation functions of child successfully', async () => {
        mockedSDK.onAnimationChanged(mockedAnimation);

        expect(mockedSDK.config.getFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.setFrameAnimation(mockedAnimation);

        expect(mockedSDK.setFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.togglePlaybackAnimation();
        expect(mockedSDK.config.stateChanged).toHaveBeenCalledTimes(1);

        expect(mockedSDK.children.togglePlaybackAnimation).toHaveBeenCalledTimes(1);
    });

    it('Should call  all of the frame properties methods of child successfully', async () => {
        mockedSDK.stateChanged('sdsd');
        expect(mockedSDK.config.stateChanged).toHaveBeenCalledTimes(2);

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

        expect(mockedSDK.config.selectedFrameLayout).toHaveBeenCalledTimes(3);

        await mockedSDK.selectedFrameContent('1');

        expect(mockedSDK.config.selectedFrameContent).toHaveBeenCalledTimes(4);

        await mockedSDK.selectFrame('1');

        expect(mockedSDK.children.selectFrames).toHaveBeenCalledTimes(1);

        await mockedSDK.selectMultipleFrames(['1']);

        expect(mockedSDK.children.selectFrames).toHaveBeenCalledTimes(2);

        await mockedSDK.getFramePropertyCalculatedValue(FrameProperyNames.FRAME_X, '2', mockSelectFrame);

        expect(mockedSDK.frameProperties.getFramePropertyCalculatedValue).toHaveBeenCalledTimes(1);
    });
});
