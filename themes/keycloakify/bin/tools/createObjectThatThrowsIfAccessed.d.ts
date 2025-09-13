export declare class AccessError extends Error {
    constructor(message: string);
}
export declare function createObjectThatThrowsIfAccessed<T extends object>(params?: {
    debugMessage?: string;
    isPropertyWhitelisted?: (prop: string | number | symbol) => boolean;
}): T;
export declare function createObjectThatThrowsIfAccessedFactory(params: {
    isPropertyWhitelisted?: (prop: string | number | symbol) => boolean;
}): {
    createObjectThatThrowsIfAccessed: <T extends object>(params?: {
        debugMessage?: string;
    }) => T;
};
export declare function isObjectThatThrowIfAccessed(obj: object): boolean;
export declare const THROW_IF_ACCESSED: {
    __brand: string;
};
export declare function createObjectWithSomePropertiesThatThrowIfAccessed<T extends Record<string, unknown>>(obj: {
    [K in keyof T]: T[K] | typeof THROW_IF_ACCESSED;
}, debugMessage?: string): T;
