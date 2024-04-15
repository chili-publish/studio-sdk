import { EditorAPI, Id } from '../types/CommonTypes';
import { ColorUsage } from '../types/ColorStyleTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';
import {
    BarcodeConfigurationOptions,
    BarcodeProperties,
    BarcodeType,
    QuietZoneDeltaUpdate,
    BarcodeCharacterSet,
    BarcodeErrorCorrectionLevel,
} from '../types/BarcodeTypes';
import { BarcodeSource } from '../types/FrameTypes';
import { PositionEnum } from '../types/LayoutTypes';

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
     * @param source the new source that you want to set to the barcodeFrame.
     * @returns
     */
    setBarcodeSource = async (id: Id, source: BarcodeSource | null) => {
        const res = await this.#editorAPI;
        const srcJson = source !== null ? JSON.stringify(source) : null;
        return res.setBarcodeSource(id, srcJson).then((result) => getEditorResponseData<null>(result));
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
     * @experimental This method sets the magnification for 1-dimensional barcodes.
     * @param id the id of the barcodeFrame that needs to be updated.
     * @param magnification the magnification of the barcode. This is a decimal value where 1 denotes 100%. (f.e. 1.5 will result in 150%)
     * @returns
     */
    setMagnification = async (id: Id, magnification: number) => {
        const properties: BarcodeProperties = { magnification: magnification };
        return this.setBarcodeProperties(id, properties);
    };

    /**
     * @experimental This method sets the quiet zone value of a specific barcode.
     * @param id The id of the specific barcode frame
     * @param value The quiet zone value
     * @param position When defined will update the quiet value of a single position,
     * otherwise will set all positions to the same value. Depending on this parameter
     * being defined, the `areQuietZoneValuesCombined` will also be updated.
     */
    setQuietZoneValue = async (id: Id, value: string, position?: PositionEnum) => {
        const update: QuietZoneDeltaUpdate = position
            ? {
                  left: position === PositionEnum.left ? value : undefined,
                  top: position === PositionEnum.top ? value : undefined,
                  right: position === PositionEnum.right ? value : undefined,
                  bottom: position === PositionEnum.bottom ? value : undefined,
              }
            : { left: value, top: value, right: value, bottom: value };

        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify({ quietZone: update }))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method sets the combined state of the quiet zone values.
     * @param id The id of the specific barcode frame
     * @param value Whether the quiet zone values are combined
     */
    setAreQuietZoneValuesCombined = async (id: Id, value: boolean) => {
        const update: QuietZoneDeltaUpdate = { areQuietZoneValuesCombined: value };

        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify({ quietZone: update }))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method sets the character set for the barcode.
     * @param id The id of the specific barcode frame.
     * @param errorCorrectionLevel The error correction level to set.
     * @returns
     */
    setErrorCorrectionLevel = async (id: Id, errorCorrectionLevel: BarcodeErrorCorrectionLevel) => {
        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify({ errorCorrectionLevel: errorCorrectionLevel }))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method sets the character set for the barcode.
     * @param id The id of the specific barcode frame.
     * @param characterSet The character set to set.
     * @returns
     */
    setCharacterSet = async (id: Id, characterSet: BarcodeCharacterSet) => {
        const res = await this.#editorAPI;
        return res
            .setBarcodeProperties(id, JSON.stringify({ characterSet: characterSet }))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * @experimental This method returns the possible configuration options which are valid for the given barcode type.
     * @param type the barcode type for which the configuration options are requested.
     * @returns a BarcodeConfigurationOptions object
     */
    getBarcodeConfigationOptions = (type: BarcodeType): BarcodeConfigurationOptions => {
        let allowToggleText = true;
        let allowBarHeight = true;
        let allowEnableMagnification = true;
        let allowedCharacterSets = undefined;
        let allowedErrorCorrectionLevels = undefined;
        let quietZoneAlwaysCombined = false;
        switch (type) {
            case BarcodeType.qr:
                allowedCharacterSets = [BarcodeCharacterSet.iso8859_1, BarcodeCharacterSet.utf8];
                allowedErrorCorrectionLevels = [
                    BarcodeErrorCorrectionLevel.low,
                    BarcodeErrorCorrectionLevel.medium,
                    BarcodeErrorCorrectionLevel.quartile,
                    BarcodeErrorCorrectionLevel.high,
                ];
            // Intentional fall-through
            case BarcodeType.dataMatrix:
                allowToggleText = false;
                allowBarHeight = false;
                allowEnableMagnification = false;
                quietZoneAlwaysCombined = true;
                break;
            case BarcodeType.ean13:
            case BarcodeType.ean8:
            case BarcodeType.upca:
            case BarcodeType.upce:
                allowToggleText = false;
                break;
            case BarcodeType.code128:
            case BarcodeType.gs1128:
                allowedCharacterSets = [
                    BarcodeCharacterSet.code128a,
                    BarcodeCharacterSet.code128b,
                    BarcodeCharacterSet.code128c,
                ];
                break;
        }
        return {
            allowEnableMagnification: allowEnableMagnification,
            allowBarHeight: allowBarHeight,
            allowQuietZone: true,
            allowedCharacterSets: allowedCharacterSets,
            allowedErrorCorrectionLevels: allowedErrorCorrectionLevels,
            allowToggleText: allowToggleText,
            quietZoneAlwaysCombined: quietZoneAlwaysCombined,
        };
    };
}
