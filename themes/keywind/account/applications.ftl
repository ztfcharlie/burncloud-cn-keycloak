<#import "template.ftl" as layout>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/button.ftl" as button>

<@layout.mainLayout active="applications">
  <div class="p-6">
    <@heading.kw>
      ${msg("applicationHeader")}
    </@heading.kw>
    
    <div class="mt-6">
      <div class="space-y-6">
        <#list applications.applications as application>
          <div class="border rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  ${application.clientId}
                </h3>
                <#if application.description??>
                  <p class="mt-1 text-sm text-gray-600">
                    ${application.description}
                  </p>
                </#if>
              </div>
              <form action="${url.applicationsUrl}" method="post">
                <input type="hidden" name="clientId" value="${application.clientId}"/>
                <input type="hidden" name="stateChecker" value="${stateChecker}"/>
                <@button.kw color="danger" type="submit">
                  ${msg("revoke")}
                </@button.kw>
              </form>
            </div>
            
            <#if application.inUseClients??>
              <div class="mt-4">
                <h4 class="text-sm font-medium text-gray-900">
                  ${msg("inUseClients")}
                </h4>
                <ul class="mt-2 divide-y divide-gray-200">
                  <#list application.inUseClients as clientScope>
                    <li class="py-2 text-sm text-gray-600">
                      ${clientScope}
                    </li>
                  </#list>
                </ul>
              </div>
            </#if>
          </div>
        </#list>
      </div>
    </div>
  </div>
</@layout.mainLayout>