import * as PenpalFunction from '../../interactions/PenpalConnectionProvider';

const editorLink = 'https://test.test.net/';
beforeEach(() => {
    jest.spyOn(PenpalFunction, 'validateEditorLink');
    jest.spyOn(PenpalFunction, 'setupFrame');
    Object.defineProperty(window, 'initializeStudioEngine', {
        configurable: true,
        enumerable: true,
        value: jest.fn(),
        writable: true,
    });
});

describe('Connector helpers', () => {
    it('validates an editor link', () => {
        const validatedLink = PenpalFunction.validateEditorLink(editorLink);
        expect(validatedLink).toEqual(editorLink);
    });

    it('setups an Iframe from a link', () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('srcdoc', ' ');
        iframe.setAttribute('title', 'Chili-Editor');
        iframe.setAttribute('style', 'width: 100%; height: 100%;');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('referrerpolicy', 'origin');
        PenpalFunction.setupFrame(iframe, editorLink);
        // expect(iframe.srcdoc).toEqual('placeholder');
        // expect(iframe.title).toEqual('Chili-Editor');
    });

    it('sets the studioStyling script in iFrame head', () => {
        const styling = { uiBackgroundColorHex: '000000' };

        const iframe = document.createElement('iframe');
        PenpalFunction.setupFrame(iframe, editorLink, styling);
        const doc = iframe.ownerDocument;

        const metas = doc.head.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
            const meta = metas[i];
            if (meta.getAttribute('name') === 'studio-styling') {
                const content = meta.getAttribute('content');
                expect(content).toEqual(JSON.stringify(styling));
            }
        }
    });
});
