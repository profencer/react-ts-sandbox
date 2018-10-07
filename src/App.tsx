import './App.css';

import * as React from 'react';
import bem from './util/bem';
import { IFilters } from './util/filter';
import { ISchema } from './util/schema';
import { IObj, validate } from './util/validate';

import { FilterableList } from './filterable-list';
import { GoodsCard } from './goods-card';

export interface IAsyncSuccess<T> {
  status: 'success',
  data: T,
}
export interface IAsyncError {
  status: 'error'
}

export interface IAsyncLoading {
  status: 'loading'
}
export type IAsync<T> = IAsyncLoading | IAsyncError | IAsyncSuccess<T>

export interface IAppState {
  goodSchema: ISchema,
  goods: IAsync<IObj[]>,
  filters: IFilters,
}
// '( propName operation value AND propName operation value )'
const b = bem('app');
const getGoods = (schema: ISchema): Promise<IObj[]> => new Promise((resolve, reject) => {
  const result: IObj[] = [
    {
      price: 100,
      title: 'Канпуктор',
    }, {
      price: 200,
      title: 'Калькулятор',
    },
  ].map(obj => validate(schema, obj))
  setTimeout(() => resolve(result), 1000)
})
/*
 1.При возврате на уже загруженную страницу 
 данные не должны подгружаться с сервера
*/
export class App extends React.Component<{}, IAppState> {

  public state: IAppState = {
    filters: { title: { value: "" }, price: { value: undefined } },
    goodSchema: {
      fields: [{
        displayName: 'Цена',
        filterType: 'numeric',
        name: 'price',
        type: 'number',
      }, {
        displayName: 'Наименование',
        filterType: 'text',
        name: 'title',
        type: 'string',
      }]
    },
    goods: { status: 'loading' },

  }

  public fetchGoods = async () => {
    this.loadingFetchGoods();
    const { goodSchema } = this.state;
    try {
      this.successFetchGoods(await getGoods(goodSchema));
    } catch (e) {
      this.errorFetchGoods();
    }
  }

  public loadingFetchGoods = () => {
    this.setState({ goods: { status: 'loading' } });
  }

  public successFetchGoods = (goods: IObj[]) => {
    this.setState({ goods: { status: 'success', data: goods } });
  }

  public errorFetchGoods = () => {
    this.setState({ goods: { status: 'error' } });
  }

  public render() {
    return (
      <div className={b()}>
        <FilterableList
          renderItem={GoodsCard}
          fetchItems={this.fetchGoods}
          value={this.state}
        />
      </div>
    );
  }
}

export default App;
