import { render } from '@testing-library/react';
import Editor from '../../components/editor/Editor';

describe('Editor', () => {
    it.skip('initializes the Editor', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { getByTestId } = render(<Editor />);
        const iframe = getByTestId('iframe');
        expect(iframe).toBeInTheDocument();
    });
});
