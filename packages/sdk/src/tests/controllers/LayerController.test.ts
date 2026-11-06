import { LayerController } from '../../controllers/LayerController';
import { EditorAPI, VisibilityMode } from '../../types/CommonTypes';
import { Layer, LayerOutputIntent, LayerProperties, LayerPropertiesUpdate } from '../../types/LayerTypes';
import { UpdateZIndexMethod } from '../../types/FrameTypes';
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
            value: { visibilityMode: VisibilityMode.visible, visibilityConditions: [] },
            isOverride: false,
            isReadOnly: false,
        },
        outputProperties: {
            value: { outputIntent: LayerOutputIntent.sameAsVisibility },
            isOverride: false,
            isReadOnly: false,
        },
    },
    {
        layerId: 'layer-2',
        visibilityProperties: {
            value: {
                visibilityMode: VisibilityMode.conditional,
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
        outputProperties: {
            value: null,
            isOverride: false,
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
    duplicateLayers: async () => getEditorResponseData(castToEditorResponse(['layer-3', 'layer-4'])),
    lockLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    moveFramesToLayer: async () => getEditorResponseData(castToEditorResponse(null)),
    renameLayer: async () => getEditorResponseData(castToEditorResponse(null)),
    reorderLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayerZIndex: async () => getEditorResponseData(castToEditorResponse(null)),
    selectLayers: async () => getEditorResponseData(castToEditorResponse(null)),
    setLayerProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    resetLayerProperties: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedLayerController = new LayerController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'getLayers');
    jest.spyOn(mockedEditorApi, 'getLayerById');
    jest.spyOn(mockedEditorApi, 'getSelectedLayer');
    jest.spyOn(mockedEditorApi, 'getLayerPropertiesOnSelectedLayout');
    jest.spyOn(mockedEditorApi, 'addLayer');
    jest.spyOn(mockedEditorApi, 'deleteLayers');
    jest.spyOn(mockedEditorApi, 'duplicateLayers');
    jest.spyOn(mockedEditorApi, 'lockLayers');
    jest.spyOn(mockedEditorApi, 'moveFramesToLayer');
    jest.spyOn(mockedEditorApi, 'renameLayer');
    jest.spyOn(mockedEditorApi, 'reorderLayers');
    jest.spyOn(mockedEditorApi, 'setLayerZIndex');
    jest.spyOn(mockedEditorApi, 'selectLayers');
    jest.spyOn(mockedEditorApi, 'setLayerProperties');
    jest.spyOn(mockedEditorApi, 'resetLayerProperties');
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('LayerController', () => {
    it('Should call the getAll method and parse the layers', async () => {
        const response = await mockedLayerController.getAll();
        expect(mockedEditorApi.getLayers).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layers);
    });

    it('Should call the getById method and parse the layer', async () => {
        const response = await mockedLayerController.getById('layer-1');
        expect(mockedEditorApi.getLayerById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getLayerById).toHaveBeenCalledWith('layer-1');
        expect(response.parsedData).toStrictEqual(layers[0]);
    });

    it('Should call the getSelected method and parse the layer', async () => {
        const response = await mockedLayerController.getSelected();
        expect(mockedEditorApi.getSelectedLayer).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layers[0]);
    });

    it('Should call the getPropertiesOnSelectedLayout method and parse the layer properties', async () => {
        const response = await mockedLayerController.getPropertiesOnSelectedLayout();
        expect(mockedEditorApi.getLayerPropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toStrictEqual(layerProperties);
    });

    it('Should call the create method and return the new layer id', async () => {
        const response = await mockedLayerController.create();
        expect(mockedEditorApi.addLayer).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toBe('layer-3');
    });

    it('Should call the removeLayers method with the layer ids', async () => {
        await mockedLayerController.removeLayers(['layer-1', 'layer-2']);
        expect(mockedEditorApi.deleteLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.deleteLayers).toHaveBeenCalledWith(['layer-1', 'layer-2']);
    });

    it('Should call the duplicateLayers method and return the new layer ids', async () => {
        const response = await mockedLayerController.duplicateLayers(['layer-1', 'layer-2']);
        expect(mockedEditorApi.duplicateLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.duplicateLayers).toHaveBeenCalledWith(['layer-1', 'layer-2']);
        expect(response.parsedData).toStrictEqual(['layer-3', 'layer-4']);
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

    it('Should call the rename method', async () => {
        await mockedLayerController.rename('layer-1', 'Background');
        expect(mockedEditorApi.renameLayer).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameLayer).toHaveBeenCalledWith('layer-1', 'Background');
    });

    it('Should call the reorderLayers method with the order first', async () => {
        await mockedLayerController.reorderLayers(1, ['layer-1']);
        expect(mockedEditorApi.reorderLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.reorderLayers).toHaveBeenCalledWith(1, ['layer-1']);
    });

    it('Should call the setLayerZIndex method with the id and the method', async () => {
        await mockedLayerController.setLayerZIndex('layer-1', UpdateZIndexMethod.sendBackward);
        expect(mockedEditorApi.setLayerZIndex).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayerZIndex).toHaveBeenCalledWith('layer-1', UpdateZIndexMethod.sendBackward);
    });

    it('Should call the selectLayers method with the layer ids', async () => {
        await mockedLayerController.selectLayers(['layer-2', 'layer-1']);
        expect(mockedEditorApi.selectLayers).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectLayers).toHaveBeenCalledWith(['layer-2', 'layer-1']);
    });

    it('Should call the setProperties method with the stringified update and the layout id', async () => {
        const update: LayerPropertiesUpdate = {
            visibilityMode: VisibilityMode.conditional,
            visibilityConditions: [
                {
                    id: 'variable-1',
                    value: { type: VariableVisibilityTargetType.boolean, value: true },
                },
            ],
        };
        await mockedLayerController.setProperties('layer-1', update, 'layout-1');
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledWith('layer-1', JSON.stringify(update), 'layout-1');
    });

    it('Should call the setProperties method without a layout id', async () => {
        const update: LayerPropertiesUpdate = { outputIntent: LayerOutputIntent.notIncluded };
        await mockedLayerController.setProperties('layer-1', update);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setLayerProperties).toHaveBeenCalledWith(
            'layer-1',
            JSON.stringify({ outputIntent: LayerOutputIntent.notIncluded }),
            undefined,
        );
    });

    it('Should call the resetProperties method with the layer id and the layout id', async () => {
        await mockedLayerController.resetProperties('layer-1', 'layout-1');
        expect(mockedEditorApi.resetLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetLayerProperties).toHaveBeenCalledWith('layer-1', 'layout-1');
    });

    it('Should call the resetProperties method without a layout id', async () => {
        await mockedLayerController.resetProperties('layer-1');
        expect(mockedEditorApi.resetLayerProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetLayerProperties).toHaveBeenCalledWith('layer-1', undefined);
    });
});
