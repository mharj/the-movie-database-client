/**
 * This type takes direct value, Promise of value or a function that returns value or Promise of value.
 * @example
 * const loadableValue: Loadable<string>;
 * // solve the value
 * const value: string = await (typeof loadableValue === 'function' ? loadableValue() : loadableValue);
 */
export type Loadable<ValueType> = ValueType | Promise<ValueType> | (() => ValueType) | (() => Promise<ValueType>);
