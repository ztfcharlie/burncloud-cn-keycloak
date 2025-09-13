/// <reference types="react" />
import type { JSX } from "../tools/JSX";
import { type FormAction, type FormFieldError } from "../login/lib/useUserProfileForm";
import type { KcClsx } from "../login/lib/kcClsx";
import type { Attribute } from "../login/KcContext";
export type UserProfileFormFieldsProps<KcContext = any, I18n = any> = {
    kcContext: Extract<KcContext, {
        profile: unknown;
    }>;
    i18n: I18n;
    kcClsx: KcClsx;
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    doMakeUserConfirmPassword: boolean;
    BeforeField?: (props: BeforeAfterFieldProps<I18n>) => React.ReactElement<any, any> | null;
    AfterField?: (props: BeforeAfterFieldProps<I18n>) => React.ReactElement<any, any> | null;
};
type BeforeAfterFieldProps<I18n> = {
    attribute: Attribute;
    dispatchFormAction: React.Dispatch<FormAction>;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
    kcClsx: KcClsx;
    i18n: I18n;
};
export {};
