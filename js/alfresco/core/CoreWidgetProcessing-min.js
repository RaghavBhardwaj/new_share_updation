define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/ObjectTypeUtils","dijit/registry","dojo/_base/array","dojo/_base/lang","dojo/dom-construct","dojo/dom-style"],function(r,m,n,l,k,w,h,o){return r([m],{processWidgets:function q(y,x){var z=this;if(y&&y instanceof Array){this.widgetProcessingComplete=false;this._processedWidgetCountdown=y.length;this._processedWidgets=[];k.forEach(y,w.hitch(this,"processWidget",x))}},processWidget:function j(x,A,y){if(A!=null&&this.filterWidget(A,y)){var z=this.createWidgetDomNode(A,x,A.className);this.createWidget(A,z,this._registerProcessedWidget,this,y)}},_processedWidgets:null,_processedWidgetCountdown:null,_registerProcessedWidget:function d(z,y){this._processedWidgetCountdown--;this.alfLog("log","Widgets expected: ",this._processedWidgetCountdown);if(z!=null){if(y==null||isNaN(y)){this._processedWidgets.push(z)}else{this._processedWidgets[y]=z}if(z.visibilityConfig!=undefined){var x=w.getObject("visibilityConfig.initialValue",false,z);if(x!=null&&x==false){o.set(z.domNode,"display","none")}var A=w.getObject("visibilityConfig.rules",false,z);if(A!=null){k.forEach(A,function(G,D){var C=G.topic,F=G.attribute,E=G.is,B=G.isNot;if(C!=null&&F!=null&&(E!=null||B!=null)){z.alfSubscribe(C,w.hitch(this,"processVisibility",z,E,B,F))}},this)}}}if(this._processedWidgetCountdown==0){this._processedWidgets=k.filter(this._processedWidgets,function(B){return B!=null},this);this.allWidgetsProcessed(this._processedWidgets);this.widgetProcessingComplete=true}},processVisibility:function i(A,B,y,x,E){var C=w.getObject(x,false,E);var F=(typeof B=="undefined"||B.length==0);var D=(typeof y!="undefined"&&y.length>0);if(D){D=k.some(y,w.hitch(this,"visibilityRuleComparator",C))}if(!D&&typeof B!="undefined"&&B.length>0){F=k.some(B,w.hitch(this,"visibilityRuleComparator",C))}var z=F&&!D;if(z==false){o.set(A.domNode,"display","none")}else{o.set(A.domNode,"display","")}},visibilityRuleComparator:function g(y,x){if(y==null&&x==null){return true}else{if(y!=null&&typeof y.toString=="function"&&x!=null&&typeof x.toString=="function"){return x.toString()==y.toString()}else{return false}}},widgetProcessingComplete:false,allWidgetsProcessed:function b(x){this.alfLog("log","All widgets processed")},createWidgetDomNode:function t(A,y,x){var z=y;if(x!=null&&x!=""){z=h.create("div",{className:x},y)}return h.create("div",{},z)},createWidget:function s(y,z,D,F,C){var B=this;this.alfLog("log","Creating widget: ",y);var x=(y&&y.config&&(typeof y.config==="object"))?y.config:{};if(typeof x.id=="undefined"){if(y.id==null||y.id.trim()==""){x.id=y.name.replace(/\//g,"_")+"___"+this.generateUuid()}else{x.id=y.id}}if(x.generatePubSubScope===true){x.pubSubScope=this.generateUuid()}else{if(x.pubSubScope===undefined){x.pubSubScope=this.pubSubScope}}if(x.pubSubScope==this.pubSubScope){if(this.parentPubSubScope==null){x.parentPubSubScope=""}else{x.parentPubSubScope=this.parentPubSubScope}}else{x.parentPubSubScope=this.pubSubScope}if(x.dataScope===undefined){x.dataScope=this.dataScope}if(x.currentItem===undefined){x.currentItem=this.currentItem}if(x.groupMemberships===undefined){x.groupMemberships=this.groupMemberships}var A=null;var E=[y.name];require(E,function(G){if(l.byId(x.id)!=null){x.id=y.name+"___"+B.generateUuid()}A=new G(x,z);if(B.widgetsToDestroy==null){B.widgetsToDestroy=[];B.widgetsToDestroy.push(A)}B.alfLog("log","Created widget",A);A.startup();if(y.assignTo!=null){B[y.assignTo]=A}if(x.style!=null&&A.domNode!=null){o.set(A.domNode,x.style)}if(D){D.call((F!=null?F:this),A,C)}});if(A==null){this.alfLog("warn","A widget was not declared so that it's modules were included in the loader cache",y,this)}return A},filterWidget:function v(C,x,y){var B=true;if(C.config!=null&&C.config.renderFilter!=null){var A=C.config.renderFilter;if(!n.isArray(A)){this.alfLog("warn","A request was made to filter a widget, but the filter configuration was not an array",this,C);B=true}else{var z=w.getObject("config.renderFilterMethod",false,C);if(z==null||z.trim()=="ALL"){B=k.every(A,w.hitch(this,"processFilterConfig"))}else{B=k.some(A,w.hitch(this,"processFilterConfig"))}}}else{}if(!B&&y!==false){this._registerProcessedWidget(null,x)}return B},processFilterConfig:function p(B,y){var x=false;if(this.filterPropertyExists(B)){var z=this.getRenderFilterPropertyValue(B),A=this.getRenderFilterValues(B);x=k.some(A,w.hitch(this,"processFilter",B,z))}else{if(B.renderOnAbsentProperty==true){x=true}else{x=false}}this.alfLog("log","Render filter result",x,this.currentItem,B);return x},processFilter:function c(z,y,x){if(n.isString(x)){x=w.trim(x)}if(z.negate==null||z.negate==false){return x==y}else{return x!=y}},filterPropertyExists:function u(y){var x=this.currentItem;if(y.target!=null&&this[y.target]!=null){x=this[y.target]}return(n.isString(y.property)&&n.isObject(x)&&w.exists(y.property,x))},getRenderFilterPropertyValue:function a(y){var x=this.currentItem;if(y.target!=null&&this[y.target]!=null){x=this[y.target]}return w.getObject(y.property,false,x)},getCustomRenderFilterProperty:function e(y){var x=null;if(y instanceof Boolean||typeof y=="boolean"){x=y?"folder":"document"}return x},getRenderFilterValues:function f(y){var x=null;if(n.isArray(y.values)){x=y.values}else{if(n.isString(y.values)){x=[y.values]}else{x=[]}}return x}})});