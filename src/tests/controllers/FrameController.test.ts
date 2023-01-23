import { Id } from '../../../types/CommonTypes';
import { FitMode, FrameTypeEnum, ShapeType, UpdateZIndexMethod, VerticalAlign } from '../../../types/FrameTypes';
import { FrameController } from '../../controllers/FrameController';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import mockConfig from '../__mocks__/config';
import mockEditorApi from '../__mocks__/MockEditorAPI';
import { SDK } from '../../index';
import { mockImageConnectorSource, mockImageUrlSource } from '../__mocks__/MockImageFrameSource';

let mockedFrameProperties: FrameController;
let frameId: Id;

beforeEach(() => {
    mockedFrameProperties = new FrameController(mockEditorApi);

    jest.spyOn(mockedFrameProperties, 'addFrame');
    jest.spyOn(mockedFrameProperties, 'addShapeFrame');
    jest.spyOn(mockedFrameProperties, 'getFrames');
    jest.spyOn(mockedFrameProperties, 'getSelectedFrames');
    jest.spyOn(mockedFrameProperties, 'getFramesByPageId');
    jest.spyOn(mockedFrameProperties, 'getFrameByName');
    jest.spyOn(mockedFrameProperties, 'getFrameById');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesOnSelectedLayout');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesByFrameId');
    jest.spyOn(mockedFrameProperties, 'getFramesProperties');
    jest.spyOn(mockedFrameProperties, 'setFrameHeight');
    jest.spyOn(mockedFrameProperties, 'setFrameWidth');
    jest.spyOn(mockedFrameProperties, 'setFrameX');
    jest.spyOn(mockedFrameProperties, 'setFrameY');
    jest.spyOn(mockedFrameProperties, 'setFrameRotation');
    jest.spyOn(mockedFrameProperties, 'setFrameVisibility');
    jest.spyOn(mockedFrameProperties, 'removeFrame');
    jest.spyOn(mockedFrameProperties, 'resetFrame');
    jest.spyOn(mockedFrameProperties, 'resetFrameX');
    jest.spyOn(mockedFrameProperties, 'resetFrameY');
    jest.spyOn(mockedFrameProperties, 'resetFrameHeight');
    jest.spyOn(mockedFrameProperties, 'resetFrameWidth');
    jest.spyOn(mockedFrameProperties, 'resetFrameRotation');
    jest.spyOn(mockedFrameProperties, 'resetFrameSize');
    jest.spyOn(mockedFrameProperties, 'resetImageFrameFitMode');
    jest.spyOn(mockedFrameProperties, 'setImageFromConnector');
    jest.spyOn(mockedFrameProperties, 'setImageFromUrl');
    jest.spyOn(mockedFrameProperties, 'removeImageSource');
    jest.spyOn(mockedFrameProperties, 'selectFrame');
    jest.spyOn(mockedFrameProperties, 'selectMultipleFrames');
    jest.spyOn(mockedFrameProperties, 'setFrameName');
    jest.spyOn(mockedFrameProperties, 'setImageFrameFitMode');
    jest.spyOn(mockedFrameProperties, 'setVerticalAlignment');
    jest.spyOn(mockedFrameProperties, 'setMinCopyfitting');
    jest.spyOn(mockedFrameProperties, 'setMaxCopyfitting');
    jest.spyOn(mockedFrameProperties, 'setEnableCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetMinCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetMaxCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetEnableCopyfitting');
    jest.spyOn(mockedFrameProperties, 'reorderFrames');
    jest.spyOn(mockedFrameProperties, 'setFrameZIndex');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameType');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameEnableFill');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameFillColor');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameEnableStroke');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameStrokeColor');
    jest.spyOn(mockedFrameProperties, 'setShapeFrameStrokeWeight');
    jest.spyOn(mockedFrameProperties, 'resetShapeFrameEnableFill');
    jest.spyOn(mockedFrameProperties, 'resetShapeFrameFillColor');
    jest.spyOn(mockedFrameProperties, 'resetShapeFrameEnableStroke');
    jest.spyOn(mockedFrameProperties, 'resetShapeFrameStrokeColor');
    jest.spyOn(mockedFrameProperties, 'resetShapeFrameStrokeWeight');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('FrameProperties', () => {
    it('Should call all of the Frame Functions of EditorAPI successfully', () => {
        mockedFrameProperties.addFrame(FrameTypeEnum.image, 100, 100, 100, 100);
        expect(mockedFrameProperties.addFrame).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.addFrame).toHaveBeenCalledWith(FrameTypeEnum.image, 100, 100, 100, 100);

        mockedFrameProperties.addShapeFrame(ShapeType.ellipse, 100, 100, 100, 100);
        expect(mockedFrameProperties.addShapeFrame).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.addShapeFrame).toHaveBeenCalledWith(ShapeType.ellipse, 100, 100, 100, 100);

        mockedFrameProperties.getFrames();
        expect(mockedFrameProperties.getFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getSelectedFrames();
        expect(mockedFrameProperties.getSelectedFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramesByPageId('2');
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledWith('2');

        mockedFrameProperties.getFrameByName('frame');
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledWith('frame');

        mockedFrameProperties.getFrameById('5');
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledWith('5');

        mockedFrameProperties.getFramePropertiesOnSelectedLayout();
        expect(mockedFrameProperties.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramePropertiesByFrameId('1', '2');
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledWith('1', '2');

        mockedFrameProperties.getFramesProperties('1');
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledWith('1');

        mockedFrameProperties.setFrameHeight(frameId, '300');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameRotation(frameId, '400');
        expect(mockedFrameProperties.setFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameY(frameId, '100');
        expect(mockedFrameProperties.setFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameX(frameId, '400');
        expect(mockedFrameProperties.setFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameWidth(frameId, '332');
        expect(mockedFrameProperties.setFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameHeight(frameId, '32');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(2);

        mockedFrameProperties.setFrameName('1', 'TEST');
        expect(mockedFrameProperties.setFrameName).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameVisibility('2', false);
        expect(mockedFrameProperties.setFrameVisibility).toHaveBeenCalledTimes(1);

        mockedFrameProperties.removeFrame('1');
        expect(mockedFrameProperties.removeFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrame('2');
        expect(mockedFrameProperties.resetFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameX('2');
        expect(mockedFrameProperties.resetFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameY('2');
        expect(mockedFrameProperties.resetFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameRotation('2');
        expect(mockedFrameProperties.resetFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameHeight('2');
        expect(mockedFrameProperties.resetFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameWidth('2');
        expect(mockedFrameProperties.resetFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameSize('2');
        expect(mockedFrameProperties.resetFrameSize).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetImageFrameFitMode('2');
        expect(mockedFrameProperties.resetImageFrameFitMode).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectFrame('2');
        expect(mockedFrameProperties.selectFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectMultipleFrames(['5']);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledWith(['5']);

        mockedFrameProperties.setImageFrameFitMode(frameId, FitMode.fit);
        expect(mockedFrameProperties.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setImageFrameFitMode).toHaveBeenCalledWith(frameId, FitMode.fit);

        mockedFrameProperties.setVerticalAlignment(frameId, VerticalAlign.justify);
        expect(mockedFrameProperties.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setVerticalAlignment).toHaveBeenCalledWith(frameId, VerticalAlign.justify);

        mockedFrameProperties.setMinCopyfitting(frameId, '0.5');
        expect(mockedFrameProperties.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setMinCopyfitting).toHaveBeenCalledWith(frameId, '0.5');

        mockedFrameProperties.setMaxCopyfitting(frameId, '5.0');
        expect(mockedFrameProperties.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setMaxCopyfitting).toHaveBeenCalledWith(frameId, '5.0');

        mockedFrameProperties.setEnableCopyfitting(frameId, true);
        expect(mockedFrameProperties.setEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setEnableCopyfitting).toHaveBeenCalledWith(frameId, true);

        mockedFrameProperties.resetMinCopyfitting(frameId);
        expect(mockedFrameProperties.resetMinCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetMaxCopyfitting(frameId);
        expect(mockedFrameProperties.resetMaxCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetEnableCopyfitting(frameId);
        expect(mockedFrameProperties.resetEnableCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.reorderFrames(1, [frameId]);
        expect(mockedFrameProperties.reorderFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.reorderFrames).toHaveBeenCalledWith(1, [frameId]);

        mockedFrameProperties.setFrameZIndex(frameId, UpdateZIndexMethod.sendBackward);
        expect(mockedFrameProperties.setFrameZIndex).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setFrameZIndex).toHaveBeenCalledWith(frameId, UpdateZIndexMethod.sendBackward);

        mockedFrameProperties.setImageFromConnector(frameId, 'connector id', 'asset id');
        expect(mockedFrameProperties.setImageFromConnector).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setImageFromConnector).toHaveBeenCalledWith(frameId, 'connector id', 'asset id');

        mockedFrameProperties.setImageFromUrl(frameId, 'image url');
        expect(mockedFrameProperties.setImageFromUrl).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setImageFromUrl).toHaveBeenCalledWith(frameId, 'image url');

        mockedFrameProperties.removeImageSource(frameId);
        expect(mockedFrameProperties.removeImageSource).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.removeImageSource).toHaveBeenCalledWith(frameId);

        mockedFrameProperties.setShapeFrameType(frameId, ShapeType.polygon);
        expect(mockedFrameProperties.setShapeFrameType).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameType).toHaveBeenCalledWith(frameId, ShapeType.polygon);

        mockedFrameProperties.setShapeFrameEnableFill(frameId, true);
        expect(mockedFrameProperties.setShapeFrameEnableFill).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameEnableFill).toHaveBeenCalledWith(frameId, true);

        mockedFrameProperties.setShapeFrameFillColor(frameId, 9000);
        expect(mockedFrameProperties.setShapeFrameFillColor).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameFillColor).toHaveBeenCalledWith(frameId, 9000);

        mockedFrameProperties.setShapeFrameEnableStroke(frameId, true);
        expect(mockedFrameProperties.setShapeFrameEnableStroke).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameEnableStroke).toHaveBeenCalledWith(frameId, true);

        mockedFrameProperties.setShapeFrameStrokeColor(frameId, 9000);
        expect(mockedFrameProperties.setShapeFrameStrokeColor).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameStrokeColor).toHaveBeenCalledWith(frameId, 9000);

        mockedFrameProperties.setShapeFrameStrokeWeight(frameId, 10);
        expect(mockedFrameProperties.setShapeFrameStrokeWeight).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setShapeFrameStrokeWeight).toHaveBeenCalledWith(frameId, 10);

        mockedFrameProperties.resetShapeFrameEnableFill(frameId);
        expect(mockedFrameProperties.resetShapeFrameEnableFill).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.resetShapeFrameEnableFill).toHaveBeenCalledWith(frameId);

        mockedFrameProperties.resetShapeFrameFillColor(frameId);
        expect(mockedFrameProperties.resetShapeFrameFillColor).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.resetShapeFrameFillColor).toHaveBeenCalledWith(frameId);

        mockedFrameProperties.resetShapeFrameEnableStroke(frameId);
        expect(mockedFrameProperties.resetShapeFrameEnableStroke).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.resetShapeFrameEnableStroke).toHaveBeenCalledWith(frameId);

        mockedFrameProperties.resetShapeFrameStrokeColor(frameId);
        expect(mockedFrameProperties.resetShapeFrameStrokeColor).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.resetShapeFrameStrokeColor).toHaveBeenCalledWith(frameId);

        mockedFrameProperties.resetShapeFrameStrokeWeight(frameId);
        expect(mockedFrameProperties.resetShapeFrameStrokeWeight).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.resetShapeFrameStrokeWeight).toHaveBeenCalledWith(frameId);
    });
});

describe('ImageFrameSource manipulations', () => {
    const mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockEditorApi;

    beforeAll(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('setImageFromConnector() redirects to EditorAPI.setImageSource() with ImageConnectorSource param', async () => {
        const connectorId = mockImageConnectorSource.connectorId;
        const assetId = mockImageConnectorSource.assetId;

        await mockedFrameProperties.setImageFromConnector(frameId, connectorId, assetId);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(
            frameId,
            JSON.stringify(mockImageConnectorSource),
        );
    });

    it('setImageFromUrl() redirects to EditorAPI.setImageSource() with ImageUrlSource param', async () => {
        const url = mockImageUrlSource.url;

        await mockedFrameProperties.setImageFromUrl(frameId, url);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify(mockImageUrlSource));
    });

    it('removeImageSource() redirects to EditorAPI.setImageSource() with null param', async () => {
        await mockedFrameProperties.removeImageSource(frameId);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, null);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Returns null when user input doesnt contain any number', async () => {
        const responseX = await mockedFrameProperties.setFrameX(frameId, 'dasdsa');
        const responseY = await mockedFrameProperties.setFrameY(frameId, 'sdsadas');
        const responseWidth = await mockedFrameProperties.setFrameWidth(frameId, 'sd');
        const responseHeight = await mockedFrameProperties.setFrameHeight(frameId, 'dds');
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, 'dsdsd');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, '20/0');
        expect(responseRotation).toBeNull();
    });
});
