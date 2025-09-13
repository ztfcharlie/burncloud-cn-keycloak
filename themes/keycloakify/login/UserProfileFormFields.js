import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, Fragment } from "react";
import { assert } from "../tools/assert";
import { useIsPasswordRevealed } from "../tools/useIsPasswordRevealed";
import { useUserProfileForm, getButtonToDisplayForMultivaluedAttributeField } from "../login/lib/useUserProfileForm";
export default function UserProfileFormFields(props) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;
    const { advancedMsg } = i18n;
    const { formState: { formFieldStates, isFormSubmittable }, dispatchFormAction } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });
    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);
    const groupNameRef = { current: "" };
    return (_jsx(_Fragment, { children: formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
            var _a;
            return (_jsxs(Fragment, { children: [_jsx(GroupLabel, { attribute: attribute, groupNameRef: groupNameRef, i18n: i18n, kcClsx: kcClsx }), BeforeField !== undefined && (_jsx(BeforeField, { attribute: attribute, dispatchFormAction: dispatchFormAction, displayableErrors: displayableErrors, valueOrValues: valueOrValues, kcClsx: kcClsx, i18n: i18n })), _jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass"), style: {
                            display: attribute.annotations.inputType === "hidden" ||
                                (attribute.name === "password-confirm" && !doMakeUserConfirmPassword)
                                ? "none"
                                : undefined
                        } }, { children: [_jsxs("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: [_jsx("label", Object.assign({ htmlFor: attribute.name, className: kcClsx("kcLabelClass") }, { children: advancedMsg((_a = attribute.displayName) !== null && _a !== void 0 ? _a : "") })), attribute.required && _jsx(_Fragment, { children: " *" })] })), _jsxs("div", Object.assign({ className: kcClsx("kcInputWrapperClass") }, { children: [attribute.annotations.inputHelperTextBefore !== undefined && (_jsx("div", Object.assign({ className: kcClsx("kcInputHelperTextBeforeClass"), id: `form-help-text-before-${attribute.name}`, "aria-live": "polite" }, { children: advancedMsg(attribute.annotations.inputHelperTextBefore) }))), _jsx(InputFieldByType, { attribute: attribute, valueOrValues: valueOrValues, displayableErrors: displayableErrors, dispatchFormAction: dispatchFormAction, kcClsx: kcClsx, i18n: i18n }), _jsx(FieldErrors, { attribute: attribute, displayableErrors: displayableErrors, kcClsx: kcClsx, fieldIndex: undefined }), attribute.annotations.inputHelperTextAfter !== undefined && (_jsx("div", Object.assign({ className: kcClsx("kcInputHelperTextAfterClass"), id: `form-help-text-after-${attribute.name}`, "aria-live": "polite" }, { children: advancedMsg(attribute.annotations.inputHelperTextAfter) }))), AfterField !== undefined && (_jsx(AfterField, { attribute: attribute, dispatchFormAction: dispatchFormAction, displayableErrors: displayableErrors, valueOrValues: valueOrValues, kcClsx: kcClsx, i18n: i18n }))] }))] }))] }, attribute.name));
        }) }));
}
function GroupLabel(props) {
    var _a, _b, _c;
    const { attribute, groupNameRef, i18n, kcClsx } = props;
    const { advancedMsg } = i18n;
    if (((_a = attribute.group) === null || _a === void 0 ? void 0 : _a.name) !== groupNameRef.current) {
        groupNameRef.current = (_c = (_b = attribute.group) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "";
        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);
            return (_jsxs("div", Object.assign({ className: kcClsx("kcFormGroupClass") }, Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value])), { children: [(() => {
                        var _a;
                        const groupDisplayHeader = (_a = attribute.group.displayHeader) !== null && _a !== void 0 ? _a : "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;
                        return (_jsx("div", Object.assign({ className: kcClsx("kcContentWrapperClass") }, { children: _jsx("label", Object.assign({ id: `header-${attribute.group.name}`, className: kcClsx("kcFormGroupHeader") }, { children: groupHeaderText })) })));
                    })(), (() => {
                        var _a;
                        const groupDisplayDescription = (_a = attribute.group.displayDescription) !== null && _a !== void 0 ? _a : "";
                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);
                            return (_jsx("div", Object.assign({ className: kcClsx("kcLabelWrapperClass") }, { children: _jsx("label", Object.assign({ id: `description-${attribute.group.name}`, className: kcClsx("kcLabelClass") }, { children: groupDescriptionText })) })));
                        }
                        return null;
                    })()] })));
        }
    }
    return null;
}
function FieldErrors(props) {
    const { attribute, fieldIndex, kcClsx } = props;
    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);
    if (displayableErrors.length === 0) {
        return null;
    }
    return (_jsx("span", Object.assign({ id: `input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`, className: kcClsx("kcInputErrorMessageClass"), "aria-live": "polite" }, { children: displayableErrors
            .filter(error => error.fieldIndex === fieldIndex)
            .map(({ errorMessage }, i, arr) => (_jsxs(Fragment, { children: [errorMessage, arr.length - 1 !== i && _jsx("br", {})] }, i))) })));
}
function InputFieldByType(props) {
    const { attribute, valueOrValues } = props;
    switch (attribute.annotations.inputType) {
        // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
        // sometimes in the future it might.
        case "hidden":
            return _jsx("input", { type: "hidden", name: attribute.name, value: valueOrValues });
        case "textarea":
            return _jsx(TextareaTag, Object.assign({}, props));
        case "select":
        case "multiselect":
            return _jsx(SelectTag, Object.assign({}, props));
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return _jsx(InputTagSelects, Object.assign({}, props));
        default: {
            if (valueOrValues instanceof Array) {
                return (_jsx(_Fragment, { children: valueOrValues.map((...[, i]) => (_jsx(InputTag, Object.assign({}, props, { fieldIndex: i }), i))) }));
            }
            const inputNode = _jsx(InputTag, Object.assign({}, props, { fieldIndex: undefined }));
            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (_jsx(PasswordWrapper, Object.assign({ kcClsx: props.kcClsx, i18n: props.i18n, passwordInputId: attribute.name }, { children: inputNode })));
            }
            return inputNode;
        }
    }
}
function PasswordWrapper(props) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });
    return (_jsxs("div", Object.assign({ className: kcClsx("kcInputGroup") }, { children: [children, _jsx("button", Object.assign({ type: "button", className: kcClsx("kcFormPasswordVisibilityButtonClass"), "aria-label": msgStr(isPasswordRevealed ? "hidePassword" : "showPassword"), "aria-controls": passwordInputId, onClick: toggleIsPasswordRevealed }, { children: _jsx("i", { className: kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow"), "aria-hidden": true }) }))] })));
}
function InputTag(props) {
    var _a;
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;
    const { advancedMsgStr } = i18n;
    return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ type: (() => {
                    const { inputType } = attribute.annotations;
                    if (inputType === null || inputType === void 0 ? void 0 : inputType.startsWith("html5-")) {
                        return inputType.slice(6);
                    }
                    return inputType !== null && inputType !== void 0 ? inputType : "text";
                })(), id: attribute.name, name: attribute.name, value: (() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }
                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })(), className: kcClsx("kcInputClass"), "aria-invalid": displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined, disabled: attribute.readOnly, autoComplete: attribute.autocomplete, placeholder: attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder), pattern: attribute.annotations.inputTypePattern, size: attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`), maxLength: attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`), minLength: attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`), max: attribute.annotations.inputTypeMax, min: attribute.annotations.inputTypeMin, step: attribute.annotations.inputTypeStep }, Object.fromEntries(Object.entries((_a = attribute.html5DataAnnotations) !== null && _a !== void 0 ? _a : {}).map(([key, value]) => [`data-${key}`, value])), { onChange: event => dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (fieldIndex !== undefined) {
                            assert(valueOrValues instanceof Array);
                            return valueOrValues.map((value, i) => {
                                if (i === fieldIndex) {
                                    return event.target.value;
                                }
                                return value;
                            });
                        }
                        return event.target.value;
                    })()
                }), onBlur: () => dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: fieldIndex
                }) })), (() => {
                if (fieldIndex === undefined) {
                    return null;
                }
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                return (_jsxs(_Fragment, { children: [_jsx(FieldErrors, { attribute: attribute, kcClsx: kcClsx, displayableErrors: displayableErrors, fieldIndex: fieldIndex }), _jsx(AddRemoveButtonsMultiValuedAttribute, { attribute: attribute, values: values, fieldIndex: fieldIndex, dispatchFormAction: dispatchFormAction, i18n: i18n })] }));
            })()] }));
}
function AddRemoveButtonsMultiValuedAttribute(props) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;
    const { msg } = i18n;
    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });
    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;
    return (_jsxs(_Fragment, { children: [hasRemove && (_jsxs(_Fragment, { children: [_jsx("button", Object.assign({ id: `kc-remove${idPostfix}`, type: "button", className: "pf-c-button pf-m-inline pf-m-link", onClick: () => dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex)
                        }) }, { children: msg("remove") })), hasAdd ? _jsx(_Fragment, { children: "\u00A0|\u00A0" }) : null] })), hasAdd && (_jsx("button", Object.assign({ id: `kc-add${idPostfix}`, type: "button", className: "pf-c-button pf-m-inline pf-m-link", onClick: () => dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: [...values, ""]
                }) }, { children: msg("addValue") })))] }));
}
function InputTagSelects(props) {
    const { attribute, dispatchFormAction, kcClsx, i18n, valueOrValues } = props;
    const { classDiv, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;
        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");
        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classDiv: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classDiv: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();
    const options = (() => {
        var _a, _b;
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;
            if (inputOptionsFromValidation === undefined) {
                break walk;
            }
            const validator = attribute.validators[inputOptionsFromValidation];
            if (validator === undefined) {
                break walk;
            }
            if (validator.options === undefined) {
                break walk;
            }
            return validator.options;
        }
        return (_b = (_a = attribute.validators.options) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : [];
    })();
    return (_jsx(_Fragment, { children: options.map(option => (_jsxs("div", Object.assign({ className: classDiv }, { children: [_jsx("input", { type: inputType, id: `${attribute.name}-${option}`, name: attribute.name, value: option, className: classInput, "aria-invalid": props.displayableErrors.length !== 0, disabled: attribute.readOnly, checked: valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option, onChange: event => dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            const isChecked = event.target.checked;
                            if (valueOrValues instanceof Array) {
                                const newValues = [...valueOrValues];
                                if (isChecked) {
                                    newValues.push(option);
                                }
                                else {
                                    newValues.splice(newValues.indexOf(option), 1);
                                }
                                return newValues;
                            }
                            return event.target.checked ? option : "";
                        })()
                    }), onBlur: () => dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined
                    }) }), _jsx("label", Object.assign({ htmlFor: `${attribute.name}-${option}`, className: `${classLabel}${attribute.readOnly ? ` ${kcClsx("kcInputClassRadioCheckboxLabelDisabled")}` : ""}` }, { children: inputLabel(i18n, attribute, option) }))] }), option))) }));
}
function TextareaTag(props) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;
    assert(typeof valueOrValues === "string");
    const value = valueOrValues;
    return (_jsx("textarea", { id: attribute.name, name: attribute.name, className: kcClsx("kcInputClass"), "aria-invalid": displayableErrors.length !== 0, disabled: attribute.readOnly, cols: attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`), rows: attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`), maxLength: attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`), value: value, onChange: event => dispatchFormAction({
            action: "update",
            name: attribute.name,
            valueOrValues: event.target.value
        }), onBlur: () => dispatchFormAction({
            action: "focus lost",
            name: attribute.name,
            fieldIndex: undefined
        }) }));
}
function SelectTag(props) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, i18n, valueOrValues } = props;
    const isMultiple = attribute.annotations.inputType === "multiselect";
    return (_jsxs("select", Object.assign({ id: attribute.name, name: attribute.name, className: kcClsx("kcInputClass"), "aria-invalid": displayableErrors.length !== 0, disabled: attribute.readOnly, multiple: isMultiple, size: attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`), value: valueOrValues, onChange: event => dispatchFormAction({
            action: "update",
            name: attribute.name,
            valueOrValues: (() => {
                if (isMultiple) {
                    return Array.from(event.target.selectedOptions).map(option => option.value);
                }
                return event.target.value;
            })()
        }), onBlur: () => dispatchFormAction({
            action: "focus lost",
            name: attribute.name,
            fieldIndex: undefined
        }) }, { children: [!isMultiple && _jsx("option", { value: "" }), (() => {
                const options = (() => {
                    var _a, _b;
                    walk: {
                        const { inputOptionsFromValidation } = attribute.annotations;
                        if (inputOptionsFromValidation === undefined) {
                            break walk;
                        }
                        assert(typeof inputOptionsFromValidation === "string");
                        const validator = attribute.validators[inputOptionsFromValidation];
                        if (validator === undefined) {
                            break walk;
                        }
                        if (validator.options === undefined) {
                            break walk;
                        }
                        return validator.options;
                    }
                    return (_b = (_a = attribute.validators.options) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : [];
                })();
                return options.map(option => (_jsx("option", Object.assign({ value: option }, { children: inputLabel(i18n, attribute, option) }), option)));
            })()] })));
}
function inputLabel(i18n, attribute, option) {
    var _a;
    const { advancedMsg } = i18n;
    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;
        return advancedMsg((_a = inputOptionLabels[option]) !== null && _a !== void 0 ? _a : option);
    }
    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }
    return option;
}
//# sourceMappingURL=UserProfileFormFields.js.map