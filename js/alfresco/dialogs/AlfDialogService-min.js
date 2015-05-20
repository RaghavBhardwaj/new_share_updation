define(["dojo/_base/declare","alfresco/core/Core","dojo/_base/lang","alfresco/dialogs/AlfDialog","alfresco/forms/Form","dojo/_base/array"],function(h,c,b,m,a,i){return h([c],{constructor:function d(){this.publishTopic="ALF_CREATE_FORM_DIALOG_REQUEST";this.alfSubscribe(this.publishTopic,b.hitch(this,"onCreateFormDialogRequest"));this.alfSubscribe("ALF_CREATE_DIALOG_REQUEST",b.hitch(this,this.onCreateDialogRequest))},_formConfirmationTopic:"ALF_CREATE_FORM_DIALOG_MIXIN_CONFIRMATION_TOPIC",widgets:null,defaultFormDialogConfig:{dialogTitle:"",dialogConfirmationButtonTitle:"OK",dialogCancellationButtonTitle:"Cancel"},onCreateDialogRequest:function e(o){var n={title:this.message(o.dialogTitle),widgetsContent:o.widgetsContent,widgetsButtons:o.widgetsButtons,contentWidth:o.contentWidth?o.contentWidth:null,contentHeight:o.contentHeight?o.contentHeight:null};this.dialog=new m(n);if(o.publishOnShow){i.forEach(o.publishOnShow,b.hitch(this,this.publishOnShow))}this.dialog.show()},publishOnShow:function g(n){if(n.publishTopic&&n.publishPayload){this.alfPublish(n.publishTopic,n.publishPayload)}else{this.alfLog("warn","A request was made to publish data when a dialog is loaded, but either the topic or payload was missing",n,this)}},onCreateFormDialogRequest:function j(s){if(s.widgets==null){this.alfLog("warn","A request was made to display a dialog but no 'widgets' attribute has been defined",s,this)}else{if(s.formSubmissionTopic==null){this.alfLog("warn","A request was made to display a dialog but no 'formSubmissionTopic' attribute has been defined",s,this)}else{try{var n=this.generateUuid();var o=n+this._formConfirmationTopic;this.alfSubscribe(o,b.hitch(this,"onDialogConfirmation"));var p=b.clone(this.defaultFormDialogConfig);b.mixin(p,s);p.pubSubScope=n;p.parentPubSubScope=this.parentPubSubScope;p.subcriptionTopic=o;var t=this.createFormConfig(p.widgets);var q=this.createDialogConfig(p,t);this.dialog=new m(q);this.dialog.show()}catch(r){this.alfLog("error","The following error occurred creating a dialog for defined configuration",r,this.dialogConfig,this)}}}},createDialogConfig:function l(n,p){var o={title:this.message(n.dialogTitle),pubSubScope:n.pubSubScope,parentPubSubScope:n.parentPubSubScope,widgetsContent:[p],widgetsButtons:[{name:"alfresco/buttons/AlfButton",config:{label:n.dialogConfirmationButtonTitle,disableOnInvalidControls:true,publishTopic:this._formConfirmationTopic,publishPayload:{formSubmissionTopic:n.formSubmissionTopic}}},{name:"alfresco/buttons/AlfButton",config:{label:n.dialogCancellationButtonTitle,publishTopic:"ALF_CLOSE_DIALOG"}}]};return o},createFormConfig:function f(n){var o={name:"alfresco/forms/Form",config:{displayButtons:false,widgets:n}};return o},formSubmissionTopic:null,onDialogConfirmation:function k(o){if(o!=null&&o.dialogContent!=null&&o.dialogContent.length==1&&typeof o.dialogContent[0].getValue==="function"){var n=o.dialogContent[0].getValue();if(o.subcriptionTopic){this.alfUnsubscribe(o.subcriptionTopic)}if(o.dialogReference!=null){o.dialogReference.destroyRecursive()}this.alfPublish(o.formSubmissionTopic,n,true)}else{this.alfLog("error","The format of the dialog content was not as expected, the 'formSubmissionTopic' will not be published",o,this)}}})});