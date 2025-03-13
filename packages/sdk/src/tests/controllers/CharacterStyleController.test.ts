import { CharacterStyleController } from '../../controllers/CharacterStyleController';
import { Case, Scripting } from '../../types/TextStyleTypes';
import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { CharacterStyleUpdate } from '../../types/CharacterStyleTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedCharacterStyleController: CharacterStyleController;

const mockEditorApi: EditorAPI = {
    getCharacterStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    getCharacterStyleById: async () => getEditorResponseData(castToEditorResponse(null)),
    createCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    updateCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    renameCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    moveCharacterStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    removeCharacterStyle: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedCharacterStyleController = new CharacterStyleController(Promise.resolve(mockEditorApi));
    jest.spyOn(mockEditorApi, 'getCharacterStyles');
    jest.spyOn(mockEditorApi, 'getCharacterStyleById');
    jest.spyOn(mockEditorApi, 'createCharacterStyle');
    jest.spyOn(mockEditorApi, 'updateCharacterStyle');
    jest.spyOn(mockEditorApi, 'duplicateCharacterStyle');
    jest.spyOn(mockEditorApi, 'moveCharacterStyles');
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
    underline: {
        value: true,
    },
    lineThrough: {
        value: true,
    },
};

describe('CharacterStyleController', () => {
    it('Should call the getCharacterStyles method', async () => {
        await mockedCharacterStyleController.getAll();
        expect(mockEditorApi.getCharacterStyles).toHaveBeenCalledTimes(1);
    });

    it('Should call the getCharacterStyle method', async () => {
        await mockedCharacterStyleController.getById('5');
        expect(mockEditorApi.getCharacterStyleById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getCharacterStyleById).toHaveBeenCalledWith('5');
    });

    it('Should call the createCharacterStyle method', async () => {
        await mockedCharacterStyleController.create();
        expect(mockEditorApi.createCharacterStyle).toHaveBeenCalledTimes(1);
    });

    it('Should call the updateCharacterStyle method', async () => {
        await mockedCharacterStyleController.update('5', updateCharacterStyle);
        expect(mockEditorApi.updateCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateCharacterStyle).toHaveBeenCalledWith('5', JSON.stringify(updateCharacterStyle));
    });

    it('Should call the removeCharacterStyle method', async () => {
        await mockedCharacterStyleController.remove('5');
        expect(mockEditorApi.removeCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeCharacterStyle).toHaveBeenCalledWith('5');
    });

    it('Should call the duplicateCharacterStyle method', async () => {
        await mockedCharacterStyleController.duplicate('6');
        expect(mockEditorApi.duplicateCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateCharacterStyle).toHaveBeenCalledWith('6');
    });

    it('Should call the moveCharacterStyles method', async () => {
        await mockedCharacterStyleController.move(2, ['1', '2']);
        expect(mockEditorApi.moveCharacterStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveCharacterStyles).toHaveBeenCalledWith(2, ['1', '2']);
    });

    it('Should call the renameCharacterStyle method', async () => {
        await mockedCharacterStyleController.rename('5', 'name');
        expect(mockEditorApi.renameCharacterStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameCharacterStyle).toHaveBeenCalledWith('5', 'name');
    });
});
