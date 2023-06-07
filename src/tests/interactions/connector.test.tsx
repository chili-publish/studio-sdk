import * as ConnectorFunctions from '../../interactions/connector';

const editorLink = 'https://test.test.net/';
beforeEach(() => {
    jest.spyOn(ConnectorFunctions, 'validateEditorLink');
    jest.spyOn(ConnectorFunctions, 'setupFrame');
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
        expect(iframe.srcdoc).toEqual('test');
        expect(iframe.title).toEqual('Chili-Editor');
    });

    it('sets the studioStyling script in iFrame head', () => {
        const styling = { uiBackgroundColorHex: '000000' };

        const iframe = document.createElement('iframe');
        ConnectorFunctions.setupFrame(iframe, editorLink, styling);

        const stylingScript = document.getElementById('studio-styling');
        expect(stylingScript?.textContent).toEqual(JSON.stringify(styling));
    });
});
