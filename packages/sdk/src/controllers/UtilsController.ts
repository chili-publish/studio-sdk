import { round } from '../utils/MathUtils';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { EnvironmentType } from '../utils/enums';

/**
 * The UtilsController exposes a set of useful utilities that can be used to make some repeated tasks a bit easier
 * Methods inside this controller can be called by `window.SDK.utils.{method-name}`
 */
export class UtilsController {
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

    createEnvironmentBaseURL = (parameters: { type?: EnvironmentType; environment?: string; version?: string }) => {
        const { type = EnvironmentType.SANDBOX, environment = 'ft-nostress', version = '1' } = parameters;
        const host = type == EnvironmentType.SANDBOX ? 'chili-publish-sandbox' : 'chili-publish';
        return `https://${environment}.${host}.online/grafx/api/v${version}/environment/${environment}`;
    };
}
