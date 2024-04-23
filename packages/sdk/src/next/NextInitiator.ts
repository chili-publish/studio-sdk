import { Connection } from 'penpal';
import { ConfigType, EditorAPI } from '../types/CommonTypes';
import { SubscriberController } from './controllers/SubscriberController';

export class NextInitiator {
    private config: ConfigType;
    private connection: Connection;

    /**
     * @ignore
     */
    private editorAPI: EditorAPI;

    subscriber: SubscriberController;

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
    }
}
