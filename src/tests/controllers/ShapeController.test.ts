import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ShapeController } from '../../controllers/ShapeController';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { CornerRadiusUpdateModel } from '../../types/ShapeTypes';

let frameId: Id;

let mockedShapeController: ShapeController;

const mockedEditorApi: EditorAPI = {
    setShapeProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setShapeCorners: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedShapeController = new ShapeController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'setShapeProperties');
    jest.spyOn(mockedEditorApi, 'setShapeCorners');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('ShapeController', () => {
    describe('setShapeProperties', () => {
        it('Should be possible to enable fill', async () => {
            await mockedShapeController.setEnableFill(frameId, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ enableFill: true }),
            );
        });
        it('Should be possible to set the shape frame fill color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, usageType: ColorUsageType.local };
            await mockedShapeController.setFillColor(frameId, color);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ fillColor: color }),
            );
        });
        it('Should be possible to enable stroke', async () => {
            await mockedShapeController.setEnableStroke(frameId, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(3);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ enableStroke: true }),
            );
        });
        it('Should be possible to set the stroke color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, usageType: ColorUsageType.local };
            await mockedShapeController.setStrokeColor(frameId, color);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ fillColor: color }),
            );
        });
        it('Should be possible to set the stroke weight', async () => {
            await mockedShapeController.setStrokeWeight(frameId, 10);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(5);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ strokeWeight: 10 }),
            );
        });

        it('Should be possible to set the flag allCornersSame', async () => {
            await mockedShapeController.setFlagAllCornersSame(frameId, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(6);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                frameId,
                JSON.stringify({ allCornersSame: true }),
            );
        });
    });
    describe('setShapeCorners', () => {
        it('Should be possible to set radius for all corners', async () => {
            const radius: CornerRadiusUpdateModel = { radiusAll: 5 };
            await mockedShapeController.setRadiusAll(frameId, radius.radiusAll ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(frameId, JSON.stringify(radius));
        });
        it('Should be possible to set top left radius', async () => {
            const radius: CornerRadiusUpdateModel = { topLeft: 5 };
            await mockedShapeController.setRadiusTopLeft(frameId, radius.topLeft ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(frameId, JSON.stringify(radius));
        });
        it('Should be possible to set bottom left radius', async () => {
            const radius: CornerRadiusUpdateModel = { bottomLeft: 5 };
            await mockedShapeController.setRadiusBottomLeft(frameId, radius.bottomLeft ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(3);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(frameId, JSON.stringify(radius));
        });
        it('Should be possible to set top right radius', async () => {
            const radius: CornerRadiusUpdateModel = { topRight: 5 };
            await mockedShapeController.setRadiusTopRight(frameId, radius.topRight ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(frameId, JSON.stringify(radius));
        });
        it('Should be possible to set bottom right radius', async () => {
            const radius: CornerRadiusUpdateModel = { bottomRight: 5 };
            await mockedShapeController.setRadiusBottomRight(frameId, radius.bottomRight ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(frameId, JSON.stringify(radius));
        });
    });
});
