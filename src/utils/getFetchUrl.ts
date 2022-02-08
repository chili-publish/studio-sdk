import { renderURLs } from './enums';

export const getFetchURL = (format: string) =>
    `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=30&layoutId=0&pixelRatio=1&encoding=rawRgba&socket=false`;
