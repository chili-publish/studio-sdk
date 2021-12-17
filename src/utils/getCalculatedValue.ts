import { evaluate, round } from 'mathjs';

export const getCalculatedValue = (value: string) => {
    const str = value.replace(/[^0-9,\-,+,/,*,(,),/,/,/./]/gi, '').replace(/,/gi, '.');
    if (str === null || str.length === 0) return null;
    let calc: number | null;
    try {
        calc = round(evaluate(str), 2);
    } catch (error) {
        calc = null;
    }
    return calc;
};
