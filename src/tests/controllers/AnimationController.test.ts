import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';
import { FrameAnimationType } from '../../../types/AnimationTypes';
import mockChild from '../__mocks__/FrameProperties';
import { FrameController } from '../../controllers/FrameController';
import { AnimationController } from '../../controllers/AnimationController';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedAnimation = mockFrameAnimation;
    mockedSDK.editorAPI = mockChild;
    mockedSDK.frame = new FrameController(mockChild);
    mockedSDK.animation = new AnimationController(mockChild);
    jest.spyOn(mockedSDK.animation, 'getAnimationsOnSelectedLayout');
    jest.spyOn(mockedSDK.animation, 'getAnimationByFrameId');
    jest.spyOn(mockedSDK.animation, 'getAnimationsByLayoutId');
    jest.spyOn(mockedSDK.animation, 'playAnimation');
    jest.spyOn(mockedSDK.animation, 'pauseAnimation');
    jest.spyOn(mockedSDK.animation, 'setFrameAnimation');
    jest.spyOn(mockedSDK.animation, 'setScrubberPosition');
    jest.spyOn(mockedSDK.animation, 'setAnimationDuration');
    jest.spyOn(mockedSDK.animation, 'resetFrameAnimation');
    jest.spyOn(mockedSDK.animation, 'resetAnimation');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Animation methods', () => {
    it('Should call  all of the animation functions of child successfully', async () => {
        await mockedSDK.animation.getAnimationsOnSelectedLayout();
        expect(mockedSDK.editorAPI.getAnimationsOnSelectedLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.getAnimationByFrameId(4, 8);
        expect(mockedSDK.editorAPI.getAnimationByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getAnimationByFrameId).toHaveBeenCalledWith(4, 8);

        await mockedSDK.animation.getAnimationsByLayoutId(4);
        expect(mockedSDK.editorAPI.getAnimationsByLayoutId).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getAnimationsByLayoutId).toHaveBeenCalledWith(4);

        await mockedSDK.animation.setFrameAnimation(mockedAnimation.animation);
        expect(mockedSDK.editorAPI.setFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.playAnimation();
        expect(mockedSDK.editorAPI.playAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.pauseAnimation();
        expect(mockedSDK.editorAPI.pauseAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.setScrubberPosition(5000);
        expect(mockedSDK.animation.setScrubberPosition).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setScrubberPosition).toHaveBeenLastCalledWith(5000);

        await mockedSDK.animation.setAnimationDuration(8000);
        expect(mockedSDK.animation.setAnimationDuration).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setAnimationDuration).toHaveBeenLastCalledWith(8000);

        await mockedSDK.animation.resetFrameAnimation(mockFrameAnimation.animation.frameId);
        expect(mockedSDK.editorAPI.resetFrameAnimation).toHaveBeenCalledTimes(1);

        await mockedSDK.animation.resetAnimation();
        expect(mockedSDK.editorAPI.resetAnimation).toHaveBeenCalledTimes(1);
    });
});
