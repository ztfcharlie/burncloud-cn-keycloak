import type { ThemeType } from "../../shared/constants";
/** Assumes the theme type exists */
export declare function readFieldNameUsage(params: {
    themeSrcDirPath: string;
    themeType: Exclude<ThemeType, "admin">;
}): string[];
