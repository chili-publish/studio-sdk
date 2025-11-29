import { EditorAPI, RuntimeConfigType } from '../types/CommonTypes';
import { SubscriberController } from './controllers/SubscriberController';
import { VariableController } from './controllers/VariableController';
import { ConnectorController } from './controllers/ConnectorController';
import { PageController } from './controllers/PageController';
import { CanvasController } from '../controllers/CanvasController';
import { StudioConnection } from '../interactions/base/StudioConnection';

/**
 * The next initiator is a split off on SDK level to tag next features.
 * The principle is that all breaking changes that we are anticipating, come into this section of the SDK.
 * This allows us to introduce breaking changes before bumping the SDK Major version, since we want to bundle some of them.
 * This way our major version can stay stable for longer, without sacrificing the flexibility we need to innovate.
 * Together with a major update, the functions and additions in this part of the SDK will be moved to the main part.
 * If you're using the next controller, you might need to import the typings also from the next types.
 * this can be referenced in your application as @chili-publish/studio-sdk/lib/src/next
 */
export class NextInitiator {
    private config: RuntimeConfigType;
    private connection: StudioConnection;

    /**
     * @ignore
     */
    private editorAPI: Promise<EditorAPI>;

    subscriber: SubscriberController;
    variable: VariableController;
    connector: ConnectorController;
    page: PageController;
    canvas: CanvasController;

    /**
     * The next initiator is a split off on SDK level to tag next features
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: RuntimeConfigType, connection: StudioConnection, editorAPI: Promise<EditorAPI>) {
        this.config = config;
        this.connection = connection;
        this.editorAPI = editorAPI;

        this.subscriber = new SubscriberController(config);
        this.variable = new VariableController(this.editorAPI);
        this.connector = new ConnectorController(this.editorAPI);
        this.page = new PageController(this.editorAPI);
        this.canvas = new CanvasController(this.editorAPI);
    }
}
