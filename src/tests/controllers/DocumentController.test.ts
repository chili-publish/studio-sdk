import { mockDocument } from '../__mocks__/mockDocument';
import { DocumentController } from '../../controllers/DocumentController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedDocumentController: DocumentController;
const mockFetch = jest.fn();

const mockedEditorApi: EditorAPI = {
    getCurrentDocumentState: async () => getEditorResponseData(castToEditorResponse(null)),
    loadDocument: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDocumentController = new DocumentController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getCurrentDocumentState');
    jest.spyOn(mockedEditorApi, 'loadDocument');
    global.fetch = mockFetch;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    describe('document getters', () => {
        it('retrieve current document state', async () => {
            await mockedDocumentController.getCurrentState();
            expect(mockedEditorApi.getCurrentDocumentState).toHaveBeenCalledTimes(1);
        });
    });

    it('load provided document', async () => {
        await mockedDocumentController.load(mockDocument);
        expect(mockedEditorApi.loadDocument).toHaveBeenCalledTimes(1);
        expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(mockDocument, false);

        await mockedDocumentController.load(mockDocument, true);
        expect(mockedEditorApi.loadDocument).toHaveBeenCalledTimes(2);
        expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(mockDocument, true);
    });
});
