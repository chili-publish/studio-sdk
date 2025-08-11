import { FrameController } from '../../controllers/FrameController';
import { BarcodeType } from '../../types/BarcodeTypes';
import { ColorUsage, ColorUsageType } from '../../types/ColorStyleTypes';
import { EditorAPI, Id } from '../../types/CommonTypes';
import {
    AnchorTargetEdgeType,
    AutoGrowDirection,
    BlendMode,
    CropType,
    FitMode,
    FitModePosition,
    FrameAnchorProperties,
    FrameAnchorTarget,
    FrameAnchorType,
    FrameTypeEnum,
    ImageSourceTypeEnum,
    PageAnchorTarget,
    UpdateZIndexMethod,
    VerticalAlign,
} from '../../types/FrameTypes';
import { ShapeType } from '../../types/ShapeTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { mockImageConnectorSource, mockImageUrlSource } from '../__mocks__/MockImageFrameSource';

let id: Id;

let mockedFrameController: FrameController;

const mockedEditorApi: EditorAPI = {
    addFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    addBarcodeFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateFrames: async () => getEditorResponseData(castToEditorResponse(null)),
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
    removeFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrame: async () => getEditorResponseData(castToEditorResponse(null)),
    resetFrameTransformation: async () => getEditorResponseData(castToEditorResponse(null)),
    resetImageFrameFitMode: async () => getEditorResponseData(castToEditorResponse(null)),
    removeImageSource: async () => getEditorResponseData(castToEditorResponse(null)),
    selectFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    selectMultipleFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    deselectFrames: async () => getEditorResponseData(castToEditorResponse(null)),
    setFrameName: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageFrameFitMode: async () => getEditorResponseData(castToEditorResponse(null)),
    setImageFrameFitModePosition: async () => getEditorResponseData(castToEditorResponse(null)),
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
    cancelCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    enterSubjectMode: async () => getEditorResponseData(castToEditorResponse(null)),
    applySubjectMode: async () => getEditorResponseData(castToEditorResponse(null)),
    cancelSubjectMode: async () => getEditorResponseData(castToEditorResponse(null)),
    resetCropMode: async () => getEditorResponseData(castToEditorResponse(null)),
    updateAutoGrowSettings: async () => getEditorResponseData(castToEditorResponse(null)),
    updateFrameShadowSettings: async () => getEditorResponseData(castToEditorResponse(null)),
    setAnchorProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    getFrameConfiguration: async () => getEditorResponseData(castToEditorResponse(null)),
    resetAssetCropOverride: async () => getEditorResponseData(castToEditorResponse(null)),
    resetAllAssetCropOverrides: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedFrameController = new FrameController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'addFrame');
    jest.spyOn(mockedEditorApi, 'addBarcodeFrame');
    jest.spyOn(mockedEditorApi, 'duplicateFrames');
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
    jest.spyOn(mockedEditorApi, 'removeFrames');
    jest.spyOn(mockedEditorApi, 'resetFrame');
    jest.spyOn(mockedEditorApi, 'resetFrameTransformation');
    jest.spyOn(mockedEditorApi, 'resetImageFrameFitMode');
    jest.spyOn(mockedEditorApi, 'removeImageSource');
    jest.spyOn(mockedEditorApi, 'selectFrames');
    jest.spyOn(mockedEditorApi, 'selectMultipleFrames');
    jest.spyOn(mockedEditorApi, 'deselectFrames');
    jest.spyOn(mockedEditorApi, 'setFrameName');
    jest.spyOn(mockedEditorApi, 'setImageFrameFitMode');
    jest.spyOn(mockedEditorApi, 'setImageFrameFitModePosition');
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
    jest.spyOn(mockedEditorApi, 'cancelCropMode');
    jest.spyOn(mockedEditorApi, 'enterSubjectMode');
    jest.spyOn(mockedEditorApi, 'applySubjectMode');
    jest.spyOn(mockedEditorApi, 'cancelSubjectMode');
    jest.spyOn(mockedEditorApi, 'resetCropMode');
    jest.spyOn(mockedEditorApi, 'updateAutoGrowSettings');
    jest.spyOn(mockedEditorApi, 'updateFrameShadowSettings');
    jest.spyOn(mockedEditorApi, 'setAnchorProperties');
    jest.spyOn(mockedEditorApi, 'getFrameConfiguration');
    jest.spyOn(mockedEditorApi, 'resetAssetCropOverride');
    jest.spyOn(mockedEditorApi, 'resetAllAssetCropOverrides');

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

    it('Should be possible to create a barcode frame', async () => {
        await mockedFrameController.createBarcodeFrame(BarcodeType.ean13, { x: 100, y: 101 });
        expect(mockedEditorApi.addBarcodeFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.addBarcodeFrame).toHaveBeenCalledWith(BarcodeType.ean13, 100, 101);
    });

    it('Should be possible to duplicate a list of frames', async () => {
        await mockedFrameController.duplicateFrames(['1']);
        expect(mockedEditorApi.duplicateFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.duplicateFrames).toHaveBeenCalledWith(['1']);
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
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(id, '300');
    });

    it('Should be possible to set the frame rotation', async () => {
        await mockedFrameController.setRotation(id, '400');
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameRotation).toHaveBeenCalledWith(id, '400');
    });

    it('Should be possible to set the frame y property', async () => {
        await mockedFrameController.setY(id, '100');
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameY).toHaveBeenCalledWith(id, '100');
    });

    it('Should be possible to set the frame x property', async () => {
        await mockedFrameController.setX(id, '400');
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameX).toHaveBeenCalledWith(id, '400');
    });

    it('Should be possible to set the frame width', async () => {
        await mockedFrameController.setWidth(id, '332');
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameWidth).toHaveBeenCalledWith(id, '332');
    });

    it('Should be possible to set the frame height', async () => {
        await mockedFrameController.setHeight(id, '32');
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.setFrameHeight).toHaveBeenCalledWith(id, '32');
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
        expect(mockedEditorApi.removeFrames).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.removeFrames).toHaveBeenCalledWith([id]);
    });

    it('Should be possible to remove frames', async () => {
        await mockedFrameController.removeFrames([id]);
        expect(mockedEditorApi.removeFrames).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.removeFrames).toHaveBeenCalledWith([id]);
    });

    it('Should be possible to reset a frame', async () => {
        await mockedFrameController.reset(id);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrame).toHaveBeenCalledWith(id);
    });

    it("Should be possible to reset a frame's x position", async () => {
        await mockedFrameController.resetX(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it("Should be possible to reset a frame's y position", async () => {
        await mockedFrameController.resetY(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset the frame rotation', async () => {
        await mockedFrameController.resetRotation(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset the frame height', async () => {
        await mockedFrameController.resetHeight(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(4);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset the frame width', async () => {
        await mockedFrameController.resetWidth(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(5);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset the frame size', async () => {
        await mockedFrameController.resetSize(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(6);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset the frame size', async () => {
        await mockedFrameController.resetTransformation(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(7);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledWith(id);
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

    it('Should be possible to deselect all frames', async () => {
        await mockedFrameController.deselectAll();
        expect(mockedEditorApi.deselectFrames).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to set the image frame fit mode', async () => {
        await mockedFrameController.setImageFrameFitMode(id, FitMode.fit);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageFrameFitMode).toHaveBeenCalledWith(id, FitMode.fit);
    });

    it('Should be possible to set the image frame fit mode position', async () => {
        await mockedFrameController.setImageFrameFitModePosition(id, FitModePosition.bottomCenter);
        expect(mockedEditorApi.setImageFrameFitModePosition).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setImageFrameFitModePosition).toHaveBeenCalledWith(id, FitModePosition.bottomCenter);
    });

    it('Should throw when trying to set the frame to constrain proportions - deprecated', async () => {
        await expect(mockedFrameController.setFrameConstrainProportions(id, true)).rejects.toThrow();
    });

    it('Should be possible to set the vertical alignment of a frame', async () => {
        await mockedFrameController.setVerticalAlign(id, VerticalAlign.justify);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setVerticalAlignment).toHaveBeenCalledWith(id, VerticalAlign.justify);
    });

    it('Should be possible to set the min value for copyfitting', async () => {
        await mockedFrameController.setMinCopyfitting(id, '0.5%');
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMinCopyfitting).toHaveBeenCalledWith(id, '0.5%');
    });

    it('Should be possible to set the max value for copyfitting', async () => {
        await mockedFrameController.setMaxCopyfitting(id, '5.0%');
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setMaxCopyfitting).toHaveBeenCalledWith(id, '5.0%');
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
        expect(mockedEditorApi.enterCropMode).toHaveBeenCalledWith(id, CropType.frameCrop);
    });

    it('Should be possible to apply the current image crop to the frame', async () => {
        await mockedFrameController.applyCropMode();
        expect(mockedEditorApi.applyCropMode).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to cancel the current image crop', async () => {
        await mockedFrameController.exitCropMode();
        expect(mockedEditorApi.cancelCropMode).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to enter subject mode on a specific frame', async () => {
        await mockedFrameController.enterSubjectMode(id);
        expect(mockedEditorApi.enterSubjectMode).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.enterSubjectMode).toHaveBeenCalledWith(id);
    });

    it('Should be possible to apply the current subject area to the frame', async () => {
        await mockedFrameController.applySubjectMode();
        expect(mockedEditorApi.applySubjectMode).toHaveBeenCalledTimes(1);
    });

    it('Should be possible to reset asset crop override', async () => {
        await mockedFrameController.resetAssetCropOverride(id);
        expect(mockedEditorApi.resetAssetCropOverride).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetAssetCropOverride).toHaveBeenCalledWith(id);
    });

    it('Should be possible to reset all asset crop overrides', async () => {
        await mockedFrameController.resetAllAssetCropOverrides(id);
        expect(mockedEditorApi.resetAllAssetCropOverrides).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetAllAssetCropOverrides).toHaveBeenCalledWith(id);
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

describe('Auto grow updating', () => {
    it('should be possible to update the enabled auto grow setting', async () => {
        const enabled = true;

        await mockedFrameController.setEnableAutoGrow(id, enabled);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ enabled: { value: enabled } }),
        );
    });

    it('should be possible to update the minWidth auto grow setting', async () => {
        const minWidth = '100';

        await mockedFrameController.setAutoGrowMinWidth(id, minWidth);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ minWidth: { value: minWidth } }),
        );
    });

    it('should be possible to update the maxWidth auto grow setting', async () => {
        const maxWidth = '200';

        await mockedFrameController.setAutoGrowMaxWidth(id, maxWidth);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ maxWidth: { value: maxWidth } }),
        );
    });

    it('should be possible to update the minHeight auto grow setting', async () => {
        const minHeight = '50';

        await mockedFrameController.setAutoGrowMinHeight(id, minHeight);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(4);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ minHeight: { value: minHeight } }),
        );
    });

    it('Should be possible to update the maxHeight auto grow setting', async () => {
        const maxHeight = '100';

        await mockedFrameController.setAutoGrowMaxHeight(id, maxHeight);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(5);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ maxHeight: { value: maxHeight } }),
        );
    });

    it('Should be possible to update the directions auto grow setting', async () => {
        const directions = [AutoGrowDirection.left, AutoGrowDirection.right];

        await mockedFrameController.setAutoGrowDirections(id, directions);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledTimes(6);
        expect(mockedEditorApi.updateAutoGrowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ directions: { value: directions } }),
        );
    });
});

describe('Shadow settings updating', () => {
    it('should be possible to update the enabled shadow setting', async () => {
        const enabled = true;

        await mockedFrameController.setShadowEnabled(id, enabled);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ enabled: { value: enabled } }),
        );
    });

    it('should be possible to update the distance shadow setting', async () => {
        const distance = '10';

        await mockedFrameController.setShadowDistance(id, distance);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ distance: { value: distance } }),
        );
    });

    it('should be possible to update the angle degrees shadow setting', async () => {
        const angleDegrees = 45;

        await mockedFrameController.setShadowAngleDegrees(id, angleDegrees);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledTimes(3);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ angleDegrees: { value: angleDegrees } }),
        );
    });

    it('should be possible to update the blur radius shadow setting', async () => {
        const blurRadius = 5;

        await mockedFrameController.setShadowBlurRadius(id, blurRadius);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledTimes(4);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ blurRadius: { value: blurRadius } }),
        );
    });

    it('should be possible to update the color shadow setting', async () => {
        const color: ColorUsage = {
            id: 'color-id',
            type: ColorUsageType.brandKit,
            opacity: 100,
        };

        await mockedFrameController.setShadowColor(id, color);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledTimes(5);
        expect(mockedEditorApi.updateFrameShadowSettings).toHaveBeenCalledWith(
            id,
            JSON.stringify({ color: { value: color } }),
        );
    });
});

describe('Anchoring', () => {
    it('should be possible to set the vertical anchor settings', async () => {
        const anchorType = FrameAnchorType.startAndEnd;
        const startTarget = new FrameAnchorTarget('target-id', AnchorTargetEdgeType.end);
        const endTarget = new PageAnchorTarget();

        await mockedFrameController.setVerticalAnchor(id, anchorType, startTarget, endTarget);
        expect(mockedEditorApi.setAnchorProperties).toHaveBeenCalledTimes(1);

        const expectedProperties: FrameAnchorProperties = {
            horizontal: false,
            type: anchorType,
            target: startTarget,
            endTarget: endTarget,
        };
        expect(mockedEditorApi.setAnchorProperties).toHaveBeenCalledWith(id, JSON.stringify(expectedProperties));
    });

    it('should be possible to set the horizontal anchor settings', async () => {
        const anchorType = FrameAnchorType.center;
        const startTarget = new FrameAnchorTarget('target-id', AnchorTargetEdgeType.start);

        await mockedFrameController.setHorizontalAnchor(id, anchorType, startTarget);
        expect(mockedEditorApi.setAnchorProperties).toHaveBeenCalledTimes(2);

        const expectedProperties: FrameAnchorProperties = {
            horizontal: true,
            type: anchorType,
            target: startTarget,
        };
        expect(mockedEditorApi.setAnchorProperties).toHaveBeenCalledWith(id, JSON.stringify(expectedProperties));
    });

    it('should be possible to reset anchor settings', async () => {
        await mockedFrameController.resetAnchoring(id);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.resetFrameTransformation).toHaveBeenLastCalledWith(id);
    });

    it('should be possible to reset a frame visibility', async () => {
        await mockedFrameController.resetVisibility(id);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.setFrameIsVisible).toHaveBeenLastCalledWith(id, null);
    });

    it('should be possible to get frame configuration', async () => {
        await mockedFrameController.getConfiguration(id);
        expect(mockedEditorApi.getFrameConfiguration).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.getFrameConfiguration).toHaveBeenCalledWith(id);
    });
});
