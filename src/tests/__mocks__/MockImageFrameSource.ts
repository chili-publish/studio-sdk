import {
    ImageFrameConnectorSource,
    ImageSourceTypeEnum,
    ImageFrameUrlSource,
    ImageFrameVariableSource,
} from '../../types/FrameTypes';

export const mockImageConnectorSource: ImageFrameConnectorSource = {
    assetId: 'asset-id',
    id: 'connector-id',
    type: ImageSourceTypeEnum.connector,
};

export const mockImageUrlSource: ImageFrameUrlSource = {
    url: 'https://image.url',
    type: ImageSourceTypeEnum.url,
};

export const mockImageVariableSource: ImageFrameVariableSource = {
    variableId: 'variable-id',
    type: ImageSourceTypeEnum.variable,
};
