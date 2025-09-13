import type { JSX } from "../../tools/JSX";
import * as reactlessApi from "./getUserProfileApi/index";
import type { PasswordPolicies, Attribute, Validators } from "../../login/KcContext";
import type { I18n } from "../i18n";
export { getButtonToDisplayForMultivaluedAttributeField } from "./getUserProfileApi/index";
export type FormFieldError = {
    errorMessage: React.ReactElement<any, any>;
    errorMessageStr: string;
    source: FormFieldError.Source;
    fieldIndex: number | undefined;
};
export declare namespace FormFieldError {
    type Source = Source.Validator | Source.PasswordPolicy | Source.Server | Source.Other;
    namespace Source {
        type Validator = {
            type: "validator";
            name: keyof Validators;
        };
        type PasswordPolicy = {
            type: "passwordPolicy";
            name: keyof PasswordPolicies;
        };
        type Server = {
            type: "server";
        };
        type Other = {
            type: "other";
            rule: "passwordConfirmMatchesPassword" | "requiredField";
        };
    }
}
export type FormFieldState = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
};
export type FormState = {
    isFormSubmittable: boolean;
    formFieldStates: FormFieldState[];
};
export type FormAction = {
    action: "update";
    name: string;
    valueOrValues: string | string[];
    /** Default false */
    displayErrorsImmediately?: boolean;
} | {
    action: "focus lost";
    name: string;
    fieldIndex: number | undefined;
};
export type KcContextLike = reactlessApi.KcContextLike;
export type I18nLike = Pick<I18n, "advancedMsg" | "advancedMsgStr">;
export type ParamsOfUseUserProfileForm = {
    kcContext: KcContextLike;
    doMakeUserConfirmPassword: boolean;
    i18n: I18nLike;
};
export type ReturnTypeOfUseUserProfileForm = {
    formState: FormState;
    dispatchFormAction: (action: FormAction) => void;
};
export declare function useUserProfileForm(params: ParamsOfUseUserProfileForm): ReturnTypeOfUseUserProfileForm;
