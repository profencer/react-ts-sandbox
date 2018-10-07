import * as React from 'react';
import { IAppState } from './App';
import { List } from './list';

interface IFilterableListProps {
    value: IAppState,
    renderItem: React.ComponentType,
    fetchItems: () => void,
}
interface IFilterableListState {
    ss: string
}
export class FilterableList extends React.Component<IFilterableListProps, IFilterableListState> {
    public componentDidMount() {
        this.props.fetchItems();
    }
    public render() {
        return (
            <div className="row">
                <div className="col s8">
                    <List {...this.props.value.goods} />
                </div>
                <div className="col s4">
                    ss
                </div>
            </div>
        )
    }
} 