define(["dojo/_base/declare","alfresco/core/ProcessWidgets","dojo/text!./templates/LeftAndRight.html","dojo/dom-construct","dojo/_base/array"],function(b,e,c,a,g){return b([e],{cssRequirements:[{cssFile:"./css/LeftAndRight.css"},{cssFile:"./css/HorizontalWidgets.css"}],templateString:c,postCreate:function d(){var h=this;if(this.widgets){g.forEach(this.widgets,function(l,j){var k=null;if(l.align=="right"){k=h.createWidgetDomNode(l,h.rightWidgets,l.className)}else{k=h.createWidgetDomNode(l,h.leftWidgets,l.className)}h.createWidget(l,k)})}},createWidgetDomNode:function f(m,i,h){var k=(h)?h+" horizontal-widget":"horizontal-widget";var l=a.create("div",{className:k},i);var j=a.create("div",{},l);return j}})});