import { renderURLs } from '../../utils/enums';
import { getFetchURL } from '../../utils/getFetchUrl';

describe('getFetchURL', () => {
    it('return updated url with given parameters', () => {
        const format = 'mp4';
        const url = getFetchURL(format,1,25,0);
        expect(url).toEqual(
            `${renderURLs.BASE_URL}/rendering?outputType=${format}&fps=25&layoutId=1&pixelRatio=0&encoding=rawRgba&socket=false`,
        );
    });
});
