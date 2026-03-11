import { EditorAPI } from '../../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../../utils/EditorResponseData';
import { BrandKitController } from '../../controllers/BrandKitController';
import type { APIBrandKit } from '../../types/BrandKitTypes';
import {
    mockCharacterStyles,
    mockColors,
    mockGradients,
    mockFonts,
    mockParagraphStyles,
    mockMedia,
} from '../../../tests/__mocks__/Brandkit';

const mockBrandKitResponse = {
    id: 'test-brand-kit-id',
    version: '2025-06-12T12:10:29.354877',
    name: 'Test Brand Kit',
    colors: mockColors,
    gradients: mockGradients,
    fonts: mockFonts,
    characterStyles: mockCharacterStyles,
    paragraphStyles: mockParagraphStyles,
    media: mockMedia,
};

let mockBrandKitController: BrandKitController;
let mockEditorApi: EditorAPI;

beforeEach(() => {
    mockEditorApi = {
        getBrandKit: async () =>
            getEditorResponseData(castToEditorResponse(mockBrandKitResponse)),
        setBrandKit: async (...args: unknown[]) => {
            const apiBrandKit = args[0] as APIBrandKit;
            return getEditorResponseData(
                castToEditorResponse({
                    id: apiBrandKit?.id ?? null,
                    version: apiBrandKit?.lastModifiedDate ?? null,
                    name: apiBrandKit?.name ?? null,
                    colors: mockColors,
                    gradients: mockGradients,
                    fonts: mockFonts,
                    characterStyles: mockCharacterStyles,
                    paragraphStyles: mockParagraphStyles,
                    media: mockMedia,
                }),
            );
        },
    };
    jest.spyOn(mockEditorApi, 'getBrandKit');
    jest.spyOn(mockEditorApi, 'setBrandKit');
    mockBrandKitController = new BrandKitController(mockEditorApi);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Next.BrandKitController', () => {
    it('Should call get and return BrandKit shape', async () => {
        const response = await mockBrandKitController.get();

        expect(mockEditorApi.getBrandKit).toHaveBeenCalledTimes(1);
        expect(response.parsedData).toBeDefined();
        expect(response.parsedData).toMatchObject({
            id: 'test-brand-kit-id',
            version: '2025-06-12T12:10:29.354877',
            name: 'Test Brand Kit',
        });
        expect(response.parsedData?.colors).toHaveLength(mockColors.length);
        expect(response.parsedData?.fonts).toHaveLength(mockFonts.length);
        expect(response.parsedData?.characterStyles).toHaveLength(mockCharacterStyles.length);
        expect(response.parsedData?.paragraphStyles).toHaveLength(mockParagraphStyles.length);
        expect(response.parsedData?.media).toHaveLength(mockMedia.length);
    });

    it('Should call set with APIBrandKit and return BrandKit shape', async () => {
        const apiBrandKit: APIBrandKit = {
            id: 'api-brand-kit-id',
            name: 'API Brand Kit',
            dateCreated: '2025-01-01T00:00:00',
            lastModifiedDate: '2025-06-12T12:10:29.354877',
            fonts: [
                {
                    fontFamilyId: 'font-family-1',
                    fontFamilyBrandKitGuid: 'font-guid-1',
                    fontConnectorId: 'connector-1',
                },
            ],
            colors: [],
            characterStyles: [],
            paragraphStyles: [],
            media: [],
        };

        const response = await mockBrandKitController.set(apiBrandKit);

        expect(mockEditorApi.setBrandKit).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.setBrandKit).toHaveBeenCalledWith(apiBrandKit);
        expect(response.parsedData).toBeDefined();
        expect(response.parsedData).toMatchObject({
            id: apiBrandKit.id,
            version: apiBrandKit.lastModifiedDate,
            name: apiBrandKit.name,
        });
        expect(response.parsedData?.colors).toEqual(mockColors);
        expect(response.parsedData?.gradients).toEqual(mockGradients);
        expect(response.parsedData?.fonts).toEqual(mockFonts);
    });
});
