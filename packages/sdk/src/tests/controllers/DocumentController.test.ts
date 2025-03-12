import { mockDocument } from '../__mocks__/mockDocument';
import { DocumentController } from '../../controllers/DocumentController';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { LayoutIntent, MeasurementUnit } from '../../types/LayoutTypes';

let mockedDocumentController: DocumentController;
const mockFetch = jest.fn();

const mockedEditorApi: EditorAPI = {
    getCurrentDocumentState: async () => getEditorResponseData(castToEditorResponse(null)),
    loadDocument: async () => getEditorResponseData(castToEditorResponse(null)),
    createAndLoadDocument: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedDocumentController = new DocumentController(Promise.resolve(mockedEditorApi));
    jest.spyOn(mockedEditorApi, 'getCurrentDocumentState');
    jest.spyOn(mockedEditorApi, 'loadDocument');
    jest.spyOn(mockedEditorApi, 'createAndLoadDocument');
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
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(
                mockDocument,
                JSON.stringify({ keepConnectors: false }),
            );
        });

        it('it calls loadDocument with load options', async () => {
            await mockedDocumentController.load(mockDocument, { keepConnectors: true });
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.loadDocument).toHaveBeenCalledWith(
                mockDocument,
                JSON.stringify({ keepConnectors: true }),
            );
        });

        it('is possible to create a new document with a layout preset', async () => {
            const preset = {
                name: 'name',
                intent: LayoutIntent.print,
                unit: MeasurementUnit.mm,
                width: '100 mm',
                height: '200 mm',
            };
            await mockedDocumentController.createAndLoad(preset);
            expect(mockedEditorApi.createAndLoadDocument).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.createAndLoadDocument).toHaveBeenCalledWith(JSON.stringify(preset));
        });
    });
});
