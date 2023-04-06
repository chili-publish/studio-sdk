import { EditorAPI, Id } from '../../types/CommonTypes';
import {
    BlendMode,
    FitMode,
    FrameTypeEnum,
    ImageSourceTypeEnum,
    ShapeType,
    UpdateZIndexMethod,
    VerticalAlign,
} from '../../types/FrameTypes';
import { FrameController } from '../../controllers/FrameController';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { mockImageConnectorSource, mockImageUrlSource } from '../__mocks__/MockImageFrameSource';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';

let frameId: Id;

let mockedFrameController: FrameController;

const mockedEditorApi: EditorAPI = {
    addFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    addShapeFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    getFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    getSelectedFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    getFramesByPageId: async () => getEditorResponseData(castToEditorResponse(null)),
    getFrameByName: async () => getEditorResponseData(castToEditorResponse(null)),
    getFrameById: async () => getEditorResponseData(castToEditorResponse(null)),
    getFramePropertiesOnSelectedLayout: async () => getEditorResponseData(castToEditorResponse(null)),
    getFramePropertiesByFrameId: async () => getEditorResponseData(castToEditorResponse(null)),
    getFramesProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameX: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameY: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameRotation: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameVisibility: async () => getEditorResponseData(castToEditorResponse(null)),
    removeFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameX: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameY: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameHeight: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameWidth: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameRotation: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameSize: async () => getEditorResponseData(castToEditorResponse(null)),
    resetImageFrameFitMode: async () => getEditorResponseData(castToEditorResponse(null)),
    removeImageSource: async () => getEditorResponseData(castToEditorResponse(null)),
    selectFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    selectMultipleFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameName: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageFrameFitMode: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameConstrainProportions: async () => getEditorResponseData(castToEditorResponse(null)),
    setVerticalAlignment: async () => getEditorResponseData(castToEditorResponse(null)),
    setMinCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    setMaxCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    setEnableCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    resetMinCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    resetMaxCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    resetEnableCopyfitting: async () => getEditorResponseData(castToEditorResponse(null)),
    reorderFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameZIndex: async () => getEditorResponseData(castToEditorResponse(null)),
    setShapeProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameBlendMode: async () => getEditorResponseData(castToEditorResponse(null)),
    renameFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageSource: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFrameController = new FrameController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'addFrame');
    jest.spyOn(mockedEditorApi, 'addShapeFrame');
    jest.spyOn(mockedEditorApi, 'getFrames');
    jest.spyOn(mockedEditorApi, 'getSelectedFrames');
    jest.spyOn(mockedEditorApi, 'getFramesByPageId');
    jest.spyOn(mockedEditorApi, 'getFrameByName');
    jest.spyOn(mockedEditorApi, 'getFrameById');
    jest.spyOn(mockedEditorApi, 'getFramePropertiesOnSelectedLayout');
    jest.spyOn(mockedEditorApi, 'getFramePropertiesByFrameId');
    jest.spyOn(mockedEditorApi, 'getFramesProperties');
    jest.spyOn(mockedEditorApi, 'setFrameHeight');
    jest.spyOn(mockedEditorApi, 'setFrameWidth');
    jest.spyOn(mockedEditorApi, 'setFrameX');
    jest.spyOn(mockedEditorApi, 'setFrameY');
    jest.spyOn(mockedEditorApi, 'setFrameRotation');
    jest.spyOn(mockedEditorApi, 'setFrameVisibility');
    jest.spyOn(mockedEditorApi, 'removeFrame');
    jest.spyOn(mockedEditorApi, 'resetFrame');
    jest.spyOn(mockedEditorApi, 'resetFrameX');
    jest.spyOn(mockedEditorApi, 'resetFrameY');
    jest.spyOn(mockedEditorApi, 'resetFrameHeight');
    jest.spyOn(mockedEditorApi, 'resetFrameWidth');
    jest.spyOn(mockedEditorApi, 'resetFrameRotation');
    jest.spyOn(mockedEditorApi, 'resetFrameSize');
    jest.spyOn(mockedEditorApi, 'resetImageFrameFitMode');
    jest.spyOn(mockedEditorApi, 'removeImageSource');
    jest.spyOn(mockedEditorApi, 'selectFrames');
    jest.spyOn(mockedEditorApi, 'selectMultipleFrames');
    jest.spyOn(mockedEditorApi, 'setFrameName');
    jest.spyOn(mockedEditorApi, 'setImageFrameFitMode');
    jest.spyOn(mockedEditorApi, 'setFrameConstrainProportions');
    jest.spyOn(mockedEditorApi, 'setVerticalAlignment');
    jest.spyOn(mockedEditorApi, 'setMinCopyfitting');
    jest.spyOn(mockedEditorApi, 'setMaxCopyfitting');
    jest.spyOn(mockedEditorApi, 'setEnableCopyfitting');
    jest.spyOn(mockedEditorApi, 'resetMinCopyfitting');
    jest.spyOn(mockedEditorApi, 'resetMaxCopyfitting');
    jest.spyOn(mockedEditorApi, 'resetEnableCopyfitting');
    jest.spyOn(mockedEditorApi, 'reorderFrames');
    jest.spyOn(mockedEditorApi, 'setFrameZIndex');
    jest.spyOn(mockedEditorApi, 'setShapeProperties');
    jest.spyOn(mockedEditorApi, 'setFrameBlendMode');
    jest.spyOn(mockedEditorApi, 'renameFrame');
    jest.spyOn(mockedEditorApi, 'setImageSource');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FrameController', () => {
    it('Should be possible to add a frame', async () => {
        await mockedFrameController.addFrame(FrameTypeEnum.image, 100, 100, 100, 100);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledWith(FrameTypeEnum.image, 100, 100, 100, 100);
    });
    it('Should be possible to add a ShapeFrame', async () => {
        await mockedFrameController.addShapeFrame(ShapeType.ellipse, 100, 100, 100, 100);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledWith(ShapeType.ellipse, 100, 100, 100, 100);
    });

    it('Should be possible to get all frames', async () => {
        await mockedFrameController.getFrames();
        expect(mockedEditorApi.getFrames).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to get the selected frames', async () => {
        await mockedFrameController.getSelectedFrames();
        expect(mockedEditorApi.getSelectedFrames).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to get frames by pageId', async () => {
        await mockedFrameController.getFramesByPageId(frameId);
        expect(mockedEditorApi.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramesByPageId).toHaveBeenCalledWith(frameId);
    });

    it('Should be possible to get a frame by name', async () => {
        await mockedFrameController.getFrameByName('frame');
        expect(mockedEditorApi.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFrameByName).toHaveBeenCalledWith('frame');
    });

    it('Should be possible to get a frame by name', async () => {
        await mockedFrameController.getFrameById(frameId);
        expect(mockedEditorApi.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFrameById).toHaveBeenCalledWith(frameId);
    });

    it('Should be possible to get frame properties on the selected layour', async () => {
        await mockedFrameController.getFramePropertiesOnSelectedLayout();
        expect(mockedEditorApi.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to get frame properties by frame id', async () => {
        await mockedFrameController.getFramePropertiesByFrameId('1', '2');
        expect(mockedEditorApi.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramePropertiesByFrameId).toHaveBeenCalledWith('1', '2');
    });

    it('Should be possible to get frame properties by layout id', async () => {
        await mockedFrameController.getFramesProperties(frameId);
        expect(mockedEditorApi.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramesProperties).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to set the frame height', async () => {
        await mockedFrameController.setFrameHeight(frameId, '300');
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(frameId, 300);
    });
    it('Should be possible to set the frame rotation', async () => {
        await mockedFrameController.setFrameRotation(frameId, '400');
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledWith(frameId, 400);
    });
    it('Should be possible to set the frame y property', async () => {
        await mockedFrameController.setFrameY(frameId, '100');
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledWith(frameId, 100);
    });
    it('Should be possible to set the frame x property', async () => {
        await mockedFrameController.setFrameX(frameId, '400');
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledWith(frameId, 400);
    });

    it('Should be possible to set the frame width', async () => {
        await mockedFrameController.setFrameWidth(frameId, '332');
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledWith(frameId, 332);
    });
    it('Should be possible to set the frame heignt', async () => {
        await mockedFrameController.setFrameHeight(frameId, '32');
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(frameId, 32);
    });

    it('Should be possible to set the name of the frame', async () => {
        await mockedFrameController.setFrameName(frameId, 'TEST');
        expect(mockedEditorApi.renameFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameFrame).toHaveBeenCalledWith(frameId, 'TEST');
    });
    it('Should be possible to set the frame visibility', async () => {
        await mockedFrameController.setFrameVisibility(frameId, false);
        expect(mockedEditorApi.setFrameVisibility).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameVisibility).toHaveBeenCalledWith(frameId, false);
    });
    it('Should be possible to remove a frame', async () => {
        await mockedFrameController.removeFrame(frameId);
        expect(mockedEditorApi.removeFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFrame).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset a frame', async () => {
        await mockedFrameController.resetFrame(frameId);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledWith(frameId);
    });
    it("Should be possible to reset a frame's x position", async () => {
        await mockedFrameController.resetFrameX(frameId);
        expect(mockedEditorApi.resetFrameX).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameX).toHaveBeenCalledWith(frameId);
    });
    it("Should be possible to reset a frame's y position", async () => {
        await mockedFrameController.resetFrameY(frameId);
        expect(mockedEditorApi.resetFrameY).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameY).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the frame rotation', async () => {
        await mockedFrameController.resetFrameRotation(frameId);
        expect(mockedEditorApi.resetFrameRotation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameRotation).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the frame height', async () => {
        await mockedFrameController.resetFrameHeight(frameId);
        expect(mockedEditorApi.resetFrameHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameHeight).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the frame width', async () => {
        await mockedFrameController.resetFrameWidth(frameId);
        expect(mockedEditorApi.resetFrameWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameWidth).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the frame size', async () => {
        await mockedFrameController.resetFrameSize(frameId);
        expect(mockedEditorApi.resetFrameSize).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameSize).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the image frame fit mode', async () => {
        await mockedFrameController.resetImageFrameFitMode(frameId);
        expect(mockedEditorApi.resetImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetImageFrameFitMode).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to select a frame', async () => {
        await mockedFrameController.selectFrame(frameId);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledWith([frameId]);
    });
    it('Should be possible to select multiple frames at once', async () => {
        await mockedFrameController.selectMultipleFrames([frameId]);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledWith([frameId]);
    });
    it('Should be possible to set the image frame fit mode', async () => {
        await mockedFrameController.setImageFrameFitMode(frameId, FitMode.fit);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledWith(frameId, FitMode.fit);
    });
    it('Should be possible to set the frame to constrain proportions', async () => {
        await mockedFrameController.setFrameConstrainProportions(frameId, true);
        expect(mockedEditorApi.setFrameConstrainProportions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameConstrainProportions).toHaveBeenCalledWith(frameId, true);
    });
    it('Should be possible to set the verical allignment of a frame', async () => {
        await mockedFrameController.setVerticalAlignment(frameId, VerticalAlign.justify);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledWith(frameId, VerticalAlign.justify);
    });
    it('Should be possible to set the min value for copyfitting', async () => {
        await mockedFrameController.setMinCopyfitting(frameId, '0.5');
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledWith(frameId, 0.5);
    });
    it('Should be possible to set the max value for copyfitting', async () => {
        await mockedFrameController.setMaxCopyfitting(frameId, '5.0');
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledWith(frameId, 5.0);
    });
    it('Should be possible to enable copyfittyng with a boolean', async () => {
        await mockedFrameController.setEnableCopyfitting(frameId, true);
        expect(mockedEditorApi.setEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setEnableCopyfitting).toHaveBeenCalledWith(frameId, true);
    });
    it('Should be possible to reset the minvalue for copyfitting', async () => {
        await mockedFrameController.resetMinCopyfitting(frameId);
        expect(mockedEditorApi.resetMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetMinCopyfitting).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the maxvalue for copyfitting', async () => {
        await mockedFrameController.resetMaxCopyfitting(frameId);
        expect(mockedEditorApi.resetMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetMaxCopyfitting).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reset the copyfitting toggle', async () => {
        await mockedFrameController.resetEnableCopyfitting(frameId);
        expect(mockedEditorApi.resetEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetEnableCopyfitting).toHaveBeenCalledWith(frameId);
    });
    it('Should be possible to reorder the frames', async () => {
        await mockedFrameController.reorderFrames(1, [frameId]);
        expect(mockedEditorApi.reorderFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.reorderFrames).toHaveBeenCalledWith(1, [frameId]);
    });
    it('Should be possible to set the frame Z index', async () => {
        await mockedFrameController.setFrameZIndex(frameId, UpdateZIndexMethod.sendBackward);
        expect(mockedEditorApi.setFrameZIndex).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameZIndex).toHaveBeenCalledWith(frameId, UpdateZIndexMethod.sendBackward);
    });
    it('Should be possible to set an image to the frame using a connector', async () => {
        await mockedFrameController.setImageFromConnector(frameId, 'connector id', 'asset id');
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(
            frameId,
            JSON.stringify({
                assetId: 'asset id',
                connectorId: 'connector id',
                sourceType: ImageSourceTypeEnum.connector,
            }),
        );
    });
    it('Should be possible to set an image to the frame using a url', async () => {
        await mockedFrameController.setImageFromUrl(frameId, 'image url');
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(
            frameId,
            JSON.stringify({ url: 'image url', sourceType: ImageSourceTypeEnum.url }),
        );
    });
    it('Should be possible to remove an image source on a frame', async () => {
        await mockedFrameController.removeImageSource(frameId);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(frameId, null);
    });
    it('Should be possible to set the shape frame enable fill', async () => {
        await mockedFrameController.setShapeFrameEnableFill(frameId, true);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(frameId, JSON.stringify({ enableFill: true }));
    });
    it('Should be possible to set the shape frame fill color', async () => {
        const color = { color: { colorType: ColorType.rgb, r: 51, g: 51, b: 51 }, usageType: ColorUsageType.local };
        await mockedFrameController.setShapeFrameFillColor(frameId, color);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(frameId, JSON.stringify({ fillColor: color }));
    });
    it('Should be possible to set the stroke on a shapeFrame', async () => {
        await mockedFrameController.setShapeFrameEnableStroke(frameId, true);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
            frameId,
            JSON.stringify({ enableStroke: true }),
        );
    });
    it('Should be possible to set the stroke color', async () => {
        const color = { color: { colorType: ColorType.rgb, r: 51, g: 51, b: 51 }, usageType: ColorUsageType.local };
        await mockedFrameController.setShapeFrameStrokeColor(frameId, color);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(4);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(frameId, JSON.stringify({ fillColor: color }));
    });
    it('Should be possible to set the strokeweight', async () => {
        await mockedFrameController.setShapeFrameStrokeWeight(frameId, 10);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(5);
        expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(frameId, JSON.stringify({ strokeWeight: 10 }));
    });
    it('Should be possible to add blend mode to a specific frame', async () => {
        await mockedFrameController.setFrameBlendMode(frameId, BlendMode.darken);
        expect(mockedEditorApi.setFrameBlendMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameBlendMode).toHaveBeenCalledWith(frameId, BlendMode.darken);
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

        await mockedFrameController.setImageFromConnector(frameId, connectorId, assetId);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify(mockImageConnectorSource));
    });

    it('setImageFromUrl() redirects to EditorAPI.setImageSource() with ImageUrlSource param', async () => {
        const url = mockImageUrlSource.url;

        await mockedFrameController.setImageFromUrl(frameId, url);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(frameId, JSON.stringify(mockImageUrlSource));
    });

    it('removeImageSource() redirects to EditorAPI.setImageSource() with null param', async () => {
        await mockedFrameController.removeImageSource(frameId);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(frameId, null);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Returns null when user input doesnt contain any number', async () => {
        const responseX = await mockedFrameController.setFrameX(frameId, 'dasdsa');
        const responseY = await mockedFrameController.setFrameY(frameId, 'sdsadas');
        const responseWidth = await mockedFrameController.setFrameWidth(frameId, 'sd');
        const responseHeight = await mockedFrameController.setFrameHeight(frameId, 'dds');
        const responseRotation = await mockedFrameController.setFrameRotation(frameId, 'dsdsd');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedFrameController.setFrameRotation(frameId, '20/0');
        expect(responseRotation).toBeNull();
    });
});
