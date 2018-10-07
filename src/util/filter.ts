import { Values } from "./types";

import { ISchema } from "./schema";

export interface IFilterType {
    string: 'text',
    number: 'numeric' | 'range',
}
interface IFilterState {
    text: { value: string },
    numeric: { value: number },
    range: { min?: number, max?: number },
    none: {},
}

export interface IFilters {
    [propName: string]: Values<IFilterState>,
}

const initialStates = {
    none: {},
    numeric: { value: 0 },
    range: { min: undefined, max: undefined },
    text: { value: "" },
}

export const getInitialFilterState = (schema: ISchema): IFilters => {
    return schema.fields.reduce((result: IFilters, field) => {
        result[field.name] = initialStates[field.type];
        return result;
    }, {});
};
