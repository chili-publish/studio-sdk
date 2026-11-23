import { EditorAPI } from '../types/CommonTypes';
import { DragAndDropContent, DragAndDropResult, DragAndDropUpdate } from '../types/DragAndDropTypes';
import { getEditorResponseData } from '../utils/EditorResponseData';

/**
 * @experimental This controller is experimental and may change without warning.
 * The DragAndDropController drives dragging content (a media asset, a
 * barcode type, a component) from the host's own UI onto the engine canvas:
 * the engine shows a ghost frame with an indication of what a drop would
 * do. Dropped over a frame of the same type it REPLACES that frame's
 * content (keeping the frame's size, rotation and other properties), unless
 * the configured override key is held; anywhere else it ADDS a new frame at
 * the pointer. Methods inside this controller can be called by
 * `window.SDK.dragAndDrop.{method-name}`
 */
export class DragAndDropController {
    /**
     * @ignore
     */
    #editorAPI: EditorAPI;

    /**
     * @ignore
     */
    constructor(editorAPI: EditorAPI) {
        this.#editorAPI = editorAPI;
    }

    /**
     * Begins a drag with its content; a drag already running is replaced.
     * @param content what the drop creates, the ghost's name/preview/size
     * and the replace override key
     * @returns
     */
    start = async (content: DragAndDropContent) => {
        const res = await this.#editorAPI;
        return res
            .startDragOperation(JSON.stringify(content))
            .then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Follows the pointer (call it on every pointer move while the drag
     * runs). Without a running drag it is ignored.
     * @param update the pointer in engine-iframe CSS pixels, the held
     * modifiers and whether the pointer is over the engine canvas
     * @returns
     */
    update = async (update: DragAndDropUpdate) => {
        const res = await this.#editorAPI;
        return res.updateDragOperation(JSON.stringify(update)).then((result) => getEditorResponseData<null>(result));
    };

    /**
     * Drops the dragged content where the latest update put the pointer:
     * one undoable change that replaces the matching frame under the
     * pointer or adds a new frame. Outside the canvas it cancels.
     * @returns what the drop did and the frame it touched
     */
    complete = async () => {
        const res = await this.#editorAPI;
        return res.completeDragOperation().then((result) => getEditorResponseData<DragAndDropResult>(result));
    };

    /**
     * Drops the running drag, if any (released over the host's own UI,
     * Escape). Idempotent.
     * @returns
     */
    cancel = async () => {
        const res = await this.#editorAPI;
        return res.cancelDragOperation().then((result) => getEditorResponseData<null>(result));
    };
}
