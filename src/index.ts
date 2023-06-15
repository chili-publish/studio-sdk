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

import type { ConfigType, EditorAPI } from './types/CommonTypes';
import { VariableController } from './controllers/VariableController';
import { ToolController } from './controllers/ToolController';
import { UndoManagerController } from './controllers/UndoManagerController';
import { TextStyleController } from './controllers/TextStyleController';
import { ColorStyleController } from './controllers/ColorStyleController';
import { ParagraphStyleController } from './controllers/ParagraphStyleController';
import { ConfigurationController } from './controllers/ConfigurationController';
import { MediaConnectorController } from './controllers/MediaConnectorController';
import { WellKnownConfigurationKeys } from './types/ConfigurationTypes';
import packageInfo from '../package.json';
import engineInfo from '../editor-engine.json';
import { FontController } from './controllers/FontController';
import { ConnectorController } from './controllers/ConnectorController';
import { FontConnectorController } from './controllers/FontConnectorController';
import { ExperimentController } from './controllers/ExperimentController';
import { CharacterStyleController } from './controllers/CharacterStyleController';
import { CanvasController } from './controllers/CanvasController';
import { DocumentType } from './types/DocumentTypes';
import { ActionController } from './controllers/ActionController';
import { ShapeController } from './controllers/ShapeController';

export { FramePropertyNames, LayoutPropertyNames, ToolType, DownloadFormats } from './utils/enums';

export {
    SlideDirections,
    ShakeDirections,
    EaseTypes,
    TweenTypes,
    BasicAnimationsEmphasisStyles,
} from './types/AnimationTypes';
export { LayoutType } from './types/LayoutTypes';
export {
    BlendMode,
    FrameTypeEnum,
    VerticalAlign,
    TextDirection,
    FlowDirection,
    FitMode,
    UpdateZIndexMethod,
    ImageSourceTypeEnum,
} from './types/FrameTypes';
export { VariableType, ImageVariableSourceType } from './types/VariableTypes';

export type {
    LayoutPropertiesType,
    FrameProperties,
    LayoutWithFrameProperties,
    LayoutListItemType,
} from './types/LayoutTypes';
export type {
    FrameLayoutType,
    FrameType,
    Frame,
    TextFrame,
    ImageFrame,
    ShapeFrame,
    ImageFrameSource,
    ImageFrameVariableSource,
    ImageFrameUrlSource,
} from './types/FrameTypes';
export type {
    Variable,
    GroupVariable,
    ImageVariable,
    LongTextVariable,
    ShortTextVariable,
    UrlImageVariableSource,
    MediaConnectorImageVariableSource,
    ImageVariableSource,
} from './types/VariableTypes';
export type { Color, DocumentColor, ColorUpdate } from './types/ColorStyleTypes';

export type { DocumentError } from './types/DocumentTypes';
export type {
    FrameAnimationType,
    FrameAnimationPropertiesType,
    EaseTweenCombinationType,
    AnimationPlaybackType,
    BasicAnimationsType,
} from './types/AnimationTypes';
export type {
    ConfigType,
    InitialStateType,
    PageType,
    EditorResponse,
    SelectedLayoutFrame,
    MetaData,
    Id,
} from './types/CommonTypes';

export type {
    TextProperties,
    TextStyle,
    AppearanceProperties,
    TextStyleUpdateType,
    UpdateStyleType,
    DisplayColor,
} from './types/TextStyleTypes';

export type { ParagraphStyle, ParagraphStyleUpdate } from './types/ParagraphStyleTypes';
export type { CharacterStyle, CharacterStyleUpdate } from './types/CharacterStyleTypes';
export type { ColorUsage, ColorUsageUpdate, ColorUsageType } from './types/ColorStyleTypes';

export type { DocumentFont, AddDocumentFont } from './types/FontTypes';

export {
    SelectedTextStyleSections,
    SelectedTextStyles,
    FontWeights,
    Alignment,
    TextPosition,
    Case,
    Scripting,
} from './types/TextStyleTypes';
export { ColorType } from './types/ColorStyleTypes';
export * from './types/MediaConnectorTypes';
export * from './types/FontConnectorTypes';
export * from './types/ConnectorTypes';

export { WellKnownConfigurationKeys } from './types/ConfigurationTypes';

export * from './types/ActionTypes';

export * from './types/ShapeTypes';

let connection: Connection;

const FIXED_EDITOR_LINK = 'https://studio-cdn.chiligrafx.com/editor/' + engineInfo.current + '/web';

export class SDK {
    config: ConfigType;
    connection: Connection;

    /**
     * @ignore
     */
    editorAPI: EditorAPI;

    action: ActionController;
    layout: LayoutController;
    frame: FrameController;
    shape: ShapeController;
    connector: ConnectorController;
    mediaConnector: MediaConnectorController;
    fontConnector: FontConnectorController;
    animation: AnimationController;
    document: DocumentController;
    configuration: ConfigurationController;
    variable: VariableController;
    utils: UtilsController;
    tool: ToolController;
    page: PageController;
    debug: DebugController;
    undoManager: UndoManagerController;
    textStyle: TextStyleController;
    paragraphStyle: ParagraphStyleController;
    characterStyle: CharacterStyleController;
    colorStyle: ColorStyleController;
    font: FontController;
    experiment: ExperimentController;
    canvas: CanvasController;

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

        this.action = new ActionController(this.editorAPI);
        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.shape = new ShapeController(this.editorAPI);
        this.connector = new ConnectorController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.fontConnector = new FontConnectorController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.configuration = new ConfigurationController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.subscriber = new SubscriberController(this.config);
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
        this.textStyle = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
    }

    /**
     * This method will initiate the editor, running this will result in the editor restarting
     * It will generate an iframe in the document
     */
    loadEditor = () => {
        Connect(
            this.config.editorLink || FIXED_EDITOR_LINK,
            {
                onActionsChanged: this.subscriber.onActionsChanged,
                onStateChanged: this.subscriber.onStateChanged,
                onDocumentLoaded: this.subscriber.onDocumentLoaded,
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
                onCharacterStylesChanged: this.subscriber.onCharacterStylesChanged,
                onFontsChanged: this.subscriber.onFontsChanged,
                onSelectedLayoutIdChanged: this.subscriber.onSelectedLayoutIdChanged,
                onLayoutsChanged: this.subscriber.onLayoutsChanged,
                onConnectorEvent: this.subscriber.onConnectorEvent,
                onZoomChanged: this.subscriber.onZoomChanged,
                onPageSizeChanged: this.subscriber.onPageSizeChanged,
                onShapeCornerRadiusChanged: this.subscriber.onShapeCornerRadiusChanged,
                onCropActiveFrameIdChanged: this.subscriber.onCropActiveFrameIdChanged,
            },
            this.setConnection,
            this.config.editorId,
            this.config.studioStyling,
        );
        this.editorAPI = connection?.promise.then((editorAPI) => {
            return editorAPI;
        }) as unknown as EditorAPI;

        this.action = new ActionController(this.editorAPI);
        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.configuration = new ConfigurationController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController();
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI);
        this.textStyle = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.fontConnector = new FontConnectorController(this.editorAPI);
        this.connector = new ConnectorController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
        this.shape = new ShapeController(this.editorAPI);

        // as soon as the editor loads, provide it with the SDK version
        // used to make it start. This enables engine compatibility checks
        // on the Flutter side
        this.configuration.setValue(WellKnownConfigurationKeys.GraFxStudioSdkVersion, packageInfo.version);

        // Makes the engine aware which document type it should render, if this call
        // isn't made, the engine will fall back to the type specified in the document.
        //
        // Loading a template JSON and setting the engine to `project` will cause
        // the document JSON structure to be converted to a project on save.
        // Using `getCurrentDocumentState` will also output the converted document.
        this.configuration.setValue(
            WellKnownConfigurationKeys.GraFxStudioDocumentType,
            this.config.documentType || DocumentType.template,
        );
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
