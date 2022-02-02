import { LayoutController } from '../../controllers/LayoutController';
import { SDK } from '../../index';
import { LayoutProperyNames } from '../../utils/enums';
import mockConfig from '../__mocks__/config';
import mockChild, { mockSelectPage } from '../__mocks__/FrameProperties';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);
    jest.spyOn(mockedSDK.layout, 'removeLayout');
    jest.spyOn(mockedSDK.layout, 'addLayout');
    jest.spyOn(mockedSDK.layout, 'setLayoutName');
    jest.spyOn(mockedSDK.layout, 'selectLayout');
    jest.spyOn(mockedSDK.layout, 'duplicateLayout');
    jest.spyOn(mockedSDK.layout, 'resetLayout');

    jest.spyOn(mockedSDK.layout, 'setLayoutHeight');
    jest.spyOn(mockedSDK.layout, 'setLayoutWidth');
    jest.spyOn(mockedSDK.layout, 'resetLayoutHeight');
    jest.spyOn(mockedSDK.layout, 'resetLayoutWidth');
    jest.spyOn(mockedSDK.layout, 'getLayoutPropertiesCalculatedValue');

    mockedSDK.children = mockChild;
    mockedSDK.layout = new LayoutController(mockChild, mockConfig);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Layout methods', () => {
    it('handles all layout methods', async () => {
        await mockedSDK.layout.removeLayout(1);
        expect(mockedSDK.layout.children.removeLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.addLayout(1);
        expect(mockedSDK.layout.children.addLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutName(1, 'TEST');
        expect(mockedSDK.layout.children.renameLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.selectLayout(1);
        expect(mockedSDK.layout.children.selectLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.duplicateLayout(1);
        expect(mockedSDK.layout.children.duplicateLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.resetLayout(1);
        expect(mockedSDK.children.resetLayout).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutHeight('32', mockSelectPage);
        expect(mockedSDK.children.setLayoutHeight).toHaveBeenCalledTimes(1);

        await mockedSDK.layout.setLayoutWidth('34', mockSelectPage);
        expect(mockedSDK.children.setLayoutWidth).toHaveBeenCalledTimes(1);
    });
});

describe('User inputs for Layout Properties', () => {
    it('Should calculate user Inputs and returns the calculated value', () => {
        const responseHeight = mockedSDK.layout.getLayoutPropertiesCalculatedValue(
            LayoutProperyNames.LAYOUT_HEIGHT,
            '11',
            mockSelectPage,
        );
        const responseWidth = mockedSDK.layout.getLayoutPropertiesCalculatedValue(
            LayoutProperyNames.LAYOUT_WIDTH,
            '5',
            mockSelectPage,
        );

        expect(responseHeight).toEqual(11);
        expect(responseWidth).toEqual(5);
    });
});
