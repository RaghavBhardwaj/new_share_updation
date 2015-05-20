define(["dojo/_base/declare","alfresco/core/Core","alfresco/documentlibrary/_AlfDocumentListTopicMixin","alfresco/renderers/_PublishPayloadMixin","alfresco/menus/AlfMenuItem","dojo/_base/array","dojo/_base/lang","service/constants/Default","alfresco/core/ArrayUtils"],function(i,c,g,h,e,k,b,d,j){return i([c,g,h],{filterActions:false,allowedActions:null,addActions:function a(){if(this.customActions!=null&&this.customActions.length>0){k.forEach(this.customActions,b.hitch(this,"addAction"))}else{if(this.currentItem.actions&&this.currentItem.actions.length>0){k.forEach(this.currentItem.actions,b.hitch(this,"addAction"))}}},addAction:function f(n,l){if(this.filterActions===false||j.arrayContains(this.allowedActions,n.id)){this.alfLog("log","Adding action",n);var o=(n.publishPayload!=null)?n.publishPayload:{document:this.currentItem,action:n};var m=new e({label:n.label,iconImage:d.URL_RESCONTEXT+"components/documentlibrary/actions/"+n.icon+"-16.png",type:n.type,pubSubScope:this.pubSubScope,publishTopic:(n.publishTopic!=null)?n.publishTopic:this.singleDocumentActionTopic,publishPayload:this.generatePayload(o,this.currentItem,null,n.publishPayloadType,n.publishPayloadItemMixin,n.publishPayloadModifiers)});this.actionsGroup.addChild(m)}else{this.alfLog("log","Skipping action as it's missing from whitelist: "+n)}}})});