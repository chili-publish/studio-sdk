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
import { StudioBrandKit } from '../../types/BrandKitTypes';
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
            isBrandKitAutoSync: async () => getEditorResponseData(castToEditorResponse(false)),
            enableBrandKitAutoSync: async () => getEditorResponseData(castToEditorResponse(true)),
            getAllBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(mockMedia)),
            addBrandKitMedia: async () => getEditorResponseData(castToEditorResponse('media-id-123')),
            updateBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            renameBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            removeBrandKitMedia: async () => getEditorResponseData(castToEditorResponse(null)),
            getBrandKit: async () =>
                getEditorResponseData(
                    castToEditorResponse({
                        id: 'test-brand-kit-id',
                        version: '2025-06-12T12:10:29.354877',
                        name: 'Test Brand Kit',
                        colors: mockColors,
                        gradients: mockGradients,
                        fontFamilies: mockFonts,
                        characterStyles: mockCharacterStyles,
                        paragraphStyles: mockParagraphStyles,
                        media: mockMedia,
                    }),
                ),
            setBrandKit: async (...args: unknown[]) => {
                const apiBrandKit = JSON.parse(args[0] as string) as {
                    id: string;
                    lastModifiedDate: string;
                    name: string;
                };
                return getEditorResponseData(
                    castToEditorResponse({
                        id: apiBrandKit?.id ?? null,
                        version: apiBrandKit?.lastModifiedDate ?? null,
                        name: apiBrandKit?.name ?? null,
                        colors: mockColors,
                        gradients: mockGradients,
                        fontFamilies: mockFonts,
                        characterStyles: mockCharacterStyles,
                        paragraphStyles: mockParagraphStyles,
                        media: mockMedia,
                    }),
                );
            },
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
        jest.spyOn(mockEditorApi, 'isBrandKitAutoSync');
        jest.spyOn(mockEditorApi, 'enableBrandKitAutoSync');

        jest.spyOn(mockEditorApi, 'getAllBrandKitMedia');
        jest.spyOn(mockEditorApi, 'addBrandKitMedia');
        jest.spyOn(mockEditorApi, 'updateBrandKitMedia');
        jest.spyOn(mockEditorApi, 'renameBrandKitMedia');
        jest.spyOn(mockEditorApi, 'removeBrandKitMedia');
        jest.spyOn(mockEditorApi, 'getBrandKit');
        jest.spyOn(mockEditorApi, 'setBrandKit');

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

        expect(mockEditorApi.getBrandKit).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toBeDefined();
        expect(response.parsedData).toMatchObject({
            id: 'test-brand-kit-id',
            name: 'Test Brand Kit',
            fontConnectorId: mockFonts[0]?.connectorId ?? '',
        });
        expect(response.parsedData).toHaveProperty('brandKit');
        expect(response.parsedData.brandKit).toMatchObject({
            id: 'test-brand-kit-id',
            name: 'Test Brand Kit',
            dateCreated: '',
            lastModifiedDate: '2025-06-12T12:10:29.354877',
        });
        expect(response.parsedData.brandKit.colors).toHaveLength(mockColors.length);
        expect(response.parsedData.brandKit.fonts).toHaveLength(mockFonts.length);
        expect(response.parsedData.brandKit.characterStyles).toHaveLength(mockCharacterStyles.length);
        expect(response.parsedData.brandKit.paragraphStyles).toHaveLength(mockParagraphStyles.length);
        expect(response.parsedData.brandKit.media).toHaveLength(mockMedia.length);
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
        const response = await mockBrandKitController.set(mockStudioBrandKit as unknown as StudioBrandKit);

        expect(mockEditorApi.setBrandKit).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setBrandKit).toHaveBeenCalledWith(JSON.stringify(mockStudioBrandKit.brandKit));
        expect(response.parsedData).toBeDefined();
        expect(response.parsedData).toMatchObject({
            id: mockStudioBrandKit.id,
            version: mockStudioBrandKit.brandKit.lastModifiedDate,
            name: mockStudioBrandKit.brandKit.name,
        });
        expect(response.parsedData.colors).toEqual(mockColors);
        expect(response.parsedData.gradients).toEqual(mockGradients);
        expect(response.parsedData.fonts).toEqual(mockFonts);
        expect(response.parsedData.characterStyles).toEqual(mockCharacterStyles);
        expect(response.parsedData.paragraphStyles).toEqual(mockParagraphStyles);
        expect(response.parsedData.media).toEqual(mockMedia);
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
    
    it('Should call isBrandKitAutoSync of EditorAPI successfully', async () => {
        await mockBrandKitController.isAutoSync();
        expect(mockEditorApi.isBrandKitAutoSync).toHaveBeenCalledTimes(1);
    });

    it('Should call enableBrandKitAutoSync of EditorAPI successfully', async () => {
        await mockBrandKitController.enableAutoSync(true);
        expect(mockEditorApi.enableBrandKitAutoSync).toHaveBeenCalledTimes(1);
    });
});
