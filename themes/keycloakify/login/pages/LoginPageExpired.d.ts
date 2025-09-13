/// <reference types="react" />
import type { PageProps } from "../../login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function LoginPageExpired(props: PageProps<Extract<KcContext, {
    pageId: "login-page-expired.ftl";
}>, I18n>): React.ReactElement<any, any>;
