define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/documentlibrary/views/layouts/_MultiItemRendererMixin","dojo/text!./templates/AlfDocument.html","alfresco/core/Core","alfresco/core/CoreWidgetProcessing","dojo/_base/lang","dojo/_base/array","dijit/registry","dojo/dom-construct"],function(i,k,o,b,n,e,c,d,j,a,h){return i([k,o,b,e,c],{cssRequirements:[{cssFile:"./css/AlfDocument.css"}],templateString:n,widgets:null,postMixInProperties:function m(){this.alfSubscribe("ALF_RETRIEVE_SINGLE_DOCUMENT_REQUEST_SUCCESS",d.hitch(this,"onDocumentLoaded"))},onDocumentLoaded:function l(p){if(d.exists("response.item",p)){this.currentItem=p.response.item;this.renderDocument()}else{this.alfLog("warn","Document data was provided but the 'response.item' attribute was not found",p,this)}},renderDocument:function g(){if(this.containerNode!=null){j.forEach(a.findWidgets(this.containerNode),d.hitch(this,"destroyWidget"));h.empty(this.containerNode)}if(this.currentItem!=null&&this.containerNode!=null){this.processWidgets(this.widgets,this.containerNode)}else{this.alfLog("warn","It was not possible to render an item because the item either doesn't exist or there is no DOM node for it",this)}},destroyWidget:function f(q,p){if(typeof q.destroyRecursive==="function"){q.destroyRecursive()}}})});