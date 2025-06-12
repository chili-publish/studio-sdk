import { BrandKitController } from '../../controllers/BrandKitController';
import { EditorAPI } from '../../types/CommonTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';

describe('BrandKitController', () => {
    let mockedBrandKitController: BrandKitController;

    const mockEditorAPI: EditorAPI = {
        getBrandKitId: async () => getEditorResponseData(castToEditorResponse('test-brand-kit-id')),
        getBrandKitVersion: async () => getEditorResponseData(castToEditorResponse('1.0.0')),
        updateBrandKitIdAndVersion: async () => getEditorResponseData(castToEditorResponse(null)),
    };

    beforeEach(() => {
        mockedBrandKitController = new BrandKitController(mockEditorAPI);
        jest.spyOn(mockEditorAPI, 'getBrandKitId');
        jest.spyOn(mockEditorAPI, 'getBrandKitVersion');
        jest.spyOn(mockEditorAPI, 'updateBrandKitIdAndVersion');
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Should call getBrandKitId of EditorAPI successfully', async () => {
        await mockedBrandKitController.getId();
        expect(mockEditorAPI.getBrandKitId).toHaveBeenCalledTimes(1);
    });

    it('Should call getBrandKitVersion of EditorAPI successfully', async () => {
        await mockedBrandKitController.getVersion();
        expect(mockEditorAPI.getBrandKitVersion).toHaveBeenCalledTimes(1);
    });

    it('Should call updateBrandKitIdAndVersion of EditorAPI successfully', async () => {
        const testId = 'test-brand-kit-id';
        const testVersion = '1.0.0';

        await mockedBrandKitController.updateIdAndVersion(testId, testVersion);

        expect(mockEditorAPI.updateBrandKitIdAndVersion).toHaveBeenCalledWith(testId, testVersion);
        expect(mockEditorAPI.updateBrandKitIdAndVersion).toHaveBeenCalledTimes(1);
    });
});
