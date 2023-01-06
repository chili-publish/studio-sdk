import { LayoutType, SDK } from '../../index';
import { SubscriberController } from '../../controllers/SubscriberController';
import mockConfig from '../__mocks__/config';
import { mockFrameAnimation } from '../__mocks__/animations';

import { FrameAnimationType } from '../../../types/AnimationTypes';
import { VariableType } from '../../../types/VariableTypes';

import { ToolType } from '../../utils/enums';
import { ConnectorEventType } from '../../../types/ConnectorTypes';

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
    jest.spyOn(mockedSubscribers, 'onSelectedToolChanged');
    jest.spyOn(mockedSubscribers, 'onAnimationPlaybackChanged');
    jest.spyOn(mockedSubscribers, 'onUndoStateChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedLayoutFramesChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedTextStyleChanged');
    jest.spyOn(mockedSubscribers, 'onColorsChanged');
    jest.spyOn(mockedSubscribers, 'onParagraphStylesChanged');
    jest.spyOn(mockedSubscribers, 'onCharacterStylesChanged');
    jest.spyOn(mockedSubscribers, 'onFontsChanged');
    jest.spyOn(mockedSubscribers, 'onSelectedLayoutIdChanged');
    jest.spyOn(mockedSubscribers, 'onLayoutsChanged');
    jest.spyOn(mockedSubscribers, 'onConnectorStateChanged');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('Subscriber methods', () => {
    it('Should call all of the subscriber functions successfully', async () => {
        mockedSubscribers.onAnimationChanged(JSON.stringify(mockedAnimation));

        mockedSubscribers.onAnimationPlaybackChanged(JSON.stringify('test'));
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenCalledTimes(2);
        expect(mockedSDK.config.onScrubberPositionChanged).toHaveBeenLastCalledWith('test');

        mockedSubscribers.onSelectedFrameLayoutChanged('2');
        expect(mockedSubscribers.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);

        mockedSubscribers.onSelectedFrameContentChanged('2');
        expect(mockedSubscribers.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);

        mockedSubscribers.onSelectedLayoutPropertiesChanged('5');
        expect(mockedSDK.config.onSelectedLayoutPropertiesChanged).toHaveBeenCalledTimes(5);

        mockedSubscribers.onPageSelectionChanged();
        expect(mockedSDK.config.onPageSelectionChanged).toHaveBeenCalledTimes(6);

        mockedSubscribers.onStateChanged();
        expect(mockedSDK.config.onStateChanged).toHaveBeenCalledTimes(7);

        mockedSubscribers.onVariableListChanged('[{"id":"1","type":"group"}]');
        expect(mockedSDK.config.onVariableListChanged).toHaveBeenCalled();
        expect(mockedSDK.config.onVariableListChanged).toHaveBeenCalledWith([{ id: '1', type: VariableType.group }]);

        mockedSubscribers.onSelectedLayoutFramesChanged('5');
        expect(mockedSDK.config.onSelectedLayoutFramesChanged).toHaveBeenCalledTimes(9);

        mockedSubscribers.onColorsChanged(JSON.stringify([]));
        expect(mockedSDK.config.onColorsChanged).toHaveBeenCalledTimes(10);

        mockedSubscribers.onParagraphStylesChanged(JSON.stringify([{ id: 1, name: 'P1' }]));
        expect(mockedSDK.config.onParagraphStylesChanged).toHaveBeenCalledTimes(11);

        mockedSubscribers.onFontsChanged(JSON.stringify([{ id: 1, name: 'F1', fontFamily: 'Arial' }]));
        expect(mockedSDK.config.onFontsChanged).toHaveBeenCalledTimes(12);

        mockedSubscribers.onCharacterStylesChanged(JSON.stringify([{ id: 1, name: 'C1' }]));
        expect(mockedSDK.config.onCharacterStylesChanged).toHaveBeenCalledTimes(13);

        mockedSubscribers.onSelectedLayoutIdChanged('new id');
        expect(mockedSDK.config.onSelectedLayoutIdChanged).toHaveBeenCalledWith('new id');

        mockedSubscribers.onLayoutsChanged(
            '[{"layoutId":"0","layoutName":"Rectangle","layoutType":"top","parentLayoutId":null,"childLayouts":["2"]}]',
        );
        expect(mockedSDK.config.onLayoutsChanged).toHaveBeenCalledTimes(15);
        expect(mockedSDK.config.onVariableListChanged).toHaveBeenCalledWith([
            {
                layoutId: '0',
                layoutName: 'Rectangle',
                layoutType: LayoutType.top,
                parentLayoutId: null,
                childLayouts: ['2'],
            },
        ]);

        mockedSubscribers.onConnectorStateChanged(JSON.stringify({ id: 'id', type: ConnectorEventType.loaded }));
        expect(mockedSDK.config.onLayoutsChanged).toHaveBeenCalledTimes(16);
    });

    it('Should call trigger the SelectedToolChanged subscriber when triggered', () => {
        mockedSubscribers.onSelectedToolChanged(ToolType.HAND);
        expect(mockedSDK.config.onSelectedToolChanged).toHaveBeenCalled();
        expect(mockedSDK.config.onSelectedToolChanged).toHaveBeenCalledWith('hand');
    });

    it('Should call trigger the UndoStateChanges subscriber when triggered', () => {
        mockedSubscribers.onUndoStateChanged(JSON.stringify({ canRedo: false, canUndo: true }));
        expect(mockedSDK.config.onUndoStackStateChanged).toHaveBeenCalledTimes(1);
    });
});
