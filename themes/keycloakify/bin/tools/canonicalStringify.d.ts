import { type Stringifyable } from "./Stringifyable";
export declare function canonicalStringify(params: {
    data: Record<string, Stringifyable> | Stringifyable[];
    referenceData: Record<string, Stringifyable> | Stringifyable[];
}): string;
