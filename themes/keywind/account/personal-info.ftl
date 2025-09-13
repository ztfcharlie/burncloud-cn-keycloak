<#import "template.ftl" as layout>
<#import "components/atoms/heading.ftl" as heading>
<#import "components/atoms/input.ftl" as input>
<#import "components/atoms/button.ftl" as button>
<#import "components/atoms/form.ftl" as form>

<@layout.mainLayout active="personal-info">
  <div class="p-6">
    <@heading.kw>
      ${msg("personalInfo")}
    </@heading.kw>

    <div class="mt-6">
      <@form.kw action="${url.accountUrl}" method="post">
        <input type="hidden" id="stateChecker" name="stateChecker" value="${stateChecker}">
        
        <div class="space-y-6">
          <@input.kw
            disabled=true
            label=msg("username")
            name="username"
            type="text"
            value=(account.username!'')
          />
          
          <@input.kw
            label=msg("email")
            name="email"
            type="email"
            value=(account.email!'')
            required=true
          />
          
          <@input.kw
            label=msg("firstName")
            name="firstName"
            type="text"
            value=(account.firstName!'')
            required=true
          />
          
          <@input.kw
            label=msg("lastName")
            name="lastName"
            type="text"
            value=(account.lastName!'')
            required=true
          />
          
          <div class="flex justify-end space-x-4">
            <@button.kw color="secondary" type="reset">
              ${msg("doCancel")}
            </@button.kw>
            <@button.kw color="primary" type="submit">
              ${msg("doSave")}
            </@button.kw>
          </div>
        </div>
      </@form.kw>
    </div>
  </div>
</@layout.mainLayout>