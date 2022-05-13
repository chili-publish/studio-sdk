import { TranslationController } from '../../controllers/TranslationController';

let mockedTranslationProperties: TranslationController;

beforeEach(() => {
    mockedTranslationProperties = new TranslationController();
    jest.spyOn(mockedTranslationProperties, 'getTranslations');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('PageProperties', () => {
    it('Should call all of the Translation Functions successfully', () => {
        mockedTranslationProperties.getTranslations();
        expect(mockedTranslationProperties.getTranslations).toHaveBeenCalledTimes(1);
    });
});
