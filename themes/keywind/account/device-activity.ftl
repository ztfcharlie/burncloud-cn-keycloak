<#import "template.ftl" as layout>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/button.ftl" as button>

<@layout.mainLayout active="device-activity">
  <div class="p-6">
    <@heading.kw>
      ${msg("deviceActivityHtmlTitle")}
    </@heading.kw>

    <div class="mt-6">
      <div class="space-y-6">
        <#list sessions.sessions as session>
          <div class="border rounded-lg p-4">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  ${session.browser} - ${session.ipAddress}
                </h3>
                <div class="mt-1 text-sm text-gray-600">
                  <p>${msg("lastAccessedOn")} ${session.lastAccess?datetime}</p>
                  <p>${msg("startedAt")} ${session.started?datetime}</p>
                  <p>${msg("expires")} ${session.expires?datetime}</p>
                </div>
              </div>
              <form action="${url.sessionsUrl}" method="post">
                <input type="hidden" name="sessionId" value="${session.id}"/>
                <input type="hidden" name="stateChecker" value="${stateChecker}"/>
                <@button.kw color="danger" type="submit">
                  ${msg("doSignOut")}
                </@button.kw>
              </form>
            </div>
          </div>
        </#list>
      </div>
    </div>
  </div>
</@layout.mainLayout>