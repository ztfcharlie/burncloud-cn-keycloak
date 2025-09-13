<#import "template.ftl" as layout>
<#import "components/atoms/input.ftl" as input>
<#import "components/atoms/button.ftl" as button>
<#import "components/atoms/form.ftl" as form>

<@layout.mainLayout active='account' bodyClass='user'; section>
    <div class="bg-white shadow-sm rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">${msg("editAccountHtmlTitle")}</h2>
        
        <@form.kw action="${url.accountUrl}" method="post">
            <input type="hidden" id="stateChecker" name="stateChecker" value="${stateChecker}">
            
            <@input.kw
                autocomplete="username"
                disabled=true
                label=msg("username")
                name="username"
                type="text"
                value=(account.username!'')
            />
            
            <@input.kw
                autocomplete="given-name"
                label=msg("firstName")
                name="firstName"
                type="text"
                value=(account.firstName!'')
            />
            
            <@input.kw
                autocomplete="family-name"
                label=msg("lastName")
                name="lastName"
                type="text"
                value=(account.lastName!'')
            />
            
            <@input.kw
                autocomplete="email"
                label=msg("email")
                name="email"
                type="email"
                value=(account.email!'')
            />
            
            <div class="mt-6">
                <@button.kw color="primary" name="submitAction" type="submit" value="Save">
                    ${msg("doSave")}
                </@button.kw>
                <@button.kw color="secondary" name="submitAction" type="submit" value="Cancel">
                    ${msg("doCancel")}
                </@button.kw>
            </div>
        </@form.kw>
    </div>
</@layout.mainLayout>