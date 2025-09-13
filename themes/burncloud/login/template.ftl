<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}" <#if realm.internationalizationEnabled>lang="${locale.currentLanguageTag}"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('=')[0]}" content="${meta?split('=')[1]}"/>
        </#list>
    </#if>
    
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
    
    <!-- Theme Variables -->
    <style>
        :root {
            /* BurnCloud Color System */
            --primary: 214 100% 59%;
            --primary-foreground: 0 0% 100%;
            --secondary: 214 32% 91%;
            --secondary-foreground: 214 100% 11%;
            --muted: 214 32% 91%;
            --muted-foreground: 214 5% 39%;
            --accent: 214 32% 91%;
            --accent-foreground: 214 100% 11%;
            --destructive: 0 84% 60%;
            --destructive-foreground: 0 0% 100%;
            --border: 214 32% 91%;
            --input: 214 32% 91%;
            --ring: 214 100% 59%;
            --background: 0 0% 100%;
            --foreground: 214 100% 11%;
            --card: 0 0% 100%;
            --card-foreground: 214 100% 11%;
            --popover: 0 0% 100%;
            --popover-foreground: 214 100% 11%;
            
            /* Radius */
            --radius: 0.6rem;
            
            /* Font Family */
            --font-family: 'Manrope', sans-serif;
        }
        
        .dark {
            --primary: 214 100% 59%;
            --primary-foreground: 214 100% 11%;
            --secondary: 214 13% 9%;
            --secondary-foreground: 0 0% 100%;
            --muted: 214 13% 9%;
            --muted-foreground: 214 5% 63%;
            --accent: 214 13% 9%;
            --accent-foreground: 0 0% 100%;
            --destructive: 0 63% 31%;
            --destructive-foreground: 0 0% 100%;
            --border: 214 13% 9%;
            --input: 214 13% 9%;
            --ring: 214 100% 59%;
            --background: 214 100% 4%;
            --foreground: 0 0% 100%;
            --card: 214 50% 6%;
            --card-foreground: 0 0% 100%;
            --popover: 214 50% 6%;
            --popover-foreground: 0 0% 100%;
        }
    </style>
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
                    <a href="#" class="footer-link">${msg("terms")}</a>
                    <a href="#" class="footer-link">${msg("privacy")}</a>
                    <a href="#" class="footer-link">${msg("support")}</a>
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
    </script>
</body>
</html>
</#macro>