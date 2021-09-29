import FrameProperties from '../../classes/frameProperties';
import mockChild, { mockSelectFrame } from '../__mocs__/FrameProperties';

let mockedFrameProperties: FrameProperties;

beforeEach(() => {
    mockedFrameProperties = new FrameProperties(mockChild);
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
    });
});

describe('User inputs for Frame Properties', () => {
    it('Should calculate user Inputs and returns the calculated value', () => {
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue('frameX', '22', mockSelectFrame);
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue('frameY', '343', mockSelectFrame);
        const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameWidth',
            '11',
            mockSelectFrame,
        );
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameHeight',
            '5',
            mockSelectFrame,
        );
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameRotation',
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
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue('frameX', 'dfsfds', mockSelectFrame);
        expect(responseX).toEqual(null);
    });

    it('Clears the input and only returns numbers from the input', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue('frameY', 'dfs3242', mockSelectFrame);
        expect(responseY).toEqual(3242);
    });

    it('return null when the user input same with latest frame property value', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue('frameY', '20', mockSelectFrame);
        expect(responseY).toEqual(null);
    });

    it('return null when the user input an infinite value', () => {
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameRotation',
            '20/0',
            mockSelectFrame,
        );
        expect(responseRotation).toEqual(null);
    });
});

describe('Math calculations', () => {
    it('Makes Addition successfully', () => {
        const responseRotation = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameRotation',
            '20+5',
            mockSelectFrame,
        );
        expect(responseRotation).toEqual(25);
    });

    it('Makes the Subtraction successfully ', () => {
        const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameWidth',
            '20-5',
            mockSelectFrame,
        );
        expect(responseWidth).toEqual(15);
    });

    it('Makes the Multiplication successfully ', () => {
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameHeight',
            '20*5',
            mockSelectFrame,
        );
        expect(responseHeight).toEqual(100);
    });
    it('Makes the Division successfully ', () => {
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue('frameX', '20/5', mockSelectFrame);
        expect(responseX).toEqual(4);
    });

    it('Makes math operations with order ', () => {
        const responseY = mockedFrameProperties.getFramePropertyCalculatedValue('frameY', '(20-5)*2', mockSelectFrame);
        const responseHeight = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameHeight',
            '20-5*5',
            mockSelectFrame,
        );
        const responseWidth = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameHeight',
            '-20-40',
            mockSelectFrame,
        );
        const responseX = mockedFrameProperties.getFramePropertyCalculatedValue(
            'frameHeight',
            '20--40',
            mockSelectFrame,
        );

        expect(responseY).toEqual(30);
        expect(responseHeight).toEqual(-5);
        expect(responseWidth).toEqual(-60);
        expect(responseX).toEqual(60);
    });
});
