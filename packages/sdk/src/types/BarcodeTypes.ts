import { ColorUsage } from './ColorStyleTypes';

export enum BarcodeType {
    code39 = 'code39',
    code93 = 'code93',
    code128 = 'code128',
    dataMatrix = 'dataMatrix',
    ean13 = 'ean13',
    ean8 = 'ean8',
    isbn = 'isbn',
    qr = 'qr',
    upca = 'upca',
    upce = 'upce',
}

export interface BarcodeProperties {
    enableBackground?: boolean;
    backgroundColor?: ColorUsage;
    enableBars?: boolean;
    barColor?: ColorUsage;
}

export enum BarcodeErrorCorrectionLevel {
    low = 'low',
    medium = 'medium',
    quartile = 'quartile',
    high = 'high',
}

export enum BarcodeCharacterSet {
    utf8 = 'utf8',
    iso8859_1 = 'iso8859_1',
    code128a = 'code128a',
    code128b = 'code128b',
    code128c = 'code128c',
}

export interface BarcodeConfigurationOptions {
    allowedErrorCorrectionLevels?: BarcodeErrorCorrectionLevel[];
    allowedCharacterSets?: BarcodeCharacterSet[];
    allowQuietZone: boolean;
    allowBarHeight: boolean;
    allowEnableMagnification: boolean;
}
