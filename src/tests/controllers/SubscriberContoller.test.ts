import { SDK } from '../../index';
import { SubscriberController } from '../../controllers/SubscriberController';
import mockConfig, { defaultMockReturn } from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';

import { FrameAnimationType } from '../../../types/AnimationTypes';
import { VariableType } from '../../../types/VariableTypes';

let mockedSDK: SDK;
let mockedAnimation: FrameAnimationType;
let mockedSubscribers: SubscriberController;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSubscribers = new SubscriberController(mockConfig);
    mockedAnimation = mockFrameAnimation;

    jest.spyOn(mockedSubscribers, 'onAnimationChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedFrameLayoutChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedFrameContentChanged');
    jest.spyOn(mockedSubscribers, 'onPageSelectionChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedLayoutPropertiesChanged');
    jest.spyOn(mockedSubscribers, 'onStateChanged');
    jest.spyOn(mockedSubscribers, 'onVariableListChanged');
    mockedSubscribers.onAnimationPlaybackChanged = defaultMockReturn;
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Subscriber methods', () => {
    it('Should call  all of the subscriber functions successfully', async () => {
        mockedSubscribers.onAnimationChanged(JSON.stringify(mockedAnimation));

        mockedSubscribers.onAnimationPlaybackChanged('test');
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenCalledTimes(2);
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenCalledWith('test');

        mockedSubscribers.onSelectedFrameLayoutChanged('2');
        expect(mockedSubscribers.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);

        mockedSubscribers.onSelectedFrameContentChanged('2');
        expect(mockedSubscribers.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);

        mockedSubscribers.onSelectedLayoutPropertiesChanged('5');
        expect(mockedSDK.layout.config.onSelectedLayoutPropertiesChanged).toHaveBeenCalledTimes(5);

        mockedSubscribers.onPageSelectionChanged();
        expect(mockedSDK.layout.config.onPageSelectionChanged).toHaveBeenCalledTimes(6);

        const initialStateMock = {
            layouts: [],
            selectedLayoutId: 1,
            pages: [],
        };

        mockedSubscribers.onStateChanged(JSON.stringify(initialStateMock));
        expect(mockedSDK.config.onStateChanged).toHaveBeenCalledTimes(7);

        mockedSubscribers.onVariableListChanged('[{"id":"1","type":"group"}]');
        expect(mockedSDK.variable.config.onVariableListChanged).toHaveBeenCalled();
        expect(mockedSDK.variable.config.onVariableListChanged).toHaveBeenCalledWith([
            { id: '1', type: VariableType.group },
        ]);
    });
});
