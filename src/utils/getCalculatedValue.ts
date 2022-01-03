import {
    create,
    evaluateDependencies,
    addDependencies,
    divideDependencies,
    multiplyDependencies,
    modDependencies,
} from 'mathjs';
const { evaluate } = create({
    evaluateDependencies,
    addDependencies,
    divideDependencies,
    multiplyDependencies,
    modDependencies,
});

const cleanupInput = (input: string) => input.replace(/[^0-9,\-+/*.%]/gi, '').replace(/,/gi, '.');

export const round = (val: number, precision = 2) => {
    const hunderd = Math.pow(10, precision);
    return Math.round(val * hunderd) / hunderd;
};

export const getCalculatedValue = (value: string, roundPrecision = 2) => {
    const input = cleanupInput(value);

    if (input.length === 0 || input === null) return null;
    return round(evaluate(input), roundPrecision);
};
