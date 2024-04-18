import {
    ActionEditorEvent,
    BarcodeValidationResult,
    ConnectorRegistrationSource,
    DocumentAction,
    Id,
    LayoutType,
    MeasurementUnit,
    ViewMode,
    Viewport,
} from '../../index';
import { SubscriberController } from '../../controllers/SubscriberController';
import { mockFrameAnimation } from '../__mocks__/animations';

import { FrameAnimationType } from '../../types/AnimationTypes';
import { VariableType } from '../../types/VariableTypes';

import { ToolType } from '../../utils/enums';
import {
    AuthCredentials,
    AuthCredentialsTypeEnum,
    AuthRefreshRequest,
    AuthRefreshTypeEnum,
    ConnectorStateType,
    GrafxTokenAuthCredentials,
    RefreshedAuthCredendentials,
} from '../../types/ConnectorTypes';
import type { PageSize } from '../../types/PageTypes';
import { CornerRadiusUpdateModel } from '../../types/ShapeTypes';
import { AsyncError, EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedAnimation: FrameAnimationType;
let mockedSubscriberController: SubscriberController;

export const mockEditorConfig: EditorAPI = {
    onAnimationChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFrameLayoutChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFramesLayoutChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFrameContentChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedFramesContentChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onPageSelectionChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutPropertiesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutUnitChanged: async () => getEditorResponseData(castToEditorResponse(null)),
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
    onFontFamiliesChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onSelectedLayoutIdChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onLayoutsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onConnectorEvent: async () => getEditorResponseData(castToEditorResponse(null)),
    onConnectorsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onZoomChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onActionsChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onPageSizeChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onScrubberPositionChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onUndoStackStateChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onShapeCornerRadiusChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onCropActiveFrameIdChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onAsyncError: async () => getEditorResponseData(castToEditorResponse(null)),
    onViewModeChanged: async () => getEditorResponseData(castToEditorResponse(null)),
    onViewportRequested: async () => getEditorResponseData(castToEditorResponse(null)),
    onBarcodeValidationChanged: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedSubscriberController = new SubscriberController(mockEditorConfig);
    mockedAnimation = mockFrameAnimation;

    jest.spyOn(mockEditorConfig, 'onAnimationChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedFrameLayoutChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedFramesLayoutChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedFrameContentChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedFramesContentChanged');
    jest.spyOn(mockEditorConfig, 'onPageSelectionChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedLayoutPropertiesChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedLayoutUnitChanged');
    jest.spyOn(mockEditorConfig, 'onStateChanged');
    jest.spyOn(mockEditorConfig, 'onDocumentLoaded');
    jest.spyOn(mockEditorConfig, 'onVariableListChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedToolChanged');
    jest.spyOn(mockEditorConfig, 'onAnimationPlaybackChanged');
    jest.spyOn(mockEditorConfig, 'onUndoStateChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedLayoutFramesChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedTextStyleChanged');
    jest.spyOn(mockEditorConfig, 'onColorsChanged');
    jest.spyOn(mockEditorConfig, 'onParagraphStylesChanged');
    jest.spyOn(mockEditorConfig, 'onCharacterStylesChanged');
    jest.spyOn(mockEditorConfig, 'onFontFamiliesChanged');
    jest.spyOn(mockEditorConfig, 'onSelectedLayoutIdChanged');
    jest.spyOn(mockEditorConfig, 'onLayoutsChanged');
    jest.spyOn(mockEditorConfig, 'onConnectorEvent');
    jest.spyOn(mockEditorConfig, 'onConnectorsChanged');
    jest.spyOn(mockEditorConfig, 'onZoomChanged');
    jest.spyOn(mockEditorConfig, 'onActionsChanged');
    jest.spyOn(mockEditorConfig, 'onPageSizeChanged');
    jest.spyOn(mockEditorConfig, 'onScrubberPositionChanged');
    jest.spyOn(mockEditorConfig, 'onUndoStackStateChanged');
    jest.spyOn(mockEditorConfig, 'onShapeCornerRadiusChanged');
    jest.spyOn(mockEditorConfig, 'onCropActiveFrameIdChanged');
    jest.spyOn(mockEditorConfig, 'onAsyncError');
    jest.spyOn(mockEditorConfig, 'onViewModeChanged');
    jest.spyOn(mockEditorConfig, 'onBarcodeValidationChanged');
    jest.spyOn(mockEditorConfig, 'onViewportRequested');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SubscriberController', () => {
    it('Should be possible to subscribe to onScrubberPositionChanged', async () => {
        await mockedSubscriberController.onAnimationChanged(JSON.stringify(mockedAnimation));

        await mockedSubscriberController.onAnimationPlaybackChanged(JSON.stringify('test'));
        expect(mockEditorConfig.onScrubberPositionChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onScrubberPositionChanged).toHaveBeenLastCalledWith('test');
    });
    it('Should be possible to subscribe to onSelectedFramesLayoutChanged when a single frame is passed', async () => {
        await mockedSubscriberController.onSelectedFramesLayoutChanged('[2]');

        expect(mockEditorConfig.onSelectedFramesLayoutChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFramesLayoutChanged).toHaveBeenCalledWith([2]);

        expect(mockEditorConfig.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFrameLayoutChanged).toHaveBeenCalledWith(2);
    });
    it('Should be possible to subscribe to onSelectedFramesLayoutChanged when multiple frames are passed', async () => {
        await mockedSubscriberController.onSelectedFramesLayoutChanged('[1,2]');

        expect(mockEditorConfig.onSelectedFramesLayoutChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFramesLayoutChanged).toHaveBeenCalledWith([1, 2]);

        expect(mockEditorConfig.onSelectedFrameLayoutChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFrameLayoutChanged).toHaveBeenCalledWith(undefined);
    });
    it('Should be possible to subscribe to onSelectedFramesContentChanged when a single frame is passed', async () => {
        await mockedSubscriberController.onSelectedFramesContentChanged('[2]');
        expect(mockEditorConfig.onSelectedFramesContentChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFramesContentChanged).toHaveBeenCalledWith([2]);

        expect(mockEditorConfig.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFrameContentChanged).toHaveBeenCalledWith(2);
    });
    it('Should be possible to subscribe to onSelectedFramesContentChanged when multiple frames are passed', async () => {
        await mockedSubscriberController.onSelectedFramesContentChanged('[1,2]');
        expect(mockEditorConfig.onSelectedFramesContentChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFramesContentChanged).toHaveBeenCalledWith([1, 2]);

        expect(mockEditorConfig.onSelectedFrameContentChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedFrameContentChanged).toHaveBeenCalledWith(null);
    });
    it('Should be possible to subscribe to onSelectedLayoutPropertiesChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutPropertiesChanged('5');
        expect(mockEditorConfig.onSelectedLayoutPropertiesChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedLayoutPropertiesChanged).toHaveBeenCalledWith(5);
    });
    it('Should be possible to subscribe to onSelectedLayoutUnitChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutUnitChanged('mm');
        expect(mockEditorConfig.onSelectedLayoutUnitChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onSelectedLayoutUnitChanged).toHaveBeenCalledWith(MeasurementUnit.mm);
    });
    it('Should be possible to subscribe to onPageSelectionChanged', async () => {
        await mockedSubscriberController.onPageSelectionChanged();
        expect(mockEditorConfig.onPageSelectionChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to the onStateChanged', async () => {
        await mockedSubscriberController.onStateChanged();
        expect(mockEditorConfig.onStateChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to the onDocumentLoaded', async () => {
        await mockedSubscriberController.onDocumentLoaded();
        expect(mockEditorConfig.onDocumentLoaded).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onVariableListChanged', async () => {
        await mockedSubscriberController.onVariableListChanged(
            '[{"id":"1","type":"group"},{"id":"varList","type":"list","selected": {"value": "Orange"},"items":[{"value":"Apple"},{"value":"Pear"},{"value":"Orange"}]}]',
        );
        expect(mockEditorConfig.onVariableListChanged).toHaveBeenCalled();
        expect(mockEditorConfig.onVariableListChanged).toHaveBeenCalledWith([
            { id: '1', type: VariableType.group },
            { id: 'varList', type: VariableType.list, selected: 'Orange', items: ['Apple', 'Pear', 'Orange'] },
        ]);
    });
    it('Should be possible to subscribe to onSelectedLayoutFramesChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutFramesChanged('5');
        expect(mockEditorConfig.onSelectedLayoutFramesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onColorsChanged', async () => {
        await mockedSubscriberController.onColorsChanged(JSON.stringify([]));
        expect(mockEditorConfig.onColorsChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onParagraphStylesChanged', async () => {
        await mockedSubscriberController.onParagraphStylesChanged(JSON.stringify([{ id: 1, name: 'P1' }]));
        expect(mockEditorConfig.onParagraphStylesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onFontFamiliesChanged', async () => {
        await mockedSubscriberController.onFontFamiliesChanged(
            JSON.stringify([{ id: 'id', name: 'name', fontFamilyId: 'fontFamilyId', connectorId: 'id' }]),
        );
        expect(mockEditorConfig.onFontFamiliesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to onCharacterStylesChanged', async () => {
        await mockedSubscriberController.onCharacterStylesChanged(JSON.stringify([{ id: 1, name: 'C1' }]));
        expect(mockEditorConfig.onCharacterStylesChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onSelectedLayoutIdChanged', async () => {
        await mockedSubscriberController.onSelectedLayoutIdChanged('new id');
        expect(mockEditorConfig.onSelectedLayoutIdChanged).toHaveBeenCalledWith('new id');
    });
    it('Should be possible to subscribe to onLayoutsChanged', async () => {
        await mockedSubscriberController.onLayoutsChanged(
            '[{"id":"0","name":"Rectangle","type":"top","parentId":null,"childLayouts":["2"]}]',
        );
        expect(mockEditorConfig.onLayoutsChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onLayoutsChanged).toHaveBeenCalledWith([
            {
                id: '0',
                name: 'Rectangle',
                type: LayoutType.top,
                parentId: null,
                childLayouts: ['2'],
            },
        ]);
    });
    it('Should be possible to subscribe to onConnectorEvent', async () => {
        const connectorEvent = JSON.stringify({ id: 'id', type: ConnectorStateType.loaded });
        await mockedSubscriberController.onConnectorEvent(connectorEvent);
        expect(mockEditorConfig.onConnectorEvent).toHaveBeenCalledWith(JSON.parse(connectorEvent));
        expect(mockEditorConfig.onConnectorEvent).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onConnectorsChanged', async () => {
        const connectors = JSON.stringify([{ id: 'id', name: 'name', source: ConnectorRegistrationSource.local }]);
        await mockedSubscriberController.onConnectorsChanged(connectors);
        expect(mockEditorConfig.onConnectorsChanged).toHaveBeenCalledWith(JSON.parse(connectors));
        expect(mockEditorConfig.onConnectorsChanged).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to subscribe to onZoomChanged', async () => {
        await mockedSubscriberController.onZoomChanged(JSON.stringify(150));
        expect(mockEditorConfig.onZoomChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onZoomChanged).toHaveBeenCalledWith(150);
    });
    it('Should be possible to subscribe to onActionsChanged', async () => {
        const actions: DocumentAction[] = [
            {
                name: 'name',
                id: 'id',
                script: 'script',
                triggers: [{ triggers: ['1'], event: ActionEditorEvent.frameMoved }],
            },
        ];
        await mockedSubscriberController.onActionsChanged(JSON.stringify(actions));
        expect(mockEditorConfig.onActionsChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onActionsChanged).toHaveBeenCalledWith(actions);
    });

    it('should be possible to subscribe to onPageSizeChanged', async () => {
        const pageSize: PageSize = { id: 'id', width: 123, height: 456 };

        await mockedSubscriberController.onPageSizeChanged(JSON.stringify(pageSize));
        expect(mockEditorConfig.onPageSizeChanged).toHaveBeenCalledWith(pageSize);
    });

    it('Should call trigger the SelectedToolChanged subscriber when triggered', async () => {
        await mockedSubscriberController.onSelectedToolChanged(ToolType.HAND);
        expect(mockEditorConfig.onSelectedToolChanged).toHaveBeenCalled();
        expect(mockEditorConfig.onSelectedToolChanged).toHaveBeenCalledWith('hand');
    });

    it('Should call trigger the UndoStateChanges subscriber when triggered', async () => {
        await mockedSubscriberController.onUndoStateChanged(JSON.stringify({ canRedo: false, canUndo: true }));
        expect(mockEditorConfig.onUndoStackStateChanged).toHaveBeenCalledTimes(1);
    });

    it('should be possible to subscribe to onShapeCornerRadiusChanged', async () => {
        const cornerRadius: CornerRadiusUpdateModel = { radiusAll: 5 };
        await mockedSubscriberController.onShapeCornerRadiusChanged(JSON.stringify(cornerRadius));

        expect(mockEditorConfig.onShapeCornerRadiusChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onShapeCornerRadiusChanged).toHaveBeenCalledWith(cornerRadius);
    });

    it('should be possible to subscribe to onCropActiveFrameIdChanged', async () => {
        const id: Id = '1';
        await mockedSubscriberController.onCropActiveFrameIdChanged(id);

        expect(mockEditorConfig.onCropActiveFrameIdChanged).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onCropActiveFrameIdChanged).toHaveBeenCalledWith(id);
    });

    it('should be possible to subscribe to onAsyncError', async () => {
        const asyncError: AsyncError = { message: 'hello' };
        await mockedSubscriberController.onAsyncError(JSON.stringify(asyncError));

        expect(mockEditorConfig.onAsyncError).toHaveBeenCalledTimes(1);
        expect(mockEditorConfig.onAsyncError).toHaveBeenCalledWith(asyncError);
    });

    describe('onAuthExpired', () => {
        const connectorId = 'connectorId';
        const staticHeaderValue = 'Static, 1234';

        const grafxAuthRefreshRequest: AuthRefreshRequest = {
            connectorId: connectorId,
            type: AuthRefreshTypeEnum.grafxToken,
            headerValue: null,
        };

        const anyAuthRefreshRequest: AuthRefreshRequest = {
            connectorId: connectorId,
            type: AuthRefreshTypeEnum.any,
            headerValue: staticHeaderValue,
        };

        it('returns the token defined by the callback', async () => {
            const refreshedToken = 'newToken';

            const mockConfig = {
                onAuthExpired() {
                    return new Promise<AuthCredentials | null>((resolve) =>
                        resolve(new GrafxTokenAuthCredentials(refreshedToken)),
                    );
                },
            };

            jest.spyOn(mockConfig, 'onAuthExpired');
            const mockedSubscriberController = new SubscriberController(mockConfig);

            const resultJsonString = await mockedSubscriberController.onAuthExpired(
                JSON.stringify(grafxAuthRefreshRequest),
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const resultAuth: GrafxTokenAuthCredentials = JSON.parse(resultJsonString!);

            expect(resultAuth.token).toBe(refreshedToken);
            expect(mockConfig.onAuthExpired).toHaveBeenCalledWith(grafxAuthRefreshRequest);
            expect(mockConfig.onAuthExpired).toHaveBeenCalledTimes(1);
        });

        it('returns the notification defined by the callback', async () => {
            const mockConfig = {
                onAuthExpired() {
                    return new Promise<AuthCredentials | null>((resolve) => resolve(new RefreshedAuthCredendentials()));
                },
            };

            jest.spyOn(mockConfig, 'onAuthExpired');
            const mockedSubscriberController = new SubscriberController(mockConfig);

            const resultJsonString = await mockedSubscriberController.onAuthExpired(
                JSON.stringify(anyAuthRefreshRequest),
            );
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const resultAuth = JSON.parse(resultJsonString!);

            expect(resultAuth.type).toBe(AuthCredentialsTypeEnum.refreshed);
            expect(mockConfig.onAuthExpired).toHaveBeenCalledWith(anyAuthRefreshRequest);
            expect(mockConfig.onAuthExpired).toHaveBeenCalledTimes(1);
        });

        it('returns a null token if the listener is not defined', async () => {
            const mockedSubscriberController = new SubscriberController({});

            const result = await mockedSubscriberController.onAuthExpired(JSON.stringify(grafxAuthRefreshRequest));

            expect(result).toBe(null);
        });
    });

    it('Should call the ViewModeChanged subscriber when triggered', async () => {
        await mockedSubscriberController.onViewModeChanged(ViewMode.normal);
        expect(mockEditorConfig.onViewModeChanged).toHaveBeenCalled();
        expect(mockEditorConfig.onViewModeChanged).toHaveBeenCalledWith('normal');
    });

    it('Should call BarcodeValidationChanged subscriber when triggered', async () => {
        await mockedSubscriberController.onBarcodeValidationChanged(
            JSON.stringify([{ id: '1', validationResult: 'success' }]),
        );
        expect(mockEditorConfig.onBarcodeValidationChanged).toHaveBeenCalled();
        expect(mockEditorConfig.onBarcodeValidationChanged).toHaveBeenCalledWith([
            { id: '1', validationResult: BarcodeValidationResult.success },
        ]);
    });

    describe('onViewportRequested', () => {
        it('returns the viewport defined by the callback', () => {
            const viewport: Viewport = { top: 0, left: 0, width: 100, height: 100, margin: 10 };

            const mockConfig = {
                onViewportRequested() {
                    return viewport;
                },
            };

            jest.spyOn(mockConfig, 'onViewportRequested');

            const mockedSubscriberController = new SubscriberController(mockConfig);

            const resultJsonString = mockedSubscriberController.onViewportRequested();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const resultViewport: Viewport = JSON.parse(resultJsonString!);

            expect(resultViewport).toStrictEqual(viewport);
            expect(mockConfig.onViewportRequested).toHaveBeenCalledTimes(1);
        });

        it('returns a null token if the listener is not defined', () => {
            const mockedSubscriberController = new SubscriberController({});

            const result = mockedSubscriberController.onViewportRequested();

            expect(result).toBe(null);
        });
    });
});
