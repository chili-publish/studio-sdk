import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { BrandKitController } from '../../controllers/BrandKitController';
// eslint-disable-next-line import/no-named-as-default
import SDK from '../../sdk';
import mockConfig from '../__mocks__/Config';
import {
    mockCharacterStyles,
    mockColors,
    mockFonts,
    mockParagraphStyles,
    mockStudioBrandKit,
} from '../__mocks__/Brandkit';
import { StudioBrandKit } from '../../types/BrandKitTypes';

describe('BrandKitController', () => {
    let mockBrandKitController: BrandKitController;
    let mockEditorApi: EditorAPI;

    beforeEach(() => {
        const mockSDK = new SDK(mockConfig);
        mockEditorApi = {
            getColors: async () => getEditorResponseData(castToEditorResponse(mockColors)),
            removeColor: async () => getEditorResponseData(castToEditorResponse(null)),
            createColor: async () =>
                getEditorResponseData(castToEditorResponse('25e0d0f3-23e5-4c14-9578-2ca4bf3130b5')),
            updateColor: async (data) => getEditorResponseData(castToEditorResponse(data)),

            getFontFamilies: async () => getEditorResponseData(castToEditorResponse(mockFonts)),
            addFontFamily: async () =>
                getEditorResponseData(castToEditorResponse('614e0cba-37d3-45a7-b9af-ddf2bf76f7db')),
            removeFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
            fontConnectorDetail: async () =>
                getEditorResponseData(castToEditorResponse([{ familyName: 'Minion Pro' }])),

            getCharacterStyles: async () => getEditorResponseData(castToEditorResponse(mockCharacterStyles)),
            removeCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
            createCharacterStyle: async () => getEditorResponseData(castToEditorResponse('ID')),
            updateCharacterStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),

            getParagraphStyles: async () => getEditorResponseData(castToEditorResponse(mockParagraphStyles)),
            removeParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
            createParagraphStyle: async () => getEditorResponseData(castToEditorResponse('ID')),
            updateParagraphStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),

            beginIfNoneActive: async () => getEditorResponseData(castToEditorResponse(null)),

            undo: async () => getEditorResponseData(castToEditorResponse(null)),
            end: async () => getEditorResponseData(castToEditorResponse(null)),
        };

        jest.spyOn(mockEditorApi, 'getColors');
        jest.spyOn(mockEditorApi, 'removeColor');
        jest.spyOn(mockEditorApi, 'createColor');

        jest.spyOn(mockEditorApi, 'getFontFamilies');
        jest.spyOn(mockEditorApi, 'addFontFamily');
        jest.spyOn(mockEditorApi, 'removeFontFamily');
        jest.spyOn(mockEditorApi, 'fontConnectorDetail');

        jest.spyOn(mockEditorApi, 'getCharacterStyles');
        jest.spyOn(mockEditorApi, 'createCharacterStyle');
        jest.spyOn(mockEditorApi, 'removeCharacterStyle');
        jest.spyOn(mockEditorApi, 'updateCharacterStyle');

        jest.spyOn(mockEditorApi, 'getParagraphStyles');
        jest.spyOn(mockEditorApi, 'createParagraphStyle');
        jest.spyOn(mockEditorApi, 'removeParagraphStyle');
        jest.spyOn(mockEditorApi, 'updateParagraphStyle');

        jest.spyOn(mockEditorApi, 'beginIfNoneActive');
        jest.spyOn(mockEditorApi, 'end');
        jest.spyOn(mockEditorApi, 'undo');

        mockBrandKitController = new BrandKitController(mockEditorApi, mockSDK);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Should call the get method', async () => {
        const response = await mockBrandKitController.get();
        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getFontFamilies).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getParagraphStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getCharacterStyles).toHaveBeenCalledTimes(1);

        expect(response).toEqual(
            expect.objectContaining({
                data: JSON.stringify({
                    brandKit: {
                        colors: mockColors,
                        fonts: mockFonts,
                        paragraphStyles: mockParagraphStyles,
                        characterStyles: mockCharacterStyles,
                    },
                }),
            }),
        );
    });

    it('Should successfully remove brandkit content', async () => {
        await mockBrandKitController.remove();

        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getFontFamilies).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getParagraphStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getCharacterStyles).toHaveBeenCalledTimes(1);

        expect(mockEditorApi.removeColor).toHaveBeenCalledTimes(mockColors.length);
        expect(mockEditorApi.removeFontFamily).toHaveBeenCalledTimes(mockFonts.length);
        expect(mockEditorApi.removeParagraphStyle).toHaveBeenCalledTimes(mockParagraphStyles.length);
        expect(mockEditorApi.removeCharacterStyle).toHaveBeenCalledTimes(mockCharacterStyles.length);

        expect(
            (mockEditorApi.removeColor as jest.Mock<Promise<EditorResponse<null>>>).mock.calls.map((call) => call[0]),
        ).toEqual(mockColors.map((color) => color.id));

        expect(
            (mockEditorApi.removeFontFamily as jest.Mock<Promise<EditorResponse<null>>>).mock.calls.map(
                (call) => call[0],
            ),
        ).toEqual(mockFonts.map((font) => font.id));

        expect(
            (mockEditorApi.removeParagraphStyle as jest.Mock<Promise<EditorResponse<null>>>).mock.calls.map(
                (call) => call[0],
            ),
        ).toEqual(mockParagraphStyles.map((style) => style.id));

        expect(
            (mockEditorApi.removeCharacterStyle as jest.Mock<Promise<EditorResponse<null>>>).mock.calls.map(
                (call) => call[0],
            ),
        ).toEqual(mockCharacterStyles.map((style) => style.id));
    });

    it('Should successfully set brandkit content', async () => {
        await mockBrandKitController.set(mockStudioBrandKit as unknown as StudioBrandKit);

        expect(mockEditorApi.createColor).toHaveBeenCalledTimes(mockStudioBrandKit.brandKit.colors.length);
    });
});
