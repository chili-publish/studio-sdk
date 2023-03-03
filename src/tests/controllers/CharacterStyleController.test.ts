import { CharacterStyleController } from '../../controllers/CharacterStyleController';
import { Case, Scripting } from '../../../types/TextStyleTypes';
import { ColorType, ColorUsageType } from '../../../types/ColorStyleTypes';
import { CharacterStyleUpdate } from '../../../types/CharacterStyleTypes';
import { EditorAPI } from '../../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedCharacterStyleController: CharacterStyleController;

const mockEditorApi: EditorAPI = {
    getCharacterStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    getCharacterStyleById: async () => getEditorResponseData(castToEditorResponse(null)),
    createCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    updateCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    renameCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    removeCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedCharacterStyleController = new CharacterStyleController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getCharacterStyles');
    jest.spyOn(mockEditorApi, 'getCharacterStyleById');
    jest.spyOn(mockEditorApi, 'createCharacterStyle');
    jest.spyOn(mockEditorApi, 'updateCharacterStyle');
    jest.spyOn(mockEditorApi, 'duplicateCharacterStyle');
    jest.spyOn(mockEditorApi, 'renameCharacterStyle');
    jest.spyOn(mockEditorApi, 'removeCharacterStyle');
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

describe('CharacterStyleController', () => {
    it('Should call all of the CharacteStyle Functions of EditorAPI successfully', async () => {
        await mockedCharacterStyleController.getCharacterStyles();
        expect(mockEditorApi.getCharacterStyles).toHaveBeenCalledTimes(1);

        await mockedCharacterStyleController.getCharacterStyleById('5');
        expect(mockEditorApi.getCharacterStyleById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getCharacterStyleById).toHaveBeenCalledWith('5');

        await mockedCharacterStyleController.createCharacterStyle();
        expect(mockEditorApi.createCharacterStyle).toHaveBeenCalledTimes(1);

        await mockedCharacterStyleController.updateCharacterStyle('5', updateCharacterStyle);
        expect(mockEditorApi.updateCharacterStyle).toHaveBeenCalledTimes(1);

        await mockedCharacterStyleController.removeCharacterStyle('5');
        expect(mockEditorApi.removeCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeCharacterStyle).toHaveBeenCalledWith('5');

        await mockedCharacterStyleController.duplicateCharacterStyle('6');
        expect(mockEditorApi.duplicateCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateCharacterStyle).toHaveBeenCalledWith('6');

        await mockedCharacterStyleController.renameCharacterStyle('5', 'name');
        expect(mockEditorApi.renameCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameCharacterStyle).toHaveBeenCalledWith('5', 'name');
    });
});
