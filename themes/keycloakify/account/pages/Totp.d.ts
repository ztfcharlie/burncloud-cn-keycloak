/// <reference types="react" />
import type { PageProps } from "../../account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function Totp(props: PageProps<Extract<KcContext, {
    pageId: "totp.ftl";
}>, I18n>): React.ReactElement<any, any>;
