define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Column.html","alfresco/documentlibrary/views/layouts/_MultiItemRendererMixin","alfresco/core/Core","alfresco/core/CoreWidgetProcessing","dojo/dom-construct"],function(e,h,j,i,a,c,b,d){return e([h,j,a,c,b],{cssRequirements:[{cssFile:"./css/Column.css"}],templateString:i,postCreate:function f(){if(this.widgets){this.processWidgets(this.widgets,this.containerNode)}},createWidgetDomNode:function g(n,m,l){var k=k=d.create("TR",{},m);return d.create("TD",{},k)}})});