import { IField, ISchema } from './schema';

interface IStringValue {
    type: 'string',
    value: string,
}
interface INumberValue {
    type: 'number',
    value: number,
}

type Value = IStringValue | INumberValue;

export interface IObj { [key: string]: Value }

export const validate = (schema: ISchema, data: any): IObj => {
    if (typeof data !== 'object') {
        throw new Error();
    }
    return schema.fields.reduce((result: IObj, { name, type }: IField) => {
        if (!data.hasOwnProperty(name)) {
            throw new Error();
        }
        if (type === 'string' && typeof data[name] === 'string') {
            result[name] = { type, value: data[name] };
        } else if (type === 'number' && typeof data[name] === 'number') {
            result[name] = { type, value: data[name] };
        } else {
            throw new Error();
        }
        return result;
    }, {});
} 