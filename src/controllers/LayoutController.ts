import type { Child, ConfigType } from '../../types/CommonTypes';
import type { LayoutPropertiesType } from '../../types/LayoutTypes';
import { LayoutProperyNames } from '../utils/enums';
import { getCalculatedValue } from '../utils/getCalculatedValue';

/**
 * The LayoutController is responsible for all communication regarding Layouts.
 * Methods inside this controller can be called by `window.SDK.layout.{method-name}`
 */
export class LayoutController {
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
     * This method will remove a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    removeLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.removeLayout(layoutId);
    };

    /**
     * This method will add a new child layout (a new layout is always child of a root / parentlayout)
     * @param parentId The ID of a specific layout, being the parent
     * @returns
     */
    addLayout = async (parentId: number) => {
        const res = await this.children;
        return res.addLayout(parentId);
    };

    /**
     * This method will update the name of a specific layout
     * @param layoutId The ID of a specific layout
     * @param layoutName The new name that the layout should receive
     * @returns
     */
    setLayoutName = async (layoutId: number, layoutName: string) => {
        const res = await this.children;
        return res.renameLayout(layoutId, layoutName);
    };

    /**
     * This method will select a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    selectLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.selectLayout(layoutId);
    };

    /**
     * This method will duplicate a specific layout
     * @param layoutId The ID of a specific layout
     * @returns
     */
    duplicateLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.duplicateLayout(layoutId);
    };

    /**
     * This method will reset a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
    resetLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayout(layoutId);
    };

    /**
     * This method will set the height of the layout to a specific value
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2) The notation is in pixels
     * @param selectedLayout The layout that is selected, with all of its properties
     * @returns
     */
    setLayoutHeight = async (value: string, selectedLayout: LayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_HEIGHT, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        if (calc === selectedLayout?.height.value) return null;

        return res.setLayoutHeight(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    /**
     * This method will set the width of the layout to a specific value
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2) The notation is in pixels
     * @param selectedLayout The layout that is selected, with all of its properties
     * @returns
     */
    setLayoutWidth = async (value: string, selectedLayout: LayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_WIDTH, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        if (calc === selectedLayout?.width.value) return null;

        return res.setLayoutWidth(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    /**
     * This method will reset the height of a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
    resetLayoutHeight = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayoutHeight(layoutId);
    };

    /**
     * This method will reset the width of a specific layout to its original value
     * @param layoutId The ID of a specific layout
     * @returns
     */
    resetLayoutWidth = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayoutWidth(layoutId);
    };

    /**
     * This method will trigger a calculation with logic built in, based on its parameters
     * @param name The name of the property of whom the calculation is for
     * @param value The string value that will be calculated (f.e. 1+1 will reult in 2). The notation is dependent on the frame property that triggers this calculation
     * @param selectedLayout The layout that is selected with all it's properties
     * @returns
     */
    getLayoutPropertiesCalculatedValue = (
        name: LayoutProperyNames,
        value: string,
        selectedLayout: LayoutPropertiesType,
    ) => {
        let calc = getCalculatedValue(value);

        switch (name) {
            case LayoutProperyNames.LAYOUT_HEIGHT: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedLayout) {
                    if (selectedLayout.height.value === calc) {
                        calc = null;
                    }
                }

                break;
            }

            case LayoutProperyNames.LAYOUT_WIDTH: {
                if (calc === null || calc === Infinity) {
                    calc = null;
                } else if (selectedLayout) {
                    if (selectedLayout.width.value === calc) {
                        calc = null;
                    }
                }

                break;
            }
            default:
                break;
        }
        return calc;
    };
}
