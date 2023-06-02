declare module 'grafx-studio-actions' {

    export type EditorEventType = 'selectedLayoutChanged' | 'frameMoved' | 'variableValueChanged' | 'pageSizeChanged' | 'documentLoaded';

    export interface ActionEventData {
        type: EditorEventType;
        source?: FrameProperties | Variable | AlternateLayout | PageProperties;
    }

    /**
     * An interface representing the API for working with actions.
     * Provides access to objects for manipulating frames, variables,
     * layouts, and document properties.
     */
    export interface ActionApi {
        /** An object with methods for manipulating and accessing frame data */
        frames: FramesController;
        /** An object providing methods for getting and setting variable data */
        variables: VariablesController;
        /** An object for selecting a layout */
        layouts: LayoutsController;
        /** An object for retrieving the document size */
        document: DocumentController;
    }

    interface FrameProperties {
        readonly id: string;
        readonly layoutId: string;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly rotationDegrees: number;
        readonly rotationOriginY: number;
        readonly scaleX: number;
        readonly scaleY: number;
        readonly included: boolean;
        readonly fitMode: FitMode;
        readonly minCopyfitting: number;
        readonly maxCopyfitting: number;
        readonly enableCopyfitting: boolean;
        readonly rotationAngle: number;
    }

    interface PageProperties {
        id: string;
        layoutId: string;
        width: number;
        height: number;
    }

    enum FitMode {
        fill,
        fit,
    }

    interface AlternateLayout {
        readonly id: string,
        readonly name: string,
        readonly width: number,
        readonly height: number,
        readonly animated: boolean,
    }

    enum VariableSourceType {
        url = 'url',
        connector = 'connector',
    }

    interface UrlVariableSource {
        url: string;
        type: VariableSourceType.url;
    }

    interface MediaConnectorVariableSource {
        connectorId: string;
        assetId: string;
        type: VariableSourceType.connector;
    }

    type VariableSource = UrlVariableSource | MediaConnectorVariableSource;

    type Variable =
        | ShortTextVariable
        | LongTextVariable
        | FormattedTextVariable
        | ImageVariable
        | GroupVariable;

    interface BaseVariable {
        id: string;
        parentId: string;
        name: string;
        label: string;
        isHidden: boolean;
        isReadonly: boolean;
        isRequired: boolean;
    }

    interface ShortTextVariable extends BaseVariable {
        type: "shortText";
        value: string;
    }

    interface LongTextVariable extends BaseVariable {
        type: "longText";
        value: string;
    }

    interface FormattedTextVariable extends BaseVariable {
        type: "formattedText";
        value: string;
    }

    interface ImageVariable extends BaseVariable {
        type: "image";
        src?: VariableSource;
    }

    interface GroupVariable extends BaseVariable {
        type: "group";
    }


    interface FramesController {
        moveFrame: (frameId: string, x: number, y: number) => void;
        resizeFrame: (frameId: string, w: number, h: number) => void;
        includeFrame: (frameId: string, included: boolean) => void;
        getFrames: () => FrameProperties[];
        getFrameByName: (name: string) => FrameProperties;
    }

    interface VariablesController {
        getVariableByName: (name: string) => Variable;
        getVariables: () => Variable[];
        setVariableValue: (variableName: string, variableValue: any) => void;
    }

    interface LayoutsController {
        selectLayout: (layoutName: string) => void;
    }

    interface DocumentController {
        getDocumentSize: () => PageProperties;
    }
}