import { LayerController } from '../../controllers/LayerController';
import { EditorAPI, VisibilityMode } from '../../types/CommonTypes';
import { Layer, LayerProperties, LayerPropertiesUpdate } from '../../types/LayerTypes';
import { VariableVisibilityOperator, VariableVisibilityTargetType } from '../../types/VariableTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedLayerController: LayerController;

const layers: Layer[] = [
    { id: 'layer-1', name: 'Layer 1', frameIds: ['frame-1', 'frame-2'], isLocked: false },
    { id: 'layer-2', name: 'Layer 2', frameIds: [], isLocked: true },
];

const layerProperties: LayerProperties[] = [
    {
        layerId: 'layer-1',
        visibilityProperties: {
            value: { visibilityMode: VisibilityMode.visible, isPrintable: true, visibilityConditions: [] },
            isOverride: false,
            isReadOnly: false,
        },
    },
    {
        layerId: 'layer-2',
        visibilityProperties: {
            value: {
                visibilityMode: VisibilityMode.conditional,
                isPrintable: false,
                visibilityConditions: [
                    {
                        id: 'variable-1',
                        value: {
                            type: VariableVisibilityTargetType.text,
                            value: 'Belgium',
                            operator: VariableVisibilityOperator.equals,
                        },
                    },
                ],
            },
            isOverride: true,
            isReadOnly: false,
        },
    },
];

const mockedEditorApi: EditorAPI = {
    getLayers: async () => getEditorResponseData(castToEditorResponse(layers)),
    getLayerById: async () => getEditorResponseData(castToEditorResponse(layers[0])),
    getSelectedLayer: async () => getEditorResponseData(castToEditorResponse(layers[0])),
    getLayerPropertiesOnSelectedLayout: async () => getEditorResponseData(castToEditorResponse(layerProperties)),
    addLayer: async () => getEditorResponseData(castToEditorResponse('layer-3')),
    deleteLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    lockLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    moveFramesToLayer: async () => getEditorResponseData(castToEditorResponse(null)),
    renameLayer: async () => getEditorResponseData(castToEditorResponse(null)),
    reorderLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    selectLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayerProperties: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedLayerController = new LayerController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'getLayers');
    jest.spyOn(mockedEditorApi, 'getLayerById');
    jest.spyOn(mockedEditorApi, 'getSelectedLayer');
    jest.spyOn(mockedEditorApi, 'getLayerPropertiesOnSelectedLayout');
    jest.spyOn(mockedEditorApi, 'addLayer');
    jest.spyOn(mockedEditorApi, 'deleteLayers');
    jest.spyOn(mockedEditorApi, 'lockLayers');
    jest.spyOn(mockedEditorApi, 'moveFramesToLayer');
    jest.spyOn(mockedEditorApi, 'renameLayer');
    jest.spyOn(mockedEditorApi, 'reorderLayers');
    jest.spyOn(mockedEditorApi, 'selectLayers');
    jest.spyOn(mockedEditorApi, 'setLayerProperties');
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('LayerController', () => {
    it('Should call the getLayers method and parse the layers', async () => {
        const response = await mockedLayerController.getLayers();
        expect(mockedEditorApi.getLayers).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layers);
    });

    it('Should call the getLayerById method and parse the layer', async () => {
        const response = await mockedLayerController.getLayerById('layer-1');
        expect(mockedEditorApi.getLayerById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayerById).toHaveBeenCalledWith('layer-1');
        expect(response.parsedData).toStrictEqual(layers[0]);
    });

    it('Should call the getSelectedLayer method and parse the layer', async () => {
        const response = await mockedLayerController.getSelectedLayer();
        expect(mockedEditorApi.getSelectedLayer).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layers[0]);
    });

    it('Should call the getLayerPropertiesOnSelectedLayout method and parse the layer properties', async () => {
        const response = await mockedLayerController.getLayerPropertiesOnSelectedLayout();
        expect(mockedEditorApi.getLayerPropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layerProperties);
    });

    it('Should call the addLayer method and return the new layer id', async () => {
        const response = await mockedLayerController.addLayer();
        expect(mockedEditorApi.addLayer).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toBe('layer-3');
    });

    it('Should call the deleteLayers method with the layer ids', async () => {
        await mockedLayerController.deleteLayers(['layer-1', 'layer-2']);
        expect(mockedEditorApi.deleteLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.deleteLayers).toHaveBeenCalledWith(['layer-1', 'layer-2']);
    });

    it('Should call the lockLayers method with the layer ids', async () => {
        await mockedLayerController.lockLayers(['layer-1', 'layer-2'], true);
        expect(mockedEditorApi.lockLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.lockLayers).toHaveBeenCalledWith(['layer-1', 'layer-2'], true);
    });

    it('Should call the moveFramesToLayer method with an order', async () => {
        await mockedLayerController.moveFramesToLayer('layer-2', ['frame-1', 'frame-2'], 0);
        expect(mockedEditorApi.moveFramesToLayer).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.moveFramesToLayer).toHaveBeenCalledWith('layer-2', ['frame-1', 'frame-2'], 0);
    });

    it('Should call the moveFramesToLayer method without an order', async () => {
        await mockedLayerController.moveFramesToLayer('layer-2', ['frame-1']);
        expect(mockedEditorApi.moveFramesToLayer).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.moveFramesToLayer).toHaveBeenCalledWith('layer-2', ['frame-1'], undefined);
    });

    it('Should call the renameLayer method', async () => {
        await mockedLayerController.renameLayer('layer-1', 'Background');
        expect(mockedEditorApi.renameLayer).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameLayer).toHaveBeenCalledWith('layer-1', 'Background');
    });

    it('Should call the reorderLayers method with the order first', async () => {
        await mockedLayerController.reorderLayers(1, ['layer-1']);
        expect(mockedEditorApi.reorderLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.reorderLayers).toHaveBeenCalledWith(1, ['layer-1']);
    });

    it('Should call the selectLayers method with the layer ids', async () => {
        await mockedLayerController.selectLayers(['layer-2', 'layer-1']);
        expect(mockedEditorApi.selectLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectLayers).toHaveBeenCalledWith(['layer-2', 'layer-1']);
    });

    it('Should call the setLayerProperties method with the stringified update and the layout id', async () => {
        const update: LayerPropertiesUpdate = {
            visibilityMode: VisibilityMode.conditional,
            visibilityConditions: [
                {
                    id: 'variable-1',
                    value: { type: VariableVisibilityTargetType.boolean, value: true },
                },
            ],
        };
        await mockedLayerController.setLayerProperties('layer-1', update, 'layout-1');
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledWith('layer-1', JSON.stringify(update), 'layout-1');
    });

    it('Should call the setLayerProperties method without a layout id', async () => {
        const update: LayerPropertiesUpdate = { isPrintable: false };
        await mockedLayerController.setLayerProperties('layer-1', update);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledWith(
            'layer-1',
            JSON.stringify({ isPrintable: false }),
            undefined,
        );
    });
});
