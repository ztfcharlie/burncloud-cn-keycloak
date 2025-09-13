import { z } from "zod";
export type Stringifyable = StringifyableAtomic | StringifyableObject | StringifyableArray;
export type StringifyableAtomic = string | number | boolean | null;
interface StringifyableObject {
    [key: string]: Stringifyable;
}
interface StringifyableArray extends Array<Stringifyable> {
}
export declare const zStringifyableAtomic: z.ZodType<StringifyableAtomic, z.ZodTypeDef, StringifyableAtomic>;
export declare const zStringifyable: z.ZodType<Stringifyable>;
export declare function getIsAtomic(stringifyable: Stringifyable): stringifyable is StringifyableAtomic;
export declare const getValueAtPath: (stringifyableObjectOrArray: Record<string, Stringifyable> | Stringifyable[], path: (string | number)[]) => Stringifyable | undefined;
export {};
