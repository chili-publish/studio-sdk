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

    describe('setVerticalMovement', () => {
        it('should set vertical movement constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                verticalMovementAllowed: { value: allowed }
            };

            await frameConstraintController.setVerticalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });

        it('should set vertical movement constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                verticalMovementAllowed: { value: allowed }
            };

            await frameConstraintController.setVerticalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });
    });

    describe('setHorizontalMovement', () => {
        it('should set horizontal movement constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                horizontalMovementAllowed: { value: allowed }
            };

            await frameConstraintController.setHorizontalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });

        it('should set horizontal movement constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                horizontalMovementAllowed: { value: allowed }
            };

            await frameConstraintController.setHorizontalMovement(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });
    });

    describe('setRotation', () => {
        it('should set rotation constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                rotationAllowed: { value: allowed }
            };

            await frameConstraintController.setRotation(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });

        it('should set rotation constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                rotationAllowed: { value: allowed }
            };

            await frameConstraintController.setRotation(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });
    });

    describe('setResize', () => {
        it('should set resize constraint to allowed', async () => {
            const allowed = true;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                resizeAllowed: { value: allowed }
            };

            await frameConstraintController.setResize(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });

        it('should set resize constraint to not allowed', async () => {
            const allowed = false;
            const expectedDeltaUpdate: FrameConstraintsDeltaUpdate = {
                resizeAllowed: { value: allowed }
            };

            await frameConstraintController.setResize(id, allowed);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(1);
            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledWith(
                id,
                JSON.stringify(expectedDeltaUpdate)
            );
        });
    });

    describe('integration tests', () => {
        it('should handle multiple constraint updates independently', async () => {
            await frameConstraintController.setVerticalMovement(id, true);
            await frameConstraintController.setHorizontalMovement(id, false);
            await frameConstraintController.setRotation(id, true);
            await frameConstraintController.setResize(id, false);

            expect(mockedEditorApi.updateFrameConstraints).toHaveBeenCalledTimes(4);

            const calls = (mockedEditorApi.updateFrameConstraints as jest.Mock).mock.calls;
            const lastFourCalls = calls.slice(-4);

            expect(lastFourCalls[0]).toEqual([id, JSON.stringify({ verticalMovementAllowed: { value: true } })]);
            expect(lastFourCalls[1]).toEqual([id, JSON.stringify({ horizontalMovementAllowed: { value: false } })]);
            expect(lastFourCalls[2]).toEqual([id, JSON.stringify({ rotationAllowed: { value: true } })]);
            expect(lastFourCalls[3]).toEqual([id, JSON.stringify({ resizeAllowed: { value: false } })]);
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
            expect(lastTwoCalls[1]).toEqual([frameId2, JSON.stringify({ horizontalMovementAllowed: { value: false } })]);
        });
    });
});
