import { connectToChild, Connection } from 'penpal';

const validateEditorLink = (editorLink: string) => {
    const linkValidator = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w]+\/$/);
    let link = '';
    if (linkValidator.test(editorLink)) {
        link = editorLink;
    } else if (editorLink.indexOf('/index.html') > -1) {
        link = editorLink.replace('/index.html', '/');
    } else if (editorLink.charAt(-1) !== '/') {
        link = `${editorLink}/`;
    }
    return link;
};

const setupFrame = (iframe: HTMLIFrameElement, editorLink: string) => {
    const link = validateEditorLink(editorLink);
    const html = `<html>
    <head>
      <base href="/" />
      <meta charset="UTF-8"/>    
      <!--  use this property to override the location of assets like 'default fonts' and demo document -->
      <meta name="assetBase" content="${link}">
    </head>
    <body> 
    <script async src="${link}init.js"></script>
    <script async src="https://unpkg.com/penpal@6.1.0/dist/penpal.min.js"></script>
    <script async src="${link}main.dart.js"></script>     
    </body>
    </html>
    `;

    // eslint-disable-next-line no-param-reassign
    iframe.srcdoc = 'test';

    let iframeDoc: Document = iframe.ownerDocument;
    if (iframe.contentWindow) {
        iframeDoc = iframe.contentWindow.document;
    }
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
};
interface ConfigParameterTypes {
    stateChanged: (state: string) => void;
    selectedFrameLayout: (state: string) => void;
    selectedFrameContent: (state: string) => void;
}
const Connect = (
    editorLink: string,
    params: ConfigParameterTypes,
    setConnection: (connection: Connection) => void,
    editorId = 'chili-editor',
) => {
    const editorSelectorId = `#${editorId}`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('srcdoc', ' ');
    iframe.setAttribute('title', 'Chili-Editor');
    iframe.setAttribute('style', 'width: 100%; height: 100%;');
    iframe.setAttribute('frameBorder', '0');

    const setupNewFrame = () => {
        const iframeContainer = document.querySelector(editorSelectorId);
        if (iframeContainer) {
            iframeContainer?.appendChild(iframe);
            setupFrame(iframe, editorLink);
        }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setupNewFrame();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setupNewFrame();
        });
    }
    setConnection(
        connectToChild({
            // The iframe to which a connection should be made
            iframe,
            // All the methods that we want to expose to the child should be inside the methods object
            // f.e. stateChange(documentJson)
            methods: {
                stateChanged: params.stateChanged,
                selectedFrameLayout: params.selectedFrameLayout,
                selectedFrameContent: params.selectedFrameContent,
            },
        }),
    );
};
export default Connect;
