define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_OnDijitClickMixin","alfresco/renderers/_JsNodeMixin","alfresco/renderers/_PublishPayloadMixin","dojo/text!./templates/PublishAction.html","alfresco/core/Core","service/constants/Default"],function(f,g,k,b,h,e,j,a,c){return f([g,k,b,h,e,a],{cssRequirements:[{cssFile:"./css/PublishAction.css"}],templateString:j,iconClass:"add-icon-16",publishTopic:"ALF_ITEM_SELECTED",postMixInProperties:function d(){if(this.iconClass==null||this.iconClass==""){this.imageSrc=require.toUrl("alfresco/renderers")+"/css/images/add-icon-16.png"}else{this.imageSrc=require.toUrl("alfresco/renderers")+"/css/images/"+this.iconClass+".png"}},onClick:function i(l){var n=(this.publishGlobal!=null)?this.publishGlobal:false;var m=(this.publishToParent!=null)?this.publishToParent:false;var o=this.generatePayload(this.publishPayload,this.currentItem,null,this.publishPayloadType,this.publishPayloadItemMixin,this.publishPayloadModifiers);this.alfPublish(this.publishTopic,o,n,m)}})});