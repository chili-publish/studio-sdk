import { EditorAPI, Id } from '../../types/CommonTypes';
import {
    BlendMode,
    FitMode,
    FrameTypeEnum,
    ImageSourceTypeEnum,
    UpdateZIndexMethod,
    VerticalAlign,
} from '../../types/FrameTypes';
import { FrameController } from '../../controllers/FrameController';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { mockImageConnectorSource, mockImageUrlSource } from '../__mocks__/MockImageFrameSource';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { ShapeType } from '../../types/ShapeTypes';

let id: Id;

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
    setFrameIsVisible: async () => getEditorResponseData(castToEditorResponse(null)),
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
    enterCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    applyCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    resetCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    cancelCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
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
    jest.spyOn(mockedEditorApi, 'setFrameIsVisible');
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
    jest.spyOn(mockedEditorApi, 'enterCropMode');
    jest.spyOn(mockedEditorApi, 'applyCropMode');
    jest.spyOn(mockedEditorApi, 'resetCropMode');
    jest.spyOn(mockedEditorApi, 'cancelCropMode');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FrameController', () => {
    it('Should be possible to create a frame', async () => {
        await mockedFrameController.create(FrameTypeEnum.image, 100, 100, 100, 100);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledWith(FrameTypeEnum.image, 100, 100, 100, 100);
    });
    it('Should be possible to create a ShapeFrame', async () => {
        await mockedFrameController.createShapeFrame(ShapeType.ellipse, 100, 100, 100, 100);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.addFrame).toHaveBeenCalledWith(ShapeType.ellipse, 100, 100, 100, 100);
    });

    it('Should be possible to get all frames', async () => {
        await mockedFrameController.getAll();
        expect(mockedEditorApi.getFrames).toHaveBeenCalledTimes(1);
    });
    it('Should be possible to get the selected frames', async () => {
        await mockedFrameController.getSelected();
        expect(mockedEditorApi.getSelectedFrames).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to get all frames by id', async () => {
        await mockedFrameController.getAllByPageId(id);
        expect(mockedEditorApi.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramesByPageId).toHaveBeenCalledWith(id);
    });

    it('Should be possible to get a frame by name', async () => {
        await mockedFrameController.getByName('frame');
        expect(mockedEditorApi.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFrameByName).toHaveBeenCalledWith('frame');
    });

    it('Should be possible to get a frame', async () => {
        await mockedFrameController.getById(id);
        expect(mockedEditorApi.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFrameById).toHaveBeenCalledWith(id);
    });

    it('Should be possible to get frame properties on the selected layout', async () => {
        await mockedFrameController.getPropertiesOnSelectedLayout();
        expect(mockedEditorApi.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to get frame properties by frame id', async () => {
        await mockedFrameController.getLayoutProperties('1', '2');
        expect(mockedEditorApi.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramePropertiesByFrameId).toHaveBeenCalledWith('1', '2');
    });

    it('Should be possible to get frame properties by layout id', async () => {
        await mockedFrameController.getAllLayoutProperties(id);
        expect(mockedEditorApi.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFramesProperties).toHaveBeenCalledWith(id);
    });
    it('Should be possible to set the frame height', async () => {
        await mockedFrameController.setHeight(id, '300');
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(id, 300);
    });
    it('Should be possible to set the frame rotation', async () => {
        await mockedFrameController.setRotation(id, '400');
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledWith(id, 400);
    });
    it('Should be possible to set the frame y property', async () => {
        await mockedFrameController.setY(id, '100');
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledWith(id, 100);
    });
    it('Should be possible to set the frame x property', async () => {
        await mockedFrameController.setX(id, '400');
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledWith(id, 400);
    });

    it('Should be possible to set the frame width', async () => {
        await mockedFrameController.setWidth(id, '332');
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledWith(id, 332);
    });
    it('Should be possible to set the frame height', async () => {
        await mockedFrameController.setHeight(id, '32');
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(id, 32);
    });

    it('Should be possible to set the name of the frame', async () => {
        await mockedFrameController.rename(id, 'TEST');
        expect(mockedEditorApi.renameFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.renameFrame).toHaveBeenCalledWith(id, 'TEST');
    });
    it('Should be possible to set the frame visibility (deprecated)', async () => {
        await mockedFrameController.setVisibility(id, false);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenCalledWith(id, false);
    });
    it('Should be possible to set the frame visibility', async () => {
        await mockedFrameController.setIsVisible(id, false);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenCalledWith(id, false);
    });
    it('Should be possible to remove a frame', async () => {
        await mockedFrameController.remove(id);
        expect(mockedEditorApi.removeFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFrame).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset a frame', async () => {
        await mockedFrameController.reset(id);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledWith(id);
    });
    it("Should be possible to reset a frame's x position", async () => {
        await mockedFrameController.resetX(id);
        expect(mockedEditorApi.resetFrameX).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameX).toHaveBeenCalledWith(id);
    });
    it("Should be possible to reset a frame's y position", async () => {
        await mockedFrameController.resetY(id);
        expect(mockedEditorApi.resetFrameY).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameY).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the frame rotation', async () => {
        await mockedFrameController.resetRotation(id);
        expect(mockedEditorApi.resetFrameRotation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameRotation).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the frame height', async () => {
        await mockedFrameController.resetHeight(id);
        expect(mockedEditorApi.resetFrameHeight).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameHeight).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the frame width', async () => {
        await mockedFrameController.resetWidth(id);
        expect(mockedEditorApi.resetFrameWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameWidth).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the frame size', async () => {
        await mockedFrameController.resetSize(id);
        expect(mockedEditorApi.resetFrameSize).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameSize).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the image frame fit mode', async () => {
        await mockedFrameController.resetImageFrameFitMode(id);
        expect(mockedEditorApi.resetImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetImageFrameFitMode).toHaveBeenCalledWith(id);
    });
    it('Should be possible to select a frame', async () => {
        await mockedFrameController.select(id);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledWith([id]);
    });
    it('Should be possible to select multiple frames at once', async () => {
        await mockedFrameController.selectMultiple([id]);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.selectFrames).toHaveBeenCalledWith([id]);
    });
    it('Should be possible to set the image frame fit mode', async () => {
        await mockedFrameController.setImageFrameFitMode(id, FitMode.fit);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledWith(id, FitMode.fit);
    });
    it('Should be possible to set the frame to constrain proportions', async () => {
        await mockedFrameController.setFrameConstrainProportions(id, true);
        expect(mockedEditorApi.setFrameConstrainProportions).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameConstrainProportions).toHaveBeenCalledWith(id, true);
    });
    it('Should be possible to set the vertical alignment of a frame', async () => {
        await mockedFrameController.setVerticalAlign(id, VerticalAlign.justify);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledWith(id, VerticalAlign.justify);
    });
    it('Should be possible to set the min value for copyfitting', async () => {
        await mockedFrameController.setMinCopyfitting(id, '0.5');
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledWith(id, 0.5);
    });
    it('Should be possible to set the max value for copyfitting', async () => {
        await mockedFrameController.setMaxCopyfitting(id, '5.0');
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledWith(id, 5.0);
    });
    it('Should be possible to enable copyfitting with a boolean', async () => {
        await mockedFrameController.setEnableCopyfitting(id, true);
        expect(mockedEditorApi.setEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setEnableCopyfitting).toHaveBeenCalledWith(id, true);
    });
    it('Should be possible to reset the minvalue for copyfitting', async () => {
        await mockedFrameController.resetMinCopyfitting(id);
        expect(mockedEditorApi.resetMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetMinCopyfitting).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the maxvalue for copyfitting', async () => {
        await mockedFrameController.resetMaxCopyfitting(id);
        expect(mockedEditorApi.resetMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetMaxCopyfitting).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reset the copyfitting toggle', async () => {
        await mockedFrameController.resetEnableCopyfitting(id);
        expect(mockedEditorApi.resetEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetEnableCopyfitting).toHaveBeenCalledWith(id);
    });
    it('Should be possible to reorder the frames', async () => {
        await mockedFrameController.reorderFrames(1, [id]);
        expect(mockedEditorApi.reorderFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.reorderFrames).toHaveBeenCalledWith(1, [id]);
    });
    it('Should be possible to set the frame Z index', async () => {
        await mockedFrameController.setZIndex(id, UpdateZIndexMethod.sendBackward);
        expect(mockedEditorApi.setFrameZIndex).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameZIndex).toHaveBeenCalledWith(id, UpdateZIndexMethod.sendBackward);
    });
    it('Should be possible to set an image to the frame using a connector', async () => {
        await mockedFrameController.setImageFromConnector(id, 'connector id', 'asset id');
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(
            id,
            JSON.stringify({
                id: 'connector id',
                assetId: 'asset id',
                type: ImageSourceTypeEnum.connector,
            }),
        );
    });
    it('Should be possible to set an image to the frame using a url', async () => {
        await mockedFrameController.setImageFromUrl(id, 'image url');
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(
            id,
            JSON.stringify({ url: 'image url', type: ImageSourceTypeEnum.url }),
        );
    });
    it('Should be possible to remove an image source on a frame', async () => {
        await mockedFrameController.removeImageSource(id);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(id, null);
    });
    it('Should be possible to set blend mode to a specific frame', async () => {
        await mockedFrameController.setBlendMode(id, BlendMode.darken);
        expect(mockedEditorApi.setFrameBlendMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameBlendMode).toHaveBeenCalledWith(id, BlendMode.darken);
    });

    it('Should be possible to enter cropping mode on a specific frame', async () => {
        await mockedFrameController.enterCropMode(id);
        expect(mockedEditorApi.enterCropMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.enterCropMode).toHaveBeenCalledWith(id);
    });

    it('Should be possible to apply the current image crop to the frame', async () => {
        await mockedFrameController.applyCropMode();
        expect(mockedEditorApi.applyCropMode).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to reset cropping mode on a specific frame', async () => {
        await mockedFrameController.resetCropMode(id);
        expect(mockedEditorApi.resetCropMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetCropMode).toHaveBeenCalledWith(id);
    });

    it('Should be possible to cancel the current image crop', async () => {
        await mockedFrameController.exitCropMode();
        expect(mockedEditorApi.cancelCropMode).toHaveBeenCalledTimes(1);
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
        const connectorId = mockImageConnectorSource.id;
        const assetId = mockImageConnectorSource.assetId;

        await mockedFrameController.setImageFromConnector(id, connectorId, assetId);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(id, JSON.stringify(mockImageConnectorSource));
    });

    it('setImageFromUrl() redirects to EditorAPI.setImageSource() with ImageUrlSource param', async () => {
        const url = mockImageUrlSource.url;

        await mockedFrameController.setImageFromUrl(id, url);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(id, JSON.stringify(mockImageUrlSource));
    });

    it('removeImageSource() redirects to EditorAPI.setImageSource() with null param', async () => {
        await mockedFrameController.removeImageSource(id);

        expect(mockedEditorApi.setImageSource).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageSource).toHaveBeenCalledWith(id, null);
    });
});

describe('User inputs for Frame Properties', () => {
    it("Returns null when user input doesn't contain any number", async () => {
        const responseX = await mockedFrameController.setX(id, 'test');
        const responseY = await mockedFrameController.setY(id, 'test');
        const responseWidth = await mockedFrameController.setWidth(id, 'test');
        const responseHeight = await mockedFrameController.setHeight(id, 'test');
        const responseRotation = await mockedFrameController.setRotation(id, 'test');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedFrameController.setRotation(id, '20/0');
        expect(responseRotation).toBeNull();
    });
});
