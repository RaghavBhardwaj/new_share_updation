define(["dojo/_base/declare","alfresco/core/Core","service/constants/Default","dojo/_base/lang","dojo/json","dojo/text!./responseTemplates/SearchTest/FirstRequest.json","dojo/text!./responseTemplates/SearchTest/SecondRequest.json","dojo/text!./responseTemplates/SearchTest/ThirdRequest.json","dojo/text!./responseTemplates/SearchTest/FacetedRequest.json"],function(f,c,d,b,g,h,i,j,k){return f([c],{queryCount:0,constructor:function a(l){b.mixin(this,l);this.alfSubscribe("ALF_SEARCH_REQUEST",b.hitch(this,"onSearchRequest"))},onSearchRequest:function e(n){var l=(n.alfResponseTopic!=null)?n.alfResponseTopic:"ALF_SEARCH_REQUEST",m=h;++this.queryCount;switch(this.queryCount){case 2:m=i;break;case 3:m=j;break;case 4:m=k}this.alfPublish(l,{response:g.parse(m)})}})});