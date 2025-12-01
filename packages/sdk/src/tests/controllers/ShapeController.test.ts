import { EditorAPI, Id } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { ShapeController } from '../../controllers/ShapeController';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { CornerRadiusUpdateModel } from '../../types/ShapeTypes';

let id: Id;

let mockedShapeController: ShapeController;

const mockedEditorApi: EditorAPI = {
    setShapeProperties: async () => getEditorResponseData(castToEditorResponse(null)),
    setShapeCorners: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedShapeController = new ShapeController(Promise.resolve(mockedEditorApi));
    jest.spyOn(mockedEditorApi, 'setShapeProperties');
    jest.spyOn(mockedEditorApi, 'setShapeCorners');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('ShapeController', () => {
    describe('setShapeProperties', () => {
        it('Should be possible to enable fill', async () => {
            await mockedShapeController.setEnableFill(id, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(id, JSON.stringify({ enableFill: true }));
        });
        it('Should be possible to set the shape frame fill color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, type: ColorUsageType.local };
            await mockedShapeController.setFillColor(id, color);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(id, JSON.stringify({ fillColor: color }));
        });
        it('Should be possible to enable stroke', async () => {
            await mockedShapeController.setEnableStroke(id, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(3);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(id, JSON.stringify({ enableStroke: true }));
        });
        it('Should be possible to set the stroke color', async () => {
            const color = { color: { type: ColorType.rgb, r: 51, g: 51, b: 51 }, type: ColorUsageType.local };
            await mockedShapeController.setStrokeColor(id, color);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(id, JSON.stringify({ fillColor: color }));
        });
        it('Should be possible to set the stroke weight', async () => {
            await mockedShapeController.setStrokeWeight(id, 10);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(5);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(id, JSON.stringify({ strokeWeight: 10 }));
        });

        it('Should be possible to set the flag allCornersSame', async () => {
            await mockedShapeController.setFlagAllCornersSame(id, true);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledTimes(6);
            expect(mockedEditorApi.setShapeProperties).toHaveBeenCalledWith(
                id,
                JSON.stringify({ allCornersSame: true }),
            );
        });
    });
    describe('setShapeCorners', () => {
        it('Should be possible to set radius for all corners', async () => {
            const radius: CornerRadiusUpdateModel = { radiusAll: 5 };
            await mockedShapeController.setRadiusAll(id, radius.radiusAll ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(id, JSON.stringify(radius));
        });
        it('Should be possible to set top left radius', async () => {
            const radius: CornerRadiusUpdateModel = { topLeft: 5 };
            await mockedShapeController.setRadiusTopLeft(id, radius.topLeft ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(2);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(id, JSON.stringify(radius));
        });
        it('Should be possible to set bottom left radius', async () => {
            const radius: CornerRadiusUpdateModel = { bottomLeft: 5 };
            await mockedShapeController.setRadiusBottomLeft(id, radius.bottomLeft ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(3);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(id, JSON.stringify(radius));
        });
        it('Should be possible to set top right radius', async () => {
            const radius: CornerRadiusUpdateModel = { topRight: 5 };
            await mockedShapeController.setRadiusTopRight(id, radius.topRight ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(4);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(id, JSON.stringify(radius));
        });
        it('Should be possible to set bottom right radius', async () => {
            const radius: CornerRadiusUpdateModel = { bottomRight: 5 };
            await mockedShapeController.setRadiusBottomRight(id, radius.bottomRight ?? 5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledTimes(5);
            expect(mockedEditorApi.setShapeCorners).toHaveBeenCalledWith(id, JSON.stringify(radius));
        });
    });
});
