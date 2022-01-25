import { Child, ConfigType, selectedLayoutPropertiesType } from '../../types/CommonTypes';
import { LayoutProperyNames } from '../utils/enums';
import { getCalculatedValue } from '../utils/getCalculatedValue';

class LayoutController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    removeLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.removeLayout(parseInt(layoutId));
    };

    addLayout = async (parentId: string) => {
        const res = await this.children;
        return res.addLayout(parseInt(parentId));
    };

    setLayoutName = async (layoutId: string, layoutName: string) => {
        const res = await this.children;
        return res.renameLayout(parseInt(layoutId), layoutName);
    };

    selectLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.selectLayout(parseInt(layoutId));
    };

    duplicateLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.duplicateLayout(parseInt(layoutId));
    };

    resetLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.resetLayout(parseInt(layoutId));
    };

    setLayoutHeight = async (value: string, selectedLayout: selectedLayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_HEIGHT, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        return res.setLayoutHeight(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    setLayoutWidth = async (value: string, selectedLayout: selectedLayoutPropertiesType) => {
        const res = await this.children;
        const calc = this.getLayoutPropertiesCalculatedValue(LayoutProperyNames.LAYOUT_WIDTH, value, selectedLayout);
        if (calc === null) {
            return null;
        }
        return res.setLayoutWidth(selectedLayout?.layoutId, parseFloat(calc.toString()));
    };

    resetLayoutHeight = async (layoutId: string) => {
        const res = await this.children;
        return res.resetLayoutHeight(parseInt(layoutId));
    };

    resetLayoutWidth = async (layoutId: string) => {
        const res = await this.children;
        return res.resetLayoutWidth(parseInt(layoutId));
    };

    getLayoutPropertiesCalculatedValue = (
        name: LayoutProperyNames,
        value: string,
        selectedLayout: selectedLayoutPropertiesType,
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
