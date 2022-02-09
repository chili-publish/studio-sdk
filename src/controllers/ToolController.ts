import { Child, ConfigType } from '../../types/CommonTypes';
import { Tools } from '../utils/enums';

/**
 * The ToolController is responsible for all communication regarding the tools.
 * Methods inside this controller can be called by `window.SDK.tool.{method-name}`
 */
export class ToolController {
    /**
     * @ignore
     */
    children: Child;
    /**
     * @ignore
     */
    config: ConfigType;

    /**
     * @ignore
     */
    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    /**
     * This method sets the currently used toolk
     * @param tool 
     * @returns The JSON document in the form of a string
     */
    setTool = async (tool: Tools) => {
        const res = await this.children;
        return res.setTool(tool);
    };
}
