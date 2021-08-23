import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

// eslint-disable-next-line max-len
const CHILIProvider: FC<ReactNode> = ({ children }) => <Provider store={store}>{children}</Provider>;
export default CHILIProvider;
