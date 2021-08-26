import { render } from '@testing-library/react';
import Editor from '../../components/editor/Editor';

describe('Editor', () => {
    it('initializes the Editor', () => {
        const { getByTestId } = render(<Editor />);
        const iframe = getByTestId('iframe');
        expect(iframe).toBeInTheDocument();
    });
});
