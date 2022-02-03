import { Child, ConfigType } from '../../types/CommonTypes';

class DocumentController {
    children: Child;
    config: ConfigType;

    constructor(children: Child, config: ConfigType) {
        this.children = children;
        this.config = config;
    }

    saveDocument = async () => {
        const res = await this.children;
        return res.getCurrentDocumentState();
    };
}

export default DocumentController;
