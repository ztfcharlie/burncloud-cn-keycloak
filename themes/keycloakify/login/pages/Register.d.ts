/// <reference types="react" />
import type { JSX } from "../../tools/JSX";
import type { LazyOrNot } from "../../tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "../../login/UserProfileFormFieldsProps";
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
type RegisterProps = PageProps<Extract<KcContext, {
    pageId: "register.ftl";
}>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => React.ReactElement<any, any>>;
    doMakeUserConfirmPassword: boolean;
};
export default function Register(props: RegisterProps): React.ReactElement<any, any>;
export {};
