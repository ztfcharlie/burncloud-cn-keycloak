/// <reference types="react" />
import type { PageProps } from "../../account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function FederatedIdentity(props: PageProps<Extract<KcContext, {
    pageId: "federatedIdentity.ftl";
}>, I18n>): React.ReactElement<any, any>;
