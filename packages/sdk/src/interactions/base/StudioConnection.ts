import { EditorAPI } from '../../types/CommonTypes';

export type StudioConnection = {
    promise: Promise<EditorAPI>;
    destroy: () => void;
};
