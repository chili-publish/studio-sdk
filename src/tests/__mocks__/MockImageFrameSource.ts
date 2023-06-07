import {
    ImageFrameConnectorSource,
    ImageSourceTypeEnum,
    ImageFrameUrlSource,
    ImageFrameVariableSource,
} from '../../types/FrameTypes';

export const mockImageConnectorSource: ImageFrameConnectorSource = {
    id: 'connector-id',
    assetId: 'asset-id',
    type: ImageSourceTypeEnum.connector,
};

export const mockImageUrlSource: ImageFrameUrlSource = {
    url: 'https://image.url',
    type: ImageSourceTypeEnum.url,
};

export const mockImageVariableSource: ImageFrameVariableSource = {
    id: 'variable-id',
    type: ImageSourceTypeEnum.variable,
};
