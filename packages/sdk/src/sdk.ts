import { Connection } from 'penpal';
import engineInfo from '../editor-engine.json';
import packageInfo from '../package.json';
import Connect from './interactions/Connector';
import { defaultStudioOptions, WellKnownConfigurationKeys } from './types/ConfigurationTypes';

import type { ConfigType, EditorAPI, RuntimeConfigType } from './types/CommonTypes';
import { Instrumented } from './types/MethodInvocationTypes';
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
import { ComponentConnectorController } from './controllers/ComponentConnectorController';
import { ComponentController } from './controllers/ComponentController';
import { MethodListenerRegistry, wrapWithInvocationObserver } from './utils/MethodInstrumentation';
import { SdkEvents } from './utils/SdkEvents';

declare const __ENGINE_DOMAIN__: string;
const ENGINE_DOMAIN = typeof __ENGINE_DOMAIN__ !== 'undefined' ? __ENGINE_DOMAIN__ : 'studio-cdn.chiligrafx.com';
const FIXED_EDITOR_LINK = `https://${ENGINE_DOMAIN}/editor/${engineInfo.current}/web`;

let connection: Connection;

export class SDK {
    config: RuntimeConfigType;
    connection: Connection;

    /**
     * @ignore
     */
    editorAPI: EditorAPI;
    /**
     * SDK method invocation events.
     *
     * Use this to observe which SDK controller method was called and with which parameters/result.
     * These are SDK-level events (SDK -> consumer), separate from engine subscriber events (`config.events`).
     */
    sdkEvents: SdkEvents;

    action: Instrumented<ActionController>;
    layout: Instrumented<LayoutController>;
    frame: Instrumented<FrameController>;
    shape: Instrumented<ShapeController>;
    barcode: Instrumented<BarcodeController>;
    /** @experimental */
    component: Instrumented<ComponentController>;
    connector: Instrumented<ConnectorController>;
    mediaConnector: Instrumented<MediaConnectorController>;
    fontConnector: Instrumented<FontConnectorController>;
    /**
     * @experimental This controller is still experimental and might change in future releases.
     */
    componentConnector: Instrumented<ComponentConnectorController>;
    dataConnector: Instrumented<DataConnectorController>;
    dataSource: Instrumented<DataSourceController>;
    animation: Instrumented<AnimationController>;
    document: Instrumented<DocumentController>;
    configuration: Instrumented<ConfigurationController>;
    variable: Instrumented<VariableController>;
    utils: Instrumented<UtilsController>;
    tool: Instrumented<ToolController>;
    page: Instrumented<PageController>;
    debug: Instrumented<DebugController>;
    undoManager: Instrumented<UndoManagerController>;
    textSelection: Instrumented<TextStyleController>;
    paragraphStyle: Instrumented<ParagraphStyleController>;
    characterStyle: Instrumented<CharacterStyleController>;
    colorStyle: Instrumented<ColorStyleController>;
    gradientStyle: Instrumented<GradientStyleController>;
    font: Instrumented<FontController>;
    experiment: Instrumented<ExperimentController>;
    canvas: Instrumented<CanvasController>;
    colorConversion: Instrumented<ColorConversionController>;
    info: Instrumented<InfoController>;
    clipboard: Instrumented<ClipboardController>;
    brandKit: Instrumented<BrandKitController>;
    next: NextInitiator;

    private subscriber: SubscriberController;
    private enabledNextSubscribers: NextSubscribers | undefined;
    private localConfig = new Map<string, string>();
    private dataItemMappingTools = new DataItemMappingTools();
    private methodListeners = new MethodListenerRegistry();

    private readonly instrumentedControllers = [
        'action',
        'layout',
        'frame',
        'shape',
        'barcode',
        'component',
        'connector',
        'mediaConnector',
        'fontConnector',
        'componentConnector',
        'dataConnector',
        'dataSource',
        'animation',
        'document',
        'configuration',
        'variable',
        'utils',
        'tool',
        'page',
        'debug',
        'undoManager',
        'textSelection',
        'paragraphStyle',
        'characterStyle',
        'colorStyle',
        'gradientStyle',
        'font',
        'experiment',
        'canvas',
        'colorConversion',
        'info',
        'clipboard',
        'brandKit',
    ] as const;

    /**
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType) {
        this.config = ConfigHelper.createRuntimeConfig(config);
        this.sdkEvents = new SdkEvents(this.config.logging?.logger);

        this.connection = connection;
        this.editorAPI = connection?.promise.then((child: unknown) => {
            return child;
        }) as unknown as EditorAPI;

        this.action = this.toInstrumented(new ActionController(this.editorAPI));
        this.layout = this.toInstrumented(new LayoutController(this.editorAPI));
        this.frame = this.toInstrumented(new FrameController(this.editorAPI));
        this.shape = this.toInstrumented(new ShapeController(this.editorAPI));
        this.barcode = this.toInstrumented(new BarcodeController(this.editorAPI));
        this.component = this.toInstrumented(new ComponentController(this.editorAPI));
        this.undoManager = this.toInstrumented(new UndoManagerController(this.editorAPI, this));
        this.connector = this.toInstrumented(new ConnectorController(this.editorAPI, this.localConfig));
        this.mediaConnector = this.toInstrumented(new MediaConnectorController(this.editorAPI));
        this.fontConnector = this.toInstrumented(new FontConnectorController(this.editorAPI));
        this.componentConnector = this.toInstrumented(new ComponentConnectorController(this.editorAPI));
        this.dataConnector = this.toInstrumented(new DataConnectorController(this.editorAPI, this.dataItemMappingTools));
        this.dataSource = this.toInstrumented(new DataSourceController(this.editorAPI, this.dataItemMappingTools));
        this.animation = this.toInstrumented(new AnimationController(this.editorAPI));
        this.document = this.toInstrumented(new DocumentController(this.editorAPI));

        this.configuration = this.toInstrumented(new LocalConfigurationDecorator(this.editorAPI, this.localConfig));
        this.variable = this.toInstrumented(new VariableController(this.editorAPI, this.dataItemMappingTools));
        this.utils = this.toInstrumented(new UtilsController(this.editorAPI, this.localConfig));
        this.subscriber = new SubscriberController(this.config, this.localConfig);
        this.tool = this.toInstrumented(new ToolController(this.editorAPI));
        this.page = this.toInstrumented(new PageController(this.editorAPI));
        this.debug = this.toInstrumented(new DebugController(this.editorAPI));
        // To be renamed textSelection > textStyle
        this.textSelection = this.toInstrumented(new TextStyleController(this.editorAPI));
        this.colorStyle = this.toInstrumented(new ColorStyleController(this.editorAPI));
        this.gradientStyle = this.toInstrumented(new GradientStyleController(this.editorAPI));
        this.paragraphStyle = this.toInstrumented(new ParagraphStyleController(this.editorAPI));
        this.characterStyle = this.toInstrumented(new CharacterStyleController(this.editorAPI));
        this.font = this.toInstrumented(new FontController(this.editorAPI));
        this.experiment = this.toInstrumented(new ExperimentController(this.editorAPI));
        this.canvas = this.toInstrumented(new CanvasController(this.editorAPI));
        this.colorConversion = this.toInstrumented(new ColorConversionController(this.editorAPI));
        this.info = this.toInstrumented(new InfoController());
        this.clipboard = this.toInstrumented(new ClipboardController(this.editorAPI));
        this.next = new NextInitiator(this.config, this.connection, this.editorAPI);
        this.enabledNextSubscribers = this.config.enableNextSubscribers;
        this.brandKit = this.toInstrumented(new BrandKitController(this.editorAPI, this));

        this.applyMethodInstrumentation();
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
            (error) => {
                this.config.onConnectionError?.(error);
            },
        );
        this.editorAPI = connection?.promise.then((editorAPI: unknown) => {
            return editorAPI;
        }) as unknown as EditorAPI;

        this.action = this.toInstrumented(new ActionController(this.editorAPI));
        this.layout = this.toInstrumented(new LayoutController(this.editorAPI));
        this.frame = this.toInstrumented(new FrameController(this.editorAPI));
        this.barcode = this.toInstrumented(new BarcodeController(this.editorAPI));
        this.component = this.toInstrumented(new ComponentController(this.editorAPI));
        this.animation = this.toInstrumented(new AnimationController(this.editorAPI));
        this.document = this.toInstrumented(new DocumentController(this.editorAPI));
        this.configuration = this.toInstrumented(new LocalConfigurationDecorator(this.editorAPI, this.localConfig));
        this.utils = this.toInstrumented(new UtilsController(this.editorAPI, this.localConfig));
        this.tool = this.toInstrumented(new ToolController(this.editorAPI));
        this.page = this.toInstrumented(new PageController(this.editorAPI));
        this.debug = this.toInstrumented(new DebugController(this.editorAPI));
        this.undoManager = this.toInstrumented(new UndoManagerController(this.editorAPI, this));
        this.textSelection = this.toInstrumented(new TextStyleController(this.editorAPI));
        this.colorStyle = this.toInstrumented(new ColorStyleController(this.editorAPI));
        this.gradientStyle = this.toInstrumented(new GradientStyleController(this.editorAPI));
        this.paragraphStyle = this.toInstrumented(new ParagraphStyleController(this.editorAPI));
        this.characterStyle = this.toInstrumented(new CharacterStyleController(this.editorAPI));
        this.mediaConnector = this.toInstrumented(new MediaConnectorController(this.editorAPI));
        this.fontConnector = this.toInstrumented(new FontConnectorController(this.editorAPI));
        this.componentConnector = this.toInstrumented(new ComponentConnectorController(this.editorAPI));
        this.dataConnector = this.toInstrumented(new DataConnectorController(this.editorAPI, this.dataItemMappingTools));
        this.dataSource = this.toInstrumented(new DataSourceController(this.editorAPI, this.dataItemMappingTools));
        this.connector = this.toInstrumented(new ConnectorController(this.editorAPI, this.localConfig));
        this.variable = this.toInstrumented(new VariableController(this.editorAPI, this.dataItemMappingTools));
        this.font = this.toInstrumented(new FontController(this.editorAPI));
        this.experiment = this.toInstrumented(new ExperimentController(this.editorAPI));
        this.canvas = this.toInstrumented(new CanvasController(this.editorAPI));
        this.shape = this.toInstrumented(new ShapeController(this.editorAPI));
        this.colorConversion = this.toInstrumented(new ColorConversionController(this.editorAPI));
        this.info = this.toInstrumented(new InfoController());
        this.clipboard = this.toInstrumented(new ClipboardController(this.editorAPI));
        this.brandKit = this.toInstrumented(new BrandKitController(this.editorAPI, this));
        this.next = new NextInitiator(this.config, this.connection, this.editorAPI);

        this.applyMethodInstrumentation();

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

    setConnection = (newConnection: Connection) => {
        connection = newConnection;
    };

    private toInstrumented = <T extends object>(controller: T): Instrumented<T> => {
        return controller as unknown as Instrumented<T>;
    };

    private applyMethodInstrumentation = () => {
        const sdkControllers = this as unknown as Record<(typeof this.instrumentedControllers)[number], object>;
        for (const controllerName of this.instrumentedControllers) {
            const controller = sdkControllers[controllerName];
            sdkControllers[controllerName] = wrapWithInvocationObserver(
                controller,
                controllerName,
                this.methodListeners,
                this.sdkEvents,
                this.config.logging?.logger,
            ) as object;
        }
    };
}

export default SDK;
