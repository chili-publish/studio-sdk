import { Child } from '../../types/CommonTypes';

class LayoutController {
    children: Child;

    constructor(children: Child) {
        this.children = children;
    }

    removeLayout = async (layoutId: string) => {
        const res = await this.children;
        return res.removeLayout(parseInt(layoutId));
    };

    addLayout = async (parentId: string) => {
        const res = await this.children;
        return res.addLayout(parseInt(parentId));
    };

    renameLayout = async (layoutId: string, layoutName: string) => {
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
}

export default LayoutController;
