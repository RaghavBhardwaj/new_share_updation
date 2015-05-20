define(["dojo/_base/declare","alfresco/core/CoreWidgetProcessing","alfresco/core/ObjectTypeUtils","alfresco/core/JsNode","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/dom-class","dojo/_base/array","dojo/_base/lang","dojo/dom-style"],function(t,m,n,r,b,j,f,v,p){return t([m,b],{cssRequirements:[{cssFile:"./css/_MultiItemRendererMixin.css"}],currentData:null,currentIndex:null,currentItem:null,setData:function h(w){this.currentData=w},augmentData:function u(w){if(!this.currentData){this.alfLog("debug","AlfDocumentListView_augmentData called but this.currentData empty, so using setData instead.");this.setData(w)}else{if(this.currentData.totalRecords&&w.totalRecords&&w.startIndex){this.currentData.totalRecords=w.startIndex+w.totalRecords}this.currentData.numberFound=w.numberFound;if(v.isArray(this.currentData.items)&&v.isArray(w.items)){this.currentData.previousItemCount=this.currentData.items.length;this.currentData.items=this.currentData.items.concat(w.items)}}},clearData:function k(){this.alfLog("info","Clearing currentData.");this.currentData=null},getData:function o(){return this.currentData},renderData:function e(){if(this.rootWidgetSubscriptions==null){this.rootWidgetSubscriptions=[]}f.forEach(this.rootWidgetSubscriptions,function(y,x){if(typeof y.remove==="function"){y.remove()}});if(this.currentData&&this.currentData.items){this.alfLog("log","Rendering data",this.currentData.items);this.currentIndex=this.currentData.previousItemCount||0;this.currentItem=this.currentData.items[this.currentIndex];var w=(this.currentIndex)?this.currentData.items.slice(this.currentIndex):this.currentData.items;f.forEach(w,v.hitch(this,"renderNextItem"));this.allItemsRendered()}else{this.alfLog("warn","No data to render!")}},rootViewWidget:null,renderNextItem:function l(){this.alfLog("log","Rendering item",this.currentData.items[this.currentIndex]);if(this.width!=null){p.set(this.domNode,"width",this.width)}if(this.containerNode!=null){var w=v.clone(this.widgets);this.processWidgets(w,this.containerNode)}else{this.alfLog("warn","There is no 'containerNode' for adding an item to")}},allWidgetsProcessed:function d(w){this.currentIndex++;if(this.currentData&&this.currentData.items&&this.currentData.items.length!=null){f.forEach(w,v.hitch(this,"rootWidgetProcessing"));if(this.currentIndex<this.currentData.items.length){this.currentItem=this.currentData.items[this.currentIndex]}}else{}},allItemsRendered:function i(){},rootWidgetSubscriptions:null,rootWidgetProcessing:function q(x,w){j.add(x.domNode,"alfresco-documentlibrary-views-layout-_MultiItemRendererMixin--item");if(this.rootWidgetSubscriptions==null){this.rootWidgetSubscriptions=[]}if(this.supportsItemSelection==true){this.rootWidgetSubscriptions.push(this.alfSubscribe(this.documentSelectedTopic,v.hitch(this,"onItemSelection",x)));this.rootWidgetSubscriptions.push(this.alfSubscribe(this.documentDeselectedTopic,v.hitch(this,"onItemDeselection",x)))}},onItemSelection:function s(w,x){if(this.compareItems(w.currentItem,x.value)){j.add(w.domNode,"selected")}},onItemDeselection:function c(w,x){if(this.compareItems(w.currentItem,x.value)){j.remove(w.domNode,"selected")}},itemKey:"nodeRef",compareItems:function a(x,w){var z=v.getObject(this.itemKey,null,x);var y=v.getObject(this.itemKey,null,w);return(z!=null&&(z==y))},createWidget:function g(w,x,z,y){if(w==null||w.config==null){w.config={}}if(this.currentItem!=null){if(typeof this.currentItem.jsNode==="undefined"&&this.currentItem.node!=null){this.currentItem.jsNode=new r(this.currentItem.node)}w.config.currentItem=this.currentItem;this.inherited(arguments)}}})});