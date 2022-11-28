import MockEditorAPI from '../__mocks__/MockEditorAPI';
import { CharacterStyleController } from '../../controllers/CharacterStyleController';

let mockedCharacterStyleController: CharacterStyleController;

beforeEach(() => {
    mockedCharacterStyleController = new CharacterStyleController(MockEditorAPI);
    jest.spyOn(mockedCharacterStyleController, 'getCharacterStyles');
    jest.spyOn(mockedCharacterStyleController, 'getCharacterStyleById');
    jest.spyOn(mockedCharacterStyleController, 'createCharacterStyle');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('Character Style', () => {
    it('Should call all of the CharacteStyle Functions of EditorAPI successfully', () => {
        mockedCharacterStyleController.getCharacterStyles();
        expect(mockedCharacterStyleController.getCharacterStyles).toHaveBeenCalledTimes(1);

        mockedCharacterStyleController.getCharacterStyleById('5');
        expect(mockedCharacterStyleController.getCharacterStyleById).toHaveBeenCalledTimes(1);
        expect(mockedCharacterStyleController.getCharacterStyleById).toHaveBeenCalledWith('5');

        mockedCharacterStyleController.createCharacterStyle();
        expect(mockedCharacterStyleController.createCharacterStyle).toHaveBeenCalledTimes(1);
    });
});
