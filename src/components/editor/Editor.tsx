import { FC } from 'react';

interface PropsType {
    editorLink: string;
}

const Editor: FC<PropsType> = ({ editorLink }) => <iframe title="editor 2" frameBorder={0} src={editorLink} />;

export default Editor;
