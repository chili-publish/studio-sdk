import FrameProperties from '../../controllers/FrameController';
import mockChild, { mockSelectFrame } from '../__mocks__/FrameProperties';
import mockConfig from '../__mocks__/config';
import { FrameProperyNames } from '../../utils/enums';

let mockedFrameProperties: FrameProperties;

beforeEach(() => {
    mockedFrameProperties = new FrameProperties(mockChild, mockConfig);
    jest.spyOn(mockedFrameProperties, 'setFrameHeight');
    jest.spyOn(mockedFrameProperties, 'setFrameWidth');

    jest.spyOn(mockedFrameProperties, 'setFrameX');

    jest.spyOn(mockedFrameProperties, 'setFrameY');

    jest.spyOn(mockedFrameProperties, 'setFrameRotation');

    jest.spyOn(mockedFrameProperties, 'setFrameVisibility');
    jest.spyOn(mockedFrameProperties, 'getFramePropertyCalculatedValue');

    jest.spyOn(mockedFrameProperties, 'resetFrameX');
    jest.spyOn(mockedFrameProperties, 'resetFrameY');

    jest.spyOn(mockedFrameProperties, 'resetFrameHeight');

    jest.spyOn(mockedFrameProperties, 'resetFrameWidth');
    jest.spyOn(mockedFrameProperties, 'resetFrameRotation');

    jest.spyOn(mockedFrameProperties, 'resetFrameSize');
    jest.spyOn(mockedFrameProperties, 'selectedFrameLayout');
    jest.spyOn(mockedFrameProperties, 'selectedFrameContent');
    jest.spyOn(mockedFrameProperties, 'selectFrame');
    jest.spyOn(mockedFrameProperties, 'selectMultipleFrames');
});

afterAll(() => {
    jest.restoreAllMocks();
});
describe('FrameProperties', () => {
    it('Should call  all of the Frame Functions of Child successfully', () => {
        mockedFrameProperties.setFrameHeight('2', '300');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameRotation('2', '400');
        expect(mockedFrameProperties.setFrameRotation).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameY('2', '100');
        expect(mockedFrameProperties.setFrameY).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameX('2', '400');
        expect(mockedFrameProperties.setFrameX).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameWidth('2', '332');
        expect(mockedFrameProperties.setFrameWidth).toHaveBeenCalledTimes(1);

        mockedFrameProperties.setFrameHeight('2', '32');
        expect(mockedFrameProperties.setFrameHeight).toHaveBeenCalledTimes(2);

        mockedFrameProperties.setFrameVisibility('2', false);
        expect(mockedFrameProperties.setFrameVisibility).toHaveBeenCalledTimes(1);

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

        mockedFrameProperties.selectedFrameLayout('2');
        expect(mockedFrameProperties.selectedFrameLayout).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectedFrameContent('2');
        expect(mockedFrameProperties.selectedFrameContent).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectFrame('2');
        expect(mockedFrameProperties.selectFrame).toHaveBeenCalledTimes(1);

        mockedFrameProperties.selectMultipleFrames(['2', '5']);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledTimes(1);
        expect(mockedFrameProperties.selectMultipleFrames).toHaveBeenCalledWith(['2', '5']);
    });
});

describe('User inputs for Frame Properties', () => {
    it('Should calculate user Inputs and returns the calculated value', () => {
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_X,
            '22',
            mockSelectFrame,
        );
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_Y,
            '343',
            mockSelectFrame,
        );
        const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.WIDTH,
            '11',
            mockSelectFrame,
        );
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.HEIGHT,
            '5',
            mockSelectFrame,
        );
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '785',
            mockSelectFrame,
        );
        expect(responseX).toEqual(22);
        expect(responseY).toEqual(343);
        expect(responseWidth).toEqual(11);
        expect(responseHeight).toEqual(5);
        expect(responseRotation).toEqual(785);
    });

    it('Returns null when user input doesnt contain any number', () => {
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_X,
            'dfsfds',
            mockSelectFrame,
        );
        expect(responseX).toEqual(null);
    });

    it('Clears the input and only returns numbers from the input', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_Y,
            'dfs3242',
            mockSelectFrame,
        );
        expect(responseY).toEqual(3242);
    });

    it('return null when the user input same with latest frame property value', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_Y,
            '20',
            mockSelectFrame,
        );
        expect(responseY).toEqual(null);
    });

    it('return null when the user input an infinite value', () => {
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20/0',
            mockSelectFrame,
        );
        expect(responseRotation).toEqual(null);
    });
});

describe('Math calculations', () => {
    it('Makes Addition successfully', () => {
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20+5',
            mockSelectFrame,
        );
        expect(responseRotation).toEqual(25);
    });

    it('Makes the Subtraction successfully ', () => {
        const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.WIDTH,
            '20-5',
            mockSelectFrame,
        );
        expect(responseWidth).toEqual(15);
    });

    it('Makes the Multiplication successfully ', () => {
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.HEIGHT,
            '20*5',
            mockSelectFrame,
        );
        expect(responseHeight).toEqual(100);
    });
    it('Makes the Division successfully ', () => {
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_X,
            '20/5',
            mockSelectFrame,
        );
        expect(responseX).toEqual(4);
    });

    it('Makes math operations with order ', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_Y,
            '(20-5)*2',
            mockSelectFrame,
        );
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.HEIGHT,
            '20-5*5',
            mockSelectFrame,
        );
        // const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
        //     FrameProperyNames.HEIGHT,
        //     '-20-40',
        //     mockSelectFrame,
        // );
        // const responseX = mockedFrameProperties.getFramePropertyCalculatedValue(
        //     FrameProperyNames.HEIGHT,
        //     '20--40',
        //     mockSelectFrame,
        // );
        expect(responseY).toEqual(10); // brackets are not supported
        expect(responseHeight).toEqual(-5);
        // TODO: no support for negative values yet
        // expect(responseWidth).toEqual(-60);
        // expect(responseX).toEqual(60);
    });

    it('correctly rounds to 2 decimals', () => {
        let response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20.55',
            mockSelectFrame,
        );
        expect(response).toEqual(20.55);

        response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20.333',
            mockSelectFrame,
        );
        expect(response).toEqual(20.33);

        response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20.3',
            mockSelectFrame,
        );
        expect(response).toEqual(20.3);

        response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20.555',
            mockSelectFrame,
        );
        expect(response).toEqual(20.56);
    });

    it('can handle commas as well as points as a decimal sepperator', () => {
        let response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20,55',
            mockSelectFrame,
        );
        expect(response).toEqual(20.55);

        response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '20,55 + 1,44',
            mockSelectFrame,
        );
        expect(response).toEqual(21.99);

        response = mockedFrameProperties.getFramePropertyCalculatedValue(
            FrameProperyNames.FRAME_ROTATION,
            '19,55 + 1,45',
            mockSelectFrame,
        );
        expect(response).toEqual(21);
    });
});
