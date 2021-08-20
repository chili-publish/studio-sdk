import { render } from '@testing-library/react';
import EditorWrapper from '../../components/editor/EditorWrapper';
import { store } from '../../store';
import { setLayouts } from '../../store/documentReducer';

describe('Editor', () => {
    it('initializes the Editor', () => {
        const { container } = render(<EditorWrapper editorLink="testlink" />);
        const iframe = container.getElementsByTagName('iframe')[0];

        expect(iframe).toBeInTheDocument();
        expect(iframe.getAttribute('src')).toBe('testlink');
    });

    it('renders the Editor without border', () => {
        const { container } = render(<EditorWrapper editorLink="testlink" />);
        const iframe = container.getElementsByTagName('iframe')[0];

        expect(iframe).toBeInTheDocument();
        expect(iframe.getAttribute('frameBorder')).toBe('0');
    });

    it('contains the correct redux state', () => {
        let { layouts } = store.getState().document;
        expect(layouts.length).toEqual(0);
        store.dispatch(setLayouts([{ id: 1, name: 'Default layout' }]));
        layouts = store.getState().document.layouts;
        const defaultLayout = layouts.find((layout) => layout.id === 1);
        expect(defaultLayout?.name).toBe('Default layout');
    });
});
