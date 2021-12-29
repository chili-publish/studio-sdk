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
    let tmpArr: string[] = [...arr];

    // check if first element is a negative
    if (tmpArr[0] === operators.substract) {
        tmpArr[1] = `-${tmpArr[1]}`;
        tmpArr = tmpArr.slice(1);
    }

    flatOrderOfOperations.forEach((operator) => {
        if (tmpArr.length === 1) return;
        const occurenceIndexes: number[] = [];
        const newArr = [];
        tmpArr.forEach((el, idx) => {
            // if operator is inside the array
            if (el.includes(operator.toString())) occurenceIndexes.push(idx);
        });

        if (occurenceIndexes.length) {
            const tmpCalculations: number[] = [];
            // check all occurences of the operator
            occurenceIndexes.forEach((occIdx, idx) => {
                // check if the occurence is dependent on the previous occurence and calculation
                const dependsOnPreviousCalculation =
                    idx !== 0 && occIdx - occurenceIndexes[idx - 1] === 2 && tmpCalculations.length > 0;

                const rightIsNegative =
                    tmpArr[occIdx].length > 1 && tmpArr[occIdx].substring(1) === operators.substract;
                let leftIsNegative = false;

                // check if left is negative by checking if the operator contains a substraction on the second position
                if (tmpArr[occIdx - 2] && tmpArr[occIdx - 2].substring(1) === operators.substract) {
                    leftIsNegative = true;
                    tmpArr[occIdx - 2] = tmpArr[occIdx - 2].substring(0, 1);
                }

                // leftvalue is or the previous already calculated value, or the next in the original array
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const leftValue = dependsOnPreviousCalculation
                    ? tmpCalculations.pop()!.toString()
                    : tmpArr[occIdx - 1].toString();

                // check negativestates and append them if necessary
                const left = leftIsNegative && !dependsOnPreviousCalculation ? `-${leftValue}` : leftValue;
                const right = rightIsNegative ? `-${tmpArr[occIdx + 1]}` : tmpArr[occIdx + 1];

                // do the calculation
                const calculation = calculate(left, operator.substring(0, 1) as operators, right);
                if (typeof calculation !== 'undefined') tmpCalculations.push(calculation);
            });

            for (let i = 0; i < tmpArr.length; i++) {
                // check if operation is already calculated
                const isCalculated = occurenceIndexes.includes(i + 1);
                if (isCalculated) {
                    // if so, add the calculated value to the new array and remove it from the calculated array
                    newArr.push(tmpCalculations[0].toString());
                    tmpCalculations.splice(0, 1);
                    // skip the operator and rightvalue because they are already covered
                    i = i + 2;
                } else {
                    // if not yet calculated, push original value to new array
                    newArr.push(tmpArr[i]);
                }
            }
        }
        if (newArr.length > 0) tmpArr = newArr;
    });
    // The end result is a 1 item array with the calculated value
    return parseFloat(tmpArr[0]);
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
        console.error(`Calculation ${value} has failed`);
        return null;
    }
};
