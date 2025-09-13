import { BuildContextLike as BuildContextLike_replaceImportsInJsCode } from "../replacers/replaceImportsInJsCode";
import { BuildContextLike as BuildContextLike_replaceImportsInCssCode } from "../replacers/replaceImportsInCssCode";
import { type ThemeType } from "../../shared/constants";
export type BuildContextLike = BuildContextLike_replaceImportsInJsCode & BuildContextLike_replaceImportsInCssCode & {
    urlPathname: string | undefined;
    themeVersion: string;
    kcContextExclusionsFtlCode: string | undefined;
};
export declare function generateFtlFilesCodeFactory(params: {
    themeName: string;
    indexHtmlCode: string;
    buildContext: BuildContextLike;
    keycloakifyVersion: string;
    themeType: ThemeType;
    fieldNames: string[];
}): {
    generateFtlFilesCode: (params: {
        pageId: string;
    }) => {
        ftlCode: string;
    };
};
