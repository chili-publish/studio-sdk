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
     * This method sets the currently used tool
     * @param tool
     */
    private setTool = async (tool: Tools) => {
        const res = await this.children;
        return res.setTool(tool);
    };

    /**
     * This method sets the used tool to a Pointer tool
     */
    setPointerTool = async () => {
        await this.setTool(Tools.POINTER);
    };

    /**
     * This method sets the used tool to a Move tool
     */
    setMoveTool = async () => {
        await this.setTool(Tools.MOVE);
    };

    /**
     * This method sets the used tool to a Zoom tool
     */
    setZoomTool = async () => {
        await this.setTool(Tools.ZOOM);
    };
}
