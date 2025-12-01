import engineInfo from '../editor-engine.json';
import packageInfo from '../package.json';
import Connect from './interactions/Connector';
import { StudioConnection } from './interactions/base/StudioConnection';
import { defaultStudioOptions, WellKnownConfigurationKeys } from './types/ConfigurationTypes';

import type { ConfigType, EditorAPI, RuntimeConfigType } from './types/CommonTypes';
import { DocumentType } from './types/DocumentTypes';

import { ActionController } from './controllers/ActionController';
import { AnimationController } from './controllers/AnimationController';
import { BarcodeController } from './controllers/BarcodeController';
import { BrandKitController } from './controllers/BrandKitController';
import { CanvasController } from './controllers/CanvasController';
import { CharacterStyleController } from './controllers/CharacterStyleController';
import { ClipboardController } from './controllers/ClipboardController';
import { ColorConversionController } from './controllers/ColorConversionController';
import { ColorStyleController } from './controllers/ColorStyleController';
import { ConfigurationController } from './controllers/ConfigurationController';
import { ConnectorController } from './controllers/ConnectorController';
import { DataConnectorController } from './controllers/DataConnectorController';
import { DataSourceController } from './controllers/DataSourceController';
import { DebugController } from './controllers/DebugController';
import { DocumentController } from './controllers/DocumentController';
import { ExperimentController } from './controllers/ExperimentController';
import { FontConnectorController } from './controllers/FontConnectorController';
import { FontController } from './controllers/FontController';
import { FrameController } from './controllers/FrameController';
import { InfoController } from './controllers/InfoController';
import { LayoutController } from './controllers/LayoutController';
import { MediaConnectorController } from './controllers/MediaConnectorController';
import { PageController } from './controllers/PageController';
import { ParagraphStyleController } from './controllers/ParagraphStyleController';
import { ShapeController } from './controllers/ShapeController';
import { SubscriberController } from './controllers/SubscriberController';
import { TextStyleController } from './controllers/TextStyleController';
import { ToolController } from './controllers/ToolController';
import { UndoManagerController } from './controllers/UndoManagerController';
import { UtilsController } from './controllers/UtilsController';
import { VariableController } from './controllers/VariableController';
import { NextSubscribers } from './next';
import { NextInitiator } from './next/NextInitiator';
import { ConfigHelper } from './utils/ConfigHelper';
import { DataItemMappingTools } from './utils/DataItemMappingTools';
import { LocalConfigurationDecorator } from './utils/LocalConfigurationDecorator';
import { GradientStyleController } from './controllers/GradientStyleController';

declare const __ENGINE_DOMAIN__: string;
const ENGINE_DOMAIN = typeof __ENGINE_DOMAIN__ !== 'undefined' ? __ENGINE_DOMAIN__ : 'studio-cdn.chiligrafx.com';
const FIXED_EDITOR_LINK = `https://${ENGINE_DOMAIN}/editor/${engineInfo.current}/web`;

let connection: StudioConnection;

export class SDK {
    config: RuntimeConfigType;
    connection: StudioConnection;

    /**
     * @ignore
     */
    editorAPI: Promise<EditorAPI>;

    action: ActionController;
    layout: LayoutController;
    frame: FrameController;
    shape: ShapeController;
    /** @experimental */
    barcode: BarcodeController;
    connector: ConnectorController;
    mediaConnector: MediaConnectorController;
    fontConnector: FontConnectorController;
    dataConnector: DataConnectorController;
    dataSource: DataSourceController;
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
    gradientStyle: GradientStyleController;
    font: FontController;
    experiment: ExperimentController;
    canvas: CanvasController;
    colorConversion: ColorConversionController;
    info: InfoController;
    clipboard: ClipboardController;
    brandKit: BrandKitController;
    next: NextInitiator;

    private subscriber: SubscriberController;
    private enabledNextSubscribers: NextSubscribers | undefined;
    private localConfig = new Map<string, string>();
    private dataItemMappingTools = new DataItemMappingTools();

    /**
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType) {
        this.config = ConfigHelper.createRuntimeConfig(config);

        this.connection = connection;
        this.editorAPI = connection?.promise.then((child) => {
            return child;
        }) as unknown as Promise<EditorAPI>;

        this.action = new ActionController(this.editorAPI);
        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.shape = new ShapeController(this.editorAPI);
        this.barcode = new BarcodeController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI, this);
        this.connector = new ConnectorController(this.editorAPI, this.localConfig);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.fontConnector = new FontConnectorController(this.editorAPI);
        this.dataConnector = new DataConnectorController(this.editorAPI, this.dataItemMappingTools);
        this.dataSource = new DataSourceController(this.editorAPI, this.dataItemMappingTools);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);

        this.configuration = new LocalConfigurationDecorator(this.editorAPI, this.localConfig);
        this.variable = new VariableController(this.editorAPI);
        this.utils = new UtilsController(this.editorAPI, this.localConfig);
        this.subscriber = new SubscriberController(this.config, this.localConfig);
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        // To be renamed textSelection > textStyle
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.gradientStyle = new GradientStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
        this.colorConversion = new ColorConversionController(this.editorAPI);
        this.info = new InfoController();
        this.clipboard = new ClipboardController(this.editorAPI);
        this.next = new NextInitiator(this.config, this.connection, this.editorAPI);
        this.enabledNextSubscribers = this.config.enableNextSubscribers;
        this.brandKit = new BrandKitController(this.editorAPI, this);
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
                onAuthExpired: this.subscriber.onAuthExpired,
                onViewportRequested: this.subscriber.onViewportRequested,
                onDocumentLoaded: this.subscriber.onDocumentLoaded,
                onSelectedFramesContentChanged: this.subscriber.onSelectedFramesContentChanged,
                onSelectedFramesLayoutChanged: this.subscriber.onSelectedFramesLayoutChanged,
                onFramesLayoutChanged: this.subscriber.onFramesLayoutChanged,
                onSelectedLayoutPropertiesChanged: this.subscriber.onSelectedLayoutPropertiesChanged,
                onSelectedLayoutUnitChanged: this.subscriber.onSelectedLayoutUnitChanged,
                onPageSelectionChanged: this.subscriber.onPageSelectionChanged,
                onScrubberPositionChanged: this.subscriber.onAnimationPlaybackChanged,
                onFrameAnimationsChanged: this.subscriber.onAnimationChanged,
                onVariableListChanged: (state) => {
                    if (this.enabledNextSubscribers?.onVariableListChanged) {
                        this.next.subscriber.onVariableListChanged(state);
                    } else {
                        this.subscriber.onVariableListChanged(state);
                    }
                },
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
                onConnectorsChanged: (state) => {
                    if (this.enabledNextSubscribers?.onConnectorsChanged) {
                        this.next.subscriber.onConnectorsChanged(state);
                    } else {
                        this.subscriber.onConnectorsChanged(state);
                    }
                },
                onZoomChanged: this.subscriber.onZoomChanged,
                onSelectedPageIdChanged: this.subscriber.onSelectedPageIdChanged,
                onPagesChanged: this.subscriber.onPagesChanged,
                onPageSnapshotInvalidated: this.subscriber.onPageSnapshotInvalidated,
                onPageSizeChanged: (state) => {
                    if (this.enabledNextSubscribers?.onPageSizeChanged) {
                        this.next.subscriber.onPageSizeChanged(state);
                    } else {
                        this.subscriber.onPageSizeChanged(state);
                    }
                },
                onShapeCornerRadiusChanged: this.subscriber.onShapeCornerRadiusChanged,
                onCropActiveFrameIdChanged: this.subscriber.onCropActiveFrameIdChanged,
                onAsyncError: this.subscriber.onAsyncError,
                onViewModeChanged: this.subscriber.onViewModeChanged,
                onBarcodeValidationChanged: this.subscriber.onBarcodeValidationChanged,
                onDataSourceIdChanged: this.subscriber.onDataSourceIdChanged,
                onDocumentIssueListChanged: this.subscriber.onDocumentIssueListChanged,
                onCustomUndoDataChanged: this.subscriber.onCustomUndoDataChanged,
                onEngineEditModeChanged: this.subscriber.onEngineEditModeChanged,
                onBrandKitMediaChanged: this.subscriber.onBrandKitMediaChanged,
            },
            this.setConnection,
            this.config.editorId,
            this.config.studioStyling,
        );
        this.editorAPI = connection?.promise;

        this.action = new ActionController(this.editorAPI);
        this.layout = new LayoutController(this.editorAPI);
        this.frame = new FrameController(this.editorAPI);
        this.barcode = new BarcodeController(this.editorAPI);
        this.animation = new AnimationController(this.editorAPI);
        this.document = new DocumentController(this.editorAPI);
        this.configuration = new LocalConfigurationDecorator(this.editorAPI, this.localConfig);
        this.utils = new UtilsController(this.editorAPI, this.localConfig);
        this.tool = new ToolController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.debug = new DebugController(this.editorAPI);
        this.undoManager = new UndoManagerController(this.editorAPI, this);
        this.textSelection = new TextStyleController(this.editorAPI);
        this.colorStyle = new ColorStyleController(this.editorAPI);
        this.gradientStyle = new GradientStyleController(this.editorAPI);
        this.paragraphStyle = new ParagraphStyleController(this.editorAPI);
        this.characterStyle = new CharacterStyleController(this.editorAPI);
        this.mediaConnector = new MediaConnectorController(this.editorAPI);
        this.fontConnector = new FontConnectorController(this.editorAPI);
        this.dataConnector = new DataConnectorController(this.editorAPI, this.dataItemMappingTools);
        this.dataSource = new DataSourceController(this.editorAPI, this.dataItemMappingTools);
        this.connector = new ConnectorController(this.editorAPI, this.localConfig);
        this.variable = new VariableController(this.editorAPI);
        this.font = new FontController(this.editorAPI);
        this.experiment = new ExperimentController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
        this.shape = new ShapeController(this.editorAPI);
        this.colorConversion = new ColorConversionController(this.editorAPI);
        this.info = new InfoController();
        this.clipboard = new ClipboardController(this.editorAPI);
        this.brandKit = new BrandKitController(this.editorAPI, this);
        this.next = new NextInitiator(this.config, this.connection, this.editorAPI);

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

        // Whether the engine should cache query calls. This is disabled by default.
        this.configuration.setValue(
            WellKnownConfigurationKeys.QueryCallCacheEnabled,
            this.config.enableQueryCallCache?.toString() || 'false',
        );
    };

    setConnection = (newConnection: StudioConnection) => {
        connection = newConnection;
    };
}

export default SDK;
