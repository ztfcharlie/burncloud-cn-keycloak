export type ClassKey = "kcHtmlClass" | "kcBodyClass" | "kcButtonClass" | "kcButtonPrimaryClass" | "kcButtonLargeClass" | "kcButtonDefaultClass" | "kcContentWrapperClass" | "kcFormClass" | "kcFormGroupClass" | "kcInputWrapperClass" | "kcLabelClass" | "kcInputClass" | "kcInputErrorMessageClass";
export declare const getKcClsx: (params: {
    doUseDefaultCss: boolean;
    classes: Partial<Record<ClassKey, string>> | undefined;
}) => {
    kcClsx: (...args: import("../../tools/clsx_withTransform").CxArg<ClassKey>[]) => string;
};
export type KcClsx = ReturnType<typeof getKcClsx>["kcClsx"];
