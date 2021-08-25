import { FC } from 'react';

interface PropsType {
    editorLink: string;
}

const EditorWrapper: FC<PropsType> = ({ editorLink }) => <div id="iframe" style={{ height: '100%' }} />;

export default EditorWrapper;
