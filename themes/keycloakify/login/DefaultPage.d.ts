/// <reference types="react" />
import type { JSX } from "../tools/JSX";
import type { LazyOrNot } from "../tools/LazyOrNot";
import type { PageProps } from "../login/pages/PageProps";
import type { I18n } from "../login/i18n";
import type { KcContext } from "../login/KcContext";
import type { UserProfileFormFieldsProps } from "../login/UserProfileFormFieldsProps";
type DefaultPageProps = PageProps<KcContext, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => React.ReactElement<any, any>>;
    doMakeUserConfirmPassword: boolean;
};
export default function DefaultPage(props: DefaultPageProps): React.ReactElement<any, any>;
export {};
