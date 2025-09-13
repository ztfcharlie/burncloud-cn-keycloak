<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}" <#if realm.internationalizationEnabled>lang="${locale.currentLanguageTag}"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${msg("loginTitle")} - BurnCloud AI</title>
    
    <!-- Favicon -->
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    
    <!-- Styles -->
    <link href="${url.resourcesPath}/css/burncloud-theme.css" rel="stylesheet" />
    <link href="${url.resourcesPath}/css/application-selector.css" rel="stylesheet" />
    <link href="${url.resourcesPath}/css/login.css" rel="stylesheet" />
    
    <!-- Scripts -->
    <script src="${url.resourcesPath}/js/theme-core.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/application-selector.js" type="text/javascript"></script>
    <script src="${url.resourcesPath}/js/role-manager.js" type="text/javascript"></script>
    
</head>

<body class="${properties.kcBodyClass!} ${bodyClass}">
    <div class="burncloud-layout">
        <!-- Header Section -->
        <#if displayHeader?? && displayHeader>
            <header class="burncloud-page-header">
                <#nested "header">
            </header>
        <#else>
            <#nested "header">
        </#if>
        
        <!-- Main Content -->
        <main class="burncloud-main">
            <div class="burncloud-container">
                <!-- Messages -->
                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                    <div class="alert alert-${message.type}">
                        <#if message.type = 'success'>
                            <span class="alert-icon">✅</span>
                        <#elseif message.type = 'warning'>
                            <span class="alert-icon">⚠️</span>
                        <#elseif message.type = 'error'>
                            <span class="alert-icon">❌</span>
                        <#else>
                            <span class="alert-icon">ℹ️</span>
                        </#if>
                        <span class="alert-message">${kcSanitize(message.summary)?no_esc}</span>
                    </div>
                </#if>
                
                <!-- Form Content -->
                <div class="form-container">
                    <#nested "form">
                </div>
                
                <!-- Info Section -->
                <#if displayInfo>
                    <div class="info-container">
                        <#nested "info">
                    </div>
                </#if>
            </div>
        </main>
        
        <!-- Footer -->
        <footer class="burncloud-footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="https://www.burncloud.cn/terms" class="footer-link">${msg("terms")}</a>
                    <a href="https://www.burncloud.cn/privacy" class="footer-link">${msg("privacy")}</a>
                </div>
                <div class="footer-copyright">
                    <p>&copy; 2024 BurnCloud AI Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Initialize Theme -->
    <script>
        // Initialize BurnCloud theme
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof BurnCloudTheme !== 'undefined') {
                BurnCloudTheme.init();
            }
        });
        
        // Language switching function
        function changeLanguage(locale) {
            const url = new URL(window.location);
            url.searchParams.set('kc_locale', locale);
            window.location.href = url.toString();
        }
         // Initialize BurnCloud theme
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('theme-toggle');
            const html = document.documentElement;
            
            // Check for saved theme preference or system preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Set initial theme
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                html.classList.add('dark');
            }
            
            // Theme toggle handler
            themeToggle.addEventListener('click', () => {
                html.classList.toggle('dark');
                const isDark = html.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });

            if (typeof BurnCloudTheme !== 'undefined') {
                BurnCloudTheme.init();
            }
        });
        
        // Language switching function
        function changeLanguage(locale) {
            const url = new URL(window.location);
            url.searchParams.set('kc_locale', locale);
            window.location.href = url.toString();
        }
    </script>
</body>
</html>
</#macro>