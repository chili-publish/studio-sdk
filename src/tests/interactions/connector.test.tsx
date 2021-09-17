import { render } from '@testing-library/react';
import Editor from '../../components/editor/Editor';
import Connect from '../../interactions/connector';

describe('Editor Link Validator', () => {
    it('returns the valid link without modification', async () => {
        render(<Editor />);

        Connect('https://chili-editor-dev.azurewebsites.net/', { stateChanged: () => null }, () => null);

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
        render(<Editor />);

        Connect('https://chili-editor-dev.azurewebsites.net/index.html', { stateChanged: () => null }, () => null);

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
        render(<Editor />);

        Connect('https://chili-editor-dev.azurewebsites.net', { stateChanged: () => null }, () => null);

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
