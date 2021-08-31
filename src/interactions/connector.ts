import { connectToChild, Connection } from 'penpal';

interface ConfigParameterTypes {
    stateChanged: (state: Document) => void;
}
const Connect = (editorLink: string, params: ConfigParameterTypes, setConnection: (connection: Connection) => void) => {
    const iframe = document.createElement('iframe');
    iframe.src = editorLink;
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        const iframeElement = document.querySelector('#iframe');
        iframeElement?.appendChild(iframe);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            const iframeElement = document.querySelector('#iframe');
            iframeElement?.appendChild(iframe);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
