import { connectToChild, Connection } from 'penpal';

let connection: Connection;

function Connect(editorLink: string) {
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
    // Aftre the connection is established we will use the variable connection to access the child's methods
    // f.e
    /* connection.promise.then((child) => {
        child.multiply(345, 12345).then((res: number) => {
            console.log(res);
        });
    }); */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection = connectToChild({
        // The iframe to which a connection should be made
        iframe,
        // All the methods that we want to expose to the child should be inside the methods object
        // f.e. stateChange(documentJson)
        methods: {},
    });
}
export default Connect;
