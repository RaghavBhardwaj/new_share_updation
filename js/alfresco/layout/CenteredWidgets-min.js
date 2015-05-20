define(["alfresco/core/ProcessWidgets","dojo/_base/declare","dojo/text!./templates/CenteredWidgets.html","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dojo/on","alfresco/core/ObjectTypeUtils"],function(l,g,p,c,k,d,h,n,j,o){return g([l],{cssRequirements:[{cssFile:"./css/CenteredWidgets.css"}],templateString:p,widgetMarginLeft:null,widgetMarginRight:null,postCreate:function i(){this.inherited(arguments)},onResize:function b(q){this.alfLog("log","Resizing")},createWidgetDomNode:function m(v,r,q){var u=d.create("span",{className:"centered-widget"},this.containerNode);var t={marginLeft:this.widgetMarginLeft+"px",marginRight:this.widgetMarginRight+"px"};if(v.widthCalc!=0){t.width=v.widthCalc+"px"}h.set(u,t);var s=d.create("div",{},u);return s},allWidgetsProcessed:function f(s){var r=0;var t=0;k.forEach(s,function(v,u){r=r+this.overallWidth(v.domNode);var w=this.overallHeight(v.domNode);t=t>w?t:w},this);if(r>this.overallWidth(this.domNode)){this.alfLog("error","The total declared width of widgets in a CenteredWidget container exceeds the available space",this)}else{var q={width:r+"px"};h.set(this.containerNode,q)}var q={height:t+"px"};h.set(this.domNode,q)},overallWidth:function a(s){var r=h.getComputedStyle(s);var q=n.getMarginBox(s,r);return q.w},overallHeight:function e(s){var r=h.getComputedStyle(s);var q=n.getMarginBox(s,r);return q.h}})});