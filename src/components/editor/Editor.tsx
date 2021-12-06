let div: HTMLDivElement;
const loadEditor = () => {
    if (!div) {
        div = window.document.createElement('div');
        div.setAttribute('id', 'iframe');
        div.setAttribute('style', 'height: 100%');
    }
};
export default loadEditor;
