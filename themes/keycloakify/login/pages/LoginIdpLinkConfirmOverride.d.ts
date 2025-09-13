/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function LoginIdpLinkConfirmOverride(props: PageProps<Extract<KcContext, {
    pageId: "login-idp-link-confirm-override.ftl";
}>, I18n>): React.ReactElement<any, any>;
