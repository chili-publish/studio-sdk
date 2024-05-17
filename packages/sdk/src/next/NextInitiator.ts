import { Connection } from 'penpal';
import { ConfigType, EditorAPI } from '../types/CommonTypes';
import { SubscriberController } from './controllers/SubscriberController';
import { VariableController } from './controllers/VariableController';

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
    private config: ConfigType;
    private connection: Connection;

    /**
     * @ignore
     */
    private editorAPI: EditorAPI;

    subscriber: SubscriberController;
    variable: VariableController;

    /**
     * The next initiator is a split off on SDK level to tag next features
     * The SDK should be configured clientside and it exposes all controllers to work with in other applications
     * @param config The configuration object where the SDK and editor can get configured
     */
    constructor(config: ConfigType, connection: Connection, editorAPI: EditorAPI) {
        this.config = config;
        this.connection = connection;
        this.editorAPI = editorAPI;

        this.subscriber = new SubscriberController(config);
        this.variable = new VariableController(this.editorAPI);
    }
}
