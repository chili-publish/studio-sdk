import { Id } from '../../../types/CommonTypes';
import { FitMode, FrameTypeEnum, ShapeType, UpdateZIndexMethod, VerticalAlign, ImageSourceTypeEnum } from '../../../types/FrameTypes';
import { FrameController } from '../../controllers/FrameController';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/MockEditorAPI';
import { SDK } from '../../index';
import { mockImageConnectorSource, mockImageUrlSource } from '../__mocks__/MockImageFrameSource';

let frameId: Id;
let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    mockedSDK.editorAPI = mockChild;
    mockedSDK.frame = new FrameController(mockChild);

    jest.spyOn(mockedSDK.frame, 'addFrame');
    jest.spyOn(mockedSDK.frame, 'addShapeFrame');
    jest.spyOn(mockedSDK.frame, 'getFrames');
    jest.spyOn(mockedSDK.frame, 'getSelectedFrames');
    jest.spyOn(mockedSDK.frame, 'getFramesByPageId');
    jest.spyOn(mockedSDK.frame, 'getFrameByName');
    jest.spyOn(mockedSDK.frame, 'getFrameById');
    jest.spyOn(mockedSDK.frame, 'getFramePropertiesOnSelectedLayout');
    jest.spyOn(mockedSDK.frame, 'getFramePropertiesByFrameId');
    jest.spyOn(mockedSDK.frame, 'getFramesProperties');
    jest.spyOn(mockedSDK.frame, 'setFrameHeight');
    jest.spyOn(mockedSDK.frame, 'setFrameWidth');
    jest.spyOn(mockedSDK.frame, 'setFrameX');
    jest.spyOn(mockedSDK.frame, 'setFrameY');
    jest.spyOn(mockedSDK.frame, 'setFrameRotation');
    jest.spyOn(mockedSDK.frame, 'setFrameVisibility');
    jest.spyOn(mockedSDK.frame, 'removeFrame');
    jest.spyOn(mockedSDK.frame, 'resetFrame');
    jest.spyOn(mockedSDK.frame, 'resetFrameX');
    jest.spyOn(mockedSDK.frame, 'resetFrameY');
    jest.spyOn(mockedSDK.frame, 'resetFrameHeight');
    jest.spyOn(mockedSDK.frame, 'resetFrameWidth');
    jest.spyOn(mockedSDK.frame, 'resetFrameRotation');
    jest.spyOn(mockedSDK.frame, 'resetFrameSize');
    jest.spyOn(mockedSDK.frame, 'resetImageFrameFitMode');
    jest.spyOn(mockedSDK.frame, 'setImageFromConnector');
    jest.spyOn(mockedSDK.frame, 'setImageFromUrl');
    jest.spyOn(mockedSDK.frame, 'removeImageSource');
    jest.spyOn(mockedSDK.frame, 'selectFrame');
    jest.spyOn(mockedSDK.frame, 'selectMultipleFrames');
    jest.spyOn(mockedSDK.frame, 'setFrameName');
    jest.spyOn(mockedSDK.frame, 'setImageFrameFitMode');
    jest.spyOn(mockedSDK.frame, 'setFrameConstraint');
    jest.spyOn(mockedSDK.frame, 'setVerticalAlignment');
    jest.spyOn(mockedSDK.frame, 'setMinCopyfitting');
    jest.spyOn(mockedSDK.frame, 'setMaxCopyfitting');
    jest.spyOn(mockedSDK.frame, 'setEnableCopyfitting');
    jest.spyOn(mockedSDK.frame, 'resetMinCopyfitting');
    jest.spyOn(mockedSDK.frame, 'resetMaxCopyfitting');
    jest.spyOn(mockedSDK.frame, 'resetEnableCopyfitting');
    jest.spyOn(mockedSDK.frame, 'reorderFrames');
    jest.spyOn(mockedSDK.frame, 'setFrameZIndex');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameType');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameEnableFill');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameFillColor');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameEnableStroke');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameStrokeColor');
    jest.spyOn(mockedSDK.frame, 'setShapeFrameStrokeWeight');
    jest.spyOn(mockedSDK.frame, 'resetShapeFrameEnableFill');
    jest.spyOn(mockedSDK.frame, 'resetShapeFrameFillColor');
    jest.spyOn(mockedSDK.frame, 'resetShapeFrameEnableStroke');
    jest.spyOn(mockedSDK.frame, 'resetShapeFrameStrokeColor');
    jest.spyOn(mockedSDK.frame, 'resetShapeFrameStrokeWeight');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FrameProperties', () => {
    it('Should call all of the Frame Functions of EditorAPI successfully', async () => {
        await mockedSDK.frame.addFrame(FrameTypeEnum.image, 100, 100, 100, 100);
        expect(mockedSDK.editorAPI.addFrame).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.addFrame).toHaveBeenCalledWith(FrameTypeEnum.image, 100, 100, 100, 100);

        await mockedSDK.frame.addShapeFrame(ShapeType.ellipse, 100, 100, 100, 100);
        expect(mockedSDK.editorAPI.addFrame).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.addFrame).toHaveBeenCalledWith(ShapeType.ellipse, 100, 100, 100, 100);

        await mockedSDK.frame.getFrames();
        expect(mockedSDK.editorAPI.getFrames).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.getSelectedFrames();
        expect(mockedSDK.editorAPI.getSelectedFrames).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.getFramesByPageId(frameId);
        expect(mockedSDK.editorAPI.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getFramesByPageId).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.getFrameByName('frame');
        expect(mockedSDK.editorAPI.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getFrameByName).toHaveBeenCalledWith('frame');

        await mockedSDK.frame.getFrameById(frameId);
        expect(mockedSDK.editorAPI.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getFrameById).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.getFramePropertiesOnSelectedLayout();
        expect(mockedSDK.editorAPI.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.getFramePropertiesByFrameId('1', '2');
        expect(mockedSDK.editorAPI.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getFramePropertiesByFrameId).toHaveBeenCalledWith('1', '2');

        await mockedSDK.frame.getFramesProperties(frameId);
        expect(mockedSDK.editorAPI.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.getFramesProperties).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.setFrameHeight(frameId, '300');
        expect(mockedSDK.editorAPI.setFrameHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameRotation(frameId, '400');
        expect(mockedSDK.editorAPI.setFrameRotation).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameY(frameId, '100');
        expect(mockedSDK.editorAPI.setFrameY).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameX(frameId, '400');
        expect(mockedSDK.editorAPI.setFrameX).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameWidth(frameId, '332');
        expect(mockedSDK.editorAPI.setFrameWidth).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameHeight(frameId, '32');
        expect(mockedSDK.editorAPI.setFrameHeight).toHaveBeenCalledTimes(2);

        await mockedSDK.frame.setFrameName(frameId, 'TEST');
        expect(mockedSDK.editorAPI.renameFrame).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.setFrameVisibility(frameId, false);
        expect(mockedSDK.editorAPI.setFrameVisibility).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.removeFrame(frameId);
        expect(mockedSDK.editorAPI.removeFrame).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrame(frameId);
        expect(mockedSDK.editorAPI.resetFrame).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameX(frameId);
        expect(mockedSDK.editorAPI.resetFrameX).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameY(frameId);
        expect(mockedSDK.editorAPI.resetFrameY).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameRotation(frameId);
        expect(mockedSDK.editorAPI.resetFrameRotation).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameHeight(frameId);
        expect(mockedSDK.editorAPI.resetFrameHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameWidth(frameId);
        expect(mockedSDK.editorAPI.resetFrameWidth).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetFrameSize(frameId);
        expect(mockedSDK.editorAPI.resetFrameSize).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetImageFrameFitMode(frameId);
        expect(mockedSDK.editorAPI.resetImageFrameFitMode).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.selectFrame(frameId);
        expect(mockedSDK.editorAPI.selectFrames).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.selectMultipleFrames([frameId]);
        expect(mockedSDK.editorAPI.selectFrames).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.selectFrames).toHaveBeenCalledWith([frameId]);

        await mockedSDK.frame.setImageFrameFitMode(frameId, FitMode.fit);
        expect(mockedSDK.editorAPI.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageFrameFitMode).toHaveBeenCalledWith(frameId, FitMode.fit);

        await mockedSDK.frame.setFrameConstraint(frameId, true);
        expect(mockedSDK.editorAPI.setFrameConstraint).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setFrameConstraint).toHaveBeenCalledWith(frameId, true);

        await mockedSDK.frame.setVerticalAlignment(frameId, VerticalAlign.justify);
        expect(mockedSDK.editorAPI.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setVerticalAlignment).toHaveBeenCalledWith(frameId, VerticalAlign.justify);

        await mockedSDK.frame.setMinCopyfitting(frameId, '0.5');
        expect(mockedSDK.editorAPI.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setMinCopyfitting).toHaveBeenCalledWith(frameId, 0.5);

        await mockedSDK.frame.setMaxCopyfitting(frameId, '5.0');
        expect(mockedSDK.editorAPI.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setMaxCopyfitting).toHaveBeenCalledWith(frameId, 5.0);

        await mockedSDK.frame.setEnableCopyfitting(frameId, true);
        expect(mockedSDK.editorAPI.setEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setEnableCopyfitting).toHaveBeenCalledWith(frameId, true);

        await mockedSDK.frame.resetMinCopyfitting(frameId);
        expect(mockedSDK.editorAPI.resetMinCopyfitting).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetMaxCopyfitting(frameId);
        expect(mockedSDK.editorAPI.resetMaxCopyfitting).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.resetEnableCopyfitting(frameId);
        expect(mockedSDK.editorAPI.resetEnableCopyfitting).toHaveBeenCalledTimes(1);

        await mockedSDK.frame.reorderFrames(1, [frameId]);
        expect(mockedSDK.editorAPI.reorderFrames).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.reorderFrames).toHaveBeenCalledWith(1, [frameId]);

        await mockedSDK.frame.setFrameZIndex(frameId, UpdateZIndexMethod.sendBackward);
        expect(mockedSDK.editorAPI.setFrameZIndex).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setFrameZIndex).toHaveBeenCalledWith(frameId, UpdateZIndexMethod.sendBackward);

        await mockedSDK.frame.setImageFromConnector(frameId, 'connector id', 'asset id');
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify({
            assetId: 'asset id',
            connectorId: 'connector id',
            sourceType: ImageSourceTypeEnum.connector,
        }));

        await mockedSDK.frame.setImageFromUrl(frameId, 'image url');
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(2);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify({ url: 'image url', sourceType: ImageSourceTypeEnum.url, }));

        await mockedSDK.frame.removeImageSource(frameId);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(3);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, null);

        await mockedSDK.frame.setShapeFrameType(frameId, ShapeType.polygon);
        expect(mockedSDK.editorAPI.setShapeFrameType).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameType).toHaveBeenCalledWith(frameId, ShapeType.polygon);

        await mockedSDK.frame.setShapeFrameEnableFill(frameId, true);
        expect(mockedSDK.editorAPI.setShapeFrameEnableFill).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameEnableFill).toHaveBeenCalledWith(frameId, true);

        await mockedSDK.frame.setShapeFrameFillColor(frameId, 9000);
        expect(mockedSDK.editorAPI.setShapeFrameFillColor).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameFillColor).toHaveBeenCalledWith(frameId, 9000);

        await mockedSDK.frame.setShapeFrameEnableStroke(frameId, true);
        expect(mockedSDK.editorAPI.setShapeFrameEnableStroke).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameEnableStroke).toHaveBeenCalledWith(frameId, true);

        await mockedSDK.frame.setShapeFrameStrokeColor(frameId, 9000);
        expect(mockedSDK.editorAPI.setShapeFrameStrokeColor).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameStrokeColor).toHaveBeenCalledWith(frameId, 9000);

        await mockedSDK.frame.setShapeFrameStrokeWeight(frameId, 10);
        expect(mockedSDK.editorAPI.setShapeFrameStrokeWeight).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setShapeFrameStrokeWeight).toHaveBeenCalledWith(frameId, 10);

        await mockedSDK.frame.resetShapeFrameEnableFill(frameId);
        expect(mockedSDK.editorAPI.resetShapeFrameEnableFill).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.resetShapeFrameEnableFill).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.resetShapeFrameFillColor(frameId);
        expect(mockedSDK.editorAPI.resetShapeFrameFillColor).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.resetShapeFrameFillColor).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.resetShapeFrameEnableStroke(frameId);
        expect(mockedSDK.editorAPI.resetShapeFrameEnableStroke).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.resetShapeFrameEnableStroke).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.resetShapeFrameStrokeColor(frameId);
        expect(mockedSDK.editorAPI.resetShapeFrameStrokeColor).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.resetShapeFrameStrokeColor).toHaveBeenCalledWith(frameId);

        await mockedSDK.frame.resetShapeFrameStrokeWeight(frameId);
        expect(mockedSDK.editorAPI.resetShapeFrameStrokeWeight).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.resetShapeFrameStrokeWeight).toHaveBeenCalledWith(frameId);
    });
});

describe('ImageFrameSource manipulations', () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('setImageFromConnector() redirects to EditorAPI.setImageSource() with ImageConnectorSource param', async () => {
        const connectorId = mockImageConnectorSource.connectorId;
        const assetId = mockImageConnectorSource.assetId;

        await mockedSDK.frame.setImageFromConnector(frameId, connectorId, assetId);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(
            frameId,
            JSON.stringify(mockImageConnectorSource),
        );
    });

    it('setImageFromUrl() redirects to EditorAPI.setImageSource() with ImageUrlSource param', async () => {
        const url = mockImageUrlSource.url;

        await mockedSDK.frame.setImageFromUrl(frameId, url);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify(mockImageUrlSource));
    });

    it('removeImageSource() redirects to EditorAPI.setImageSource() with null param', async () => {
        await mockedSDK.frame.removeImageSource(frameId);

        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedSDK.editorAPI.setImageSource).toHaveBeenCalledWith(frameId, null);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Returns null when user input doesnt contain any number', async () => {
        const responseX = await mockedSDK.frame.setFrameX(frameId, 'dasdsa');
        const responseY = await mockedSDK.frame.setFrameY(frameId, 'sdsadas');
        const responseWidth = await mockedSDK.frame.setFrameWidth(frameId, 'sd');
        const responseHeight = await mockedSDK.frame.setFrameHeight(frameId, 'dds');
        const responseRotation = await mockedSDK.frame.setFrameRotation(frameId, 'dsdsd');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedSDK.frame.setFrameRotation(frameId, '20/0');
        expect(responseRotation).toBeNull();
    });
});
