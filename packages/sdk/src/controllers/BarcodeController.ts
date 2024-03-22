import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorUsage } from '../types/ColorStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import { BarcodeConfigurationOptions, BarcodeProperties, BarcodeType } from '../types/BarcodeTypes';
import { BarcodeSource } from '../types/FrameTypes';

/**
 * The BarcodeController is responsible for all communication regarding Barcodes.
 * Methods inside this controller can be called by `window.SDK.barcode.{method-name}`
 */
export class BarcodeController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * @experimental This method updates properties of the barcode
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param properties A property to update
     * @returns
     */
    private setBarcodeProperties = async (id: Id, properties: BarcodeProperties) => {
        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify(properties))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method will set the background of a barcode enabled or disabled
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param enableBackground Whether the barcode's background is visible.
     * @returns
     */
    setEnableBackground = async (id: Id, enableBackground: boolean) => {
        const properties: BarcodeProperties = { enableBackground: enableBackground };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method will set the barcode background color of a specified barcode frame.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param backgroundColor the new barcode background color that you want to set to the barcodeFrame.
     * @returns
     */
    setBackgroundColor = async (id: Id, backgroundColor: ColorUsage) => {
        const properties: BarcodeProperties = { backgroundColor: backgroundColor };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method will set the visibility of the barcode's bars.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param enableBars Whether the barcode bars are visible.
     * @returns
     */
    setEnableBars = async (id: Id, enableBars: boolean) => {
        const properties: BarcodeProperties = { enableBars: enableBars };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method will set the bar color of a specified barcode frame.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param barColor the new bar color that you want to set to the barcodeFrame.
     * @returns
     */
    setBarColor = async (id: Id, barColor: ColorUsage) => {
        const properties: BarcodeProperties = { barColor: barColor };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method will set the source of the barcode to the given source.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param source
     * @returns
     */
    setBarcodeSource = async (id: Id, source: BarcodeSource) => {
        const res = await this.#editorAPI;
        return res.setBarcodeSource(id, JSON.stringify(source)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method enables/disables displaying the text of the barcode.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param enableText true if the text should be displayed, false otherwise.
     * @returns
     */
    setEnableText = async (id: Id, enableText: boolean) => {
        const properties: BarcodeProperties = { enableText: enableText };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method sets the bar height for 1-dimensional barcodes.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param barHeight the height of the bars in the barcode. The string value will be calculated (f.e. 1+1 will result in 2)
     * @returns
     */
    setBarHeight = async (id: Id, barHeight: string) => {
        const properties: BarcodeProperties = { barHeight: barHeight };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method returns the possible configuration options which are valid for the given barcode type.
     * @param type the barcode type for which the configuration options are requested.
     * @returns a BarcodeConfigurationOptions object
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBarcodeConfigationOptions = (type: BarcodeType): BarcodeConfigurationOptions => {
        let allowToggleText = true;
        let allowBarHeight = true;
        switch (type) {
            case BarcodeType.qr:
            case BarcodeType.dataMatrix:
                allowToggleText = false;
                allowBarHeight = false;
                break;
            case BarcodeType.ean13:
            case BarcodeType.ean8:
            case BarcodeType.upca:
            case BarcodeType.upce:
                allowToggleText = false;
                break;
        }
        return {
            allowEnableMagnification: false,
            allowBarHeight: allowBarHeight,
            allowQuietZone: false,
            allowedCharacterSets: undefined,
            allowedErrorCorrectionLevels: undefined,
            allowToggleText: allowToggleText,
        };
    };
}
