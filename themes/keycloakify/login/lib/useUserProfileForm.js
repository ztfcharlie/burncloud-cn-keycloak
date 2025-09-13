import { jsx as _jsx } from "react/jsx-runtime";
import * as reactlessApi from "./getUserProfileApi/index";
import { useEffect, useState, useMemo, Fragment } from "react";
import { assert } from "tsafe/assert";
export { getButtonToDisplayForMultivaluedAttributeField } from "./getUserProfileApi/index";
{
    assert();
}
{
    assert();
}
{
    assert();
}
{
    assert();
}
{
    assert();
}
{
    assert();
}
export function useUserProfileForm(params) {
    const { doMakeUserConfirmPassword, i18n, kcContext } = params;
    const api = reactlessApi.getUserProfileApi({
        kcContext,
        doMakeUserConfirmPassword
    });
    const [formState_reactless, setFormState_reactless] = useState(() => api.getFormState());
    useEffect(() => {
        const { unsubscribe } = api.subscribeToFormState(() => {
            setFormState_reactless(api.getFormState());
        });
        return () => unsubscribe();
    }, [api]);
    const { advancedMsg, advancedMsgStr } = i18n;
    const formState = useMemo(() => ({
        isFormSubmittable: formState_reactless.isFormSubmittable,
        formFieldStates: formState_reactless.formFieldStates.map(formFieldState_reactless => ({
            attribute: formFieldState_reactless.attribute,
            valueOrValues: formFieldState_reactless.valueOrValues,
            displayableErrors: formFieldState_reactless.displayableErrors.map((formFieldError_reactless, i) => ({
                errorMessage: (_jsx(Fragment, { children: advancedMsg(...formFieldError_reactless.advancedMsgArgs) }, `${formFieldState_reactless.attribute.name}-${i}`)),
                errorMessageStr: advancedMsgStr(...formFieldError_reactless.advancedMsgArgs),
                source: formFieldError_reactless.source,
                fieldIndex: formFieldError_reactless.fieldIndex
            }))
        }))
    }), [formState_reactless]);
    return {
        formState,
        dispatchFormAction: api.dispatchFormAction
    };
}
//# sourceMappingURL=useUserProfileForm.js.map