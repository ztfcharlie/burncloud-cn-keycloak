var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
import { assert } from "tsafe/assert";
const Password = lazy(() => import("../account/pages/Password"));
const Account = lazy(() => import("../account/pages/Account"));
const Sessions = lazy(() => import("../account/pages/Sessions"));
const Totp = lazy(() => import("../account/pages/Totp"));
const Applications = lazy(() => import("../account/pages/Applications"));
const Log = lazy(() => import("../account/pages/Log"));
const FederatedIdentity = lazy(() => import("../account/pages/FederatedIdentity"));
export default function DefaultPage(props) {
    const { kcContext } = props, rest = __rest(props, ["kcContext"]);
    return (_jsx(Suspense, { children: (() => {
            switch (kcContext.pageId) {
                case "password.ftl":
                    return _jsx(Password, Object.assign({ kcContext: kcContext }, rest));
                case "sessions.ftl":
                    return _jsx(Sessions, Object.assign({ kcContext: kcContext }, rest));
                case "account.ftl":
                    return _jsx(Account, Object.assign({ kcContext: kcContext }, rest));
                case "totp.ftl":
                    return _jsx(Totp, Object.assign({ kcContext: kcContext }, rest));
                case "applications.ftl":
                    return _jsx(Applications, Object.assign({ kcContext: kcContext }, rest));
                case "log.ftl":
                    return _jsx(Log, Object.assign({ kcContext: kcContext }, rest));
                case "federatedIdentity.ftl":
                    return _jsx(FederatedIdentity, Object.assign({ kcContext: kcContext }, rest));
            }
            assert(false);
        })() }));
}
//# sourceMappingURL=DefaultPage.js.map