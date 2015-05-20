(function(){var g=YAHOO.util.Dom,n=YAHOO.util.Event,c=YAHOO.util.Element,b=YAHOO.util.KeyListener;Alfresco.module.CreateSite=function(q){var p=Alfresco.util.ComponentManager.get(this.id);if(p!==null){throw new Error("An instance of Alfresco.module.CreateSite already exists.")}Alfresco.module.CreateSite.superclass.constructor.call(this,"Alfresco.module.CreateSite",q,["button","container","connection","selector","json"]);return this};YAHOO.extend(Alfresco.module.CreateSite,Alfresco.component.Base,{show:function f(){if(this.widgets.panel){this._showPanel()}else{Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"modules/create-site",dataObj:{htmlid:this.id},successCallback:{fn:this.onTemplateLoaded,scope:this},execScripts:true,failureMessage:"Could not load create site template"})}},onTemplateLoaded:function j(r){var v=document.createElement("div");v.innerHTML=r.serverResponse.responseText;var t=g.getFirstChild(v);this.widgets.panel=Alfresco.util.createYUIPanel(t);this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelButtonClick);this.widgets.okButton=Alfresco.util.createYUIButton(this,"ok-button",null,{type:"submit"});this.widgets.siteVisibility=g.get(this.id+"-visibility");this.widgets.isPublic=g.get(this.id+"-isPublic");this.widgets.isModerated=g.get(this.id+"-isModerated");this.widgets.isPrivate=g.get(this.id+"-isPrivate");n.addListener(this.widgets.isPublic,"change",this.onVisibilityChange,this.widgets.isPublic,this);n.addListener(this.widgets.isPrivate,"change",this.onVisibilityChange,this.widgets.isPrivate,this);var p=new Alfresco.forms.Form(this.id+"-form");this.widgets.form=p;this.elTitle=g.get(this.id+"-title");this.elShortName=g.get(this.id+"-shortName");p.addValidation(this.elTitle,Alfresco.forms.validation.mandatory,null,"keyup",this.msg("validation-hint.mandatory"));p.addValidation(this.elTitle,Alfresco.forms.validation.length,{max:256,crop:true},"keyup");n.addListener(this.elTitle,"keyup",this.onSiteNameChange,this,true);n.addListener(this.elTitle,"mouseout",this.onSiteNameChange,this,true);this.shortNameEdited=false;p.addValidation(this.elShortName,Alfresco.forms.validation.mandatory,null,"keyup",this.msg("validation-hint.mandatory"));p.addValidation(this.elShortName,Alfresco.forms.validation.regexMatch,{pattern:/^[ ]*[0-9a-zA-Z\-]+[ ]*$/},"keyup",this.msg("validation-hint.siteName"));p.addValidation(this.elShortName,Alfresco.forms.validation.length,{max:72,crop:true},"keyup");n.addListener(this.elShortName,"keyup",function u(){this.shortNameEdited=this.elShortName.value.length>0},this,true);p.addValidation(this.id+"-description",Alfresco.forms.validation.length,{max:512,crop:true},"keyup");var s=g.get(this.id+"-sitePreset");n.addListener(s,"change",function q(){this.onSitePresetChange(s.options[s.selectedIndex].value)},this,true);if(s.options.length>0){this.onSitePresetChange(s.options[s.selectedIndex].value)}p.setSubmitElements(this.widgets.okButton);p.doBeforeFormSubmit={fn:this.doBeforeFormSubmit,obj:null,scope:this};p.setAJAXSubmit(true,{successCallback:{fn:this.onCreateSiteSuccess,scope:this},failureCallback:{fn:this.onCreateSiteFailure,scope:this}});p.setSubmitAsJSON(true);p.applyTabFix();p.doBeforeAjaxRequest={fn:this.doBeforeAjaxRequest,scope:this};p.init();this._showPanel()},onSitePresetChange:function(p){},doBeforeAjaxRequest:function h(p){return true},doBeforeFormSubmit:function(r,s){var q=g.get(this.id+"-form");q.attributes.action.nodeValue=Alfresco.constants.URL_SERVICECONTEXT+"modules/create-site";this.widgets.cancelButton.set("disabled",true);var p="PUBLIC";if(this.widgets.isPublic.checked){if(this.widgets.isModerated.checked){p="MODERATED"}}else{p="PRIVATE"}this.widgets.siteVisibility.value=p;this.widgets.panel.hide();this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.creating",this.name),spanClass:"wait",displayTime:0})},safeURL:function l(p){p=YAHOO.lang.trim(p.replace(/[^0-9a-zA-Z\-\s]/g,""));p=p.replace(/\s+/g,"-").toLowerCase();return p},onVisibilityChange:function a(q,p){new c(this.widgets.isModerated).set("disabled",p==this.widgets.isPrivate)},onSiteNameChange:function m(q,p){if(!this.shortNameEdited){this.elShortName.value=this.safeURL(this.elTitle.value).substring(0,72);this.widgets.form.validate()}},onCancelButtonClick:function d(q,p){try{g.get(this.id+"-title").value="";g.get(this.id+"-shortName").value="";g.get(this.id+"-description").value="";g.get(this.id+"-sitePreset").selectedIndex=0;g.get(this.id+"-isPublic").checked="checked";g.get(this.id+"-isModerated").checked="";g.get(this.id+"-isModerated").disabled=false}catch(r){}this.widgets.panel.hide()},onCreateSiteSuccess:function e(q){if(q.json!==undefined&&q.json.success){var r=new Alfresco.service.Preferences(),p=q.config.dataObj.shortName;r.favouriteSite(p,{successCallback:{fn:function s(){document.location.href=Alfresco.constants.URL_PAGECONTEXT+"site/"+p+"/dashboard"}}})}else{this._adjustGUIAfterFailure(q)}},onCreateSiteFailure:function i(p){this._adjustGUIAfterFailure(p)},_adjustGUIAfterFailure:function o(p){this.widgets.feedbackMessage.destroy();this.widgets.cancelButton.set("disabled",false);this.widgets.panel.show();var r=Alfresco.util.message("message.failure",this.name);if(p.serverResponse.status===403){if(p.json.message){r=Alfresco.util.message(p.json.message,this.name)}else{r=Alfresco.util.message("error.noPermissions",this.name)}}else{if(p.json.message){var q=Alfresco.util.message(p.json.message,this.name);r=q?q:r}}Alfresco.util.PopupManager.displayPrompt({title:Alfresco.util.message("message.failure",this.name),text:r})},_showPanel:function k(){this.widgets.form.reset();this.widgets.panel.show();Alfresco.util.caretFix(this.id+"-form");if(!this.widgets.escapeListener){this.widgets.escapeListener=new b(document,{keys:b.KEY.ESCAPE},{fn:function(q,p){this.onCancelButtonClick()},scope:this,correctScope:true});this.widgets.escapeListener.enable()}g.get(this.id+"-title").focus()}})})();Alfresco.module.getCreateSiteInstance=function(){var a="alfresco-createSite-instance";return Alfresco.util.ComponentManager.get(a)||new Alfresco.module.CreateSite(a)};