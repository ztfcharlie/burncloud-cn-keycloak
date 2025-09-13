export type SemVer = {
    major: number;
    minor: number;
    patch: number;
    rc?: number;
    parsedFrom: string;
};
export declare namespace SemVer {
    const bumpTypes: readonly ["major", "minor", "patch", "rc", "no bump"];
    export type BumpType = (typeof bumpTypes)[number];
    export function parse(versionStr: string): SemVer;
    export function stringify(v: Omit<SemVer, "parsedFrom">): string;
    /**
     *
     * v1  <  v2  => -1
     * v1 === v2  => 0
     * v1  >  v2  => 1
     *
     */
    export function compare(v1: SemVer, v2: SemVer): -1 | 0 | 1;
    export function bumpType(params: {
        versionBehind: string | SemVer;
        versionAhead: string | SemVer;
    }): BumpType | "no bump";
    export {};
}
