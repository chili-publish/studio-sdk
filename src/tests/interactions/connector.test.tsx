import * as ConnectorFunctions from '../../interactions/connector';

const editorLink = 'https://test.test.net/';
beforeEach(() => {
    jest.spyOn(ConnectorFunctions, 'validateEditorLink');
    jest.spyOn(ConnectorFunctions, 'setupFrame');
});
// TODO: fix testing
describe.skip('Editor Link Validator', () => {
    it('returns the valid link without modification', async () => {
        ConnectorFunctions.default(
            'https://chili-editor-dev.azurewebsites.net/',
            {
                onStateChanged: () => null,
                onSelectedFrameLayoutChanged: () => null,
                onSelectedFrameContentChanged: () => null,
                onSelectedLayoutPropertiesChanged: () => null,
                onOpenLayoutPropertiesPanelChange: () => null,
                onScrubberPositionChanged: () => null,
                onFrameAnimationsChanged: () => null,
                onVariableListChanged: () => null,
                onSelectedToolChanged: () => null,
                onUndoStateChanged: () => null,
                onSelectedLayoutFramesChanged: () => null,
            },
            () => null,
        );

        const iframe = document.getElementsByTagName('iframe')[0];
        const iframeBody = iframe.contentWindow?.document.getElementsByTagName('body')[0];
        expect(iframeBody?.getElementsByTagName('script')[0].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/init.js',
        );
        expect(iframeBody?.getElementsByTagName('script')[2].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/main.dart.js',
        );
    });

    it('removes index.html if found at the end of the link', () => {
        ConnectorFunctions.default(
            'https://chili-editor-dev.azurewebsites.net/index.html',
            {
                onStateChanged: () => null,
                onSelectedFrameLayoutChanged: () => null,
                onSelectedFrameContentChanged: () => null,
                onSelectedLayoutPropertiesChanged: () => null,
                onOpenLayoutPropertiesPanelChange: () => null,
                onScrubberPositionChanged: () => null,
                onFrameAnimationsChanged: () => null,
                onVariableListChanged: () => null,
                onSelectedToolChanged: () => null,
                onUndoStateChanged: () => null,
                onSelectedLayoutFramesChanged: () => null,
            },
            () => null,
        );

        const iframe = document.getElementsByTagName('iframe')[0];
        const iframeBody = iframe.contentWindow?.document.getElementsByTagName('body')[0];
        expect(iframeBody?.getElementsByTagName('script')[0].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/init.js',
        );
        expect(iframeBody?.getElementsByTagName('script')[2].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/main.dart.js',
        );
    });
    it('Adds / at the end if not found', () => {
        ConnectorFunctions.default(
            'https://chili-editor-dev.azurewebsites.net',
            {
                onStateChanged: () => null,
                onSelectedFrameLayoutChanged: () => null,
                onSelectedFrameContentChanged: () => null,
                onSelectedLayoutPropertiesChanged: () => null,
                onOpenLayoutPropertiesPanelChange: () => null,
                onScrubberPositionChanged: () => null,
                onFrameAnimationsChanged: () => null,
                onVariableListChanged: () => null,
                onSelectedToolChanged: () => null,
                onUndoStateChanged: () => null,
                onSelectedLayoutFramesChanged: () => null,
            },
            () => null,
        );

        const iframe = document.getElementsByTagName('iframe')[0];
        const iframeBody = iframe.contentWindow?.document.getElementsByTagName('body')[0];
        expect(iframeBody?.getElementsByTagName('script')[0].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/init.js',
        );
        expect(iframeBody?.getElementsByTagName('script')[2].src).toEqual(
            'https://chili-editor-dev.azurewebsites.net/main.dart.js',
        );
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
        console.log(iframe.ownerDocument);
        expect(iframe.srcdoc).toEqual('test');
        expect(iframe.title).toEqual('Chili-Editor');
    });
});
