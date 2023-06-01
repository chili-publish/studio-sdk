import { mockFrameAnimation } from '../__mocks__/animations';
import { FrameAnimationType } from '../../types/AnimationTypes';
import { AnimationController } from '../../controllers/AnimationController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedAnimation: FrameAnimationType;

let mockedAnimationController: AnimationController;

const mockEditorApi: EditorAPI = {
    getAnimationsOnSelectedLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    getAnimationByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
    getAnimationsByLayoutId: async () => getEditorResponseData(castToEditorResponse(null)),
    playAnimation: async () => getEditorResponseData(castToEditorResponse(null)),
    pauseAnimation: async () => getEditorResponseData(castToEditorResponse(null)),
    setScrubberPosition: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameAnimation: async () => getEditorResponseData(castToEditorResponse(null)),
    setAnimationDuration: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameAnimation: async () => getEditorResponseData(castToEditorResponse(null)),
    resetAnimation: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedAnimation = mockFrameAnimation;
    mockedAnimationController = new AnimationController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getAnimationsOnSelectedLayout');
    jest.spyOn(mockEditorApi, 'getAnimationByFrameId');
    jest.spyOn(mockEditorApi, 'getAnimationsByLayoutId');
    jest.spyOn(mockEditorApi, 'playAnimation');
    jest.spyOn(mockEditorApi, 'pauseAnimation');
    jest.spyOn(mockEditorApi, 'setFrameAnimation');
    jest.spyOn(mockEditorApi, 'setScrubberPosition');
    jest.spyOn(mockEditorApi, 'setAnimationDuration');
    jest.spyOn(mockEditorApi, 'resetFrameAnimation');
    jest.spyOn(mockEditorApi, 'resetAnimation');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('AnimationController', () => {
    it('Should call the getAnimationsOnSelectedLayout method', async () => {
        await mockedAnimationController.getAnimationsOnSelectedLayout();
        expect(mockEditorApi.getAnimationsOnSelectedLayout).toHaveBeenCalledTimes(1);
    });
    it('Should call the getAnimationByFrameId method', async () => {
        await mockedAnimationController.getAnimationByFrameId('4', '8');
        expect(mockEditorApi.getAnimationByFrameId).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getAnimationByFrameId).toHaveBeenCalledWith('4', '8');
    });

    it('Should call the getAnimationsByLayoutId method', async () => {
        await mockedAnimationController.getAnimationsByLayoutId('4');
        expect(mockEditorApi.getAnimationsByLayoutId).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getAnimationsByLayoutId).toHaveBeenCalledWith('4');
    });
    it('Should call the setFrameAnimation method', async () => {
        await mockedAnimationController.setFrameAnimation(mockedAnimation.animation);
        expect(mockEditorApi.setFrameAnimation).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setFrameAnimation).toHaveBeenCalledWith(JSON.stringify(mockedAnimation.animation));
    });
    it('Should call the playAnimation method', async () => {
        await mockedAnimationController.playAnimation();
        expect(mockEditorApi.playAnimation).toHaveBeenCalledTimes(1);
    });

    it('Should call the pauseAnimation method', async () => {
        await mockedAnimationController.pauseAnimation();
        expect(mockEditorApi.pauseAnimation).toHaveBeenCalledTimes(1);
    });
    it('Should call the setScrubberPosition method', async () => {
        await mockedAnimationController.setScrubberPosition(5000);
        expect(mockEditorApi.setScrubberPosition).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setScrubberPosition).toHaveBeenLastCalledWith(5000);
    });
    it('Should call the setAnimationDuration method', async () => {
        await mockedAnimationController.setAnimationDuration(8000);
        expect(mockEditorApi.setAnimationDuration).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setAnimationDuration).toHaveBeenLastCalledWith(8000);
    });

    it('Should vall the resetFrameAnimation method', async () => {
        await mockedAnimationController.resetFrameAnimation(mockFrameAnimation.animation.id);
        expect(mockEditorApi.resetFrameAnimation).toHaveBeenCalledTimes(1);
    });
    it('Should call the resetAnimation method', async () => {
        await mockedAnimationController.resetAnimation();
        expect(mockEditorApi.resetAnimation).toHaveBeenCalledTimes(1);
    });
});
