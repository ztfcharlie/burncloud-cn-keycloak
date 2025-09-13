type I18nLike = {
    msgStr: (key: "recovery-codes-download-file-header" | "recovery-codes-download-file-description" | "recovery-codes-download-file-date") => string;
    isFetchingTranslations: boolean;
};
export declare function useScript(params: {
    olRecoveryCodesListId: string;
    i18n: I18nLike;
}): void;
export {};
