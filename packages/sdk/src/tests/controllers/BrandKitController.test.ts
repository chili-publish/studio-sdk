import { EditorAPI, EditorResponse } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';
import { BrandKitController } from '../../controllers/BrandKitController';
// eslint-disable-next-line import/no-named-as-default
import SDK from '../../sdk';
import {
    mockCharacterStyles,
    mockColors,
    mockGradients,
    mockFonts,
    mockParagraphStyles,
    mockStudioBrandKit,
    mockMedia,
} from '../__mocks__/Brandkit';
import { CMYK, RGB, StudioBrandKit } from '../../types/BrandKitTypes';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { FontController } from '../../controllers/FontController';
import { ColorStyleController } from '../../controllers/ColorStyleController';
import { MediaConnectorController } from '../../controllers/MediaConnectorController';
import { CharacterStyleController } from '../../controllers/CharacterStyleController';
import { ParagraphStyleController } from '../../controllers/ParagraphStyleController';
import { UndoManagerController } from '../../controllers/UndoManagerController';
import { FontConnectorController } from '../../controllers/FontConnectorController';
import { GradientStyleController } from '../../controllers/GradientStyleController';

const mockFontFamilyName = 'Minion Pro';
const mockParagraphStyleId = 'paragraphStyleId';
const mockCharacterStyleId = 'characterStyleId';
const mockFontFamilyId = '614e0cba-37d3-45a7-b9af-ddf2bf76f7db';
const mockColorId = '1111-2222-3333-4444-5555';
const mockGradientId = '2222-3333-4444-5555-6666';

const flushPromises = () => {
    return new Promise((resolve) => setTimeout(resolve, 0));
};

describe('BrandKitController', () => {
    let mockBrandKitController: BrandKitController;
    let mockEditorApi: EditorAPI;
    beforeEach(() => {
        mockEditorApi = {
            getBrandKitId: async () => getEditorResponseData(castToEditorResponse('test-brand-kit-id')),
            getBrandKitVersion: async () => getEditorResponseData(castToEditorResponse('2025-06-12T12:10:29.354877')),
            getBrandKitName: async () => getEditorResponseData(castToEditorResponse('Test Brand Kit')),
            updateBrandKitIdAndVersion: async () => getEditorResponseData(castToEditorResponse(null)),
            renameBrandKit: async () => getEditorResponseData(castToEditorResponse(null)),
            isSync: async () => getEditorResponseData(castToEditorResponse(false)),
            setSync: async () => getEditorResponseData(castToEditorResponse(true)),
            getAllBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(mockMedia)),
            addBrandKitMedia: async () => getEditorResponseData(castToEditorResponse('media-id-123')),
            updateBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            renameBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            removeBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            getColors: async () => getEditorResponseData(castToEditorResponse(mockColors)),
            removeColor: async () => getEditorResponseData(castToEditorResponse(null)),
            createColor: async () => getEditorResponseData(castToEditorResponse(mockColorId)),
            updateColor: async (data) => getEditorResponseData(castToEditorResponse(data)),
            renameColor: async (data) => getEditorResponseData(castToEditorResponse(data)),

            getGradients: async () => getEditorResponseData(castToEditorResponse(mockGradients)),
            removeGradient: async () => getEditorResponseData(castToEditorResponse(null)),
            createGradient: async () => getEditorResponseData(castToEditorResponse(mockGradientId)),
            updateGradient: async (data) => getEditorResponseData(castToEditorResponse(data)),
            renameGradient: async (data) => getEditorResponseData(castToEditorResponse(data)),

            getFontFamilies: async () => getEditorResponseData(castToEditorResponse(mockFonts)),
            addFontFamily: jest.fn().mockResolvedValue(getEditorResponseData(castToEditorResponse(mockFontFamilyId))),
            removeFontFamily: async () => getEditorResponseData(castToEditorResponse(null)),
            fontConnectorDetail: async () =>
                getEditorResponseData(castToEditorResponse([{ familyName: mockFontFamilyName }])),

            getCharacterStyles: async () => getEditorResponseData(castToEditorResponse(mockCharacterStyles)),
            removeCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
            createCharacterStyle: async () => getEditorResponseData(castToEditorResponse(mockCharacterStyleId)),
            updateCharacterStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),
            renameCharacterStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),

            getParagraphStyles: async () => getEditorResponseData(castToEditorResponse(mockParagraphStyles)),
            removeParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
            createParagraphStyle: async () => getEditorResponseData(castToEditorResponse(mockParagraphStyleId)),
            updateParagraphStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),
            renameParagraphStyle: async (data) => getEditorResponseData(castToEditorResponse(data)),

            beginIfNoneActive: async () => getEditorResponseData(castToEditorResponse(null)),

            undo: async () => getEditorResponseData(castToEditorResponse(null)),
            end: async () => getEditorResponseData(castToEditorResponse(null)),
            abort: async () => getEditorResponseData(castToEditorResponse(null)),
        };

        jest.spyOn(mockEditorApi, 'getBrandKitId');
        jest.spyOn(mockEditorApi, 'getBrandKitVersion');
        jest.spyOn(mockEditorApi, 'getBrandKitName');
        jest.spyOn(mockEditorApi, 'updateBrandKitIdAndVersion');
        jest.spyOn(mockEditorApi, 'renameBrandKit');
        jest.spyOn(mockEditorApi, 'isSync');
        jest.spyOn(mockEditorApi, 'setSync');

        jest.spyOn(mockEditorApi, 'getAllBrandKitMedia');
        jest.spyOn(mockEditorApi, 'addBrandKitMedia');
        jest.spyOn(mockEditorApi, 'updateBrandKitMedia');
        jest.spyOn(mockEditorApi, 'renameBrandKitMedia');
        jest.spyOn(mockEditorApi, 'removeBrandKitMedia');

        jest.spyOn(mockEditorApi, 'getColors');
        jest.spyOn(mockEditorApi, 'removeColor');
        jest.spyOn(mockEditorApi, 'createColor');
        jest.spyOn(mockEditorApi, 'updateColor');
        jest.spyOn(mockEditorApi, 'renameColor');

        jest.spyOn(mockEditorApi, 'getGradients');
        jest.spyOn(mockEditorApi, 'removeGradient');
        jest.spyOn(mockEditorApi, 'createGradient');
        jest.spyOn(mockEditorApi, 'updateGradient');
        jest.spyOn(mockEditorApi, 'renameGradient');

        jest.spyOn(mockEditorApi, 'getFontFamilies');
        jest.spyOn(mockEditorApi, 'addFontFamily');
        jest.spyOn(mockEditorApi, 'removeFontFamily');
        jest.spyOn(mockEditorApi, 'fontConnectorDetail');

        jest.spyOn(mockEditorApi, 'getCharacterStyles');
        jest.spyOn(mockEditorApi, 'createCharacterStyle');
        jest.spyOn(mockEditorApi, 'removeCharacterStyle');
        jest.spyOn(mockEditorApi, 'updateCharacterStyle');
        jest.spyOn(mockEditorApi, 'renameCharacterStyle');

        jest.spyOn(mockEditorApi, 'getParagraphStyles');
        jest.spyOn(mockEditorApi, 'createParagraphStyle');
        jest.spyOn(mockEditorApi, 'removeParagraphStyle');
        jest.spyOn(mockEditorApi, 'updateParagraphStyle');
        jest.spyOn(mockEditorApi, 'renameParagraphStyle');

        jest.spyOn(mockEditorApi, 'beginIfNoneActive');
        jest.spyOn(mockEditorApi, 'end');
        jest.spyOn(mockEditorApi, 'undo');
        jest.spyOn(mockEditorApi, 'abort');

        const fontController = new FontController(mockEditorApi);
        const fontConnectorController = new FontConnectorController(mockEditorApi);
        const colorStyleController = new ColorStyleController(mockEditorApi);
        const gradientStyleController = new GradientStyleController(mockEditorApi);
        const mediaController = new MediaConnectorController(mockEditorApi);
        const characterStyleController = new CharacterStyleController(mockEditorApi);
        const paragraphStyleController = new ParagraphStyleController(mockEditorApi);

        const mockSDK: SDK = {
            editorAPI: mockEditorApi,
            colorStyle: colorStyleController,
            gradientStyle: gradientStyleController,
            font: fontController,
            fontConnector: fontConnectorController,
            mediaConnector: mediaController,
            characterStyle: characterStyleController,
            paragraphStyle: paragraphStyleController,
        } as SDK;
        mockSDK.undoManager = new UndoManagerController(mockEditorApi, mockSDK);

        mockBrandKitController = new BrandKitController(mockEditorApi, mockSDK);
        mockSDK.brandKit = mockBrandKitController;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Should call getBrandKitId of EditorAPI successfully', async () => {
        await mockBrandKitController.getId();
        expect(mockEditorApi.getBrandKitId).toHaveBeenCalledTimes(1);
    });

    it('Should call getBrandKitVersion of EditorAPI successfully', async () => {
        await mockBrandKitController.getVersion();
        expect(mockEditorApi.getBrandKitVersion).toHaveBeenCalledTimes(1);
    });

    it('Should call updateBrandKitIdAndVersion of EditorAPI successfully', async () => {
        const testId = 'test-brand-kit-id';
        const testVersion = '1.0.0';

        await mockBrandKitController.updateIdAndVersion(testId, testVersion);

        expect(mockEditorApi.updateBrandKitIdAndVersion).toHaveBeenCalledWith(testId, testVersion);
        expect(mockEditorApi.updateBrandKitIdAndVersion).toHaveBeenCalledTimes(1);
    });

    it('Should call getBrandKitName of EditorAPI successfully', async () => {
        await mockBrandKitController.getName();
        expect(mockEditorApi.getBrandKitName).toHaveBeenCalledTimes(1);
    });

    it('Should call renameBrandKit of EditorAPI successfully', async () => {
        const newName = 'New Brand Kit Name';

        await mockBrandKitController.rename(newName);

        expect(mockEditorApi.renameBrandKit).toHaveBeenCalledWith(newName);
        expect(mockEditorApi.renameBrandKit).toHaveBeenCalledTimes(1);
    });

    it('Should call the get method', async () => {
        const response = await mockBrandKitController.get();
        expect(mockEditorApi.getColors).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getGradients).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getFontFamilies).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getParagraphStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getCharacterStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getAllBrandKitMedia).toHaveBeenCalledTimes(1);

        expect(response).toEqual(
            expect.objectContaining({
                data: JSON.stringify({
                    id: 'test-brand-kit-id',
                    brandKit: {
                        id: 'test-brand-kit-id',
                        name: 'Test Brand Kit',
                        lastModifiedDate: '2025-06-12T12:10:29.354877',
                        colors: mockColors,
                        gradients: mockGradients,
                        fonts: mockFonts,
                        paragraphStyles: mockParagraphStyles,
                        characterStyles: mockCharacterStyles,
                        media: mockMedia,
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
        const mockColor = mockColors[10];
        const fontKey = mockFonts.find((font) => font.id === mockFontFamilyId)?.fontStyles[0].id;

        const colors = mockStudioBrandKit.brandKit.colors;
        const fontfamilies = mockStudioBrandKit.brandKit.fonts;
        const connectorId = mockStudioBrandKit.fontConnectorId;
        const paragraphStyle = mockStudioBrandKit.brandKit.paragraphStyles[0];
        const characterStyle = mockStudioBrandKit.brandKit.characterStyles[0];
        const media = mockStudioBrandKit.brandKit.media;

        await mockBrandKitController.set(mockStudioBrandKit as unknown as StudioBrandKit);

        await flushPromises();

        expect(mockEditorApi.createColor).toHaveBeenCalledTimes(mockStudioBrandKit.brandKit.colors.length);
        expect(mockEditorApi.updateColor).toHaveBeenCalledTimes(mockStudioBrandKit.brandKit.colors.length);

        expect(mockEditorApi.updateColor).toHaveBeenCalledWith(
            expect.anything(),
            expect.stringContaining(JSON.stringify({ ...(colors[0].displayValue as RGB), type: ColorType.spotRGB })),
        );

        expect(mockEditorApi.updateColor).toHaveBeenCalledWith(
            expect.anything(),
            expect.stringContaining(JSON.stringify({ ...(colors[1].displayValue as CMYK), type: ColorType.spotCMYK })),
        );

        expect(mockEditorApi.updateColor).toHaveBeenCalledWith(
            expect.anything(),
            expect.stringContaining(JSON.stringify({ value: colors[2].value, type: ColorType.hex })),
        );

        expect(mockEditorApi.addFontFamily).toHaveBeenCalledWith(
            connectorId,
            expect.stringContaining(
                JSON.stringify({ name: mockFontFamilyName, fontFamilyId: fontfamilies[0].fontFamilyId }),
            ),
        );

        expect(mockEditorApi.addFontFamily).toHaveBeenCalledWith(
            connectorId,
            expect.stringContaining(
                JSON.stringify({ name: mockFontFamilyName, fontFamilyId: fontfamilies[1].fontFamilyId }),
            ),
        );

        expect(mockEditorApi.createParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateParagraphStyle).toHaveBeenCalledWith(
            mockParagraphStyleId,
            expect.stringContaining(
                JSON.stringify({
                    name: { value: paragraphStyle.name },
                    textAlign: { value: paragraphStyle.textAlign },
                    fontSize: { value: paragraphStyle.fontSize },
                    lineHeight: { value: paragraphStyle.lineHeight },
                    trackingRight: { value: paragraphStyle.trackingRight },
                    fillColorApplied: { value: paragraphStyle.fillColorApplied },
                    color: {
                        value: {
                            id: mockColorId,
                            color: mockColor.color,
                            type: ColorUsageType.brandKit,
                            isApplied: true,
                        },
                    },
                    strokeColor: {
                        value: {
                            id: mockColorId,
                            color: mockColor.color,
                            type: ColorUsageType.brandKit,
                            isApplied: true,
                        },
                    },
                    strokeColorApplied: { value: true },
                    strokeWidth: { value: '7' },
                    fontKey: { value: fontKey },
                }),
            ),
        );

        expect(mockEditorApi.addBrandKitMedia).toHaveBeenCalledTimes(media.length);
        expect(mockEditorApi.addBrandKitMedia).toHaveBeenCalledWith(
            media[0].name,
            media[0].mediaConnectorId,
            media[0].mediaId,
        );
        expect(mockEditorApi.createCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateCharacterStyle).toHaveBeenCalledWith(
            mockCharacterStyleId,
            expect.stringContaining(
                JSON.stringify({
                    name: { value: characterStyle.name },
                    fillColorApplied: { value: characterStyle.fillColorApplied },
                    fontSize: { value: characterStyle.fontSize },
                    subSuperScript: { value: characterStyle.subSuperScript },
                    lineHeight: { value: characterStyle.lineHeight },
                    color: {
                        value: {
                            id: mockColorId,
                            color: mockColor.color,
                            type: ColorUsageType.brandKit,
                            isApplied: false,
                        },
                    },
                    fontKey: { value: null },
                }),
            ),
        );

        expect(mockEditorApi.updateBrandKitIdAndVersion).toHaveBeenCalledWith(
            mockStudioBrandKit.id,
            mockStudioBrandKit.brandKit.lastModifiedDate,
        );
    });

    it('Should call getAllBrandKitMedia of EditorAPI successfully', async () => {
        await mockBrandKitController.getAllMedia();
        expect(mockEditorApi.getAllBrandKitMedia).toHaveBeenCalledTimes(1);
    });

    it('Should call addBrandKitMedia of EditorAPI successfully', async () => {
        const name = 'test-media';
        const assetId = 'asset-123';
        const remoteConnectorId = 'connector-456';

        await mockBrandKitController.addMedia(name, remoteConnectorId, assetId);

        expect(mockEditorApi.addBrandKitMedia).toHaveBeenCalledWith(name, remoteConnectorId, assetId);
        expect(mockEditorApi.addBrandKitMedia).toHaveBeenCalledTimes(1);
    });

    it('Should call updateBrandKitMedia of EditorAPI successfully', async () => {
        const name = 'media-id-123';
        const assetId = 'new-asset-456';
        const remoteConnectorId = 'new-connector-789';

        await mockBrandKitController.updateMedia(name, remoteConnectorId, assetId);

        expect(mockEditorApi.updateBrandKitMedia).toHaveBeenCalledWith(name, remoteConnectorId, assetId);
        expect(mockEditorApi.updateBrandKitMedia).toHaveBeenCalledTimes(1);
    });

    it('Should call renameBrandKitMedia of EditorAPI successfully', async () => {
        const name = 'media-id-123';
        const newName = 'new-media-name';

        await mockBrandKitController.renameMedia(name, newName);

        expect(mockEditorApi.renameBrandKitMedia).toHaveBeenCalledWith(name, newName);
        expect(mockEditorApi.renameBrandKitMedia).toHaveBeenCalledTimes(1);
    });

    it('Should call removeBrandKitMedia of EditorAPI successfully', async () => {
        const name = 'media-id-123';

        await mockBrandKitController.removeMedia(name);

        expect(mockEditorApi.removeBrandKitMedia).toHaveBeenCalledWith(name);
        expect(mockEditorApi.removeBrandKitMedia).toHaveBeenCalledTimes(1);
    });
    
    it('Should call isSync of EditorAPI successfully', async () => {
        await mockBrandKitController.isSync();
        expect(mockEditorApi.isSync).toHaveBeenCalledTimes(1);
    });

    it('Should call setSync of EditorAPI successfully', async () => {
        await mockBrandKitController.setSync(true);
        expect(mockEditorApi.setSync).toHaveBeenCalledTimes(1);
    });
});
