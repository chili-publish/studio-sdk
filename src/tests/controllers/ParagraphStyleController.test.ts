import { ColorType, ColorUsageType } from '../../types/ColorStyleTypes';
import { ParagraphStyleController } from '../../controllers/ParagraphStyleController';
import { ParagraphStyleUpdate } from '../../types/ParagraphStyleTypes';
import { Alignment, Case, Scripting } from '../../types/TextStyleTypes';
import { EditorAPI } from '../../types/CommonTypes';
import { getEditorResponseData, castToEditorResponse } from '../../utils/EditorResponseData';

let mockedParagraphStyleController: ParagraphStyleController;

const mockEditorApi: EditorAPI = {
    getParagraphStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    getParagraphStyleById: async () => getEditorResponseData(castToEditorResponse(null)),
    createParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    duplicateParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    renameParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    removeParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
    moveParagraphStyles: async () => getEditorResponseData(castToEditorResponse(null)),
    updateParagraphStyle: async () => getEditorResponseData(castToEditorResponse(null)),
};

beforeEach(() => {
    mockedParagraphStyleController = new ParagraphStyleController(mockEditorApi);
    jest.spyOn(mockEditorApi, 'getParagraphStyles');
    jest.spyOn(mockEditorApi, 'getParagraphStyleById');
    jest.spyOn(mockEditorApi, 'createParagraphStyle');
    jest.spyOn(mockEditorApi, 'duplicateParagraphStyle');
    jest.spyOn(mockEditorApi, 'renameParagraphStyle');
    jest.spyOn(mockEditorApi, 'removeParagraphStyle');
    jest.spyOn(mockEditorApi, 'moveParagraphStyles');
    jest.spyOn(mockEditorApi, 'updateParagraphStyle');
});

afterAll(() => {
    jest.restoreAllMocks();
});

const updateParagraphStyle: ParagraphStyleUpdate = {
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
    alignToBaseLine: {
        value: false,
    },
    baselineShiftValue: {
        value: '0 px',
    },
    lineHeight: {
        value: 100.0,
    },
    textAlign: {
        value: Alignment.LEFT,
    },
    textAlignLast: {
        value: Alignment.LEFT,
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
describe('ParagraphStyleController', () => {
    it('Should call the getParagraphStyles method', async () => {
        await mockedParagraphStyleController.getParagraphStyles();
        expect(mockEditorApi.getParagraphStyles).toHaveBeenCalledTimes(1);
    });
    it('Should call the getParagraphStyle method', async () => {
        await mockedParagraphStyleController.getParagraphStyle('5');
        expect(mockEditorApi.getParagraphStyleById).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.getParagraphStyleById).toHaveBeenCalledWith('5');
    });

    it('Should call the createParagraphStyle method', async () => {
        await mockedParagraphStyleController.createParagraphStyle();
        expect(mockEditorApi.createParagraphStyle).toHaveBeenCalledTimes(1);
    });

    it('Should call the duplicateParagraphStyle method', async () => {
        await mockedParagraphStyleController.duplicateParagraphStyle('4');
        expect(mockEditorApi.duplicateParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.duplicateParagraphStyle).toHaveBeenCalledWith('4');
    });

    it('Should call the moveParagraphStyles method', async () => {
        await mockedParagraphStyleController.moveParagraphStyles(2, ['1', '2']);
        expect(mockEditorApi.moveParagraphStyles).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.moveParagraphStyles).toHaveBeenCalledWith(2, ['1', '2']);
    });

    it('Should call the renameParagraphStyle method', async () => {
        await mockedParagraphStyleController.renameParagraphStyle('3', 'new paragraph name');
        expect(mockEditorApi.renameParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.renameParagraphStyle).toHaveBeenCalledWith('3', 'new paragraph name');
    });

    it('Should call the updateParagraphStyle method', async () => {
        await mockedParagraphStyleController.updateParagraphStyle('3', updateParagraphStyle);
        expect(mockEditorApi.updateParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.updateParagraphStyle).toHaveBeenCalledWith('3', JSON.stringify(updateParagraphStyle));
    });

    it('Should call the removeParagraphStyle method', async () => {
        await mockedParagraphStyleController.removeParagraphStyle('4');
        expect(mockEditorApi.removeParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockEditorApi.removeParagraphStyle).toHaveBeenCalledWith('4');
    });
});
