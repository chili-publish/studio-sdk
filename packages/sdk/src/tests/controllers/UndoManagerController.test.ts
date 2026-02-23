import { AdvancedUndoManagerController, UndoManagerController } from '../../controllers/UndoManagerController';
// eslint-disable-next-line import/no-named-as-default
import SDK from '../../sdk';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import mockConfig from '../__mocks__/Config';

describe('UndoManagerController', () => {
    let mockedUndoManagerController: UndoManagerController;
    let mockedAdvancedUndoManagerController: AdvancedUndoManagerController;
    const mockSDK = new SDK(mockConfig);

    const mockEditorApi: EditorAPI = {
        undo: async () => getEditorResponseData(castToEditorResponse(null)),
        redo: async () => getEditorResponseData(castToEditorResponse(null)),
        begin: async () => getEditorResponseData(castToEditorResponse(null)),
        beginIfNoneActive: async () => getEditorResponseData(castToEditorResponse(null)),
        setCustomUndoData: async () => getEditorResponseData(castToEditorResponse(null)),
        end: async () => getEditorResponseData(castToEditorResponse(null)),
        abort: async () => getEditorResponseData(castToEditorResponse(null)),
        pause: async () => getEditorResponseData(castToEditorResponse(null)),
        resume: async () => getEditorResponseData(castToEditorResponse(null)),
        clear: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedUndoManagerController = new UndoManagerController(mockEditorApi, mockSDK);
        mockedAdvancedUndoManagerController = new AdvancedUndoManagerController(mockEditorApi);
        jest.spyOn(mockEditorApi, 'undo');
        jest.spyOn(mockEditorApi, 'redo');
        jest.spyOn(mockEditorApi, 'begin');
        jest.spyOn(mockEditorApi, 'setCustomUndoData');
        jest.spyOn(mockEditorApi, 'beginIfNoneActive');
        jest.spyOn(mockEditorApi, 'end');
        jest.spyOn(mockEditorApi, 'abort');
        jest.spyOn(mockEditorApi, 'pause');
        jest.spyOn(mockEditorApi, 'resume');
        jest.spyOn(mockEditorApi, 'clear');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Undoes the last operation', async () => {
        await mockedUndoManagerController.undo();
        expect(mockEditorApi.undo).toHaveBeenCalledTimes(1);
    });

    it('Redoes the last operation', async () => {
        await mockedUndoManagerController.redo();
        expect(mockEditorApi.redo).toHaveBeenCalledTimes(1);
    });

    it('Records an operation', async () => {
        let dummy = false;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await mockedUndoManagerController.record('my undo operation', async (_) => {
            dummy = true;
        });

        expect(mockEditorApi.beginIfNoneActive).toHaveBeenCalledTimes(1);
        expect(dummy).toBe(true);
        expect(mockEditorApi.end).toHaveBeenCalledTimes(1);
    });

    it('Begins an operation', async () => {
        const operationName = 'operationName';

        await mockedAdvancedUndoManagerController.begin(operationName);
        expect(mockEditorApi.begin).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.begin).toHaveBeenCalledWith(operationName);
    });

    it('Begins an operation if none is active', async () => {
        const operationName = 'operationName';

        await mockedAdvancedUndoManagerController.beginIfNoneActive(operationName);
        expect(mockEditorApi.beginIfNoneActive).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.beginIfNoneActive).toHaveBeenCalledWith(operationName);
    });

    it('it sends the custom undo data', async () => {
        const key = 'key';
        const value = 'value';

        await mockedUndoManagerController.addCustomData(key, value);
        expect(mockEditorApi.setCustomUndoData).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setCustomUndoData).toHaveBeenCalledWith(key, value, false);
    });

    it('it pauses the undo manager', async () => {
        await mockedUndoManagerController.pause();
        expect(mockEditorApi.pause).toHaveBeenCalledTimes(1);
    });

    it('it resumes the undo manager', async () => {
        await mockedUndoManagerController.resume();
        expect(mockEditorApi.resume).toHaveBeenCalledTimes(1);
    });

    it('it clears the undo stack', async () => {
        await mockedUndoManagerController.clear();
        expect(mockEditorApi.clear).toHaveBeenCalledTimes(1);
    });

    describe('advanced methods', () => {
        it('begins an operation through advanced.begin', async () => {
            const operationName = 'operationName';

            await mockedUndoManagerController.advanced.begin(operationName);
            expect(mockEditorApi.begin).toHaveBeenCalledTimes(1);
            expect(mockEditorApi.begin).toHaveBeenCalledWith(operationName);
        });

        it('begins an operation if none is active through advanced.beginIfNoneActive', async () => {
            const operationName = 'operationName';

            await mockedUndoManagerController.advanced.beginIfNoneActive(operationName);
            expect(mockEditorApi.beginIfNoneActive).toHaveBeenCalledTimes(1);
            expect(mockEditorApi.beginIfNoneActive).toHaveBeenCalledWith(operationName);
        });

        it('ends the currently active recording operation through advanced.end', async () => {
            await mockedUndoManagerController.advanced.end();
            expect(mockEditorApi.end).toHaveBeenCalledTimes(1);
        });

        it('aborts the currently active recording operation through advanced.abort', async () => {
            await mockedUndoManagerController.advanced.abort();
            expect(mockEditorApi.abort).toHaveBeenCalledTimes(1);
        });
    });
});
