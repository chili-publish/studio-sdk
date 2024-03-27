import { ColorUsage } from './ColorStyleTypes';

export enum BarcodeType {
    code39 = 'code39',
    code93 = 'code93',
    code128 = 'code128',
    dataMatrix = 'dataMatrix',
    ean13 = 'ean13',
    ean8 = 'ean8',
    qr = 'qr',
    upca = 'upca',
    upce = 'upce',
}

export interface BarcodeProperties {
    enableBackground?: boolean;
    backgroundColor?: ColorUsage;
    enableBars?: boolean;
    barColor?: ColorUsage;
    enableText?: boolean;
    barHeight?: string;
    magnification?: number;
    quietZone?: QuietZoneDeltaUpdate;
    errorCorrectionLevel?: BarcodeErrorCorrectionLevel;
    characterSet?: BarcodeCharacterSet;
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
    allowToggleText: boolean;
}

export type QuietZone = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    areQuietZoneValuesCombined: boolean;
};

export type QuietZoneDeltaUpdate = {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    areQuietZoneValuesCombined?: boolean;
};

export type BarcodeFrameValidationResult = {
    id: string;
    validationResult: BarcodeValidationResult;
};

export enum BarcodeValidationResult {
    success = 'success',
    empty = 'empty',
    invalidLength = 'invalidLength',
    invalidCharacters = 'invalidCharacters',
    invalidChecksum = 'invalidChecksum',
}
