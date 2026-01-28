import { EditorAPI, Id } from '../../types/CommonTypes';
import { FrameConstraintsDeltaUpdate } from '../../types/FrameTypes';
import { castToEditorResponse, getEditorResponseData } from '../../utils/EditorResponseData';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import { FrameConstraintController, FrameController } from '../../controllers/FrameController';

let id: Id;
let mockedFrameController: FrameController;
let frameConstraintController: FrameConstraintController;

const mockedEditorApi: EditorAPI = {
    getFrameConstraints: async () => getEditorResponseData(castToEditorResponse([])),
    updateFrameConstraints: async () => getEditorResponseData(castToEditorResponse([])),
};

beforeEach(() => {
    mockedFrameController = new FrameController(mockedEditorApi);
    frameConstraintController = mockedFrameController.constraints;

    jest.clearAllMocks();
    jest.spyOn(mockedEditorApi, 'getFrameConstraints');
    jest.spyOn(mockedEditorApi, 'updateFrameConstraints');

    id = mockSelectFrame.id;
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('FrameConstraintController', () => {
    describe('get', () => {
        it('should retrieve all constraints for a specified frame', async () => {
            await frameConstraintController.get(id);
            expect(mockedEditorApi.getFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.getFrameConstraints).toHaveBeenCalledWith(id);
        });
    });

    describe('setSelectable', () => {
        it('should set selectable constraint to allowed', async () => {
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                selectionAllowed: { value: true },
            };

            await frameConstraintController.setSelectable(id, true);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set selectable constraint to not allowed', async () => {
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                selectionAllowed: { value: false },
            };

            await frameConstraintController.setSelectable(id, false);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setHorizontalMovement', () => {
        it('should set horizontal movement constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                horizontalMovementAllowed: { value: allowed },
            };

            await frameConstraintController.setHorizontalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set horizontal movement constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                horizontalMovementAllowed: { value: allowed },
            };

            await frameConstraintController.setHorizontalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setVerticalMovement', () => {
        it('should set vertical movement constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                verticalMovementAllowed: { value: allowed },
            };

            await frameConstraintController.setVerticalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set vertical movement constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                verticalMovementAllowed: { value: allowed },
            };

            await frameConstraintController.setVerticalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setRotation', () => {
        it('should set rotation constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                rotationAllowed: { value: allowed },
            };

            await frameConstraintController.setRotation(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set rotation constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                rotationAllowed: { value: allowed },
            };

            await frameConstraintController.setRotation(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setResize', () => {
        it('should set resize constraint without proportionLocked when not provided', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                resizeAllowed: { value: allowed },
            };

            await frameConstraintController.setResize(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set resize constraint to allowed with proportions unlocked', async () => {
            const allowed = true;
            const proportionLocked = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                resizeAllowed: { value: allowed },
                proportionLocked: { value: proportionLocked },
            };

            await frameConstraintController.setResize(id, allowed, proportionLocked);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set resize constraint to not allowed with proportions locked', async () => {
            const allowed = false;
            const proportionLocked = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                resizeAllowed: { value: allowed },
                proportionLocked: { value: proportionLocked },
            };

            await frameConstraintController.setResize(id, allowed, proportionLocked);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setCrop', () => {
        it('should set crop constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                image: { cropAllowed: { value: allowed } },
            };

            await frameConstraintController.setCrop(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set crop constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                image: { cropAllowed: { value: allowed } },
            };

            await frameConstraintController.setCrop(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setTextEditingAllowed', () => {
        it('should set text editing constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { textEditingAllowed: { value: allowed } },
            };

            await frameConstraintController.setTextEditingAllowed(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set text editing constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { textEditingAllowed: { value: allowed } },
            };

            await frameConstraintController.setTextEditingAllowed(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setAllowedParagraphStyleIds', () => {
        it('should set allowed paragraph style IDs constraint', async () => {
            const styleIds: Id[] = ['style-1', 'style-2', 'style-3'];
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedParagraphStyleIds: { value: styleIds } },
            };

            await frameConstraintController.setAllowedParagraphStyleIds(id, styleIds);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should remove allowed paragraph style IDs constraint when set to null', async () => {
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedParagraphStyleIds: { value: null } },
            };

            await frameConstraintController.setAllowedParagraphStyleIds(id, null);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setAllowedCharacterStyleIds', () => {
        it('should set allowed character style IDs constraint', async () => {
            const styleIds: Id[] = ['char-style-1', 'char-style-2'];
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedCharacterStyleIds: { value: styleIds } },
            };

            await frameConstraintController.setAllowedCharacterStyleIds(id, styleIds);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should remove allowed character style IDs constraint when set to null', async () => {
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedCharacterStyleIds: { value: null } },
            };

            await frameConstraintController.setAllowedCharacterStyleIds(id, null);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setAllowedColorIds', () => {
        it('should set allowed color IDs constraint', async () => {
            const colorIds: Id[] = ['color-1', 'color-2', 'color-3', 'color-4'];
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedColorIds: { value: colorIds } },
            };

            await frameConstraintController.setAllowedColorIds(id, colorIds);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should remove allowed color IDs constraint when set to null', async () => {
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedColorIds: { value: null } },
            };

            await frameConstraintController.setAllowedColorIds(id, null);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('setAllowedFontSizes', () => {
        it('should set allowed font sizes constraint with min and max', async () => {
            const fontSizeRange = { min: 10, max: 72 };
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedFontSizes: { value: fontSizeRange } },
            };

            await frameConstraintController.setAllowedFontSizes(id, fontSizeRange);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set allowed font sizes constraint with min only (max null)', async () => {
            const fontSizeRange = { min: 12, max: null };
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedFontSizes: { value: fontSizeRange } },
            };

            await frameConstraintController.setAllowedFontSizes(id, fontSizeRange);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should set allowed font sizes constraint with max only (min null)', async () => {
            const fontSizeRange = { min: null, max: 48 };
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedFontSizes: { value: fontSizeRange } },
            };

            await frameConstraintController.setAllowedFontSizes(id, fontSizeRange);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });

        it('should remove allowed font sizes constraint when set to { min: null, max: null }', async () => {
            const fontSizeRange = { min: null, max: null };
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                text: { allowedFontSizes: { value: fontSizeRange } },
            };

            await frameConstraintController.setAllowedFontSizes(id, fontSizeRange);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate),
            );
        });
    });

    describe('integration tests', () => {
        it('should handle multiple constraint updates independently', async () => {
            await frameConstraintController.setSelectable(id, true);
            await frameConstraintController.setVerticalMovement(id, true);
            await frameConstraintController.setHorizontalMovement(id, false);
            await frameConstraintController.setRotation(id, true);
            await frameConstraintController.setResize(id, false, true);
            await frameConstraintController.setCrop(id, true);
            await frameConstraintController.setTextEditingAllowed(id, true);
            await frameConstraintController.setAllowedParagraphStyleIds(id, ['style-1', 'style-2']);
            await frameConstraintController.setAllowedCharacterStyleIds(id, ['char-style-1']);
            await frameConstraintController.setAllowedColorIds(id, ['color-1', 'color-2']);
            await frameConstraintController.setAllowedFontSizes(id, { min: 10, max: 72 });

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(11);

            const calls = (mockedEditorApi.updateFrameConstraints as jest.Mock).mock.calls;
            const lastElevenCalls = calls.slice(-11);

            expect(lastElevenCalls[0]).toEqual([id, JSON.stringify({ selectionAllowed: { value: true } })]);
            expect(lastElevenCalls[1]).toEqual([id, JSON.stringify({ verticalMovementAllowed: { value: true } })]);
            expect(lastElevenCalls[2]).toEqual([id, JSON.stringify({ horizontalMovementAllowed: { value: false } })]);
            expect(lastElevenCalls[3]).toEqual([id, JSON.stringify({ rotationAllowed: { value: true } })]);
            expect(lastElevenCalls[4]).toEqual([
                id,
                JSON.stringify({ resizeAllowed: { value: false }, proportionLocked: { value: true } }),
            ]);
            expect(lastElevenCalls[5]).toEqual([id, JSON.stringify({ image: { cropAllowed: { value: true } } })]);
            expect(lastElevenCalls[6]).toEqual([id, JSON.stringify({ text: { textEditingAllowed: { value: true } } })]);
            expect(lastElevenCalls[7]).toEqual([id, JSON.stringify({ text: { allowedParagraphStyleIds: { value: ['style-1', 'style-2'] } } })]);
            expect(lastElevenCalls[8]).toEqual([id, JSON.stringify({ text: { allowedCharacterStyleIds: { value: ['char-style-1'] } } })]);
            expect(lastElevenCalls[9]).toEqual([id, JSON.stringify({ text: { allowedColorIds: { value: ['color-1', 'color-2'] } } })]);
            expect(lastElevenCalls[10]).toEqual([id, JSON.stringify({ text: { allowedFontSizes: { value: { min: 10, max: 72 } } } })]);
        });

        it('should work with different frame IDs', async () => {
            const frameId1 = 'frame-1';
            const frameId2 = 'frame-2';

            await frameConstraintController.setVerticalMovement(frameId1, true);
            await frameConstraintController.setHorizontalMovement(frameId2, false);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(2);

            const calls = (mockedEditorApi.updateFrameConstraints as jest.Mock).mock.calls;
            const lastTwoCalls = calls.slice(-2);

            expect(lastTwoCalls[0]).toEqual([frameId1, JSON.stringify({ verticalMovementAllowed: { value: true } })]);
            expect(lastTwoCalls[1]).toEqual([
                frameId2,
                JSON.stringify({ horizontalMovementAllowed: { value: false } }),
            ]);
        });
    });
});
