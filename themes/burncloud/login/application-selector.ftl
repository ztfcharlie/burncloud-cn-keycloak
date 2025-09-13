<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <div class="burncloud-header">
            <div class="burncloud-logo">
                <img src="${url.resourcesPath}/img/burncloud-logo.svg" alt="BurnCloud AI" class="logo-image">
                <span class="logo-text">BurnCloud AI</span>
            </div>
            <div class="header-controls">
                <div class="language-selector">
                    <select id="language-selector" onchange="changeLanguage(this.value)">
                        <option value="zh-CN" <#if locale.current == 'zh-CN'>selected</#if>>中文</option>
                        <option value="en" <#if locale.current == 'en'>selected</#if>>English</option>
                    </select>
                </div>
                <div class="user-info">
                    <span class="user-name">${user.firstName!''} ${user.lastName!''}</span>
                    <a href="${url.logoutUrl}" class="logout-link">${msg("doSignOut")}</a>
                </div>
            </div>
        </div>
    <#elseif section = "form">
        <div class="application-selector-container">
            <!-- Main Content -->
            <div class="selector-content">
                <div class="welcome-section">
                    <h1 class="welcome-title">${msg("welcomeBack")}</h1>
                    <p class="welcome-subtitle">${msg("chooseApplication")}</p>
                </div>

                <!-- Auto Redirect Notice (if applicable) -->
                <div id="auto-redirect-notice" class="redirect-notice" style="display: none;">
                    <div class="redirect-content">
                        <div class="redirect-icon">🚀</div>
                        <div class="redirect-text">
                            <span id="redirect-countdown">5</span> ${msg("autoRedirect")}
                            <div class="redirect-app-name" id="redirect-app-name"></div>
                        </div>
                        <button onclick="cancelAutoRedirect()" class="btn-cancel-redirect">${msg("cancel")}</button>
                    </div>
                </div>

                <!-- Application Grid -->
                <div class="applications-container">
                    <!-- Public Applications -->
                    <div class="app-section" id="public-apps">
                        <h2 class="section-title">${msg("publicApplications")}</h2>
                        <div class="app-grid" id="public-app-grid">
                            <!-- Public apps will be dynamically inserted here -->
                        </div>
                    </div>

                    <!-- Admin Applications (conditionally shown) -->
                    <div class="app-section" id="admin-apps" style="display: none;">
                        <h2 class="section-title admin-title">
                            <span class="admin-icon">🛡️</span>
                            ${msg("adminApplications")}
                        </h2>
                        <div class="app-grid" id="admin-app-grid">
                            <!-- Admin apps will be dynamically inserted here -->
                        </div>
                    </div>
                </div>

                <!-- User Preferences -->
                <div class="preferences-section">
                    <label class="checkbox-container">
                        <input type="checkbox" id="remember-choice" onchange="toggleRememberChoice()">
                        <span class="checkbox-label">${msg("rememberChoice")}</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Application Configuration (Hidden, for JavaScript) -->
        <script type="application/json" id="app-config">
        {
            "applications": {
                "public": [
                    {
                        "id": "main",
                        "name": {
                            "zh-CN": "${msg('app.main.name')}",
                            "en": "${msg('app.main.name')}"
                        },
                        "description": {
                            "zh-CN": "${msg('app.main.description')}",
                            "en": "${msg('app.main.description')}"
                        },
                        "url": "https://testwww.burncloud.cn",
                        "icon": "🏠",
                        "color": "primary",
                        "roles": ["user"]
                    },
                    {
                        "id": "community",
                        "name": {
                            "zh-CN": "${msg('app.community.name')}",
                            "en": "${msg('app.community.name')}"
                        },
                        "description": {
                            "zh-CN": "${msg('app.community.description')}",
                            "en": "${msg('app.community.description')}"
                        },
                        "url": "https://testcommunity.burncloud.cn",
                        "icon": "💬",
                        "color": "secondary",
                        "roles": ["user"]
                    }
                ],
                "admin": [
                    {
                        "id": "strapi-admin",
                        "name": {
                            "zh-CN": "${msg('app.strapi.name')}",
                            "en": "${msg('app.strapi.name')}"
                        },
                        "description": {
                            "zh-CN": "${msg('app.strapi.description')}",
                            "en": "${msg('app.strapi.description')}"
                        },
                        "url": "https://testadmin.burncloud.cn",
                        "icon": "📝",
                        "color": "warning",
                        "roles": ["strapi-admin", "super-admin"]
                    },
                    {
                        "id": "user-management", 
                        "name": {
                            "zh-CN": "${msg('app.users.name')}",
                            "en": "${msg('app.users.name')}"
                        },
                        "description": {
                            "zh-CN": "${msg('app.users.description')}",
                            "en": "${msg('app.users.description')}"
                        },
                        "url": "https://testauth.burncloud.cn/auth/admin",
                        "icon": "👥",
                        "color": "info",
                        "roles": ["keycloak-admin", "super-admin"]
                    },
                    {
                        "id": "system-settings",
                        "name": {
                            "zh-CN": "${msg('app.system.name')}",
                            "en": "${msg('app.system.name')}"
                        },
                        "description": {
                            "zh-CN": "${msg('app.system.description')}",
                            "en": "${msg('app.system.description')}"
                        },
                        "url": "https://testauth.burncloud.cn/auth/admin/master/console",
                        "icon": "⚙️",
                        "color": "danger",
                        "roles": ["super-admin"]
                    }
                ]
            },
            "userRoles": [
                <#if user?? && user.realmRoles??>
                    <#list user.realmRoles as role>
                        "${role}"<#if role_has_next>,</#if>
                    </#list>
                </#if>
            ],
            "locale": "${locale.current}",
            "messages": {
                "loading": "${msg('loading')}",
                "noPermission": "${msg('noPermission')}",
                "continue": "${msg('continue')}"
            }
        }
        </script>
    <#elseif section = "info">
        <div class="info-section">
            <p class="info-text">${msg("selectApplicationInfo")}</p>
        </div>
    </#if>
</@layout.registrationLayout>