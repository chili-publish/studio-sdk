import * as ConnectorFunctions from '../../interactions/Connector';

const editorLink = 'https://test.test.net/';
beforeEach(() => {
    jest.spyOn(ConnectorFunctions, 'validateEditorLink');
    jest.spyOn(ConnectorFunctions, 'setupFrame');
    Object.defineProperty(window, 'initializeStudioEngine', {
        configurable: true,
        enumerable: true,
        value: jest.fn(),
        writable: true,
    });
});

describe('Connector helpers', () => {
    it('validates an editor link', () => {
        const validatedLink = ConnectorFunctions.validateEditorLink(editorLink);
        expect(validatedLink).toEqual(editorLink);
    });

    it('setups an Iframe from a link', () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('srcdoc', ' ');
        iframe.setAttribute('title', 'Chili-Editor');
        iframe.setAttribute('style', 'width: 100%; height: 100%;');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('referrerpolicy', 'origin');
        ConnectorFunctions.setupFrame(iframe, editorLink);
        // expect(iframe.srcdoc).toEqual('placeholder');
        // expect(iframe.title).toEqual('Chili-Editor');
    });

    it('removes the engine iframe and its message listener on teardown', () => {
        const container = document.createElement('div');
        container.id = 'chili-editor';
        document.body.appendChild(container);
        const addSpy = jest.spyOn(window, 'addEventListener');
        const removeSpy = jest.spyOn(window, 'removeEventListener');

        ConnectorFunctions.default(editorLink, {} as never, jest.fn());

        expect(container.getElementsByTagName('iframe')).toHaveLength(1);
        const messageListener = addSpy.mock.calls.find(([type]) => type === 'message')?.[1];
        expect(messageListener).toBeDefined();

        ConnectorFunctions.teardownFrame();

        expect(container.getElementsByTagName('iframe')).toHaveLength(0);
        expect(removeSpy).toHaveBeenCalledWith('message', messageListener);

        container.remove();
        addSpy.mockRestore();
        removeSpy.mockRestore();
    });

    it('releases the previous engine iframe when a new one is connected', () => {
        const container = document.createElement('div');
        container.id = 'chili-editor';
        document.body.appendChild(container);

        ConnectorFunctions.default(editorLink, {} as never, jest.fn());
        const first = container.getElementsByTagName('iframe')[0];

        ConnectorFunctions.default(editorLink, {} as never, jest.fn());

        // The previous frame must be gone, otherwise a second load leaves a fully
        // live engine (Dart heap + CanvasKit + QuickJS) behind.
        expect(container.getElementsByTagName('iframe')).toHaveLength(1);
        expect(container.getElementsByTagName('iframe')[0]).not.toBe(first);
        expect(first.isConnected).toBe(false);

        ConnectorFunctions.teardownFrame();
        container.remove();
    });

    it('sets the studioStyling script in iFrame head', () => {
        const styling = { uiBackgroundColorHex: '000000' };

        const iframe = document.createElement('iframe');
        ConnectorFunctions.setupFrame(iframe, editorLink, styling);
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
