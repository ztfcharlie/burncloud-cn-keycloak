<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        <div class="burncloud-header">
            <div class="burncloud-logo">
                <img src="${url.resourcesPath}/img/burncloud-logo.svg" alt="BurnCloud AI" class="logo-image">
                <span class="logo-text">BurnCloud AI</span>
            </div>
            <div class="theme-switcher">
                <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle theme">
                    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
            </div>
            <div class="language-selector">
                <select id="language-selector" onchange="changeLanguage(this.value)">
                    <option value="zh-CN" <#if locale.current == 'zh-CN'>selected</#if>>中文</option>
                    <option value="en" <#if locale.current == 'en'>selected</#if>>English</option>
                </select>
            </div>
        </div>
    <#elseif section = "form">
        <div class="burncloud-login-container">
            <!-- Login Card -->
            <div class="burncloud-login-card">
                <div class="login-header">
                    <h1 class="login-title">${msg("loginTitle")}</h1>
                    <p class="login-subtitle">${msg("loginSubtitle")}</p>
                </div>

                <!-- Login Form -->
                <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                    <div class="form-group">
                        <label for="username" class="form-label">
                            <#if !realm.loginWithEmailAllowed>${msg("username")}
                            <#elseif !realm.duplicateEmailsAllowed>${msg("usernameOrEmail")}
                            <#else>${msg("username")}</#if>
                        </label>
                        <input tabindex="1" id="username" class="form-input" name="username" 
                               value="${(login.username!'')}" type="text" autofocus autocomplete="off"
                               aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                               placeholder="${msg("usernameOrEmail")}" />
                        <#if messagesPerField.existsError('username','password')>
                            <span id="input-error" class="input-error" aria-live="polite">
                                ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                            </span>
                        </#if>
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">${msg("password")}</label>
                        <input tabindex="2" id="password" class="form-input" name="password" 
                               type="password" autocomplete="off"
                               aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                               placeholder="${msg("password")}" />
                    </div>

                    <div class="form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox-container">
                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"
                                       <#if login.rememberMe??>checked</#if>>
                                <label class="checkbox-label" for="rememberMe">${msg("rememberMe")}</label>
                            </div>
                        </#if>
                        <#if realm.resetPasswordAllowed>
                            <a href="${url.loginResetCredentialsUrl}" class="forgot-password-link">
                                ${msg("forgotPassword")}
                            </a>
                        </#if>
                    </div>

                    <div class="form-actions">
                        <button tabindex="4" name="login" id="kc-login" class="btn btn-primary" type="submit">
                            ${msg("login")}
                        </button>
                    </div>
                </form>

                <!-- Registration Link -->
                <#if realm.registrationAllowed && !registrationDisabled??>
                    <div class="registration-section">
                        <p class="registration-text">
                            ${msg("noAccount")} 
                            <a href="${url.registrationUrl}" class="registration-link">
                                ${msg("register")}
                            </a>
                        </p>
                    </div>
                </#if>

                <!-- Social Providers -->
                <#if realm.identityProviders??>
                    <div class="social-providers">
                        <div class="divider">
                            <span class="divider-text">${msg("or")}</span>
                        </div>
                        <div class="social-buttons">
                            <#list realm.identityProviders as p>
                                <a href="${url.loginAction}?kc_idp_hint=${p.alias}" class="social-button" id="social-${p.alias}">
                                    <#switch p.alias>
                                        <#case "google">
                                            <svg class="social-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                            <#break>
                                        <#case "github">
                                            <svg class="social-icon" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            <#break>
                                        <#default>
                                            <span class="social-icon-text">${p.displayName}</span>
                                    </#switch>
                                    <span class="social-text">${p.displayName}</span>
                                </a>
                            </#list>
                        </div>
                    </div>
                </#if>
            </div>
        </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    <#elseif section = "socialProviders" >
        <#-- This section is handled in the form section above -->
    </#if>
</@layout.registrationLayout>