import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../login/lib/kcClsx";
import { kcSanitize } from "../../lib/kcSanitize";
export default function Code(props) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { code } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, headerNode: code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error) }, { children: _jsx("div", Object.assign({ id: "kc-code" }, { children: code.success ? (_jsxs(_Fragment, { children: [_jsx("p", { children: msg("copyCodeInstruction") }), _jsx("input", { id: "code", className: kcClsx("kcTextareaClass"), defaultValue: code.code })] })) : (code.error && (_jsx("p", { id: "error", dangerouslySetInnerHTML: {
                    __html: kcSanitize(code.error)
                } }))) })) })));
}
//# sourceMappingURL=Code.js.map