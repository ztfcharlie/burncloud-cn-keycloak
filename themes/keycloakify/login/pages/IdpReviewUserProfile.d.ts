/// <reference types="react" />
import type { JSX } from "../../tools/JSX";
import type { LazyOrNot } from "../../tools/LazyOrNot";
import type { PageProps } from "../../login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "../../login/UserProfileFormFieldsProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
type IdpReviewUserProfileProps = PageProps<Extract<KcContext, {
    pageId: "idp-review-user-profile.ftl";
}>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => React.ReactElement<any, any>>;
    doMakeUserConfirmPassword: boolean;
};
export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps): React.ReactElement<any, any>;
export {};
