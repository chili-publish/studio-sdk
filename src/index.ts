import { Connection } from 'penpal';
import Connect from './interactions/connector';
import { FrameController } from './controllers/FrameController';
import { AnimationController } from './controllers/AnimationController';
import { LayoutController } from './controllers/LayoutController';
import { PageController } from './controllers/PageController';
import { UtilsController } from './controllers/UtilsController';
import { SubscriberController } from './controllers/SubscriberController';
import { DocumentController } from './controllers/DocumentController';
import { DebugController } from './controllers/DebugController';

import type { ConfigType, EditorAPI } from '../types/CommonTypes';
import { VariableController } from './controllers/VariableController';
import { ToolController } from './controllers/ToolController';
import { UndoManagerController } from './controllers/UndoManagerController';
import { TextStyleController } from './controllers/TextStyleController';
import { ColorStyleController } from './controllers/ColorStyleController';
import { ParagraphStyleController } from './controllers/ParagraphStyleController';
import { MediaConnectorController } from './controllers/MediaConnectorController';

export { FrameProperyNames, LayoutProperyNames, ToolType, DownloadFormats } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from '../types/AnimationTypes';
export { LayoutType } from '../types/LayoutTypes';
export { BlendMode, FrameTypeEnum, VerticalAlign, TextDirection, FlowDirection } from '../types/FrameTypes';
export { VariableType } from '../types/VariableTypes';

export type { LayoutPropertiesType, FrameProperties, LayoutWithFrameProperties } from '../types/LayoutTypes';
export type { FrameLayoutType, FrameType, Frame, TextFrame, ImageFrame } from '../types/FrameTypes';
export type { Variable, VariableMoves } from '../types/VariableTypes';
export type { Color, DocumentColor, ColorUpdate } from '../types/ColorStyleTypes';

export type { DocumentError } from '../types/DocumentTypes';
export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from '../types/AnimationTypes';
export type { ConfigType, InitialStateType, PageType, EditorResponse, SelectedLayoutFrame } from '../types/CommonTypes';

export type {
    TextProperties,
    TextStyle,
    AppearanceProperties,
    TextStyleUpdateType,
    UpdateStyleType,
} from '../types/TextStyleTypes';

export type { ParagraphStyle, ParagraphStyleUpdate, ColorUsage, ColorUsageUpdate } from '../types/ParagraphStyleTypes';
export { ColorUsageType } from '../types/ParagraphStyleTypes';

export {
    SelectedTextStyleSections,
    SelectedTextStyles,
    FontWeights,
    Alignment,
    TextPosition,
    Case,
    Scripting,
    BlendModes,
} from '../types/TextStyleTypes';
export { ColorType } from '../types/ColorStyleTypes';
export * from '../types/MediaConnectorTypes';

let connection: Connection;

const FIXED_EDITOR_LINK = 'https://studio-cdn.chiligrafx.com/editor/0.0.6/web';

export class SDK {
    config: ConfigType;
    connection: Connection;

    /**
     * @ignore
     */
    editorAPI: EditorAPI;

    layout: LayoutController;
    frame: FrameController;
    mediaConnector: MediaConnectorController;
    animation: AnimationController;
    document: DocumentController;
    variable: VariableController;
    utils: UtilsController;
    tool: ToolController;
    page: PageController;
    debug: DebugController;
    undoManager: UndoManagerController;
    textSelection: TextStyleController;
    paragraphStyle: ParagraphStyleController;
    colorStyle: ColorStyleController;

    private subscriber: SubscriberController;

    /**
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType) {
        this.config = config;
        this.connection = connection;
        this.editorAPI = connection?.promise.then((child) => {
            return child;
        }) as unknown as EditorAPI;

        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.subscriber = new SubscriberController(this.config);
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
    }

    /**
     * This method will initiate the editor, running this will result in the editor restarting
     * It will generate an iframe in the document
     */
    loadEditor = () => {
        Connect(
            this.config.editorLink || FIXED_EDITOR_LINK,
            {
                onStateChanged: this.subscriber.onStateChanged,
                onSelectedFrameContentChanged: this.subscriber.onSelectedFrameContentChanged,
                onSelectedFrameLayoutChanged: this.subscriber.onSelectedFrameLayoutChanged,
                onSelectedLayoutPropertiesChanged: this.subscriber.onSelectedLayoutPropertiesChanged,
                onPageSelectionChanged: this.subscriber.onPageSelectionChanged,
                onScrubberPositionChanged: this.subscriber.onAnimationPlaybackChanged,
                onFrameAnimationsChanged: this.subscriber.onAnimationChanged,
                onVariableListChanged: this.subscriber.onVariableListChanged,
                onSelectedToolChanged: this.subscriber.onSelectedToolChanged,
                onUndoStateChanged: this.subscriber.onUndoStateChanged,
                onSelectedLayoutFramesChanged: this.subscriber.onSelectedLayoutFramesChanged,
                onSelectedTextStyleChanged: this.subscriber.onSelectedTextStyleChanged,
                onColorsChanged: this.subscriber.onColorsChanged,
                onParagraphStylesChanged: this.subscriber.onParagraphStylesChanged,
            },
            this.setConnection,
            this.config.editorId,
        );
        this.editorAPI = connection?.promise.then((editorAPI) => {
            return editorAPI;
        }) as unknown as EditorAPI;

        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
