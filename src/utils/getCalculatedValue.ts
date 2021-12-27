import { evaluate, round } from 'mathjs';

/*
    TODO:
    - map calculations
    - calculate
    - round
*/

export const getCalculatedValue = (value: string, roundPrecision = 2) => {
    const str = value.replace(/[^0-9,\-,+,/,*,(,),/,/,/./]/gi, '').replace(/,/gi, '.');
    if (str === null || str.length === 0) return null;
    let calc: number | null;
    try {
        calc = round(evaluate(str), roundPrecision);
    } catch (error) {
        calc = null;
    }
    return calc;
};
