import { ColorUsage } from './ColorStyleTypes';

export enum BarcodeType {
    code39 = 'code39',
    code93 = 'code93',
    code128 = 'code128',
    datamatrix = 'datamatrix',
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
