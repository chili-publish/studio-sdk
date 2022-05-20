export type DocumentError = { error: Record<string, unknown>; code: number };

export type UndoState =  {
    canUndo: boolean;
    canRedo: boolean;
    undoItemName: OperationName;
    redoItemName: OperationName;
}

export type OperationName = {translationKey: number; name: string}