import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function SamlPostForm(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msgStr, msg } = i18n;
    const { samlPost } = kcContext;
    const [htmlFormElement, setHtmlFormElement] = useState(null);
    useEffect(() => {
        if (htmlFormElement === null) {
            return;
        }
        // Storybook
        if (samlPost.url === "#") {
            alert("In a real Keycloak the user would be redirected immediately");
            return;
        }
        htmlFormElement.requestSubmit();
    }, [htmlFormElement]);
    return (_jsxs(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: msg("saml.post-form.title") }, { children: [_jsx("p", { children: msg("saml.post-form.message") }), _jsxs("form", Object.assign({ name: "saml-post-binding", method: "post", action: samlPost.url, ref: setHtmlFormElement }, { children: [samlPost.SAMLRequest && _jsx("input", { type: "hidden", name: "SAMLRequest", value: samlPost.SAMLRequest }), samlPost.SAMLResponse && _jsx("input", { type: "hidden", name: "SAMLResponse", value: samlPost.SAMLResponse }), samlPost.relayState && _jsx("input", { type: "hidden", name: "RelayState", value: samlPost.relayState }), _jsxs("noscript", { children: [_jsx("p", { children: msg("saml.post-form.js-disabled") }), _jsx("input", { type: "submit", value: msgStr("doContinue") })] })] }))] })));
}
//# sourceMappingURL=SamlPostForm.js.map