import { renderURLs } from './enums';

export const getFetchURL = (format: string) =>
    `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=120&layoutId=0&pixelRatio=1&encoding=rawRgba&socket=false`;
