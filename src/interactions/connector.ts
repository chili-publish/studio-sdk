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
      <meta name="assetBase" content="https://storageeditor2.blob.core.windows.net/editor/refs/heads/master/web/">
    </head>
    <body> 
    <script src="${link}init.js"></script>
    <script async src="https://unpkg.com/penpal@6.1.0/dist/penpal.min.js"></script>
    <script async src="${link}main.dart.js"></script>     
    </body>
    </html>
    `;

    // eslint-disable-next-line no-param-reassign
    iframe.srcdoc = ' ';

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
}
const Connect = (editorLink: string, params: ConfigParameterTypes, setConnection: (connection: Connection) => void) => {
    const iframe = document.createElement('iframe');
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        const iframeContainer = document.querySelector('#iframe');
        iframeContainer?.appendChild(iframe);
        setupFrame(iframe, editorLink);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            const iframeContainer = document.querySelector('#iframe');
            iframeContainer?.appendChild(iframe);
            setupFrame(iframe, editorLink);
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
            },
        }),
    );
};
export default Connect;
