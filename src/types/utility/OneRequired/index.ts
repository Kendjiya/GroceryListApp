/**
 * A utility type that ensures that at least one of the keys from K is required and the rest are optional.
 *
 * @template T - The type to extract keys from.
 * @template K - The keys to make required.
 * @returns A new type that has all keys from T, with the keys from K marked as required and the rest marked as optional.
 */
export type OneRequired<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>
