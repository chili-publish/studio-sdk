import { renderURLs } from './enums';

export const getFetchURL = (format: string, layoutId: number) =>
    `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=30&layoutId=${
        layoutId ?? 0
    }&pixelRatio=1&encoding=rawRgba&socket=false`;
