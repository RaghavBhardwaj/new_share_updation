define(["dojo/_base/declare","dijit/Dialog","alfresco/core/Core","alfresco/core/CoreWidgetProcessing","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/dom-style","dojo/html","dojo/aspect","dijit/registry"],function(h,l,f,d,e,k,g,m,j,i,b,a){return h([l,f,d],{cssRequirements:[{cssFile:"./css/AlfDialog.css"}],i18nRequirements:[{i18nFile:"./i18n/AlfDialog.properties"}],textContent:"",widgetsContent:null,widgetsButtons:null,postMixInProperties:function n(){this.inherited(arguments)},postCreate:function p(){this.inherited(arguments);this.alfSubscribe("ALF_RESIZE_DIALOG",e.hitch(this,"onResizeRequest"));m.add(this.domNode,"alfresco-dialog-AlfDialog");this.bodyNode=g.create("div",{"class":"dialog-body"},this.containerNode,"last");j.set(this.bodyNode,{width:this.contentWidth?this.contentWidth:null,height:this.contentHeight?this.contentHeight:null});if(this.widgetsButtons!=null){this.creatingButtons=true;this.buttonsNode=g.create("div",{"class":"footer"},this.containerNode,"last");this.processWidgets(this.widgetsButtons,this.buttonsNode);this.creatingButtons=false}if(this.widgetsContent!=null){var r=g.create("div",{},this.bodyNode,"last");this.processWidgets(this.widgetsContent,r)}else{if(this.textContent!=null){i.set(this.bodyNode,this.encodeHTML(this.textContent))}}},onResizeRequest:function c(r){this.alfLog("log","Resizing dialog");this.resize()},allWidgetsProcessed:function q(r){if(this.creatingButtons==true){this._buttons=[];k.forEach(r,e.hitch(this,"attachButtonHandler"))}else{k.forEach(this._buttons,function(t,s){if(t.publishPayload==null){t.publishPayload={}}t.publishPayload.dialogContent=r;t.publishPayload.dialogRef=this})}},_buttons:null,attachButtonHandler:function o(s,r){if(s!=null){this._buttons.push(s);b.before(s,"onClick",e.hitch(this,"hide"))}}})});