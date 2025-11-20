import { Id } from './CommonTypes';

export type EngineEditMode = {
    frameId: Id | null;
    mode: EngineEditModeType;
};

export enum EngineEditModeType {
    normal = 'normal',
    textEdit = 'textEdit',
    customCrop = 'customCrop',
    frameSubjectArea = 'frameSubjectArea',
    perAssetCrop = 'perAssetCrop',
    gradient = 'gradient',
}
