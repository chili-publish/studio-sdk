import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';
import { SDK } from '../../index';
import DocumentController from '../../controllers/DocumentController';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.document, 'saveDocument');

    mockedSDK.children = mockChild;
    mockedSDK.document = new DocumentController(mockChild, mockConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document controller', () => {
    it('retrieve current document state', async () => {
        await mockedSDK.document.saveDocument();
        expect(mockedSDK.document.children.getCurrentDocumentState).toHaveBeenCalledTimes(1);
    });
});
