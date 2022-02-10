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
    setSelectrTool = async () => {
        await this.setTool(Tools.SELECT);
    };

    /**
     * This method sets the used tool to a Move tool
     */
    setHandTool = async () => {
        await this.setTool(Tools.HAND);
    };

    /**
     * This method sets the used tool to a Zoom tool
     */
    setZoomTool = async () => {
        await this.setTool(Tools.ZOOM);
    };
}
