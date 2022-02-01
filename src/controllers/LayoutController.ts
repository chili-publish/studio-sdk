import type { Child, ConfigType } from '../../types/CommonTypes';
import type { LayoutPropertiesType } from '../../types/LayoutTypes';
import { LayoutProperyNames } from '../utils/enums';
import { getCalculatedValue } from '../utils/getCalculatedValue';

class LayoutController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    removeLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.removeLayout(layoutId);
    };

    addLayout = async (parentId: number) => {
        const res = await this.children;
        return res.addLayout(parentId);
    };

    setLayoutName = async (layoutId: number, layoutName: string) => {
        const res = await this.children;
        return res.renameLayout(layoutId, layoutName);
    };

    selectLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.selectLayout(layoutId);
    };

    duplicateLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.duplicateLayout(layoutId);
    };

    resetLayout = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayout(layoutId);
    };

    setLayoutHeight = async (value: string, selectedLayout: LayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_HEIGHT, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        if (calc === selectedLayout?.height.value) return null;

        return res.setLayoutHeight(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    setLayoutWidth = async (value: string, selectedLayout: LayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_WIDTH, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        if (calc === selectedLayout?.width.value) return null;

        return res.setLayoutWidth(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    resetLayoutHeight = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayoutHeight(layoutId);
    };

    resetLayoutWidth = async (layoutId: number) => {
        const res = await this.children;
        return res.resetLayoutWidth(layoutId);
    };

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

export default LayoutController;
