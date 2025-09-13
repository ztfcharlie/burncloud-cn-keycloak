import { type ThemeType } from "../../shared/constants";
export type BuildContextLike = {
    themeNames: string[];
    themeSrcDirPath: string;
};
export declare function generateMessageProperties(params: {
    buildContext: BuildContextLike;
    themeType: Exclude<ThemeType, "admin">;
}): {
    languageTags: string[];
    writeMessagePropertiesFiles: (params: {
        messageDirPath: string;
        themeName: string;
    }) => void;
};
