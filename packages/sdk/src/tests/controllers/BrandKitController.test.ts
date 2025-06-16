import { CharacterStyleController } from '../../controllers/CharacterStyleController';
import { Case, Scripting } from '../../types/TextStyleTypes';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { CharacterStyleUpdate } from '../../types/CharacterStyleTypes';
import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { BrandKitController } from '../../controllers/BrandKitController';
// eslint-disable-next-line import/no-named-as-default
import SDK from '../../sdk';
import mockConfig from '../__mocks__/Config';
import { mockCharacterStyles, mockColors, mockFonts, mockParagraphStyles } from '../__mocks__/Brandkit';

const editorAPI = {
    getColors: async () => getEditorResponseData(castToEditorResponse(mockColors)),
    removeColor: async () => getEditorResponseData(castToEditorResponse(null)),
    getFontFamilies: async () => getEditorResponseData(castToEditorResponse(mockFonts)),
    removeFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
    getCharacterStyles: async () => getEditorResponseData(castToEditorResponse(mockCharacterStyles)),
    removeCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    getParagraphStyles: async () => getEditorResponseData(castToEditorResponse(mockParagraphStyles)),
    removeParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    undo: async () => getEditorResponseData(castToEditorResponse(null)),
    beginIfNoneActive: async () => getEditorResponseData(castToEditorResponse(null)),
    end: async () => getEditorResponseData(castToEditorResponse(null)),
};
const updateCharacterStyle: CharacterStyleUpdate = {
    fontKey: {
        value: '1',
    },
    fontSize: {
        value: 15.0,
    },
    typographicCase: {
        value: Case.TO_LOWER_CASE,
    },
    kerningOn: {
        value: true,
    },
    subSuperScript: {
        value: Scripting.NORMAL,
    },
    trackingLeft: {
        value: 0,
    },
    trackingRight: {
        value: 0,
    },
    textIndent: {
        value: '0 px',
    },
    baselineShiftValue: {
        value: '0 px',
    },
    lineHeight: {
        value: 100.0,
    },
    textOverprint: {
        value: false,
    },
    color: {
        value: {
            color: {
                type: ColorType.rgb,
                r: 255,
                g: 0,
                b: 0,
            },
            opacity: 0.5,
            isApplied: true,
            type: ColorUsageType.local,
        },
    },
    strokeColor: {
        value: {
            color: {
                type: ColorType.rgb,
                r: 255,
                g: 0,
                b: 0,
            },
            opacity: 0.5,
            isApplied: true,
            type: ColorUsageType.local,
        },
    },
    fillColorApplied: {
        value: true,
    },
    strokeColorApplied: {
        value: true,
    },
    strokeWidth: {
        value: '1',
    },
    underline: {
        value: true,
    },
    lineThrough: {
        value: true,
    },
};

describe('BrandKitController', () => {
    let mockBrandKitController: BrandKitController;
    let mockEditorApi: EditorAPI;
    const mockSDK = new SDK(mockConfig);

    beforeEach(() => {
        mockEditorApi = { ...editorAPI } as EditorAPI;

        jest.spyOn(mockEditorApi, 'getColors');
        jest.spyOn(mockEditorApi, 'removeColor');
        jest.spyOn(mockEditorApi, 'getFontFamilies');
        jest.spyOn(mockEditorApi, 'removeFontFamily');
        jest.spyOn(mockEditorApi, 'getCharacterStyles');
        jest.spyOn(mockEditorApi, 'removeCharacterStyle');
        jest.spyOn(mockEditorApi, 'getParagraphStyles');
        jest.spyOn(mockEditorApi, 'removeParagraphStyle');
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

    it('Should successfully set brandkit content', async () => {});
});
