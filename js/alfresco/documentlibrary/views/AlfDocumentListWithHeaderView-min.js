define(["dojo/_base/declare","alfresco/documentlibrary/views/AlfDocumentListView","dojo/text!./templates/AlfDocumentListWithHeaderView.html","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dijit/registry"],function(d,j,i,b,e,c,g,a){return d([j],{cssRequirements:[{cssFile:"./css/AlfDocumentListWithHeaderView.css"}],templateString:i,postCreate:function f(){this.inherited(arguments);this.renderHeader()},renderHeader:function h(){this.currentItem={};if(this.widgetsForHeader!=null){this.processWidgets(this.widgetsForHeader,this.headerNode)}else{this.alfLog("warn","A view containing a header was used in a model, but no 'widgetsForHeader' attribute was defined",this)}this.currentItem=null}})});