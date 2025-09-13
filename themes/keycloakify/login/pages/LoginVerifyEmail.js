import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function LoginVerifyEmail(props) {
    var _a;
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;
    return (_jsx(Template, Object.assign({ kcContext: kcContext, i18n: i18n, doUseDefaultCss: doUseDefaultCss, classes: classes, displayInfo: true, headerNode: msg("emailVerifyTitle"), infoNode: _jsxs("p", Object.assign({ className: "instruction" }, { children: [msg("emailVerifyInstruction2"), _jsx("br", {}), _jsx("a", Object.assign({ href: url.loginAction }, { children: msg("doClickHere") })), "\u00A0", msg("emailVerifyInstruction3")] })) }, { children: _jsx("p", Object.assign({ className: "instruction" }, { children: msg("emailVerifyInstruction1", (_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : "") })) })));
}
//# sourceMappingURL=LoginVerifyEmail.js.map