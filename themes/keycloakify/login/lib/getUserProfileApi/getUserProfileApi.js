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
import "../../../tools/Array.prototype.every";
import { assert } from "tsafe/assert";
import { formatNumber } from "../../../tools/formatNumber";
import { emailRegexp } from "../../../tools/emailRegExp";
import { unFormatNumberOnSubmit } from "./kcNumberUnFormat";
import { structuredCloneButFunctions } from "../../../tools/structuredCloneButFunctions";
import { id } from "tsafe/id";
assert();
const cachedUserProfileApiByKcContext = new WeakMap();
export function getUserProfileApi(params) {
    const { kcContext } = params;
    use_cache: {
        const userProfileApi_cache = cachedUserProfileApiByKcContext.get(kcContext);
        if (userProfileApi_cache === undefined) {
            break use_cache;
        }
        return userProfileApi_cache;
    }
    const userProfileApi = getUserProfileApi_noCache(params);
    cachedUserProfileApiByKcContext.set(kcContext, userProfileApi);
    return userProfileApi;
}
function getUserProfileApi_noCache(params) {
    const { kcContext, doMakeUserConfirmPassword } = params;
    unFormatNumberOnSubmit();
    let state = getInitialState({ kcContext });
    const callbacks = new Set();
    return {
        dispatchFormAction: action => {
            state = reducer({ action, kcContext, doMakeUserConfirmPassword, state });
            callbacks.forEach(callback => callback());
        },
        getFormState: () => formStateSelector({ state }),
        subscribeToFormState: callback => {
            callbacks.add(callback);
            return {
                unsubscribe: () => {
                    callbacks.delete(callback);
                }
            };
        }
    };
}
function getInitialState(params) {
    var _a, _b;
    const { kcContext } = params;
    const { getErrors } = createGetErrors({ kcContext });
    // NOTE: We don't use te kcContext.profile.attributes directly because
    // they don't includes the password and password confirm fields and we want to add them.
    // We also want to apply some retro-compatibility and consistency patches.
    const attributes = (() => {
        var _a;
        mock_user_profile_attributes_for_older_keycloak_versions: {
            if ("profile" in kcContext &&
                "attributesByName" in kcContext.profile &&
                Object.keys(kcContext.profile.attributesByName).length !== 0) {
                break mock_user_profile_attributes_for_older_keycloak_versions;
            }
            if ("register" in kcContext &&
                kcContext.register instanceof Object &&
                "formData" in kcContext.register) {
                //NOTE: Handle legacy register.ftl page
                return ["firstName", "lastName", "email", "username"]
                    .filter(name => name !== "username"
                    ? true
                    : !kcContext.realm.registrationEmailAsUsername)
                    .map(name => {
                    var _a;
                    return id({
                        name: name,
                        displayName: id(`\${${name}}`),
                        required: true,
                        value: (_a = kcContext.register.formData[name]) !== null && _a !== void 0 ? _a : "",
                        html5DataAnnotations: {},
                        readOnly: false,
                        validators: {},
                        annotations: {},
                        autocomplete: (() => {
                            switch (name) {
                                case "email":
                                    return "email";
                                case "username":
                                    return "username";
                                default:
                                    return undefined;
                            }
                        })()
                    });
                });
            }
            if ("user" in kcContext && kcContext.user instanceof Object) {
                //NOTE: Handle legacy login-update-profile.ftl
                return ["username", "email", "firstName", "lastName"]
                    .filter(name => name !== "username"
                    ? true
                    : kcContext.user.editUsernameAllowed)
                    .map(name => {
                    var _a;
                    return id({
                        name: name,
                        displayName: id(`\${${name}}`),
                        required: true,
                        value: (_a = kcContext.user[name]) !== null && _a !== void 0 ? _a : "",
                        html5DataAnnotations: {},
                        readOnly: false,
                        validators: {},
                        annotations: {},
                        autocomplete: (() => {
                            switch (name) {
                                case "email":
                                    return "email";
                                case "username":
                                    return "username";
                                default:
                                    return undefined;
                            }
                        })()
                    });
                });
            }
            if ("email" in kcContext && kcContext.email instanceof Object) {
                //NOTE: Handle legacy update-email.ftl
                return [
                    id({
                        name: "email",
                        displayName: id(`\${email}`),
                        required: true,
                        value: (_a = kcContext.email.value) !== null && _a !== void 0 ? _a : "",
                        html5DataAnnotations: {},
                        readOnly: false,
                        validators: {},
                        annotations: {},
                        autocomplete: "email"
                    })
                ];
            }
            assert(false, "Unable to mock user profile from the current kcContext");
        }
        return Object.values(kcContext.profile.attributesByName).map(structuredCloneButFunctions);
    })();
    /* See: https://github.com/keycloak/keycloak/issues/38029 and https://github.com/keycloakify/keycloakify/issues/837 */
    add_locale_attribute_for_keycloak_prior_to_26_2_0: {
        if (kcContext.locale === undefined) {
            break add_locale_attribute_for_keycloak_prior_to_26_2_0;
        }
        if (attributes.find(attribute => attribute.name === "locale") !== undefined) {
            break add_locale_attribute_for_keycloak_prior_to_26_2_0;
        }
        attributes.push(id({
            validators: {},
            displayName: "locale",
            values: [],
            annotations: {},
            required: false,
            html5DataAnnotations: {},
            multivalued: false,
            readOnly: false,
            name: "locale"
        }));
    }
    // Retro-compatibility and consistency patches
    attributes.forEach(attribute => {
        var _a, _b, _c;
        if (attribute.name === "locale") {
            assert(kcContext.locale !== undefined);
            attribute.annotations.inputType = "hidden";
            attribute.value = kcContext.locale.currentLanguageTag;
            delete attribute.values;
        }
        patch_legacy_group: {
            if (typeof attribute.group !== "string") {
                break patch_legacy_group;
            }
            const { group, groupDisplayHeader, groupDisplayDescription, groupAnnotations } = attribute;
            delete attribute.group;
            // @ts-expect-error
            delete attribute.groupDisplayHeader;
            // @ts-expect-error
            delete attribute.groupDisplayDescription;
            // @ts-expect-error
            delete attribute.groupAnnotations;
            if (group === "") {
                break patch_legacy_group;
            }
            attribute.group = {
                name: group,
                displayHeader: groupDisplayHeader,
                displayDescription: groupDisplayDescription,
                annotations: groupAnnotations,
                html5DataAnnotations: {}
            };
        }
        // Attributes with options rendered by default as select inputs
        if (attribute.validators.options !== undefined &&
            attribute.annotations.inputType === undefined) {
            attribute.annotations.inputType = "select";
        }
        // Consistency patch on values/value property
        {
            if (getIsMultivaluedSingleField({ attribute })) {
                attribute.multivalued = true;
            }
            if (attribute.multivalued) {
                (_a = attribute.values) !== null && _a !== void 0 ? _a : (attribute.values = attribute.value !== undefined ? [attribute.value] : []);
                delete attribute.value;
            }
            else {
                (_b = attribute.value) !== null && _b !== void 0 ? _b : (attribute.value = (_c = attribute.values) === null || _c === void 0 ? void 0 : _c[0]);
                delete attribute.values;
            }
        }
    });
    add_password_and_password_confirm: {
        if (!kcContext.passwordRequired) {
            break add_password_and_password_confirm;
        }
        attributes.forEach((attribute, i) => {
            if (attribute.name !==
                (kcContext.realm.registrationEmailAsUsername ? "email" : "username")) {
                // NOTE: We want to add password and password-confirm after the field that identifies the user.
                // It's either email or username.
                return;
            }
            attributes.splice(i + 1, 0, {
                name: "password",
                displayName: id("${password}"),
                required: true,
                readOnly: false,
                validators: {},
                annotations: {},
                autocomplete: "new-password",
                html5DataAnnotations: {}
            }, {
                name: "password-confirm",
                displayName: id("${passwordConfirm}"),
                required: true,
                readOnly: false,
                validators: {},
                annotations: {},
                html5DataAnnotations: {},
                autocomplete: "new-password"
            });
        });
    }
    const initialFormFieldState = [];
    for (const attribute of attributes) {
        handle_multi_valued_attribute: {
            if (!attribute.multivalued) {
                break handle_multi_valued_attribute;
            }
            const values = ((_a = attribute.values) === null || _a === void 0 ? void 0 : _a.length) ? attribute.values : [""];
            apply_validator_min_range: {
                if (getIsMultivaluedSingleField({ attribute })) {
                    break apply_validator_min_range;
                }
                const validator = attribute.validators.multivalued;
                if (validator === undefined) {
                    break apply_validator_min_range;
                }
                const { min: minStr } = validator;
                if (!minStr) {
                    break apply_validator_min_range;
                }
                const min = parseInt(`${minStr}`);
                for (let index = values.length; index < min; index++) {
                    values.push("");
                }
            }
            initialFormFieldState.push({
                attribute,
                valueOrValues: values
            });
            continue;
        }
        initialFormFieldState.push({
            attribute,
            valueOrValues: (_b = attribute.value) !== null && _b !== void 0 ? _b : ""
        });
    }
    const initialState = {
        formFieldStates: initialFormFieldState.map(({ attribute, valueOrValues }) => ({
            attribute,
            errors: getErrors({
                attributeName: attribute.name,
                formFieldStates: initialFormFieldState
            }),
            hasLostFocusAtLeastOnce: valueOrValues instanceof Array &&
                !getIsMultivaluedSingleField({ attribute })
                ? valueOrValues.map(() => false)
                : false,
            valueOrValues: valueOrValues
        }))
    };
    return initialState;
}
const formStateByState = new WeakMap();
function formStateSelector(params) {
    const { state } = params;
    use_memoized_value: {
        const formState = formStateByState.get(state);
        if (formState === undefined) {
            break use_memoized_value;
        }
        return formState;
    }
    return {
        formFieldStates: state.formFieldStates.map((_a) => {
            var { errors, hasLostFocusAtLeastOnce: hasLostFocusAtLeastOnceOrArr, attribute } = _a, valueOrValuesWrap = __rest(_a, ["errors", "hasLostFocusAtLeastOnce", "attribute"]);
            return (Object.assign({ displayableErrors: errors.filter(error => {
                    const hasLostFocusAtLeastOnce = typeof hasLostFocusAtLeastOnceOrArr === "boolean"
                        ? hasLostFocusAtLeastOnceOrArr
                        : error.fieldIndex !== undefined
                            ? hasLostFocusAtLeastOnceOrArr[error.fieldIndex]
                            : hasLostFocusAtLeastOnceOrArr[hasLostFocusAtLeastOnceOrArr.length - 1];
                    switch (error.source.type) {
                        case "server":
                            return true;
                        case "other":
                            switch (error.source.rule) {
                                case "requiredField":
                                    return hasLostFocusAtLeastOnce;
                                case "passwordConfirmMatchesPassword":
                                    return hasLostFocusAtLeastOnce;
                            }
                            assert(false);
                        case "passwordPolicy":
                            switch (error.source.name) {
                                case "length":
                                    return hasLostFocusAtLeastOnce;
                                case "maxLength":
                                    return hasLostFocusAtLeastOnce;
                                case "digits":
                                    return hasLostFocusAtLeastOnce;
                                case "lowerCase":
                                    return hasLostFocusAtLeastOnce;
                                case "upperCase":
                                    return hasLostFocusAtLeastOnce;
                                case "specialChars":
                                    return hasLostFocusAtLeastOnce;
                                case "notUsername":
                                    return true;
                                case "notEmail":
                                    return true;
                            }
                            assert(false);
                        case "validator":
                            switch (error.source.name) {
                                case "length":
                                    return hasLostFocusAtLeastOnce;
                                case "pattern":
                                    return hasLostFocusAtLeastOnce;
                                case "email":
                                    return hasLostFocusAtLeastOnce;
                                case "integer":
                                    return hasLostFocusAtLeastOnce;
                                case "multivalued":
                                    return hasLostFocusAtLeastOnce;
                                case "options":
                                    return hasLostFocusAtLeastOnce;
                            }
                            assert(false);
                    }
                }), attribute }, valueOrValuesWrap));
        }),
        isFormSubmittable: state.formFieldStates.every(({ errors }) => errors.length === 0)
    };
}
function reducer(params) {
    const { kcContext, doMakeUserConfirmPassword, action } = params;
    let { state } = params;
    const { getErrors } = createGetErrors({ kcContext });
    const formFieldState = state.formFieldStates.find(({ attribute }) => attribute.name === action.name);
    assert(formFieldState !== undefined);
    (() => {
        var _a;
        switch (action.action) {
            case "update":
                formFieldState.valueOrValues = action.valueOrValues;
                apply_formatters: {
                    const { attribute } = formFieldState;
                    const { kcNumberFormat } = (_a = attribute.html5DataAnnotations) !== null && _a !== void 0 ? _a : {};
                    if (!kcNumberFormat) {
                        break apply_formatters;
                    }
                    if (formFieldState.valueOrValues instanceof Array) {
                        formFieldState.valueOrValues = formFieldState.valueOrValues.map(value => formatNumber(value, kcNumberFormat));
                    }
                    else {
                        formFieldState.valueOrValues = formatNumber(formFieldState.valueOrValues, kcNumberFormat);
                    }
                }
                formFieldState.errors = getErrors({
                    attributeName: action.name,
                    formFieldStates: state.formFieldStates
                });
                simulate_focus_lost: {
                    const { displayErrorsImmediately = false } = action;
                    if (!displayErrorsImmediately) {
                        break simulate_focus_lost;
                    }
                    for (const fieldIndex of action.valueOrValues instanceof Array
                        ? action.valueOrValues.map((...[, index]) => index)
                        : [undefined]) {
                        state = reducer({
                            state,
                            kcContext,
                            doMakeUserConfirmPassword,
                            action: {
                                action: "focus lost",
                                name: action.name,
                                fieldIndex
                            }
                        });
                    }
                }
                update_password_confirm: {
                    if (doMakeUserConfirmPassword) {
                        break update_password_confirm;
                    }
                    if (action.name !== "password") {
                        break update_password_confirm;
                    }
                    state = reducer({
                        state,
                        kcContext,
                        doMakeUserConfirmPassword,
                        action: {
                            action: "update",
                            name: "password-confirm",
                            valueOrValues: action.valueOrValues,
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }
                trigger_password_confirm_validation_on_password_change: {
                    if (!doMakeUserConfirmPassword) {
                        break trigger_password_confirm_validation_on_password_change;
                    }
                    if (action.name !== "password") {
                        break trigger_password_confirm_validation_on_password_change;
                    }
                    state = reducer({
                        state,
                        kcContext,
                        doMakeUserConfirmPassword,
                        action: {
                            action: "update",
                            name: "password-confirm",
                            valueOrValues: (() => {
                                const formFieldState = state.formFieldStates.find(({ attribute }) => attribute.name === "password-confirm");
                                assert(formFieldState !== undefined);
                                return formFieldState.valueOrValues;
                            })(),
                            displayErrorsImmediately: action.displayErrorsImmediately
                        }
                    });
                }
                return;
            case "focus lost":
                if (formFieldState.hasLostFocusAtLeastOnce instanceof Array) {
                    const { fieldIndex } = action;
                    assert(fieldIndex !== undefined);
                    formFieldState.hasLostFocusAtLeastOnce[fieldIndex] = true;
                    return;
                }
                formFieldState.hasLostFocusAtLeastOnce = true;
                return;
        }
        assert(false);
    })();
    return Object.assign({}, state);
}
function createGetErrors(params) {
    const { kcContext } = params;
    const { messagesPerField, passwordPolicies } = kcContext;
    function getErrors(params) {
        var _a, _b;
        const { attributeName, formFieldStates } = params;
        const formFieldState = formFieldStates.find(({ attribute }) => attribute.name === attributeName);
        assert(formFieldState !== undefined);
        const { attribute } = formFieldState;
        const valueOrValues = (() => {
            var _a;
            let { valueOrValues } = formFieldState;
            unFormat_number: {
                const { kcNumberUnFormat } = (_a = attribute.html5DataAnnotations) !== null && _a !== void 0 ? _a : {};
                if (!kcNumberUnFormat) {
                    break unFormat_number;
                }
                if (valueOrValues instanceof Array) {
                    valueOrValues = valueOrValues.map(value => formatNumber(value, kcNumberUnFormat));
                }
                else {
                    valueOrValues = formatNumber(valueOrValues, kcNumberUnFormat);
                }
            }
            return valueOrValues;
        })();
        assert(attribute !== undefined);
        server_side_error: {
            if (attribute.multivalued) {
                const defaultValues = ((_a = attribute.values) === null || _a === void 0 ? void 0 : _a.length) ? attribute.values : [""];
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                if (JSON.stringify(defaultValues) !==
                    JSON.stringify(values.slice(0, defaultValues.length))) {
                    break server_side_error;
                }
            }
            else {
                const defaultValue = (_b = attribute.value) !== null && _b !== void 0 ? _b : "";
                assert(typeof valueOrValues === "string");
                const value = valueOrValues;
                if (defaultValue !== value) {
                    break server_side_error;
                }
            }
            let doesErrorExist;
            try {
                doesErrorExist = messagesPerField.existsError(attributeName);
            }
            catch (_c) {
                break server_side_error;
            }
            if (!doesErrorExist) {
                break server_side_error;
            }
            const errorMessageStr = messagesPerField.get(attributeName);
            return [
                {
                    advancedMsgArgs: [errorMessageStr],
                    fieldIndex: undefined,
                    source: {
                        type: "server"
                    }
                }
            ];
        }
        handle_multi_valued_multi_fields: {
            if (!attribute.multivalued) {
                break handle_multi_valued_multi_fields;
            }
            if (getIsMultivaluedSingleField({ attribute })) {
                break handle_multi_valued_multi_fields;
            }
            assert(valueOrValues instanceof Array);
            const values = valueOrValues;
            const errors = values
                .map((...[, index]) => {
                const specificValueErrors = getErrors({
                    attributeName,
                    formFieldStates: formFieldStates.map(formFieldState => {
                        if (formFieldState.attribute.name === attributeName) {
                            assert(formFieldState.valueOrValues instanceof Array);
                            return {
                                attribute: Object.assign(Object.assign({}, attribute), { annotations: Object.assign(Object.assign({}, attribute.annotations), { inputType: undefined }), multivalued: false }),
                                valueOrValues: formFieldState.valueOrValues[index]
                            };
                        }
                        return formFieldState;
                    })
                });
                return specificValueErrors
                    .filter(error => {
                    if (error.source.type === "other" &&
                        error.source.rule === "requiredField") {
                        return false;
                    }
                    return true;
                })
                    .map((error) => (Object.assign(Object.assign({}, error), { fieldIndex: index })));
            })
                .reduce((acc, errors) => [...acc, ...errors], []);
            required_field: {
                if (!attribute.required) {
                    break required_field;
                }
                if (values.every(value => value !== "")) {
                    break required_field;
                }
                errors.push({
                    advancedMsgArgs: [
                        "error-user-attribute-required"
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "other",
                        rule: "requiredField"
                    }
                });
            }
            return errors;
        }
        handle_multi_valued_single_field: {
            if (!attribute.multivalued) {
                break handle_multi_valued_single_field;
            }
            if (!getIsMultivaluedSingleField({ attribute })) {
                break handle_multi_valued_single_field;
            }
            const validatorName = "multivalued";
            const validator = attribute.validators[validatorName];
            if (validator === undefined) {
                return [];
            }
            const { min: minStr } = validator;
            const min = minStr ? parseInt(`${minStr}`) : attribute.required ? 1 : 0;
            assert(!isNaN(min));
            const { max: maxStr } = validator;
            const max = !maxStr ? Infinity : parseInt(`${maxStr}`);
            assert(!isNaN(max));
            assert(valueOrValues instanceof Array);
            const values = valueOrValues;
            if (min <= values.length && values.length <= max) {
                return [];
            }
            return [
                {
                    advancedMsgArgs: [
                        "error-invalid-multivalued-size",
                        `${min}`,
                        `${max}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "validator",
                        name: validatorName
                    }
                }
            ];
        }
        assert(typeof valueOrValues === "string");
        const value = valueOrValues;
        const errors = [];
        check_password_policies: {
            if (attributeName !== "password") {
                break check_password_policies;
            }
            if (passwordPolicies === undefined) {
                break check_password_policies;
            }
            check_password_policy_x: {
                const policyName = "length";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const minLength = policy;
                if (value.length >= minLength) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinLengthMessage",
                        `${minLength}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "maxLength";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const maxLength = policy;
                if (value.length <= maxLength) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMaxLengthMessage",
                        `${maxLength}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "digits";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const minNumberOfDigits = policy;
                if (value.split("").filter(char => !isNaN(parseInt(char))).length >=
                    minNumberOfDigits) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinDigitsMessage",
                        `${minNumberOfDigits}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "lowerCase";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const minNumberOfLowerCaseChar = policy;
                if (value
                    .split("")
                    .filter(char => char === char.toLowerCase() && char !== char.toUpperCase()).length >= minNumberOfLowerCaseChar) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinLowerCaseCharsMessage",
                        `${minNumberOfLowerCaseChar}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "upperCase";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const minNumberOfUpperCaseChar = policy;
                if (value
                    .split("")
                    .filter(char => char === char.toUpperCase() && char !== char.toLowerCase()).length >= minNumberOfUpperCaseChar) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinUpperCaseCharsMessage",
                        `${minNumberOfUpperCaseChar}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "specialChars";
                const policy = passwordPolicies[policyName];
                if (!policy) {
                    break check_password_policy_x;
                }
                const minNumberOfSpecialChar = policy;
                if (value.split("").filter(char => !char.match(/[a-zA-Z0-9]/)).length >=
                    minNumberOfSpecialChar) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordMinSpecialCharsMessage",
                        `${minNumberOfSpecialChar}`
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "notUsername";
                const notUsername = passwordPolicies[policyName];
                if (!notUsername) {
                    break check_password_policy_x;
                }
                const usernameFormFieldState = formFieldStates.find(formFieldState => formFieldState.attribute.name === "username");
                if (!usernameFormFieldState) {
                    break check_password_policy_x;
                }
                const usernameValue = (() => {
                    var _a;
                    let { valueOrValues } = usernameFormFieldState;
                    assert(typeof valueOrValues === "string");
                    unFormat_number: {
                        const { kcNumberUnFormat } = (_a = usernameFormFieldState.attribute.html5DataAnnotations) !== null && _a !== void 0 ? _a : {};
                        if (!kcNumberUnFormat) {
                            break unFormat_number;
                        }
                        valueOrValues = formatNumber(valueOrValues, kcNumberUnFormat);
                    }
                    return valueOrValues;
                })();
                if (usernameValue === "") {
                    break check_password_policy_x;
                }
                if (value !== usernameValue) {
                    break check_password_policy_x;
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordNotUsernameMessage"
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
            check_password_policy_x: {
                const policyName = "notEmail";
                const notEmail = passwordPolicies[policyName];
                if (!notEmail) {
                    break check_password_policy_x;
                }
                const emailFormFieldState = formFieldStates.find(formFieldState => formFieldState.attribute.name === "email");
                if (!emailFormFieldState) {
                    break check_password_policy_x;
                }
                assert(typeof emailFormFieldState.valueOrValues === "string");
                {
                    const emailValue = emailFormFieldState.valueOrValues;
                    if (emailValue === "") {
                        break check_password_policy_x;
                    }
                    if (value !== emailValue) {
                        break check_password_policy_x;
                    }
                }
                errors.push({
                    advancedMsgArgs: [
                        "invalidPasswordNotEmailMessage"
                    ],
                    fieldIndex: undefined,
                    source: {
                        type: "passwordPolicy",
                        name: policyName
                    }
                });
            }
        }
        password_confirm_matches_password: {
            if (attributeName !== "password-confirm") {
                break password_confirm_matches_password;
            }
            const passwordFormFieldState = formFieldStates.find(formFieldState => formFieldState.attribute.name === "password");
            assert(passwordFormFieldState !== undefined);
            assert(typeof passwordFormFieldState.valueOrValues === "string");
            {
                const passwordValue = passwordFormFieldState.valueOrValues;
                if (value === passwordValue) {
                    break password_confirm_matches_password;
                }
            }
            errors.push({
                advancedMsgArgs: [
                    "invalidPasswordConfirmMessage"
                ],
                fieldIndex: undefined,
                source: {
                    type: "other",
                    rule: "passwordConfirmMatchesPassword"
                }
            });
        }
        const { validators } = attribute;
        required_field: {
            if (!attribute.required) {
                break required_field;
            }
            if (value !== "") {
                break required_field;
            }
            errors.push({
                advancedMsgArgs: [
                    "error-user-attribute-required"
                ],
                fieldIndex: undefined,
                source: {
                    type: "other",
                    rule: "requiredField"
                }
            });
        }
        validator_x: {
            const validatorName = "length";
            const validator = validators[validatorName];
            if (!validator) {
                break validator_x;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;
            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }
            const source = {
                type: "validator",
                name: validatorName
            };
            if (max && value.length > parseInt(`${max}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-invalid-length-too-long",
                        `${max}`
                    ],
                    fieldIndex: undefined,
                    source
                });
            }
            if (min && value.length < parseInt(`${min}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-invalid-length-too-short",
                        `${min}`
                    ],
                    fieldIndex: undefined,
                    source
                });
            }
        }
        validator_x: {
            const validatorName = "pattern";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break validator_x;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, pattern, "error-message": errorMessageKey } = validator;
            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }
            if (new RegExp(pattern).test(value)) {
                break validator_x;
            }
            const msgArgs = [
                errorMessageKey !== null && errorMessageKey !== void 0 ? errorMessageKey : ("shouldMatchPattern"),
                pattern
            ];
            errors.push({
                advancedMsgArgs: msgArgs,
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }
        validator_x: {
            {
                const lastError = errors[errors.length - 1];
                if (lastError !== undefined &&
                    lastError.source.type === "validator" &&
                    lastError.source.name === "pattern") {
                    break validator_x;
                }
            }
            const validatorName = "email";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break validator_x;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false } = validator;
            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }
            if (emailRegexp.test(value)) {
                break validator_x;
            }
            errors.push({
                advancedMsgArgs: [
                    "invalidEmailMessage"
                ],
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }
        validator_x: {
            const validatorName = "integer";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break validator_x;
            }
            const { "ignore.empty.value": ignoreEmptyValue = false, max, min } = validator;
            if (ignoreEmptyValue && value === "") {
                break validator_x;
            }
            const intValue = parseInt(value);
            const source = {
                type: "validator",
                name: validatorName
            };
            if (isNaN(intValue)) {
                const msgArgs = ["mustBeAnInteger"];
                errors.push({
                    advancedMsgArgs: msgArgs,
                    fieldIndex: undefined,
                    source
                });
                break validator_x;
            }
            if (max && intValue > parseInt(`${max}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-number-out-of-range-too-big",
                        `${max}`
                    ],
                    fieldIndex: undefined,
                    source
                });
                break validator_x;
            }
            if (min && intValue < parseInt(`${min}`)) {
                errors.push({
                    advancedMsgArgs: [
                        "error-number-out-of-range-too-small",
                        `${min}`
                    ],
                    fieldIndex: undefined,
                    source
                });
                break validator_x;
            }
        }
        validator_x: {
            const validatorName = "options";
            const validator = validators[validatorName];
            if (validator === undefined) {
                break validator_x;
            }
            if (value === "") {
                break validator_x;
            }
            if (validator.options.indexOf(value) >= 0) {
                break validator_x;
            }
            errors.push({
                advancedMsgArgs: [
                    "notAValidOption"
                ],
                fieldIndex: undefined,
                source: {
                    type: "validator",
                    name: validatorName
                }
            });
        }
        //TODO: Implement missing validators. See Validators type definition.
        return errors;
    }
    return { getErrors };
}
function getIsMultivaluedSingleField(params) {
    var _a, _b;
    const { attribute } = params;
    return (_b = (_a = attribute.annotations.inputType) === null || _a === void 0 ? void 0 : _a.startsWith("multiselect")) !== null && _b !== void 0 ? _b : false;
}
export function getButtonToDisplayForMultivaluedAttributeField(params) {
    const { attribute, values, fieldIndex } = params;
    const hasRemove = (() => {
        if (values.length === 1) {
            return false;
        }
        const minCount = (() => {
            const { multivalued } = attribute.validators;
            if (multivalued === undefined) {
                return undefined;
            }
            const minStr = multivalued.min;
            if (minStr === undefined) {
                return undefined;
            }
            return parseInt(`${minStr}`);
        })();
        if (minCount === undefined) {
            return true;
        }
        if (values.length === minCount) {
            return false;
        }
        return true;
    })();
    const hasAdd = (() => {
        if (fieldIndex + 1 !== values.length) {
            return false;
        }
        const maxCount = (() => {
            const { multivalued } = attribute.validators;
            if (multivalued === undefined) {
                return undefined;
            }
            const maxStr = multivalued.max;
            if (maxStr === undefined) {
                return undefined;
            }
            return parseInt(`${maxStr}`);
        })();
        if (maxCount === undefined) {
            return true;
        }
        return values.length !== maxCount;
    })();
    return { hasRemove, hasAdd };
}
//# sourceMappingURL=getUserProfileApi.js.map