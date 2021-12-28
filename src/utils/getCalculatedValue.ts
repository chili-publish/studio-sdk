enum operators {
    add = '+',
    substract = '-',
    divide = '/',
    multiply = '*',
    modulo = '%',
}

const flatOrderOfOperations = [
    operators.multiply,
    operators.divide,
    operators.modulo,
    operators.add,
    operators.substract,
];

const calculate = (a: string, op: operators, b: string, isNegative = false) => {
    const left = parseFloat(a);
    const right = isNegative ? -parseFloat(b) : parseFloat(b);

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

const sepperateOperations = (value: string) => {
    const valueArr = value.split('');
    const sepperatedArr: string[] = [];
    let cache = '';
    valueArr.forEach((val) => {
        const currentCacheIsNaN = isNaN(parseInt(cache));
        // if cache is empty, write val to cache
        if (cache === '') {
            cache = val;
            return;
        }
        // if val is not a digit
        if (isNaN(parseInt(val))) {
            // if cache is not a digit, write val to cache
            if (currentCacheIsNaN) {
                cache += val;
            } else {
                // if val is a decimal sepperator, add it to cache because cache are digits
                if (val === '.') {
                    cache += val;
                } else {
                    // if val is not a digit, and cache is a digit, write cache to array
                    sepperatedArr.push(cache);
                    cache = val;
                }
            }
            // if val is a digit
        } else {
            if (!currentCacheIsNaN) {
                cache += val;
            } else {
                // if val is a digit, and cache is not a digit, write cache to array
                sepperatedArr.push(cache);
                cache = val;
            }
        }
    });
    sepperatedArr.push(cache);
    return sepperatedArr;
};

const calculateByOrder = (arr: string[]) => {
    let tmpArr = [...arr];
    flatOrderOfOperations.forEach((operator) => {
        const occurenceIndexes: number[] = [];
        const newArr = [];
        tmpArr.forEach((el, idx) => {
            // if operator is inside the array
            if (el.includes(operator.toString())) occurenceIndexes.push(idx);
        });
        if (occurenceIndexes.length) {
            const tmpCalculations: number[] = [];
            occurenceIndexes.forEach((idx) => {
                const left = tmpArr[idx - 1];
                const right = tmpArr[idx + 1];

                const isNegative = tmpArr[idx].length > 1;

                const calculation = calculate(left, operator.substring(0, 1) as operators, right, isNegative);
                if (typeof calculation !== 'undefined') tmpCalculations.push(calculation);
            });
            for (let i = 0; i < tmpArr.length; i++) {
                const isCalculated = occurenceIndexes.includes(i + 1);
                if (isCalculated) {
                    newArr.push(tmpCalculations[0].toString());
                    tmpCalculations.splice(0, 1);
                    i = i + 2;
                } else {
                    newArr.push(tmpArr[i]);
                }
            }
        }
        if (newArr.length > 0) tmpArr = newArr;
    });
    if (tmpArr.length === 1) return parseFloat(tmpArr[0]);
};

export const getCalculatedValue = (value: string, roundPrecision = 2) => {
    const input = cleanupInput(value);

    if (input.length === 0 || input === null) return null;
    try {
        if (isCalculation(input)) {
            const calculationArray = sepperateOperations(input);
            const calculation = calculateByOrder(calculationArray);
            if (typeof calculation !== 'undefined') return round(calculation, roundPrecision);
        }
        return round(parseFloat(input), roundPrecision);
    } catch (error) {
        console.error('The calculation has failed');
        return null;
    }
};
