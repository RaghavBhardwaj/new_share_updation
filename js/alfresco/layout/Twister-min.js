define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Twister.html","alfresco/core/Core","alfresco/core/CoreWidgetProcessing","dojo/_base/lang","dojo/_base/array"],function(e,g,j,i,c,a,b,f){return e([g,j,c,a],{cssRequirements:[{cssFile:"./css/Twister.css"}],templateString:i,postMixInProperties:function(){if(this.label!=null){this.label=this.encodeHTML(this.message(this.label))}},postCreate:function h(){if(this.label!=null&&this.label!=""){Alfresco.util.createTwister(this.labelNode,this.filterPrefsName)}if(this.widgets){this.processWidgets(this.widgets)}},allWidgetsProcessed:function d(k){f.forEach(k,b.hitch(this,function(m,l){m.placeAt(this.contentNode)}),this)}})});