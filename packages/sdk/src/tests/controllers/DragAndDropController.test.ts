import { DragAndDropController } from '../../controllers/DragAndDropController';
import { EditorAPI } from '../../types/CommonTypes';
import { DragAndDropContent, DragAndDropUpdate } from '../../types/DragAndDropTypes';
import { ImageSourceTypeEnum } from '../../types/FrameTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

let mockedDragAndDropController: DragAndDropController;

const mockedEditorApi: EditorAPI = {
    startDragOperation: async () => getEditorResponseData(castToEditorResponse(null)),
    updateDragOperation: async () => getEditorResponseData(castToEditorResponse(null)),
    completeDragOperation: async () =>
        getEditorResponseData(castToEditorResponse({ operation: 'added', frameId: 'frame' })),
    cancelDragOperation: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDragAndDropController = new DragAndDropController(mockedEditorApi);

    jest.spyOn(mockedEditorApi, 'startDragOperation');
    jest.spyOn(mockedEditorApi, 'updateDragOperation');
    jest.spyOn(mockedEditorApi, 'completeDragOperation');
    jest.spyOn(mockedEditorApi, 'cancelDragOperation');
});

afterAll(() => {
    jest.restoreAllMocks();
});
afterEach(() => {
    jest.clearAllMocks();
});

describe('DragAndDropController', () => {
    it('start sends the content as JSON', async () => {
        const content: DragAndDropContent = {
            type: 'image',
            source: { type: ImageSourceTypeEnum.connector, id: 'connector', assetId: 'asset' },
            name: 'Sunset',
            replaceKey: 'alt',
        };
        await mockedDragAndDropController.start(content);
        expect(mockedEditorApi.startDragOperation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.startDragOperation).toHaveBeenCalledWith(JSON.stringify(content));
    });

    it('update sends the position as JSON', async () => {
        const update: DragAndDropUpdate = {
            x: 10,
            y: 20,
            modifiers: { alt: true },
            insideCanvas: true,
        };
        await mockedDragAndDropController.update(update);
        expect(mockedEditorApi.updateDragOperation).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.updateDragOperation).toHaveBeenCalledWith(JSON.stringify(update));
    });

    it('complete answers what the drop did', async () => {
        const result = await mockedDragAndDropController.complete();
        expect(mockedEditorApi.completeDragOperation).toHaveBeenCalledTimes(1);
        expect(result.parsedData).toEqual({ operation: 'added', frameId: 'frame' });
    });

    it('cancel forwards', async () => {
        await mockedDragAndDropController.cancel();
        expect(mockedEditorApi.cancelDragOperation).toHaveBeenCalledTimes(1);
    });
});
