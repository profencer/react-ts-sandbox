import * as React from 'react'
import { IObj } from './util/validate';

interface IGoodsCardProps {
    value: IObj
}
export class GoodsCard extends React.Component<IGoodsCardProps,{}> {

    public renderItem(good: IObj) {
        const { title: { value: title }, price: { value: price } } = good;
        return (
            <div className="card horizontal" key={title}>
                <div className="card-stacked">
                    <div className="card-content">
                        <p className="card-title">{title}</p>
                        <p>{price}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">подробнее</a>
                    </div>
                </div>
            </div>
        );
    }
    public render() {
        const { value } = this.props;
        return this.renderItem(value);
    }
}