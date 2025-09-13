<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        <#if message?has_content>
            ${message.summary}
        <#else>
            ${msg("errorTitle")}
        </#if>
    <#elseif section = "form">
        <div id="kc-error-message">
            <p class="instruction">
                <#if message?has_content>
                    ${message.summary}
                <#else>
                    ${msg("errorTitle")}
                </#if>
            </p>
            <#if client?? && client.baseUrl?has_content>
                <p><a id="backToApplication" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>