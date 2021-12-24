import { SDK } from '../../index';
import mockConfig, { defaultMockReturn } from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';
import { FrameAnimationType } from '../../../types/AnimationTypes';
import mockChild from '../__mocks__/FrameProperties';
import FrameController from '../../controllers/FrameController';
import AnimationController from '../../controllers/AnimationController';

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
    mockedSDK.frame = new FrameController(mockChild, mockConfig);
    mockedSDK.frame.getFramePropertyCalculatedValue = jest.fn().mockResolvedValue(true);
    mockedSDK.animation = new AnimationController(mockChild, mockConfig);
    mockedSDK.animation.setFrameAnimation = defaultMockReturn;
    mockedSDK.animation.playAnimation = defaultMockReturn;
    mockedSDK.animation.pauseAnimation = defaultMockReturn;
    mockedSDK.animation.setScrubberPosition = defaultMockReturn;
    mockedSDK.animation.setAnimationDuration = defaultMockReturn;
    mockedSDK.animation.onAnimationPlaybackChanged = defaultMockReturn;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Animation methods', () => {
    it('Should call  all of the animation functions of child successfully', async () => {
        mockedSDK.animation.onAnimationChanged(mockedAnimation.toString());
        expect(mockedSDK.config.frameAnimationsChanged).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.setFrameAnimation(JSON.stringify(mockedAnimation));
        expect(mockedSDK.animation.setFrameAnimation).toHaveBeenCalledTimes(2);

        await mockedSDK.animation.playAnimation();
        expect(mockedSDK.animation.playAnimation).toHaveBeenCalledTimes(3);

        await mockedSDK.animation.pauseAnimation();
        expect(mockedSDK.animation.pauseAnimation).toHaveBeenCalledTimes(4);

        await mockedSDK.animation.setScrubberPosition(5000);
        expect(mockedSDK.animation.setScrubberPosition).toHaveBeenCalledTimes(5);
        expect(mockedSDK.animation.setScrubberPosition).toHaveBeenLastCalledWith(5000);

        await mockedSDK.animation.setAnimationDuration(8000);
        expect(mockedSDK.animation.setAnimationDuration).toHaveBeenCalledTimes(6);
        expect(mockedSDK.animation.setAnimationDuration).toHaveBeenLastCalledWith(8000);

        mockedSDK.animation.onAnimationPlaybackChanged('test');
        expect(mockedSDK.config.scrubberPositionChanged).toHaveBeenCalledTimes(7);
        expect(mockedSDK.config.scrubberPositionChanged).toHaveBeenCalledWith('test');
    });
});
