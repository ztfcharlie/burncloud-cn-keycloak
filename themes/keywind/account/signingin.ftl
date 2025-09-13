<#import "template.ftl" as layout>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/button.ftl" as button>
<#import "components/atoms/input.ftl" as input>

<@layout.mainLayout active="signingin">
  <div class="p-6">
    <@heading.kw>
      ${msg("signingIn")}
    </@heading.kw>

    <div class="mt-6 space-y-8">
      <!-- Password Section -->
      <div class="border-b pb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          ${msg("password")}
        </h3>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            ${msg("passwordLastChanged")}:
            <#if passwordDetails.passwordLastUpdate??>
              ${passwordDetails.passwordLastUpdate?datetime}
            <#else>
              ${msg("notSet")}
            </#if>
          </div>
          <@button.kw color="primary" onclick="window.location.href='${url.passwordUrl}'">
            ${msg("updatePassword")}
          </@button.kw>
        </div>
      </div>

      <!-- Two-Factor Authentication Section -->
      <div class="border-b pb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          ${msg("twoFactorAuth")}
        </h3>
        <div class="space-y-4">
          <#if authenticators??>
            <#list authenticators.authenticators as authenticator>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">
                    ${authenticator.displayName}
                  </h4>
                  <p class="text-sm text-gray-600">
                    ${authenticator.description}
                  </p>
                </div>
                <@button.kw color="primary" onclick="window.location.href='${authenticator.setupAction}'">
                  <#if authenticator.configured>
                    ${msg("edit")}
                  <#else>
                    ${msg("setup")}
                  </#if>
                </@button.kw>
              </div>
            </#list>
          </#if>
        </div>
      </div>
    </div>
  </div>
</@layout.mainLayout><#import "template.ftl" as layout>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/button.ftl" as button>
<#import "components/atoms/input.ftl" as input>

<@layout.mainLayout active="signingin">
  <div class="p-6">
    <@heading.kw>
      ${msg("signingIn")}
    </@heading.kw>

    <div class="mt-6 space-y-8">
      <!-- Password Section -->
      <div class="border-b pb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          ${msg("password")}
        </h3>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            ${msg("passwordLastChanged")}:
            <#if passwordDetails.passwordLastUpdate??>
              ${passwordDetails.passwordLastUpdate?datetime}
            <#else>
              ${msg("notSet")}
            </#if>
          </div>
          <@button.kw color="primary" onclick="window.location.href='${url.passwordUrl}'">
            ${msg("updatePassword")}
          </@button.kw>
        </div>
      </div>

      <!-- Two-Factor Authentication Section -->
      <div class="border-b pb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          ${msg("twoFactorAuth")}
        </h3>
        <div class="space-y-4">
          <#if authenticators??>
            <#list authenticators.authenticators as authenticator>
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">
                    ${authenticator.displayName}
                  </h4>
                  <p class="text-sm text-gray-600">
                    ${authenticator.description}
                  </p>
                </div>
                <@button.kw color="primary" onclick="window.location.href='${authenticator.setupAction}'">
                  <#if authenticator.configured>
                    ${msg("edit")}
                  <#else>
                    ${msg("setup")}
                  </#if>
                </@button.kw>
              </div>
            </#list>
          </#if>
        </div>
      </div>
    </div>
  </div>
</@layout.mainLayout>