define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/renderers/_JsNodeMixin","dojo/text!./templates/Comments.html","alfresco/core/Core","alfresco/core/UrlUtils","dojo/dom-class"],function(d,e,j,f,i,a,b,g){return d([e,j,f,a,b],{i18nRequirements:[{i18nFile:"./i18n/Comments.properties"}],cssRequirements:[{cssFile:"./css/Comments.css"}],templateString:i,postMixInProperties:function h(){this.commentLabel=this.message("comments.label");if(this.currentItem.node.isContainer){this.commentTooltip=this.message("comments.folder.tooltip")}else{this.commentTooltip=this.message("comments.document.tooltip")}this.url=this.getActionUrls(this.currentItem,null,null)[this.currentItem.node.isContainer?"folderDetailsUrl":"documentDetailsUrl"]+"#comment";this.commentCount=null;if(this.currentItem.node.properties["fm:commentCount"]!==undefined){this.commentCount=this.currentItem.node.properties["fm:commentCount"]}},postCreate:function c(){if(this.commentCount!=null){g.remove(this.countNode,"hidden")}}})});