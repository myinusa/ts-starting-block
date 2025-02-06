/**
 * Type guard to check if a value is neither `undefined` nor `null`.
 *
 * This function helps in narrowing down the type of the value to exclude `undefined` and `null`.
 * It is useful in scenarios where you want to ensure that a value is defined before proceeding with further operations.
 *
 * @template T - The type of the value being checked.
 * @param {T | undefined | null} value - The value to check.
 * @returns {value is T} - Returns `true` if the value is neither `undefined` nor `null`, otherwise `false`.
 *
 * @example
 * const value: string | undefined | null = getValue();
 * if (isDefined(value)) {
 *   // TypeScript now knows that `value` is a `string` and not `undefined` or `null`.
 *   console.log(value.toUpperCase());
 * }
 */
export const isDefined = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;

/**
 * Checks if a given value is undefined.
 *
 * @template T - The type of the value being checked.
 * @param {T | undefined} value - The value to check.
 * @returns {value is undefined} - Returns `true` if the value is undefined, otherwise `false`.
 */
export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return value === undefined;
};

/**
 * Checks if a given value is null.
 *
 * @template T - The type of the value being checked.
 * @param {T | null} value - The value to check.
 * @returns {value is null} - Returns `true` if the value is null, otherwise `false`.
 */
export const isNull = <T>(value: T | null): value is null => {
  return value === null;
};

/**
 * Checks if a given value is undefined or null.
 *
 * @template T - The type of the value being checked.
 * @param {T | undefined | null} value - The value to check.
 * @returns {value is undefined | null} - Returns `true` if the value is undefined or null, otherwise `false`.
 */
export const isUndefinedOrNull = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

/**
 * Type guard to check if a value is of a specified type.
 *
 * @template T - The type to check against.
 * @param {unknown} value - The value to check.
 * @param {string} type - The type as a string (e.g., 'string', 'number').
 * @returns {value is T} - Returns `true` if the value is of the specified type, otherwise `false`.
 */
export const isType = <T>(value: unknown, type: string): value is T => {
  return typeof value === type;
};