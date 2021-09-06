import { CallSender } from 'penpal';

export type ConfigType = {
    stateChanged: (state: string) => void;
    editorLink: string;
};

export interface Child extends CallSender {
    addLayout: (parentId: number) => void;
    removeLayout: (id: number) => void;
    renameLayout: (id: number, layoutName: string) => void;
    selectLayout: (id: number) => Promise<{ success: boolean; status: number }>;
}
