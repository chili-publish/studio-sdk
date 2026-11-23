import { Id } from './CommonTypes';
import { BarcodeType } from './BarcodeTypes';
import { ComponentSource, ImageFrameSource } from './FrameTypes';
import { MeasurementUnit } from './LayoutTypes';

/**
 * The held modifier key that forces a drop to ADD a new frame while it is
 * over a frame the drop would otherwise replace ('none': the drop always
 * replaces a matching frame under the pointer).
 */
export type DragAndDropReplaceOverrideKey = 'alt' | 'ctrl' | 'shift' | 'meta' | 'none';

/**
 * The size of the frame a drop as a NEW frame creates (also the ghost's
 * size). Defaults per content type when omitted (barcodes: the type's
 * default size).
 */
export type DragAndDropSize = {
    width: number;
    height: number;
    /** The unit of width/height; px when omitted. */
    unit?: MeasurementUnit;
};

type DragAndDropContentBase = {
    /** A label for the engine's ghost (an asset or component name). */
    name?: string;
    /** The ghost's picture as a data URL (e.g. the panel's thumbnail). */
    preview?: string;
    size?: DragAndDropSize;
    /** The key that forces "add a new frame"; 'alt' when omitted. */
    replaceKey?: DragAndDropReplaceOverrideKey;
};

/** An asset dragged from a media panel. */
export type ImageDragAndDropContent = DragAndDropContentBase & {
    type: 'image';
    source: ImageFrameSource;
};

/** A barcode type dragged from a barcodes panel. */
export type BarcodeDragAndDropContent = DragAndDropContentBase & {
    type: 'barcode';
    barcodeType: BarcodeType;
};

/** A component dragged from a components panel. */
export type ComponentDragAndDropContent = DragAndDropContentBase & {
    type: 'component';
    source: ComponentSource;
};

export type DragAndDropContent = ImageDragAndDropContent | BarcodeDragAndDropContent | ComponentDragAndDropContent;

/**
 * One pointer update of a running drag: coordinates in CSS pixels relative
 * to the engine iframe's top left, the modifier keys held, and whether the
 * pointer is over the engine canvas at all (false: the ghost hides and a
 * drop there cancels).
 */
export type DragAndDropUpdate = {
    x: number;
    y: number;
    modifiers?: {
        alt?: boolean;
        ctrl?: boolean;
        shift?: boolean;
        meta?: boolean;
    };
    insideCanvas?: boolean;
};

/** What completing a drag did. */
export type DragAndDropResult = {
    operation: 'replaced' | 'added' | 'cancelled';
    /** The frame the drop replaced or added (absent when cancelled). */
    frameId?: Id;
};
