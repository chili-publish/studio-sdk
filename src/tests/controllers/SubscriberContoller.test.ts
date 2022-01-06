import { SDK } from '../../index';
import Subscribers from '../../controllers/SubscriberController';
import mockConfig, { defaultMockReturn } from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';

import { FrameAnimationType } from '../../../types/AnimationTypes';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;
let mockedSubscribers: Subscribers;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSubscribers = new Subscribers(mockConfig);
    mockedAnimation = mockFrameAnimation;

    jest.spyOn(mockedSDK.subscriber, 'onAnimationChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedFrameLayoutChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedFrameContentChanged');
    jest.spyOn(mockedSDK.subscriber, 'onPageSelectionChanged');
    jest.spyOn(mockedSDK.subscriber, 'onSelectedLayoutPropertiesChanged');
    mockedSDK.subscriber.onAnimationPlaybackChanged = defaultMockReturn;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Subscriber methods', () => {
    it('Should call  all of the subscriber functions successfully', async () => {
        mockedSDK.subscriber.onAnimationChanged(mockedAnimation.toString());

        mockedSDK.subscriber.onAnimationPlaybackChanged('test');
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenCalledTimes(2);
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenCalledWith('test');

        mockedSubscribers.onSelectedFrameLayoutChanged('2');
        expect(mockedSubscribers.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);

        mockedSubscribers.onSelectedFrameContentChanged('2');
        expect(mockedSubscribers.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);

        await mockedSDK.subscriber.onSelectedLayoutPropertiesChanged('5');
        expect(mockedSDK.layout.config.onSelectedLayoutPropertiesChanged).toHaveBeenCalledTimes(5);

        await mockedSDK.subscriber.onPageSelectionChanged();
        expect(mockedSDK.layout.config.onPageSelectionChanged).toHaveBeenCalledTimes(6);
    });
});
