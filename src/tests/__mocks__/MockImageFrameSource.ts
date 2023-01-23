import {
    ImageConnectorSource,
    ImageSourceTypeEnum,
    ImageUrlSource,
    ImageVariableSource,
} from '../../../types/FrameTypes';

export const mockImageConnectorSource: ImageConnectorSource = {
    assetId: 'asset-id',
    connectorId: 'connector-id',
    sourceType: ImageSourceTypeEnum.connector,
};

export const mockImageUrlSource: ImageUrlSource = {
    url: 'https://image.url',
    sourceType: ImageSourceTypeEnum.url,
};

export const mockImageVariableSource: ImageVariableSource = {
    variableId: 'variable-id',
    sourceType: ImageSourceTypeEnum.variable,
};
