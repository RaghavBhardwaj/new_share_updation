define(["dojo/_base/declare","alfresco/preview/AlfDocumentPreviewPlugin","dojo/_base/lang","dojo/aspect"],function(d,c,g,a){var b=d([c],{nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js","/components/preview/web-preview.js","/components/preview/PdfJs.js","/components/preview/pdfjs/compatibility.js","/components/preview/pdfjs/pdf.js","/components/preview/pdfjs/pdf.worker.js","/components/preview/spin.js","/yui/tabview/tabview.js"],cssRequirements:[{cssFile:"/components/preview/PdfJs.css"}],constructor:function f(h){g.mixin(h);this.pages=[];this.pageText=[];this.widgets={};this.documentConfig={};this.wp=h.previewManager;this.attributes=Alfresco.util.deepCopy(this.attributes);this.wp.options={};this.wp.options.nodeRef=this.wp.nodeRef;this.wp.options.name=this.wp.name;this.wp.options.size=this.wp.size;this.wp.options.mimeType=this.wp.mimeType;this.wp.msg=this.wp.message;this.onPdfLoaded=new YAHOO.util.CustomEvent("pdfLoaded",this);this.onResize=new YAHOO.util.CustomEvent("resize",this);var i=this;a.before(this,"display",function(){i.onComponentsLoaded()})}});var e=g.getObject("Alfresco.WebPreview.prototype.Plugins.PdfJs.prototype");if(e!=null){g.mixin(b.prototype,e)}return b});