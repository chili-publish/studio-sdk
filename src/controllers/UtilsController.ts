import { getCalculatedValue, round } from '../utils/getCalculatedValue';

/**
 * The UtilsController exposes a set of usefull utilities that can be used to make some repeated tasks a bit easier
 * Methods inside this controller can be called by `window.SDK.utils.{method-name}`
 */
export class UtilsController {
    /**
     * This method can calculate what's inside a string that represents a calculation (f.e. "1 + 5 - 2" will result in 4)
     * @param val the string value that needs to be calculated
     * @param precision the precision that the calculation should round to (f.e. if the return value is 5.012 and precision is 2, the endresult should be 5.01) 2 is also the default
     * @returns The calculated value or null in case that it can't be calculated
     */
    calculateFromString = (val: string, precision?: number) => getCalculatedValue(val, precision);

    /**
     * This method can round a value to a certain precision, default is 2
     * @param val the value that needs to be rounded
     * @param precision the precision of the rounding operation
     * @returns The rounded value as a number
     */
    round = (val: number, precision?: number) => round(val, precision);
}
