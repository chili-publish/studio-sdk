import { connectToChild, Connection } from 'penpal';

let connection: Connection;
const connect = (editorLink: string) => {
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
    connection = connectToChild({
        // The iframe to which a connection should be made
        iframe,
    });
};

export default connect;

export const testAdd = () => {
    connection.promise.then((child: any) => {
        child.multiply(345, 12345).then((res: number) => {
            console.log('%c⧭', 'color: #e57373', res);
        });
    });
};
