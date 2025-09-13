import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { clsx } from "../../tools/clsx";
import { getKcClsx } from "../../account/lib/kcClsx";
export default function Password(props) {
    var _a, _b;
    const { kcContext, i18n, doUseDefaultCss, Template } = props;
    const classes = Object.assign(Object.assign({}, props.classes), { kcBodyClass: clsx((_a = props.classes) === null || _a === void 0 ? void 0 : _a.kcBodyClass, "password") });
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, password, account, stateChecker } = kcContext;
    const { msgStr, msg } = i18n;
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
    const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
    const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);
    const checkNewPassword = (newPassword) => {
        if (!password.passwordSet) {
            return;
        }
        if (newPassword === currentPassword) {
            setNewPasswordError(msgStr("newPasswordSameAsOld"));
        }
        else {
            setNewPasswordError("");
        }
    };
    const checkNewPasswordConfirm = (newPasswordConfirm) => {
        if (newPasswordConfirm === "") {
            return;
        }
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(msgStr("passwordConfirmNotMatch"));
        }
        else {
            setNewPasswordConfirmError("");
        }
    };
    return (_jsxs(Template, Object.assign({}, {
        kcContext: Object.assign(Object.assign({}, kcContext), { message: (() => {
                if (newPasswordError !== "") {
                    return {
                        type: "error",
                        summary: newPasswordError
                    };
                }
                if (newPasswordConfirmError !== "") {
                    return {
                        type: "error",
                        summary: newPasswordConfirmError
                    };
                }
                return kcContext.message;
            })() }),
        i18n,
        doUseDefaultCss,
        classes
    }, { active: "password" }, { children: [_jsxs("div", Object.assign({ className: "row" }, { children: [_jsx("div", Object.assign({ className: "col-md-10" }, { children: _jsx("h2", { children: msg("changePasswordHtmlTitle") }) })), _jsx("div", Object.assign({ className: "col-md-2 subtitle" }, { children: _jsx("span", Object.assign({ className: "subtitle" }, { children: msg("allFieldsRequired") })) }))] })), _jsxs("form", Object.assign({ action: url.passwordUrl, className: "form-horizontal", method: "post" }, { children: [_jsx("input", { type: "text", id: "username", name: "username", value: (_b = account.username) !== null && _b !== void 0 ? _b : "", autoComplete: "username", readOnly: true, style: { display: "none" } }), password.passwordSet && (_jsxs("div", Object.assign({ className: "form-group" }, { children: [_jsx("div", Object.assign({ className: "col-sm-2 col-md-2" }, { children: _jsx("label", Object.assign({ htmlFor: "password", className: "control-label" }, { children: msg("password") })) })), _jsx("div", Object.assign({ className: "col-sm-10 col-md-10" }, { children: _jsx("input", { type: "password", className: "form-control", id: "password", name: "password", autoFocus: true, autoComplete: "current-password", value: currentPassword, onChange: event => setCurrentPassword(event.target.value) }) }))] }))), _jsx("input", { type: "hidden", id: "stateChecker", name: "stateChecker", value: stateChecker }), _jsxs("div", Object.assign({ className: "form-group" }, { children: [_jsx("div", Object.assign({ className: "col-sm-2 col-md-2" }, { children: _jsx("label", Object.assign({ htmlFor: "password-new", className: "control-label" }, { children: msg("passwordNew") })) })), _jsx("div", Object.assign({ className: "col-sm-10 col-md-10" }, { children: _jsx("input", { type: "password", className: "form-control", id: "password-new", name: "password-new", autoComplete: "new-password", value: newPassword, onChange: event => {
                                        const newPassword = event.target.value;
                                        setNewPassword(newPassword);
                                        if (hasNewPasswordBlurred) {
                                            checkNewPassword(newPassword);
                                        }
                                    }, onBlur: () => {
                                        setHasNewPasswordBlurred(true);
                                        checkNewPassword(newPassword);
                                    } }) }))] })), _jsxs("div", Object.assign({ className: "form-group" }, { children: [_jsx("div", Object.assign({ className: "col-sm-2 col-md-2" }, { children: _jsx("label", Object.assign({ htmlFor: "password-confirm", className: "control-label two-lines" }, { children: msg("passwordConfirm") })) })), _jsx("div", Object.assign({ className: "col-sm-10 col-md-10" }, { children: _jsx("input", { type: "password", className: "form-control", id: "password-confirm", name: "password-confirm", autoComplete: "new-password", value: newPasswordConfirm, onChange: event => {
                                        const newPasswordConfirm = event.target.value;
                                        setNewPasswordConfirm(newPasswordConfirm);
                                        if (hasNewPasswordConfirmBlurred) {
                                            checkNewPasswordConfirm(newPasswordConfirm);
                                        }
                                    }, onBlur: () => {
                                        setHasNewPasswordConfirmBlurred(true);
                                        checkNewPasswordConfirm(newPasswordConfirm);
                                    } }) }))] })), _jsx("div", Object.assign({ className: "form-group" }, { children: _jsx("div", Object.assign({ id: "kc-form-buttons", className: "col-md-offset-2 col-md-10 submit" }, { children: _jsx("div", { children: _jsx("button", Object.assign({ disabled: newPasswordError !== "" || newPasswordConfirmError !== "", type: "submit", className: kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass"), name: "submitAction", value: "Save" }, { children: msg("doSave") })) }) })) }))] }))] })));
}
//# sourceMappingURL=Password.js.map