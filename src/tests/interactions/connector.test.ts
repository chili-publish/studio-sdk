import { validateEditorLink } from '../../interactions/connector';

describe('Editor Link Validator', () => {
    const validLink = 'https://chili-editor-dev.azurewebsites.net/';
    it('returns the link withtout any modification if it passes the regex test', () => {
        expect(validateEditorLink('https://chili-editor-dev.azurewebsites.net/')).toEqual(validLink);

        expect(validateEditorLink('chili-editor-dev.net/')).toEqual('chili-editor-dev.net/');

        expect(validateEditorLink('www.chili-editor-dev.net/')).toEqual('www.chili-editor-dev.net/');

        expect(validateEditorLink('https://www.chili-editor-dev.azurewebsites.net/')).toEqual(
            'https://www.chili-editor-dev.azurewebsites.net/',
        );

        expect(validateEditorLink('chili-editor-dev.azurewebsites.net/')).toEqual(
            'chili-editor-dev.azurewebsites.net/',
        );
    });
    it('removes index.html if found at the end of the link', () => {
        expect(validateEditorLink('https://chili-editor-dev.azurewebsites.net/index.html')).toEqual(validLink);
    });
    it('Adds / at the end if not found', () => {
        expect(validateEditorLink('https://chili-editor-dev.azurewebsites.net')).toEqual(validLink);
    });
});
