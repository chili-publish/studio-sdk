import engineInfo from '../../editor-engine.json';
import sdkInfo from '../../package.json';

/**
 * The InfoController is responsible for getting info on the engine, like version f.e. .
 * Methods and properties inside this controller can be accessed by `window.SDK.engine.{name}`
 */
export class InfoController {
    /**
     * This property returns the current engine version.
     * @returns current engine version
     */
    currentEngineVersion = engineInfo.current;

    /**
     * @returns The currently applicable SDK version
     */
    currentSDKVersion = sdkInfo.version;
}
