import type { JSX } from "../../tools/JSX";
import { type TemplateProps, type ClassKey } from "../../account/TemplateProps";
import type { LazyOrNot } from "../../tools/LazyOrNot";
export type PageProps<NarrowedKcContext, I18n> = {
    Template: LazyOrNot<(props: TemplateProps<any, any>) => React.ReactElement<any, any> | null>;
    kcContext: NarrowedKcContext;
    i18n: I18n;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
};
