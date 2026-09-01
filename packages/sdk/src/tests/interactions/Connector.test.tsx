import * as ConnectorFunctions from '../../interactions/Connector';

const editorLink = 'https://test.test.net/';
const createObjectURLMock = URL.createObjectURL as jest.MockedFunction<typeof URL.createObjectURL>;
const revokeObjectURLMock = URL.revokeObjectURL as jest.MockedFunction<typeof URL.revokeObjectURL>;

const readBlob = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.addEventListener('error', () => reject(reader.error));
        reader.readAsText(blob);
    });

beforeEach(() => {
    createObjectURLMock.mockClear();
    revokeObjectURLMock.mockClear();
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

    it('loads the iframe HTML from a blob URL', async () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('title', 'Chili-Editor');
        iframe.setAttribute('style', 'width: 100%; height: 100%;');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('referrerpolicy', 'origin');
        const blobUrl = ConnectorFunctions.setupFrame(iframe, editorLink);

        expect(createObjectURLMock).toHaveBeenCalledTimes(1);
        const blob = createObjectURLMock.mock.calls[0][0];
        if (!(blob instanceof Blob)) {
            throw new Error('Expected setupFrame to create a Blob');
        }
        expect(blob.type).toBe('text/html');
        const html = await readBlob(blob);
        expect(html).toContain(`<base href="${editorLink}" />`);
        expect(html).toContain(`<script src="${editorLink}flutter_bootstrap.js"></script>`);
        expect(iframe.getAttribute('src')).toBe(blobUrl);
        expect(iframe).not.toHaveAttribute('srcdoc');
    });

    it('removes the engine iframe and its message listener on teardown', () => {
        const container = document.createElement('div');
        container.id = 'chili-editor';
        document.body.appendChild(container);
        const addSpy = jest.spyOn(window, 'addEventListener');
        const removeSpy = jest.spyOn(window, 'removeEventListener');

        const teardown = ConnectorFunctions.default(editorLink, {} as never, jest.fn());

        expect(container.getElementsByTagName('iframe')).toHaveLength(1);
        const messageListener = addSpy.mock.calls.find(([type]) => type === 'message')?.[1];
        expect(messageListener).toBeDefined();

        teardown();

        expect(container.getElementsByTagName('iframe')).toHaveLength(0);
        expect(removeSpy).toHaveBeenCalledWith('message', messageListener);
        expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-studio-frame');

        container.remove();
        addSpy.mockRestore();
        removeSpy.mockRestore();
    });

    it('keeps frames of other Connect calls alive and only releases its own', () => {
        const container = document.createElement('div');
        container.id = 'chili-editor';
        document.body.appendChild(container);

        const firstTeardown = ConnectorFunctions.default(editorLink, {} as never, jest.fn());
        const first = container.getElementsByTagName('iframe')[0];

        const secondTeardown = ConnectorFunctions.default(editorLink, {} as never, jest.fn());

        // Multiple live editors must be able to coexist: connecting a new engine
        // must not remove the frame a previous Connect call created.
        expect(container.getElementsByTagName('iframe')).toHaveLength(2);

        firstTeardown();
        expect(first.isConnected).toBe(false);
        expect(container.getElementsByTagName('iframe')).toHaveLength(1);

        secondTeardown();
        expect(container.getElementsByTagName('iframe')).toHaveLength(0);

        container.remove();
    });

    it('sets the studioStyling metadata in the iframe HTML blob', async () => {
        const styling = { uiBackgroundColorHex: '000000' };

        const iframe = document.createElement('iframe');
        ConnectorFunctions.setupFrame(iframe, editorLink, styling);
        const blob = createObjectURLMock.mock.calls[0][0];
        if (!(blob instanceof Blob)) {
            throw new Error('Expected setupFrame to create a Blob');
        }

        expect(await readBlob(blob)).toContain(`<meta name="studio-styling" content='${JSON.stringify(styling)}'>`);
    });
});
