import { IFilterType } from './filter';
import { Values } from "./types";

export type FieldType = 'string' | 'number';

export type IField = Values<{
  [key in keyof IFilterType]: {
    displayName: string,
    name: string,
    type: key,
    filterType: IFilterType[key] | 'none'
  }
}>

export interface ISchema {
  fields: IField[],
}
const validateField = (data: any): IField => {
  if (typeof data !== 'object') {
    throw new Error();
  }
  const { type, name, filterType, displayName } = data;
  if (
    typeof name !== 'string'
    || typeof filterType !== 'string'
    || typeof type !== 'string'
  ) {
    throw new Error();
  }
  if (type === 'string') {
    if (
      filterType === 'text'
      || filterType === 'none'
    ) {
      return { type, name, filterType, displayName };
    } else {
      throw new Error();
    }
  } else if (type === 'number') {
    if (
      filterType === 'none'
      || filterType === 'numeric'
      || filterType === 'range'
    ) {
      return { type, name, filterType, displayName };
    } else {
      throw new Error();
    }
  } else {
    throw new Error();
  }
}
export const validateSchema = (data: any): ISchema => {
  if (typeof data !== 'object') {
    throw new Error();
  }
  if (!(data.fields && Array.isArray(data.fields))) {
    throw new Error();
  }

  return { fields: data.fields.map(validateField) };
}