define(["dojo/_base/declare","alfresco/layout/Twister","dijit/_OnDijitClickMixin","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/text!./templates/AlfDocumentFilters.html","alfresco/documentlibrary/AlfDocumentFilter","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/on"],function(h,b,d,g,p,l,c,k,e,n,j){return h([b,d,g],{i18nRequirements:[{i18nFile:"./i18n/AlfDocumentFilters.properties"}],cssRequirements:[{cssFile:"./css/AlfDocumentFilters.css"}],templateString:p,filterPrefsName:"docListFilterPref",postMixInProperties:function m(){this.inherited(arguments);if(this.showMoreLabel==null){this.showMoreLabel="showMore.label"}this.showMoreLabel=this.message(this.showMoreLabel);if(this.showLessLabel==null){this.showLessLabel="showLess.label"}this.showLessLabel=this.message(this.showLessLabel)},allWidgetsProcessed:function o(q){var r=this;k.forEach(q,c.hitch(this,"addFilter"));if(this.moreFiltersList!=null){n.remove(this.showMoreNode,"hidden")}},addFilter:function i(r,q){if(r.isInstanceOf(l)){r.placeAt(this.filtersNode)}else{this.alfLog("warn","Tried to add a widget that does not inherit from 'alfresco/documentlibrary/AlfDocumentFilter'",r)}},moreFiltersList:null,addMoreFilter:function a(q){if(this.moreFiltersList==null){this.moreFiltersList=[]}n.add(q.domNode,"moreOption hidden");this.moreFiltersList.push(q)},onShowMoreClick:function f(q){n.add(this.showMoreNode,"hidden");n.remove(this.showLessNode,"hidden");k.forEach(this.moreFiltersList,function(s,r){n.remove(s.domNode,"hidden")},this)},onShowLessClick:function f(q){n.remove(this.showMoreNode,"hidden");n.add(this.showLessNode,"hidden");k.forEach(this.moreFiltersList,function(s,r){n.add(s.domNode,"hidden")},this)}})});