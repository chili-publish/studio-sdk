import { mockDocument } from '../__mocks__/mockDocument';
import { DocumentController } from '../../controllers/DocumentController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedDocumentController: DocumentController;
const mockFetch = jest.fn();

const mockedEditorApi: EditorAPI = {
    getCurrentDocumentState: async () => getEditorResponseData(castToEditorResponse(null)),
    loadDocument: async () => getEditorResponseData(castToEditorResponse(null)),
    loadDocumentKeepConnectors: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDocumentController = new DocumentController(mockedEditorApi);
    jest.spyOn(mockedEditorApi, 'getCurrentDocumentState');
    jest.spyOn(mockedEditorApi, 'loadDocument');
    jest.spyOn(mockedEditorApi, 'loadDocumentKeepConnectors');
    global.fetch = mockFetch;
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    describe('document getters', () => {
        it('retrieves current document state', async () => {
            await mockedDocumentController.getCurrentState();
            expect(mockedEditorApi.getCurrentDocumentState).toHaveBeenCalledTimes(1);
        });
    });

    describe('load provided document', () => {
        it('it stringifies the doc if it is an object', async () => {
            await mockedDocumentController.load(JSON.parse(mockDocument));
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(mockDocument);
        });

        it('it calls loadDocument', async () => {
            await mockedDocumentController.load(mockDocument);
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(mockDocument);
        });

        it('it calls loadDocumentKeepConnectors', async () => {
            await mockedDocumentController.load(mockDocument, true);
            expect(mockedEditorApi.loadDocumentKeepConnectors).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.loadDocumentKeepConnectors).toHaveBeenCalledWith(mockDocument);
        });
    });
});
