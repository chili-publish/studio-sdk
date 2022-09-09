import {LayoutWithFrameProperties} from "./LayoutTypes";
import {Variable} from "./VariableTypes";
import {PageType} from "./CommonTypes";
import {StyleKit} from "./ColorStyleTypes";

export type DocumentError = { error: Record<string, unknown>; code: number };

export type UndoState =  {
    canUndo: boolean;
    canRedo: boolean;
    undoItemName: OperationName;
    redoItemName: OperationName;
}

export type OperationName = {translationKey: number; name: string}

export type Document = {
    layouts: LayoutWithFrameProperties[];
    selectedLayoutId: number;
    pages: PageType[];
    variables: Variable[];
    styleKit: StyleKit;
}