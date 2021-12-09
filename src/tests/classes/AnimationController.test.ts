import { SDK } from '../../index';
import mockConfig, { defaultMockReturn } from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';
import { FrameAnimationType } from '../../../types/AnimationTypes';
import mockChild from '../__mocks__/FrameProperties';
import FrameProperties from '../../classes/frameProperties';
import AnimationController from '../../classes/AnimationController';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.animation, 'onAnimationChanged');
    jest.spyOn(mockedSDK.animation, 'playAnimation');
    jest.spyOn(mockedSDK.animation, 'pauseAnimation');
    jest.spyOn(mockedSDK.animation, 'setFrameAnimation');
    mockedAnimation = mockFrameAnimation;
    mockedSDK.children = mockChild;
    mockedSDK.frameProperties = new FrameProperties(mockChild);
    mockedSDK.frameProperties.getFramePropertyCalculatedValue = jest.fn().mockResolvedValue(true);
    mockedSDK.animation = new AnimationController(mockChild, mockConfig);
    mockedSDK.animation.setFrameAnimation = defaultMockReturn;
    mockedSDK.animation.playAnimation = defaultMockReturn;
    mockedSDK.animation.pauseAnimation = defaultMockReturn;
    mockedSDK.config.getFrameAnimation = defaultMockReturn;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call  all of the animation functions of child successfully', async () => {
        mockedSDK.animation.onAnimationChanged(mockedAnimation);
        expect(mockedSDK.config.getFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.setFrameAnimation(mockedAnimation);
        expect(mockedSDK.animation.setFrameAnimation).toHaveBeenCalledTimes(2);

        await mockedSDK.animation.playAnimation();
        expect(mockedSDK.animation.playAnimation).toHaveBeenCalledTimes(3);

        await mockedSDK.animation.pauseAnimation();
        expect(mockedSDK.animation.pauseAnimation).toHaveBeenCalledTimes(4);
    });
});
