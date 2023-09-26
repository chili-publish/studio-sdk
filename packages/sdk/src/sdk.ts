import { Connection } from 'penpal';
import Connect from './interactions/connector';
import { defaultStudioOptions, WellKnownConfigurationKeys } from './types/ConfigurationTypes';
import packageInfo from '../package.json';
import engineInfo from '../editor-engine.json';

import type { ConfigType, EditorAPI } from './types/CommonTypes';
import { DocumentType } from './types/DocumentTypes';

import { ActionController } from './controllers/ActionController';
import { AnimationController } from './controllers/AnimationController';
import { CanvasController } from './controllers/CanvasController';
import { CharacterStyleController } from './controllers/CharacterStyleController';
import { ColorStyleController } from './controllers/ColorStyleController';
import { ColorConversionController } from './controllers/ColorConversionController';
import { ConfigurationController } from './controllers/ConfigurationController';
import { ConnectorController } from './controllers/ConnectorController';
import { DebugController } from './controllers/DebugController';
import { DocumentController } from './controllers/DocumentController';
import { ExperimentController } from './controllers/ExperimentController';
import { FontConnectorController } from './controllers/FontConnectorController';
import { FontController } from './controllers/FontController';
import { FrameController } from './controllers/FrameController';
import { LayoutController } from './controllers/LayoutController';
import { MediaConnectorController } from './controllers/MediaConnectorController';
import { PageController } from './controllers/PageController';
import { ParagraphStyleController } from './controllers/ParagraphStyleController';
import { SubscriberController } from './controllers/SubscriberController';
import { TextStyleController } from './controllers/TextStyleController';
import { ToolController } from './controllers/ToolController';
import { UndoManagerController } from './controllers/UndoManagerController';
import { UtilsController } from './controllers/UtilsController';
import { VariableController } from './controllers/VariableController';
import { ShapeController } from './controllers/ShapeController';
import { InfoController } from './controllers/InfoController';

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
    textSelection: TextStyleController;
    paragraphStyle: ParagraphStyleController;
    characterStyle: CharacterStyleController;
    colorStyle: ColorStyleController;
    font: FontController;
    experiment: ExperimentController;
    canvas: CanvasController;
    colorConversion: ColorConversionController;
    info: InfoController;

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
        this.undoManager = new UndoManagerController(this.editorAPI, this);
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
        // To be renamed textSelection > textStyle
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
        this.colorConversion = new ColorConversionController(this.editorAPI);
        this.info = new InfoController();
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
                onFontFamiliesChanged: this.subscriber.onFontFamiliesChanged,
                onSelectedLayoutIdChanged: this.subscriber.onSelectedLayoutIdChanged,
                onLayoutsChanged: this.subscriber.onLayoutsChanged,
                onConnectorEvent: this.subscriber.onConnectorEvent,
                onZoomChanged: this.subscriber.onZoomChanged,
                onPageSizeChanged: this.subscriber.onPageSizeChanged,
                onShapeCornerRadiusChanged: this.subscriber.onShapeCornerRadiusChanged,
                onCropActiveFrameIdChanged: this.subscriber.onCropActiveFrameIdChanged,
                onAsyncError: this.subscriber.onAsyncError,
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
        this.utils = new UtilsController();
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI, this);
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.fontConnector = new FontConnectorController(this.editorAPI);
        this.connector = new ConnectorController(this.editorAPI);
        this.variable = new VariableController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
        this.shape = new ShapeController(this.editorAPI);
        this.info = new InfoController();

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

        // Update the engine with the specified options from the config or fall back to the defaults.
        this.configuration.updateStudioOptions(this.config.studioOptions || defaultStudioOptions);
    };

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };
}

export default SDK;
