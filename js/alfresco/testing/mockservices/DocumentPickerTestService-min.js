define(["dojo/_base/declare","alfresco/core/Core","service/constants/Default","dojo/_base/lang","dojo/json","dojo/text!./responseTemplates/DocumentPickerTest/RecentSites.json","dojo/text!./responseTemplates/DocumentPickerTest/FavouriteSites.json"],function(g,c,e,b,h,d,k){return g([c],{constructor:function a(l){b.mixin(this,l);this.alfSubscribe("ALF_RETRIEVE_DOCUMENTS_REQUEST",b.hitch(this,"onRetrieveDocumentsRequest"));this.alfSubscribe("ALF_GET_RECENT_SITES",b.hitch(this,"getRecentSites"));this.alfSubscribe("ALF_GET_FAVOURITE_SITES",b.hitch(this,"getFavouriteSites"))},onRetrieveDocumentsRequest:function i(o){var p=this;var l=o.alfResponseTopic+"_SUCCESS";var n=o.nodeRef.replace(/\//g,"_").replace(/:/g,"");var m=dojo.moduleUrl("alfresco/testing/mockservices/responseTemplates/DocumentPickerTest/"+n).slice(0,-1)+".json";require(["dojo/text!"+m],function(q){p.alfPublish(l,{response:h.parse(q)})})},getRecentSites:function f(m){var l=m.alfResponseTopic+"_SUCCESS";this.alfPublish(l,{response:h.parse(d)})},getFavouriteSites:function j(m){var l=m.alfResponseTopic+"_SUCCESS";this.alfPublish(l,{response:h.parse(k)})}})});