import * as Joi from 'joi';
/**
 * Make all properties of an object immutable including deep properties
 * @param obj - this can contain deep properties
 * @returns a readonly version of the parameter object
 */
export const deepFreeze = (obj: {
    [key: string]: any;
}): Readonly<{
    [key: string]: any;
}> => {
    Object.keys(obj).forEach((prop) => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
};

/**
 * Check if a variable is not an empty array
 * @param arr - any variable
 * @returns array is empty or not
 */
export const isNotEmptyArray = (arr: any): arr is any[] => Array.isArray(arr) && arr.length > 0;

/**
 * Check if a variable is null or undefined
 * @param value - any variable
 * @returns `true` if variable is null or undefined, `false` otherwise
 */
export const isEmpty = (value: any) => value === null || typeof value === 'undefined';

/**
 * Check if a variable is blank or not
 * @param str - a string or a number
 * @returns `str` is blank or not
 */
export const isBlank = (str: string | number | null | undefined) => typeof str === 'undefined' || str == null || str.toString().trim() === '';

/**
 * Generate key - value error object from Joi validation error
 * @param err - Joi validation error
 * @returns key - value error object whose values are error messages
 */
export const generateKeyValueError = (err: Joi.ValidationError): { [key: string]: string } => {
    const error: { [key: string]: string } = {};
    err.details.forEach((errItem) => {
        error[errItem.context.key] = errItem.message;
    });
    return error;
};
