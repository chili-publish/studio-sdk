import { ColorType } from '../../../types/ColorStyleTypes';
import { ParagraphStyleController } from '../../controllers/ParagraphStyleController';
import { ColorUsageType, ParagraphStyleUpdate } from '../../../types/ParagraphStyleTypes';
import { Alignment, Case, Scripting } from '../../../types/TextStyleTypes';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedParagraphStyleController: ParagraphStyleController;

beforeEach(() => {
    mockedParagraphStyleController = new ParagraphStyleController(MockEditorAPI);
    jest.spyOn(mockedParagraphStyleController, 'getParagraphStyles');
    jest.spyOn(mockedParagraphStyleController, 'getParagraphStyleById');
    jest.spyOn(mockedParagraphStyleController, 'createParagraphStyle');
    jest.spyOn(mockedParagraphStyleController, 'duplicateParagraphStyle');
    jest.spyOn(mockedParagraphStyleController, 'renameParagraphStyle');
    jest.spyOn(mockedParagraphStyleController, 'removeParagraphStyle');
    jest.spyOn(mockedParagraphStyleController, 'moveParagraphStyles');
    jest.spyOn(mockedParagraphStyleController, 'updateParagraphStyle');
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
describe('ParagraphStyle', () => {
    it('Should call all of the ParagraphStyle Functions of EditorAPI successfully', () => {
        mockedParagraphStyleController.getParagraphStyles();
        expect(mockedParagraphStyleController.getParagraphStyles).toHaveBeenCalledTimes(1);

        mockedParagraphStyleController.getParagraphStyleById('5');
        expect(mockedParagraphStyleController.getParagraphStyleById).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.getParagraphStyleById).toHaveBeenCalledWith('5');

        mockedParagraphStyleController.createParagraphStyle();
        expect(mockedParagraphStyleController.createParagraphStyle).toHaveBeenCalledTimes(1);

        mockedParagraphStyleController.duplicateParagraphStyle('4');
        expect(mockedParagraphStyleController.duplicateParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.duplicateParagraphStyle).toHaveBeenCalledWith('4');

        mockedParagraphStyleController.moveParagraphStyles(2, ['1', '2']);
        expect(mockedParagraphStyleController.moveParagraphStyles).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.moveParagraphStyles).toHaveBeenCalledWith(2, ['1', '2']);

        mockedParagraphStyleController.renameParagraphStyle('3', 'new paragraph name');
        expect(mockedParagraphStyleController.renameParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.renameParagraphStyle).toHaveBeenCalledWith('3', 'new paragraph name');

        mockedParagraphStyleController.updateParagraphStyle('3', updateParagraphStyle);
        expect(mockedParagraphStyleController.updateParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.updateParagraphStyle).toHaveBeenCalledWith('3', updateParagraphStyle);

        mockedParagraphStyleController.removeParagraphStyle('4');
        expect(mockedParagraphStyleController.removeParagraphStyle).toHaveBeenCalledTimes(1);
        expect(mockedParagraphStyleController.removeParagraphStyle).toHaveBeenCalledWith('4');
    });
});
