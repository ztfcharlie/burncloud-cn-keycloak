import { type CxArg } from "../tools/clsx_withTransform";
export declare function createGetKcClsx<ClassKey extends string>(params: {
    defaultClasses: Record<ClassKey, string | undefined>;
}): {
    getKcClsx: (params: {
        doUseDefaultCss: boolean;
        classes: Partial<Record<ClassKey, string>> | undefined;
    }) => {
        kcClsx: (...args: CxArg<ClassKey>[]) => string;
    };
};
