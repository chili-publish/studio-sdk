import Connect from '../../interactions/connector';

// TODO: fix testing
describe.skip('Editor Link Validator', () => {
    it('returns the valid link without modification', async () => {
        Connect(
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
        Connect(
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
        Connect(
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
