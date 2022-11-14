import { Id } from '../../../types/CommonTypes';
import { FitMode, UpdateZIndexMethod, VerticalAlign } from '../../../types/FrameTypes';
import { FrameController } from '../../controllers/FrameController';
import { mockSelectFrame } from '../__mocks__/FrameProperties';
import MockEditorAPI from '../__mocks__/MockEditorAPI';

let mockedFrameProperties: FrameController;
let frameId: Id;
beforeEach(() => {
    mockedFrameProperties = new FrameController(MockEditorAPI);
    jest.spyOn(mockedFrameProperties, 'getFrames');
    jest.spyOn(mockedFrameProperties, 'getSelectedFrames');
    jest.spyOn(mockedFrameProperties, 'getFramesByPageId');
    jest.spyOn(mockedFrameProperties, 'getFrameByName');
    jest.spyOn(mockedFrameProperties, 'getFrameById');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesOnSelectedLayout');
    jest.spyOn(mockedFrameProperties, 'getFramePropertiesByFrameId');
    jest.spyOn(mockedFrameProperties, 'getFramesProperties');
    jest.spyOn(mockedFrameProperties, 'setFrameHeight');
    jest.spyOn(mockedFrameProperties, 'setFrameWidth');
    jest.spyOn(mockedFrameProperties, 'setFrameX');
    jest.spyOn(mockedFrameProperties, 'setFrameY');
    jest.spyOn(mockedFrameProperties, 'setFrameRotation');
    jest.spyOn(mockedFrameProperties, 'setFrameVisibility');
    jest.spyOn(mockedFrameProperties, 'removeFrame');
    jest.spyOn(mockedFrameProperties, 'resetFrame');
    jest.spyOn(mockedFrameProperties, 'resetFrameX');
    jest.spyOn(mockedFrameProperties, 'resetFrameY');
    jest.spyOn(mockedFrameProperties, 'resetFrameHeight');
    jest.spyOn(mockedFrameProperties, 'resetFrameWidth');
    jest.spyOn(mockedFrameProperties, 'resetFrameRotation');
    jest.spyOn(mockedFrameProperties, 'resetFrameSize');
    jest.spyOn(mockedFrameProperties, 'selectFrame');
    jest.spyOn(mockedFrameProperties, 'selectMultipleFrames');
    jest.spyOn(mockedFrameProperties, 'setFrameName');
    jest.spyOn(mockedFrameProperties, 'setImageFrameFitMode');
    jest.spyOn(mockedFrameProperties, 'setVerticalAlignment');
    jest.spyOn(mockedFrameProperties, 'setMinCopyfitting');
    jest.spyOn(mockedFrameProperties, 'setMaxCopyfitting');
    jest.spyOn(mockedFrameProperties, 'setEnableCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetMinCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetMaxCopyfitting');
    jest.spyOn(mockedFrameProperties, 'resetEnableCopyfitting');
    jest.spyOn(mockedFrameProperties, 'reorderFrames');
    jest.spyOn(mockedFrameProperties, 'setFrameZIndex');

    frameId = mockSelectFrame.frameId;
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('FrameProperties', () => {
    it('Should call all of the Frame Functions of EditorAPI successfully', () => {
        mockedFrameProperties.getFrames();
        expect(mockedFrameProperties.getFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getSelectedFrames();
        expect(mockedFrameProperties.getSelectedFrames).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramesByPageId('2');
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesByPageId).toHaveBeenCalledWith('2');

        mockedFrameProperties.getFrameByName('frame');
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameByName).toHaveBeenCalledWith('frame');

        mockedFrameProperties.getFrameById('5');
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFrameById).toHaveBeenCalledWith('5');

        mockedFrameProperties.getFramePropertiesOnSelectedLayout();
        expect(mockedFrameProperties.getFramePropertiesOnSelectedLayout).toHaveBeenCalledTimes(1);

        mockedFrameProperties.getFramePropertiesByFrameId('1', '2');
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramePropertiesByFrameId).toHaveBeenCalledWith('1', '2');

        mockedFrameProperties.getFramesProperties('1');
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.getFramesProperties).toHaveBeenCalledWith('1');

        mockedFrameProperties.setFrameHeight(frameId, '300');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameRotation(frameId, '400');
        expect(mockedFrameProperties.setFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameY(frameId, '100');
        expect(mockedFrameProperties.setFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameX(frameId, '400');
        expect(mockedFrameProperties.setFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameWidth(frameId, '332');
        expect(mockedFrameProperties.setFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameHeight(frameId, '32');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(2);

        mockedFrameProperties.setFrameName('1', 'TEST');
        expect(mockedFrameProperties.setFrameName).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameVisibility('2', false);
        expect(mockedFrameProperties.setFrameVisibility).toHaveBeenCalledTimes(1);

        mockedFrameProperties.removeFrame('1');
        expect(mockedFrameProperties.removeFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrame('2');
        expect(mockedFrameProperties.resetFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameX('2');
        expect(mockedFrameProperties.resetFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameY('2');
        expect(mockedFrameProperties.resetFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameRotation('2');
        expect(mockedFrameProperties.resetFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameHeight('2');
        expect(mockedFrameProperties.resetFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameWidth('2');
        expect(mockedFrameProperties.resetFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetFrameSize('2');
        expect(mockedFrameProperties.resetFrameSize).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectFrame('2');
        expect(mockedFrameProperties.selectFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectMultipleFrames(['5']);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledWith(['5']);

        mockedFrameProperties.setImageFrameFitMode(frameId, FitMode.fit);
        expect(mockedFrameProperties.setImageFrameFitMode).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setImageFrameFitMode).toHaveBeenCalledWith(frameId, FitMode.fit);

        mockedFrameProperties.setVerticalAlignment(frameId, VerticalAlign.justify);
        expect(mockedFrameProperties.setVerticalAlignment).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setVerticalAlignment).toHaveBeenCalledWith(frameId, VerticalAlign.justify);

        mockedFrameProperties.setMinCopyfitting(frameId, '0.5');
        expect(mockedFrameProperties.setMinCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setMinCopyfitting).toHaveBeenCalledWith(frameId, '0.5');

        mockedFrameProperties.setMaxCopyfitting(frameId, '5.0');
        expect(mockedFrameProperties.setMaxCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setMaxCopyfitting).toHaveBeenCalledWith(frameId, '5.0');

        mockedFrameProperties.setEnableCopyfitting(frameId, true);
        expect(mockedFrameProperties.setEnableCopyfitting).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setEnableCopyfitting).toHaveBeenCalledWith(frameId, true);

        mockedFrameProperties.resetMinCopyfitting(frameId);
        expect(mockedFrameProperties.resetMinCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetMaxCopyfitting(frameId);
        expect(mockedFrameProperties.resetMaxCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.resetEnableCopyfitting(frameId);
        expect(mockedFrameProperties.resetEnableCopyfitting).toHaveBeenCalledTimes(1);

        mockedFrameProperties.reorderFrames(1, [frameId]);
        expect(mockedFrameProperties.reorderFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.reorderFrames).toHaveBeenCalledWith(1, [frameId]);

        mockedFrameProperties.setFrameZIndex(frameId, UpdateZIndexMethod.sendBackward);
        expect(mockedFrameProperties.setFrameZIndex).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.setFrameZIndex).toHaveBeenCalledWith(frameId, UpdateZIndexMethod.sendBackward);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Returns null when user input doesnt contain any number', async () => {
        const responseX = await mockedFrameProperties.setFrameX(frameId, 'dasdsa');
        const responseY = await mockedFrameProperties.setFrameY(frameId, 'sdsadas');
        const responseWidth = await mockedFrameProperties.setFrameWidth(frameId, 'sd');
        const responseHeight = await mockedFrameProperties.setFrameHeight(frameId, 'dds');
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, 'dsdsd');
        expect(responseX).toEqual(null);
        expect(responseY).toEqual(null);
        expect(responseWidth).toEqual(null);
        expect(responseHeight).toEqual(null);
        expect(responseRotation).toEqual(null);
    });

    it('return null when the user input an infinite value', async () => {
        const responseRotation = await mockedFrameProperties.setFrameRotation(frameId, '20/0');
        expect(responseRotation).toBeNull();
    });
});
