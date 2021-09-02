import { CallSender } from 'penpal';

export type ConfigType = {
    stateChanged: (state: Document) => void;
    editorLink: string;
};

export interface Child extends CallSender {
    addLayout: (parentId: number) => void;
    removeLayout: (id: number) => void;
    renameLayout: (id: number, name: string) => void;
}
