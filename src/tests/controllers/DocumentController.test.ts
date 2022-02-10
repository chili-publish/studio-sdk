import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { mockDocument } from '../__mocks__/mockDocument';
import { SDK } from '../../index';
import { DocumentController } from '../../controllers/DocumentController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.document, 'getCurrentDocumentState');
    jest.spyOn(mockedSDK.document, 'loadDocument');

    mockedSDK.children = mockChild;
    mockedSDK.document = new DocumentController(mockChild, mockConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    it('retrieve current document state', async () => {
        await mockedSDK.document.getCurrentDocumentState();
        expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);
    });

    it('load provided document', async () => {
        await mockedSDK.document.loadDocument(mockDocument);
        expect(mockedSDK.document.children.loadDocument).toHaveBeenCalledTimes(1);
    });
});
