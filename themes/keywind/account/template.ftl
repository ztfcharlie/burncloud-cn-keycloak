<#import "document.ftl" as document>
<#import "components/atoms/alert.ftl" as alert>
<#import "components/atoms/body.ftl" as body>
<#import "components/atoms/button.ftl" as button>
<#import "components/atoms/card.ftl" as card>
<#import "components/atoms/container.ftl" as container>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/logo.ftl" as logo>
<#import "components/atoms/nav.ftl" as nav>

<#macro mainLayout active>
  <html>
    <head>
      <@document.kw />
    </head>
    <@body.kw>
      <div class="min-h-screen bg-secondary-50">
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex">
                <@logo.kw>
                  ${msg("accountConsoleTitle")}
                </@logo.kw>
              </div>
              <div class="flex items-center">
                <span class="text-gray-700">${profile.username!}</span>
                <a href="${url.getLogoutUrl()}" class="ml-4 text-primary-600 hover:text-primary-800">
                  ${msg("doSignOut")}
                </a>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="flex gap-6">
            <nav class="w-64">
              <div class="bg-white shadow rounded-lg">
                <div class="p-4 space-y-1">
                  <a href="${url.accountUrl}" 
                     class="block px-4 py-2 rounded-md ${active=='personal-info'?'bg-primary-100 text-primary-700':'text-gray-700 hover:bg-gray-50'}">
                    ${msg("personalInfo")}
                  </a>
                  <a href="#/security/signingin" 
                     class="block px-4 py-2 rounded-md ${active=='signingin'?'bg-primary-100 text-primary-700':'text-gray-700 hover:bg-gray-50'}">
                    ${msg("signInMethods")}
                  </a>
                  <a href="#/security/device-activity" 
                     class="block px-4 py-2 rounded-md ${active=='device-activity'?'bg-primary-100 text-primary-700':'text-gray-700 hover:bg-gray-50'}">
                    ${msg("deviceActivity")}
                  </a>
                  <a href="${url.applicationsUrl}" 
                     class="block px-4 py-2 rounded-md ${active=='applications'?'bg-primary-100 text-primary-700':'text-gray-700 hover:bg-gray-50'}">
                    ${msg("applications")}
                  </a>
                </div>
              </div>
            </nav>

            <main class="flex-1">
              <div class="bg-white shadow rounded-lg">
                <#nested>
              </div>
            </main>
          </div>
        </div>
      </div>
    </@body.kw>
  </html>
</#macro>