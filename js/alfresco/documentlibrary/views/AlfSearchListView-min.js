define(["dojo/_base/declare","alfresco/documentlibrary/views/AlfDocumentListView","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/core/Core","dojo/text!./templates/NoSearchResults.html","dojo/_base/array","dojo/dom-construct"],function(f,j,h,k,a,i,g,d){var c=f([h,k,a],{templateString:i,postCreate:function e(){if(this.title!=null){this.titleNode.innerHTML=this.message(this.title)}if(this.suggestions!=null){g.forEach(this.suggestions,function(l,m){d.create("li",{innerHTML:this.message(l),className:"suggestion"},this.suggestionsNode,"last")},this)}}});return f([j],{cssRequirements:[{cssFile:"./css/AlfSearchListView.css"}],widgets:[{name:"alfresco/search/AlfSearchResult"}],renderNoDataDisplay:function b(){this.clearOldView();this.messageNode=d.create("div",{},this.domNode);this.docListRenderer=new c({title:this.message(this.searchAdviceTitle),suggestions:this.searchAdvice},this.messageNode)},searchAdviceTitle:"faceted-search.advice.title:",searchAdvice:[]})});