import { FilePointer, Id } from '../types/CommonTypes';
import { WellKnownConfigurationKeys } from '../types/ConfigurationTypes';
import { UploadValidationConfiguration } from '../types/ConnectorTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { EnvironmentType } from '../utils/Enums';
import { round } from '../utils/MathUtils';

/**
 * The UtilsController exposes a set of useful utilities that can be used to make some repeated tasks a bit easier
 * Methods inside this controller can be called by `window.SDK.utils.{method-name}`
 */
export class UtilsController {
    #localConfig: Map<string, string>;

    constructor(localConfig: Map<string, string>) {
        this.#localConfig = localConfig;
    }

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

    /**
     * This method can help you stage a file to the CHILI GraFx Environment API for upload.
     * @param files The Files or Blobs to stage.
     * @param remoteConnectorId The connector ID from Environment API to stage the files for.
     * @param validationConfiguration The validation configuration to use for the files.
     * @returns Promise<FilePointer[]> referencing the staged data.
     */
    stageFiles = async (
        files: File[] | Blob[],
        remoteConnectorId: Id,
        validationConfiguration?: UploadValidationConfiguration,
    ): Promise<FilePointer[]> => {
        const envApiUrl = this.#localConfig.get(WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl);
        if (!envApiUrl) {
            throw new Error('GraFx Studio Environment API URL is not set');
        }

        const stageUrl = `${envApiUrl}connector/${remoteConnectorId}/stage`;

        const accessToken = this.#localConfig.get(WellKnownConfigurationKeys.GraFxStudioAuthToken);
        if (!accessToken) {
            throw new Error('GraFx Studio Auth Token is not set');
        }

        const formData = new FormData();

        // Add each file/blob to form data
        files.forEach((file, idx) => {
            const filename = file instanceof File ? file.name : `blob-${idx}`;
            formData.append('files', file, filename);
        });

        if (validationConfiguration) {
            formData.append('validationConfiguration', JSON.stringify(validationConfiguration));
        }

        const response = await fetch(stageUrl, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to stage files');
        }

        const data = await response.json();
        return data as FilePointer[];
    };
}
