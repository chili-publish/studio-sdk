import { ActionEditorEvent, DocumentAction, Id, LayoutType } from '../../index';
import { SubscriberController } from '../../controllers/SubscriberController';
import { mockFrameAnimation } from '../__mocks__/animations';

import { FrameAnimationType } from '../../types/AnimationTypes';
import { VariableType } from '../../types/VariableTypes';

import { ToolType } from '../../utils/enums';
import { ConnectorStateType } from '../../types/ConnectorTypes';
import type { PageSize } from '../../types/PageTypes';
import { CornerRadius } from '../../types/ShapeTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedAnimation: FrameAnimationType;
let mockedSubscriberController: SubscriberController;

const mockEditorApi: EditorAPI = {
    onAnimationChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFrameLayoutChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFrameContentChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onPageSelectionChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutPropertiesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onStateChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onDocumentLoaded: async () => getEditorResponseData(castToEditorResponse(null)),
    onVariableListChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedToolChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onAnimationPlaybackChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onUndoStateChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutFramesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedTextStyleChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onColorsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onParagraphStylesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onCharacterStylesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onFontsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutIdChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onLayoutsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onConnectorEvent: async () => getEditorResponseData(castToEditorResponse(null)),
    onZoomChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onActionsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onPageSizeChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onScrubberPositionChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onUndoStackStateChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onShapeCornerRadiusChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onCropActiveFrameIdChanged: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedSubscriberController = new SubscriberController(mockEditorApi);
    mockedAnimation = mockFrameAnimation;

    jest.spyOn(mockEditorApi, 'onAnimationChanged');
    jest.spyOn(mockEditorApi, 'onSelectedFrameLayoutChanged');
    jest.spyOn(mockEditorApi, 'onSelectedFrameContentChanged');
    jest.spyOn(mockEditorApi, 'onPageSelectionChanged');
    jest.spyOn(mockEditorApi, 'onSelectedLayoutPropertiesChanged');
    jest.spyOn(mockEditorApi, 'onStateChanged');
    jest.spyOn(mockEditorApi, 'onDocumentLoaded');
    jest.spyOn(mockEditorApi, 'onVariableListChanged');
    jest.spyOn(mockEditorApi, 'onSelectedToolChanged');
    jest.spyOn(mockEditorApi, 'onAnimationPlaybackChanged');
    jest.spyOn(mockEditorApi, 'onUndoStateChanged');
    jest.spyOn(mockEditorApi, 'onSelectedLayoutFramesChanged');
    jest.spyOn(mockEditorApi, 'onSelectedTextStyleChanged');
    jest.spyOn(mockEditorApi, 'onColorsChanged');
    jest.spyOn(mockEditorApi, 'onParagraphStylesChanged');
    jest.spyOn(mockEditorApi, 'onCharacterStylesChanged');
    jest.spyOn(mockEditorApi, 'onFontsChanged');
    jest.spyOn(mockEditorApi, 'onSelectedLayoutIdChanged');
    jest.spyOn(mockEditorApi, 'onLayoutsChanged');
    jest.spyOn(mockEditorApi, 'onConnectorEvent');
    jest.spyOn(mockEditorApi, 'onZoomChanged');
    jest.spyOn(mockEditorApi, 'onActionsChanged');
    jest.spyOn(mockEditorApi, 'onPageSizeChanged');
    jest.spyOn(mockEditorApi, 'onScrubberPositionChanged');
    jest.spyOn(mockEditorApi, 'onUndoStackStateChanged');
    jest.spyOn(mockEditorApi, 'onShapeCornerRadiusChanged');
    jest.spyOn(mockEditorApi, 'onCropActiveFrameIdChanged');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SubscriberController', () => {
    it('Should be possible to subscribe to onScrubberPositionChanged', async () => {
        await mockedSubscriberController.onAnimationChanged(JSON.stringify(mockedAnimation));

        await mockedSubscriberController.onAnimationPlaybackChanged(JSON.stringify('test'));
        expect(mockEditorApi.onScrubberPositionChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onScrubberPositionChanged).toHaveBeenLastCalledWith('test');
    });
    it('Should be possible to subscribe to onSelectedFrameLayoutChanged', async () => {
        await mockedSubscriberController.onSelectedFrameLayoutChanged('2');
        expect(mockEditorApi.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onSelectedFrameLayoutChanged).toHaveBeenCalledWith(2);
    });
    it('Should be possible to subscribe to onSelectedFrameContentChanged', async () => {
        await mockedSubscriberController.onSelectedFrameContentChanged('2');
        expect(mockEditorApi.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onSelectedFrameContentChanged).toHaveBeenCalledWith(2);
    });
    it('Should be possible to subscribe to onSelectedLayoutPropertiesChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutPropertiesChanged('5');
        expect(mockEditorApi.onSelectedLayoutPropertiesChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onSelectedLayoutPropertiesChanged).toHaveBeenCalledWith(5);
    });
    it('Should be possible to subscribe to onPageSelectionChanged', async () => {
        await mockedSubscriberController.onPageSelectionChanged();
        expect(mockEditorApi.onPageSelectionChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to the onStateChanged', async () => {
        await mockedSubscriberController.onStateChanged();
        expect(mockEditorApi.onStateChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to the onDocumentLoaded', async () => {
        await mockedSubscriberController.onDocumentLoaded();
        expect(mockEditorApi.onDocumentLoaded).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onVariableListChanged', async () => {
        await mockedSubscriberController.onVariableListChanged('[{"id":"1","type":"group"}]');
        expect(mockEditorApi.onVariableListChanged).toHaveBeenCalled();
        expect(mockEditorApi.onVariableListChanged).toHaveBeenCalledWith([{ id: '1', type: VariableType.group }]);
    });
    it('Should be possible to subscribe to onSelectedLayoutFramesChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutFramesChanged('5');
        expect(mockEditorApi.onSelectedLayoutFramesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onColorsChanged', async () => {
        await mockedSubscriberController.onColorsChanged(JSON.stringify([]));
        expect(mockEditorApi.onColorsChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onParagraphStylesChanged', async () => {
        await mockedSubscriberController.onParagraphStylesChanged(JSON.stringify([{ id: 1, name: 'P1' }]));
        expect(mockEditorApi.onParagraphStylesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onFontsChanged', async () => {
        await mockedSubscriberController.onFontsChanged(JSON.stringify([{ id: 1, name: 'F1', fontFamily: 'Arial' }]));
        expect(mockEditorApi.onFontsChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to onCharacterStylesChanged', async () => {
        await mockedSubscriberController.onCharacterStylesChanged(JSON.stringify([{ id: 1, name: 'C1' }]));
        expect(mockEditorApi.onCharacterStylesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onSelectedLayoutIdChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutIdChanged('new id');
        expect(mockEditorApi.onSelectedLayoutIdChanged).toHaveBeenCalledWith('new id');
    });
    it('Should be possible to subscribe to onLayoutsChanged', async () => {
        await mockedSubscriberController.onLayoutsChanged(
            '[{"layoutId":"0","layoutName":"Rectangle","layoutType":"top","parentLayoutId":null,"childLayouts":["2"]}]',
        );
        expect(mockEditorApi.onLayoutsChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onLayoutsChanged).toHaveBeenCalledWith([
            {
                layoutId: '0',
                layoutName: 'Rectangle',
                layoutType: LayoutType.top,
                parentLayoutId: null,
                childLayouts: ['2'],
            },
        ]);
    });
    it('Should be possible to subscribe to onConnectorEvent', async () => {
        const connectorEvent = JSON.stringify({ id: 'id', type: ConnectorStateType.loaded });
        await mockedSubscriberController.onConnectorEvent(connectorEvent);
        expect(mockEditorApi.onConnectorEvent).toHaveBeenCalledWith(JSON.parse(connectorEvent));
        expect(mockEditorApi.onConnectorEvent).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onZoomChanged', async () => {
        await mockedSubscriberController.onZoomChanged(JSON.stringify(150));
        expect(mockEditorApi.onZoomChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onZoomChanged).toHaveBeenCalledWith(150);
    });
    it('Should be possible to subscribe to onActionsChanged', async () => {
        const actions: DocumentAction[] = [
            {
                actionName: 'name',
                id: 'id',
                script: 'script',
                triggers: [{ triggers: ['1'], event: ActionEditorEvent.frameMoved }],
            },
        ];
        await mockedSubscriberController.onActionsChanged(JSON.stringify(actions));
        expect(mockEditorApi.onActionsChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onActionsChanged).toHaveBeenCalledWith(actions);
    });

    it('should be possible to subscribe to onPageSizeChanged', async () => {
        const pageSize: PageSize = { pageId: 'pageId', width: 123, height: 456 };

        await mockedSubscriberController.onPageSizeChanged(JSON.stringify(pageSize));
        expect(mockEditorApi.onPageSizeChanged).toHaveBeenCalledWith(pageSize);
    });

    it('Should call trigger the SelectedToolChanged subscriber when triggered', async () => {
        await mockedSubscriberController.onSelectedToolChanged(ToolType.HAND);
        expect(mockEditorApi.onSelectedToolChanged).toHaveBeenCalled();
        expect(mockEditorApi.onSelectedToolChanged).toHaveBeenCalledWith('hand');
    });

    it('Should call trigger the UndoStateChanges subscriber when triggered', async () => {
        await mockedSubscriberController.onUndoStateChanged(JSON.stringify({ canRedo: false, canUndo: true }));
        expect(mockEditorApi.onUndoStackStateChanged).toHaveBeenCalledTimes(1);
    });

    it('should be possible to subscribe to onShapeCornerRadiusChanged', async () => {
        const cornerRadius: CornerRadius = { radiusAll: 5 };
        await mockedSubscriberController.onShapeCornerRadiusChanged(JSON.stringify(cornerRadius));

        expect(mockEditorApi.onShapeCornerRadiusChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onShapeCornerRadiusChanged).toHaveBeenCalledWith(cornerRadius);
    });

    it('should be possible to subscribe to onCropActiveFrameIdChanged', async () => {
        const id: Id = '1';
        await mockedSubscriberController.onCropActiveFrameIdChanged(id);

        expect(mockEditorApi.onCropActiveFrameIdChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.onCropActiveFrameIdChanged).toHaveBeenCalledWith(id);
    });
});
