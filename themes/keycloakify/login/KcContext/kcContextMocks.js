import "../../tools/Object.fromEntries";
import { WELL_KNOWN_DIRECTORY_BASE_NAME } from "../../bin/shared/constants";
import { id } from "tsafe/id";
import { assert } from "tsafe/assert";
import { BASE_URL } from "../../lib/BASE_URL";
const attributesByName = Object.fromEntries(id([
    {
        validators: {
            length: {
                "ignore.empty.value": true,
                min: "3",
                max: "255"
            }
        },
        displayName: "${username}",
        annotations: {},
        required: true,
        autocomplete: "username",
        readOnly: false,
        name: "username"
    },
    {
        validators: {
            length: {
                max: "255",
                "ignore.empty.value": true
            },
            email: {
                "ignore.empty.value": true
            },
            pattern: {
                "ignore.empty.value": true,
                pattern: "gmail\\.com$"
            }
        },
        displayName: "${email}",
        annotations: {},
        required: true,
        autocomplete: "email",
        readOnly: false,
        name: "email"
    },
    {
        validators: {
            length: {
                max: "255",
                "ignore.empty.value": true
            }
        },
        displayName: "${firstName}",
        annotations: {},
        required: true,
        readOnly: false,
        name: "firstName"
    },
    {
        validators: {
            length: {
                max: "255",
                "ignore.empty.value": true
            }
        },
        displayName: "${lastName}",
        annotations: {},
        required: true,
        readOnly: false,
        name: "lastName"
    }
]).map(attribute => [attribute.name, attribute]));
const resourcesPath = `${BASE_URL}${WELL_KNOWN_DIRECTORY_BASE_NAME.KEYCLOAKIFY_DEV_RESOURCES}/login`;
export const kcContextCommonMock = {
    themeVersion: "0.0.0",
    keycloakifyVersion: "0.0.0",
    themeType: "login",
    themeName: "my-theme-name",
    url: {
        loginAction: "#",
        resourcesPath,
        resourcesCommonPath: `${resourcesPath}/${WELL_KNOWN_DIRECTORY_BASE_NAME.RESOURCES_COMMON}`,
        loginRestartFlowUrl: "#",
        loginUrl: "#",
        ssoLoginInOtherTabsUrl: "#"
    },
    realm: {
        name: "myrealm",
        displayName: "myrealm",
        displayNameHtml: "myrealm",
        internationalizationEnabled: true,
        registrationEmailAsUsername: false
    },
    messagesPerField: {
        get: () => "",
        existsError: () => false,
        printIfExists: function (fieldName, text) {
            return this.get(fieldName) !== "" ? text : undefined;
        },
        exists: function (fieldName) {
            return this.get(fieldName) !== "";
        },
        getFirstError: function (...fieldNames) {
            for (const fieldName of fieldNames) {
                if (this.existsError(fieldName)) {
                    return this.get(fieldName);
                }
            }
            return "";
        }
    },
    locale: {
        supported: [
            /* spell-checker: disable */
            ["de", "Deutsch"],
            ["no", "Norsk"],
            ["ru", "Русский"],
            ["sv", "Svenska"],
            ["pt-BR", "Português (Brasil)"],
            ["lt", "Lietuvių"],
            ["en", "English"],
            ["it", "Italiano"],
            ["fr", "Français"],
            ["zh-CN", "中文简体"],
            ["es", "Español"],
            ["cs", "Čeština"],
            ["ja", "日本語"],
            ["sk", "Slovenčina"],
            ["pl", "Polski"],
            ["ca", "Català"],
            ["nl", "Nederlands"],
            ["tr", "Türkçe"],
            ["ar", "العربية"],
            ["da", "Dansk"],
            ["el", "Ελληνικά"],
            ["fa", "فارسی"],
            ["fi", "Suomi"],
            ["hu", "Magyar"],
            ["ka", "ქართული"],
            ["lv", "Latviešu"],
            ["pt", "Português"],
            ["th", "ไทย"],
            ["uk", "Українська"],
            ["zh-TW", "中文繁體"]
            /* spell-checker: enable */
        ].map(([languageTag, label]) => {
            {
                assert;
                assert;
            }
            return {
                languageTag,
                label,
                url: "https://gist.github.com/garronej/52baaca1bb925f2296ab32741e062b8e"
            };
        }),
        currentLanguageTag: "en"
    },
    auth: {
        showUsername: false,
        showResetCredentials: false,
        showTryAnotherWayLink: false
    },
    client: {
        clientId: "myApp",
        attributes: {}
    },
    scripts: [],
    isAppInitiatedAction: false,
    properties: {},
    "x-keycloakify": {
        messages: {}
    }
};
const loginUrl = Object.assign(Object.assign({}, kcContextCommonMock.url), { loginResetCredentialsUrl: "#", registrationUrl: "#", oauth2DeviceVerificationAction: "#", oauthAction: "#" });
export const kcContextMocks = [
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login.ftl", url: loginUrl, realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { loginWithEmailAllowed: true, rememberMe: true, password: true, resetPasswordAllowed: true, registrationAllowed: true }), auth: kcContextCommonMock.auth, social: {
            displayInfo: true
        }, usernameHidden: false, login: {}, registrationDisabled: false })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { url: Object.assign(Object.assign({}, loginUrl), { registrationAction: "#" }), isAppInitiatedAction: false, passwordRequired: true, recaptchaRequired: false, pageId: "register.ftl", profile: {
            attributesByName
        }, scripts: [
        //"https://www.google.com/recaptcha/api.js"
        ] })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "info.ftl", messageHeader: "<Message header>", requiredActions: undefined, skipLink: false, actionUri: "#", client: {
            clientId: "myApp",
            baseUrl: "#",
            attributes: {}
        }, message: {
            type: "info",
            summary: "This is the info message from the Keycloak server (in real environment, this message is localized)"
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "error.ftl", client: {
            clientId: "myApp",
            baseUrl: "#",
            attributes: {}
        }, message: {
            type: "error",
            summary: "This is the error message from the Keycloak server (in real environment, this message is localized)"
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-reset-password.ftl", realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { loginWithEmailAllowed: false, duplicateEmailsAllowed: false }), url: loginUrl, auth: {} })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-verify-email.ftl", user: {
            email: "john.doe@gmail.com"
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "terms.ftl" })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-oauth2-device-verify-user-code.ftl", url: loginUrl })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-oauth-grant.ftl", oauth: {
            code: "5-1N4CIzfi1aprIQjmylI-9e3spLCWW9i5d-GDcs-Sw",
            clientScopesRequested: [
                { consentScreenText: "${profileScopeConsentText}" },
                { consentScreenText: "${rolesScopeConsentText}" },
                { consentScreenText: "${emailScopeConsentText}" }
            ],
            client: "account"
        }, url: loginUrl })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-otp.ftl", otpLogin: {
            userOtpCredentials: [
                {
                    id: "id1",
                    userLabel: "label1"
                },
                {
                    id: "id2",
                    userLabel: "label2"
                }
            ]
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-username.ftl", url: loginUrl, realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { loginWithEmailAllowed: true, rememberMe: true, password: true, resetPasswordAllowed: true, registrationAllowed: true }), social: {
            displayInfo: true
        }, usernameHidden: false, login: {}, registrationDisabled: false })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-password.ftl", url: loginUrl, realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { resetPasswordAllowed: true }) })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "webauthn-authenticate.ftl", url: loginUrl, authenticators: {
            authenticators: []
        }, realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { password: true, registrationAllowed: true }), challenge: "", userVerification: "not specified", rpId: "", createTimeout: "0", isUserIdentified: "false", shouldDisplayAuthenticators: false })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-update-password.ftl" })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-update-profile.ftl", profile: {
            attributesByName
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-idp-link-confirm.ftl", idpAlias: "FranceConnect" })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-idp-link-email.ftl", idpAlias: "FranceConnect", brokerContext: {
            username: "anUsername"
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-config-totp.ftl", totp: {
            totpSecretEncoded: "KVVF G2BY N4YX S6LB IUYT K2LH IFYE 4SBV",
            qrUrl: "#",
            totpSecretQrCode: "iVBORw0KGgoAAAANSUhEUgAAAPYAAAD2AQAAAADNaUdlAAACM0lEQVR4Xu3OIZJgOQwDUDFd2UxiurLAVnnbHw4YGDKtSiWOn4Gxf81//7r/+q8b4HfLGBZDK9d85NmNR+sB42sXvOYrN5P1DcgYYFTGfOlbzE8gzwy3euweGizw7cfdl34/GRhlkxjKNV+5AebPXPORX1JuB9x8ZfbyyD2y1krWAKsbMq1HnqQDaLfa77p4+MqvzEGSqvSAD/2IHW2yHaigR9tX3m8dDIYGcNf3f+gDpVBZbZU77zyJ6Rlcy+qoTMG887KAPD9hsh6a1Sv3gJUHGHUAxSMzj7zqDDe7Phmt2eG+8UsMxjRGm816MAO+8VMl1R1jGHOrZB/5Zo/WXAPgxixm9Mo96vDGrM1eOto8c4Ax4wF437mifOXlpiPzCnN7Y9l95NnEMxgMY9AAGA8fucH14Y1aVb6N/cqrmyh0BVht7k1e+bU8LK0Cg5vmVq9c5vHIjOfqxDIfeTraNVTwewa4wVe+SW5N+uP1qACeudUZbqGOfA6VZV750Noq2Xx3kpveV44ZelSV1V7KFHzkWyVrrlUwG0Pl9pWnoy3vsQoME6vKI69i5osVgwWzHT7zjmJtMcNUSVn1oYMd7ZodbgowZl45VG0uVuLPUr1yc79uaQBag/mqR34xhlWyHm1prplHboCWdZ4TeZjsK8+dI+jbz1C5hl65mcpgB5dhcj8+dGO+0Ko68+lD37JDD83dpDLzzK+TrQyaVwGj6pUboGV+7+AyN8An/pf84/7rv/4/1l4OCc/1BYMAAAAASUVORK5CYII=",
            manualUrl: "#",
            totpSecret: "G4nsI8lQagRMUchH8jEG",
            otpCredentials: [],
            supportedApplications: ["FreeOTP", "Google Authenticator"],
            policy: {
                algorithm: "HmacSHA1",
                digits: 6,
                lookAheadWindow: 1,
                type: "totp",
                period: 30,
                getAlgorithmKey: () => "SHA1"
            }
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "logout-confirm.ftl", url: Object.assign(Object.assign({}, kcContextCommonMock.url), { logoutConfirmAction: "Continuer?" }), client: {
            clientId: "myApp",
            baseUrl: "#",
            attributes: {}
        }, logoutConfirm: { code: "123", skipLink: false } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "idp-review-user-profile.ftl", profile: {
            attributesByName
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "update-email.ftl", profile: {
            attributesByName: {
                email: attributesByName["email"]
            }
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "select-authenticator.ftl", auth: {
            authenticationSelections: [
                {
                    authExecId: "f607f83c-537e-42b7-99d7-c52d459afe84",
                    displayName: "otp-display-name",
                    helpText: "otp-help-text",
                    iconCssClass: "kcAuthenticatorOTPClass"
                },
                {
                    authExecId: "5ed881b1-84cd-4e9b-b4d9-f329ea61a58c",
                    displayName: "webauthn-display-name",
                    helpText: "webauthn-help-text",
                    iconCssClass: "kcAuthenticatorWebAuthnClass"
                }
            ]
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "saml-post-form.ftl", samlPost: {
            url: "#"
        } })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "login-page-expired.ftl" })),
    id(Object.assign(Object.assign({}, kcContextCommonMock), { pageId: "frontchannel-logout.ftl", logout: {
            clients: [
                {
                    name: "myApp",
                    frontChannelLogoutUrl: "#"
                },
                {
                    name: "myApp2",
                    frontChannelLogoutUrl: "#"
                }
            ]
        } })),
    id(Object.assign(Object.assign({ pageId: "webauthn-register.ftl" }, kcContextCommonMock), { challenge: "random-challenge-string", userid: "user123", username: "johndoe", signatureAlgorithms: ["ES256", "RS256"], rpEntityName: "Example Corp", rpId: "example.com", attestationConveyancePreference: "direct", authenticatorAttachment: "platform", requireResidentKey: "required", userVerificationRequirement: "preferred", createTimeout: 60000, excludeCredentialIds: "credId123,credId456", isSetRetry: false, isAppInitiatedAction: true })),
    id(Object.assign(Object.assign({ pageId: "delete-credential.ftl" }, kcContextCommonMock), { credentialLabel: "myCredential" })),
    id(Object.assign(Object.assign({ pageId: "code.ftl" }, kcContextCommonMock), { code: {
            success: true,
            code: "123456"
        } })),
    id(Object.assign(Object.assign({ pageId: "delete-account-confirm.ftl" }, kcContextCommonMock), { triggered_from_aia: true })),
    id(Object.assign(Object.assign({ pageId: "login-recovery-authn-code-config.ftl" }, kcContextCommonMock), { recoveryAuthnCodesConfigBean: {
            generatedRecoveryAuthnCodesList: ["code123", "code456", "code789"],
            generatedRecoveryAuthnCodesAsString: "code123, code456, code789",
            generatedAt: new Date().getTime()
        } })),
    id(Object.assign(Object.assign({ pageId: "login-recovery-authn-code-input.ftl" }, kcContextCommonMock), { recoveryAuthnCodesInputBean: {
            codeNumber: 1234
        } })),
    id(Object.assign(Object.assign({ pageId: "login-reset-otp.ftl" }, kcContextCommonMock), { configuredOtpCredentials: {
            userOtpCredentials: [
                {
                    id: "otpId1",
                    userLabel: "OTP Device 1"
                },
                {
                    id: "otpId2",
                    userLabel: "OTP Device 2"
                },
                {
                    id: "otpId3",
                    userLabel: "Backup OTP"
                }
            ],
            selectedCredentialId: "otpId2"
        } })),
    id(Object.assign(Object.assign({ pageId: "login-x509-info.ftl" }, kcContextCommonMock), { x509: {
            formData: {
                subjectDN: "CN=John Doe, O=Example Corp, C=US",
                isUserEnabled: true,
                username: "johndoe"
            }
        } })),
    id(Object.assign(Object.assign({ pageId: "webauthn-error.ftl" }, kcContextCommonMock), { isAppInitiatedAction: true })),
    id(Object.assign(Object.assign({ pageId: "login-passkeys-conditional-authenticate.ftl" }, kcContextCommonMock), { url: Object.assign(Object.assign({}, kcContextCommonMock.url), { registrationUrl: "#" }), realm: Object.assign(Object.assign({}, kcContextCommonMock.realm), { password: true, registrationAllowed: true }), registrationDisabled: false, isUserIdentified: "false", challenge: "", userVerification: "not specified", rpId: "", createTimeout: 0, authenticators: {
            authenticators: []
        }, shouldDisplayAuthenticators: false, login: {} })),
    id(Object.assign(Object.assign({ pageId: "login-idp-link-confirm-override.ftl" }, kcContextCommonMock), { url: Object.assign(Object.assign({}, kcContextCommonMock.url), { loginRestartFlowUrl: "#" }), idpDisplayName: "Google" }))
];
{
    assert();
    assert();
}
//# sourceMappingURL=kcContextMocks.js.map