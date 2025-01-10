import { Id } from './CommonTypes';

export type EngineEditing = {
    frameId: Id | null;
    mode: EngineEditingMode;
};

export enum EngineEditingMode {
    normal = 'normal',
    textEdit = 'textEdit',
    customCrop = 'customCrop',
    frameSubjectArea = 'frameSubjectArea',
}
