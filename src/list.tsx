import * as React from 'react';
import { asyncHoc } from './async-hoc';


const ListSuccess = <T extends any>({ data }: { data: T[] }) => {
    return (
        <ul>
            <li>1</li>
        </ul>
    )
}


export const List = asyncHoc({
    Error: () => <>Ошибка загрузки</>,
    Loading: () => <>Загрузка данных</>,
    Success: ListSuccess,
})