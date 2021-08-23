import { FC } from 'react';
import EditorWrapper from './EditorWrapper';

interface PropsType {
    editorLink: string;
}

const Editor: FC<PropsType> = ({ editorLink }) => <EditorWrapper editorLink={editorLink} />;
export default Editor;
