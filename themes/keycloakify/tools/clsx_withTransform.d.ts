export type CxArg<ClassName extends string = string> = undefined | null | ClassName | boolean | Partial<Record<ClassName, boolean | null | undefined>> | readonly CxArg<ClassName>[];
export declare function clsx_withTransform(params: {
    args: CxArg[];
    transform: (arg: string) => string;
}): string;
