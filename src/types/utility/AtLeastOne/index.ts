/**
 * A utility type that requires at least one property from the given type `T`.
 *
 * This type ensures that the resulting type must have at least one of the properties from `T`,
 * while the rest of the properties are optional.
 *
 * @template T - The original type from which at least one property is required.
 * @template U - A helper type that maps each key in `T` to a type with only that key.
 *               Defaults to a mapping type where each key of `T` is picked as a single-property object.
 *               This should be left as the default.
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
