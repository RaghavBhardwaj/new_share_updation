define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","alfresco/services/_PreferenceServiceTopicMixin","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/_base/lang","service/constants/Default"],function(r,k,g,c,b,t,j){return r([k,g,c,b],{nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js"],_wrappedService:null,constructor:function s(u){t.mixin(this,u);if(Alfresco&&Alfresco.service&&typeof Alfresco.service.Preferences==="function"){this._wrappedService=new Alfresco.service.Preferences();this.alfSubscribe(this.getPreferenceTopic,t.hitch(this,"getPreference"));this.alfSubscribe(this.setPreferenceTopic,t.hitch(this,"setPreference"));this.alfSubscribe(this.showFoldersTopic,t.hitch(this,"onShowFolders"));this.alfSubscribe(this.showPathTopic,t.hitch(this,"onShowPath"));this.alfSubscribe(this.showSidebarTopic,t.hitch(this,"onShowSidebar"));this.alfSubscribe(this.viewSelectionTopic,t.hitch(this,"onViewSelection"));this.alfSubscribe(this.addFavouriteDocumentTopic,t.hitch(this,"onAddFavouriteDocument"));this.alfSubscribe(this.removeFavouriteDocumentTopic,t.hitch(this,"onRemoveFavouriteDocument"))}},localPreferences:null,getPreference:function l(u){if(!t.exists("callback",u)||typeof u.callback!=="function"||!t.exists("callbackScope",u)){this.alfLog("warn","A request was made to get a preference, but the callback information was missing",u)}else{if(!t.exists("preference",u)){this.alfLog("warn","A request was made to get a preference, but no 'preference' attribute was provided",u)}else{u.callback.apply(u.callbackScope,[t.getObject(u.preference,false,this.localPreferences)])}}},setPreference:function o(w){if(!t.exists("preference",w)){this.alfLog("warn","A request was made to set a preference, but no 'preference' attribute was provided",w)}else{if(!t.exists("value",w)){this.alfLog("warn","A request was made to set a preference, but no 'value' attribute was provided",w)}else{if(t.getObject(w.preference,false,this.localPreferences)==w.value){this.alfLog("log","Intentionally not saving a preference that hasn't changed")}else{var x=this,v=j.PROXY_URI+"api/people/"+encodeURIComponent(j.USERNAME)+"/preferences";var u={};t.setObject(w.preference,w.value,u);this.serviceXhr({url:v,data:u,method:"POST"});t.setObject(w.preference,w.value,this.localPreferences)}}}},onShowFolders:function e(u){if(u&&u.selected!=null){this.setPreference({preference:"org.alfresco.share.documentList.showFolders",value:u.selected})}},onShowPath:function m(u){if(u&&u.selected!=null){this.setPreference({preference:"org.alfresco.share.documentList.hideNavBar",value:!u.selected})}},onShowSidebar:function h(u){if(u&&u.selected!=null){this.setPreference({preference:"org.alfresco.share.documentList.showSidebar",value:u.selected})}},onViewSelection:function a(u){if(u&&u.value!=null&&u.value!=="Abstract"){this.setPreference({preference:"org.alfresco.share.documentList.viewRendererName",value:u.value})}},onAddFavouriteDocument:function i(v){if(v!=null&&v.node!=null&&v.node.jsNode!=null){var u={successCallback:{fn:this.onAddFavouriteDocumentSuccess,scope:this,obj:v},failureCallback:{fn:this.onAddFavouriteDocumentFailure,scope:this,obj:v}};var w=v.node.jsNode.isContainer?Alfresco.service.Preferences.FAVOURITE_FOLDERS:Alfresco.service.Preferences.FAVOURITE_DOCUMENTS;this._wrappedService.add(w,v.node.jsNode.nodeRef.nodeRef,u)}},onRemoveFavouriteDocument:function d(v){if(v!=null&&v.node!=null&&v.node.jsNode!=null){var u={successCallback:{fn:this.onRemoveFavouriteDocumentSuccess,scope:this,obj:v},failureCallback:{fn:this.onRemoveFavouriteDocumentFailure,scope:this,obj:v}};var w=v.node.jsNode.isContainer?Alfresco.service.Preferences.FAVOURITE_FOLDERS:Alfresco.service.Preferences.FAVOURITE_DOCUMENTS;this._wrappedService.remove(w,v.node.jsNode.nodeRef.nodeRef,u)}},onAddFavouriteDocumentSuccess:function n(v,u){this.alfLog("log","Successfully favourited a document",v,u);this.alfPublish(this.addFavouriteDocumentSuccessTopic,{response:v,requestConfig:u})},onAddFavouriteDocumentFailure:function p(v,u){this.alfLog("error","Failed to favourite a document",v,u);this.alfPublish(this.addFavouriteDocumentFailureTopic,{response:v,requestConfig:u})},onRemoveFavouriteDocumentSuccess:function f(v,u){this.alfLog("log","Successfully removed a document favourite",v,u);this.alfPublish(this.removeFavouriteDocumentSuccessTopic,{response:v,requestConfig:u})},onRemoveFavouriteDocumentFailure:function q(v,u){this.alfLog("error","Failed to remove a document favourite",v,u);this.alfPublish(this.removeFavouriteDocumentFailureTopic,{response:v,requestConfig:u})}})});