/// <reference types="react" />
import { PageProps } from "../../login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function LoginOauth2DeviceVerifyUserCode(props: PageProps<Extract<KcContext, {
    pageId: "login-oauth2-device-verify-user-code.ftl";
}>, I18n>): React.ReactElement<any, any>;
