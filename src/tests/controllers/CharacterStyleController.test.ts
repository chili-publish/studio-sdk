import MockEditorAPI from '../__mocks__/MockEditorAPI';
import { CharacterStyleController } from '../../controllers/CharacterStyleController';
import { ColorUsageType } from '../../../types/ParagraphStyleTypes';
import { Case, Scripting } from '../../../types/TextStyleTypes';
import { ColorType } from '../../../types/ColorStyleTypes';
import { CharacterStyleUpdate } from '../../../types/CharacterStyleTypes';

let mockedCharacterStyleController: CharacterStyleController;

beforeEach(() => {
    mockedCharacterStyleController = new CharacterStyleController(MockEditorAPI);
    jest.spyOn(mockedCharacterStyleController, 'getCharacterStyles');
    jest.spyOn(mockedCharacterStyleController, 'getCharacterStyleById');
    jest.spyOn(mockedCharacterStyleController, 'createCharacterStyle');
    jest.spyOn(mockedCharacterStyleController, 'updateCharacterStyle');
    jest.spyOn(mockedCharacterStyleController, 'duplicateCharacterStyle');
    jest.spyOn(mockedCharacterStyleController, 'renameCharacterStyle');
    jest.spyOn(mockedCharacterStyleController, 'removeCharacterStyle');
});

afterAll(() => {
    jest.restoreAllMocks();
});

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
        value: '0 px',
    },
    trackingRight: {
        value: '0 px',
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
                colorType: ColorType.rgb,
                r: 255,
                g: 0,
                b: 0,
            },
            opacity: 50,
            isApplied: true,
            usageType: ColorUsageType.local,
        },
    },
    underline: {
        value: true,
    },
    lineThrough: {
        value: true,
    },
};

describe('Character Style', () => {
    it('Should call all of the CharacteStyle Functions of EditorAPI successfully', () => {
        mockedCharacterStyleController.getCharacterStyles();
        expect(mockedCharacterStyleController.getCharacterStyles).toHaveBeenCalledTimes(1);

        mockedCharacterStyleController.getCharacterStyleById('5');
        expect(mockedCharacterStyleController.getCharacterStyleById).toHaveBeenCalledTimes(1);
        expect(mockedCharacterStyleController.getCharacterStyleById).toHaveBeenCalledWith('5');

        mockedCharacterStyleController.createCharacterStyle();
        expect(mockedCharacterStyleController.createCharacterStyle).toHaveBeenCalledTimes(1);

        mockedCharacterStyleController.updateCharacterStyle('5', updateCharacterStyle);
        expect(mockedCharacterStyleController.updateCharacterStyle).toHaveBeenCalledTimes(1);

        mockedCharacterStyleController.removeCharacterStyle('5');
        expect(mockedCharacterStyleController.removeCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockedCharacterStyleController.removeCharacterStyle).toHaveBeenCalledWith('5');

        mockedCharacterStyleController.duplicateCharacterStyle('6');
        expect(mockedCharacterStyleController.duplicateCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockedCharacterStyleController.duplicateCharacterStyle).toHaveBeenCalledWith('6');

        mockedCharacterStyleController.renameCharacterStyle('5', 'name');
        expect(mockedCharacterStyleController.renameCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockedCharacterStyleController.renameCharacterStyle).toHaveBeenCalledWith('5', 'name');
    });
});
