/// <reference types="react" />
import { PageProps } from "../../login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function LoginOauthGrant(props: PageProps<Extract<KcContext, {
    pageId: "login-oauth-grant.ftl";
}>, I18n>): React.ReactElement<any, any>;
