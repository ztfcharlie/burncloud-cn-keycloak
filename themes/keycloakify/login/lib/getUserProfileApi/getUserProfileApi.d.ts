import "../../../tools/Array.prototype.every";
import type { PasswordPolicies, Attribute, Validators } from "../../../login/KcContext";
import type { KcContext } from "../../KcContext";
import type { KcContextLike as KcContextLike_i18n } from "../../../login/i18n";
export type FormFieldError = {
    advancedMsgArgs: readonly [string, ...string[]];
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
export type KcContextLike = KcContextLike_i18n & KcContextLike_useGetErrors & {
    profile: {
        attributesByName: Record<string, Attribute>;
        html5DataAnnotations?: Record<string, string>;
    };
    passwordRequired?: boolean;
    realm: {
        registrationEmailAsUsername: boolean;
    };
    url: {
        resourcesPath: string;
    };
};
type KcContextLike_useGetErrors = KcContextLike_i18n & {
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    passwordPolicies?: PasswordPolicies;
};
export type UserProfileApi = {
    getFormState: () => FormState;
    subscribeToFormState: (callback: () => void) => {
        unsubscribe: () => void;
    };
    dispatchFormAction: (action: FormAction) => void;
};
export type ParamsOfGetUserProfileApi = {
    kcContext: KcContextLike;
    doMakeUserConfirmPassword: boolean;
};
export declare function getUserProfileApi(params: ParamsOfGetUserProfileApi): UserProfileApi;
export declare function getButtonToDisplayForMultivaluedAttributeField(params: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
}): {
    hasRemove: boolean;
    hasAdd: boolean;
};
export {};
