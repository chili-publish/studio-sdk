import LayoutController from '../../controllers/LayoutController';
import { SDK } from '../../index';
import mockConfig from '../__mocks__/config';
import mockChild from '../__mocks__/FrameProperties';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.layout, 'removeLayout');
    jest.spyOn(mockedSDK.layout, 'addLayout');
    jest.spyOn(mockedSDK.layout, 'renameLayout');
    jest.spyOn(mockedSDK.layout, 'selectLayout');
    jest.spyOn(mockedSDK.layout, 'duplicateLayout');
    jest.spyOn(mockedSDK.layout, 'resetLayout');
    mockedSDK.children = mockChild;
    mockedSDK.layout = new LayoutController(mockChild);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Layout methods', () => {
    it('handles all layout methods', async () => {
        await mockedSDK.layout.removeLayout('1');
        expect(mockedSDK.layout.children.removeLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.addLayout('1');
        expect(mockedSDK.layout.children.addLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.renameLayout('1', 'TEST');
        expect(mockedSDK.layout.children.renameLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.selectLayout('1');
        expect(mockedSDK.layout.children.selectLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.duplicateLayout('1');
        expect(mockedSDK.layout.children.duplicateLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.resetLayout('1');
        expect(mockedSDK.children.resetLayout).toHaveBeenCalledTimes(1);
    });
});
