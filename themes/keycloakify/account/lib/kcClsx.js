import { createGetKcClsx } from "../../lib/getKcClsx";
export const { getKcClsx } = createGetKcClsx({
    defaultClasses: {
        kcHtmlClass: undefined,
        kcBodyClass: undefined,
        kcButtonClass: "btn",
        kcContentWrapperClass: "row",
        kcButtonPrimaryClass: "btn-primary",
        kcButtonLargeClass: "btn-lg",
        kcButtonDefaultClass: "btn-default",
        kcFormClass: "form-horizontal",
        kcFormGroupClass: "form-group",
        kcInputWrapperClass: "col-xs-12 col-sm-12 col-md-12 col-lg-12",
        kcLabelClass: "control-label",
        kcInputClass: "form-control",
        kcInputErrorMessageClass: "pf-c-form__helper-text pf-m-error required kc-feedback-text"
    }
});
//# sourceMappingURL=kcClsx.js.map