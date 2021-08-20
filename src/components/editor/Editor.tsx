import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import EditorWrapper from './EditorWrapper';

interface PropsType {
    editorLink: string;
}

const Editor: FC<PropsType> = ({ editorLink }) => (
    <Provider store={store}>
        <EditorWrapper editorLink={editorLink} />
    </Provider>
);
export default Editor;
