import { renderURLs } from './enums';

export const getFetchURL = (format: string, layoutId: number, fps?: number, pixelRatio?: number, encoding?: string) =>
    `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=${fps ?? 30}&layoutId=${layoutId ?? 0}&pixelRatio=${
        pixelRatio ?? 1
    }&encoding=${encoding ?? 'rawRgba'}&socket=false`;
