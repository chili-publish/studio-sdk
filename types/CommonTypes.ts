import { CallSender } from 'penpal';

export type ConfigType = {
    stateChanged: (state: string) => void;
    editorLink: string;
};

type EditorResponse = {
    success: boolean;
    status: number;
};
export interface Child extends CallSender {
    addLayout: (parentId: number) => Promise<EditorResponse>;
    removeLayout: (id: number) => Promise<EditorResponse>;
    renameLayout: (id: number, layoutName: string) => Promise<EditorResponse>;
    selectLayout: (id: number) => Promise<EditorResponse>;
    duplicateLayout: (id: number) => Promise<EditorResponse>;
}
