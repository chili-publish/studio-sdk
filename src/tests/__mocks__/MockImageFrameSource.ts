import {
    ImageFrameConnectorSource,
    ImageSourceTypeEnum,
    ImageFrameUrlSource,
    ImageFrameVariableSource,
} from '../../../types/FrameTypes';

export const mockImageConnectorSource: ImageFrameConnectorSource = {
    assetId: 'asset-id',
    connectorId: 'connector-id',
    sourceType: ImageSourceTypeEnum.connector,
};

export const mockImageUrlSource: ImageFrameUrlSource = {
    url: 'https://image.url',
    sourceType: ImageSourceTypeEnum.url,
};

export const mockImageVariableSource: ImageFrameVariableSource = {
    variableId: 'variable-id',
    sourceType: ImageSourceTypeEnum.variable,
};
