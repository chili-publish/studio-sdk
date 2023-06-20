import { getCalculatedValue, round } from '../utils/getCalculatedValue';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * The UtilsController exposes a set of useful utilities that can be used to make some repeated tasks a bit easier
 * Methods inside this controller can be called by `window.SDK.utils.{method-name}`
 */
export class UtilsController {
    /**
     * This method can calculate what's inside a string that represents a calculation (f.e. "1 + 5 - 2" will result in 4)
     * @param val the string value that needs to be calculated
     * @param precision the precision that the calculation should round to (f.e. if the return value is 5.012 and precision is 2, the end result should be 5.01) 2 is also the default
     * @returns the calculated value or null in case that it can't be calculated
     */
    calculateFromString = (val: string, precision?: number) =>
        getEditorResponseData<number>({
            data: String(getCalculatedValue(val, precision)),
            success: true,
            status: 200,
            parsedData: null,
        });

    /**
     * This method can round a value to a certain precision, default is 2
     * @param val the value that needs to be rounded
     * @param precision the precision of the rounding operation
     * @returns the rounded value as a number
     */
    round = (val: number, precision?: number) =>
        getEditorResponseData<number>({
            data: String(round(val, precision)),
            success: true,
            status: 200,
            parsedData: null,
        });
    
    createEnvironmentBaseURL = ({type="sandbox", environment="ft-nostress"} = {type: str = "sandbox", environment: "ft-nostress"}, version='1') => {
        const host = (type=="sandbox") ? "chili-publish-sandbox" : "chili-publish"
            return `https://${environment}.${host}.online/grafx/api/${version}/environment/${environment}`;
        }
}
