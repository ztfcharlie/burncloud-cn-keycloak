<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        ${msg("loginInfoTitle")}
    <#elseif section = "form">
        <div id="kc-info-message">
            <p class="instruction">
                <#if messageHeader??>
                    ${messageHeader}
                <#else>
                    ${message.summary}
                </#if>
            </p>
            <#if requiredActions??>
                <#list requiredActions as reqActionItem>
                    ${msg("requiredAction.${reqActionItem}")}
                </#list>
            </#if>
            <#if skipLink??>
            <#else>
                <#if pageRedirectUri?has_content>
                    <p><a href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                <#elseif actionUri?has_content>
                    <p><a href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a></p>
                <#elseif client.baseUrl?has_content>
                    <p><a href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                </#if>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>