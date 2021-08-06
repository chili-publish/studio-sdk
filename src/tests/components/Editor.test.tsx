import { render } from '@testing-library/react';
import { Editor } from '../../index';

describe('Editor', () => {
    it('initializes the Editor', () => {
        const { container } = render(<Editor editorLink="testlink" />);
        const iframe = container.getElementsByTagName('iframe')[0];

        expect(iframe).toBeInTheDocument();
        expect(iframe.getAttribute('src')).toBe('testlink');
    });

    it('renders the Editor without border', () => {
        const { container } = render(<Editor editorLink="testlink" />);
        const iframe = container.getElementsByTagName('iframe')[0];

        expect(iframe).toBeInTheDocument();
        expect(iframe.getAttribute('frameBorder')).toBe('0');
    });
});
