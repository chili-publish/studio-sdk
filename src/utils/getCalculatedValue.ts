enum operators {
    add = '+',
    substract = '-',
    divide = '/',
    multiply = '*',
    modulo = '%',
}

const orderOfOperations = [
    [[operators.multiply], [operators.divide], [operators.modulo]],
    [[operators.add], [operators.substract]],
];

const calculate = (a: string, op: operators, b: string) => {
    const left = parseFloat(a);
    const right = parseFloat(b);

    switch (op) {
        case operators.add:
            return left + right;
        case operators.substract:
            return left - right;
        case operators.divide:
            if (right === 0) throw new Error(`Division by zero doesn't make you a hero`);
            return left / right;
        case operators.multiply:
            return left * right;
        case operators.modulo:
            return left % right;
        default:
            null;
    }
};

const generateOutput = (initialInput: string) => {
    let input = initialInput;
    let output = 0;
    for (let i = 0, n = orderOfOperations.length; i < n; i++) {
        // Regular Expression to look for operators between floating numbers or integers
        const regex = new RegExp('(\\d+\\.?\\d*)([\\' + orderOfOperations[i].join('\\') + '])(\\d+\\.?\\d*)');
        regex.lastIndex = 0; // take precautions and reset re starting pos

        // Loop while there is still calculation for level of precedence
        while (regex.test(input)) {
            output = calculate(RegExp.$1, RegExp.$2 as operators, RegExp.$3) || 0;
            if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
            input = input.replace(regex, output.toString());
        }
    }

    return output;
};

const cleanupInput = (input: string) => input.replace(/[^0-9,\-,+,/,*,/,/,/.,%/]/gi, '').replace(/,/gi, '.');

const isCalculation = (input: string) => {
    const hasOperator = !!Object.values(operators).find((operator) => {
        if (input.substring(1).includes(operator)) return true;
        return false;
    });
    return hasOperator;
};

export const round = (val: number, precision = 2) => {
    const hunderd = Math.pow(10, precision);
    return Math.round(val * hunderd) / hunderd;
};

export const getCalculatedValue = (value: string, roundPrecision = 2) => {
    const input = cleanupInput(value);
    if (input.length === 0 || input === null) return null;
    try {
        if (isCalculation(input)) {
            return round(generateOutput(input), roundPrecision);
        }
        return round(parseFloat(input), roundPrecision);
    } catch (error) {
        console.error('The calculation has failed');
        return null;
    }
};
