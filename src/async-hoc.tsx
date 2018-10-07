import * as React from 'react';
import { IAsync, IAsyncError, IAsyncLoading, IAsyncSuccess } from "./App";
interface IAsyncHocProps<T> {
    Success: React.ComponentType<IAsyncSuccess<T>>,
    Error: React.ComponentType<IAsyncError>,
    Loading: React.ComponentType<IAsyncLoading>,
}
export const asyncHoc = <T extends any>({ Success, Error, Loading }: IAsyncHocProps<T>) => {
    return class AsyncHoc extends React.PureComponent<IAsync<T>, {}> {
        public render() {
            switch (this.props.status) {
                case 'loading': return <Loading {...this.props} />;
                case 'success': {
                    return <Success {...this.props} />
                };
                default: return <Error {...this.props} />;
            }
        }
    }
}