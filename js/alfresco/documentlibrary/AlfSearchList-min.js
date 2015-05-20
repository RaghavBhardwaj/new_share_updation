define(["dojo/_base/declare","alfresco/documentlibrary/AlfDocumentList","alfresco/core/PathUtils","dojo/_base/array","dojo/_base/lang","dojo/dom-construct","dojo/dom-class","dojo/hash","dojo/io-query","alfresco/core/ArrayUtils"],function(s,n,g,j,v,h,l,b,r,d){return s([n],{i18nRequirements:[{i18nFile:"./i18n/AlfSearchList.properties"}],cssRequirements:[{cssFile:"./css/AlfSearchList.css"}],postMixInProperties:function f(){this.alfSubscribe("ALF_DOCLIST_SORT",v.hitch(this,"onSortRequest"));this.alfSubscribe("ALF_DOCLIST_SORT_FIELD_SELECTION",v.hitch(this,"onSortFieldSelection"));this.alfSubscribe("ALF_RETRIEVE_DOCUMENTS_REQUEST_SUCCESS",v.hitch(this,"onSearchLoadSuccess"));this.alfSubscribe("ALF_RETRIEVE_DOCUMENTS_REQUEST_FAILURE",v.hitch(this,"onDataLoadFailure"));this.alfSubscribe("ALF_SET_SEARCH_TERM",v.hitch(this,"onSearchTermRequest"));this.alfSubscribe("ALF_INCLUDE_FACET",v.hitch(this,"onIncludeFacetRequest"));this.alfSubscribe("ALF_APPLY_FACET_FILTER",v.hitch(this,"onApplyFacetFilter"));this.alfSubscribe("ALF_REMOVE_FACET_FILTER",v.hitch(this,"onRemoveFacetFilter"));this.alfSubscribe("ALF_SEARCHLIST_SCOPE_SELECTION",v.hitch(this,"onScopeSelection"));this.alfSubscribe(this.reloadDataTopic,v.hitch(this,this.reloadData));this.alfSubscribe(this.scrollNearBottom,v.hitch(this,"onScrollNearBottom"));this.alfSubscribe(this.requestInProgressTopic,v.hitch(this,"onRequestInProgress"));this.alfSubscribe(this.requestFinishedTopic,v.hitch(this,"onRequestFinished"));this.noViewSelectedMessage=this.message("searchlist.no.view.message");this.noDataMessage=this.message("searchlist.no.data.message");this.fetchingDataMessage=this.message("searchlist.loading.data.message");this.renderingViewMessage=this.message("searchlist.rendering.data.message");this.fetchingMoreDataMessage=this.message("searchlist.loading.data.message");this.dataFailureMessage=this.message("searchlist.data.failure.message");this.facetFilters={}},reloadData:function q(){this.resetResultsList();this.loadData()},searchTerm:"",onSearchTermRequest:function u(y){this.alfLog("log","Setting search term",y,this);var x=v.getObject("searchTerm",false,y);if(x==null){this.alfLog("warn","No searchTerm provided on request",y,this)}else{if(x===this.searchTerm){if(this.requestInProgress===true){}else{var w=r.queryToObject(b());if(w.facetFilters!=null&&w.facetFilters!==""){w.searchTerm=this.searchTerm;delete w.facetFilters;this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:r.objectToQuery(w),type:"HASH"},true)}else{this.resetResultsList();this.loadData()}}}else{this.searchTerm=x;var w=r.queryToObject(b());w.searchTerm=this.searchTerm;delete w.facetFilters;this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:r.objectToQuery(w),type:"HASH"},true)}}},selectedScope:"REPO",onScopeSelection:function i(y){this.alfLog("log","Scope selection received",y,this);var x=v.getObject("value",false,y);if(x==null){this.alfLog("warn","No 'value' attribute provided in scope selection payload",y,this)}else{if(x===this.selectedScope){this.alfLog("log","Scope requested is currently set",x,this)}else{var w=r.queryToObject(b());this.selectedScope=x;if(x==="REPO"){w.repo="true";w.allSites="false";delete w.siteId;this.siteId=""}else{if(x==="ALL_SITES"){w.repo="false";w.allSites="true";delete w.siteId;this.siteId=""}else{w.repo="false";w.allSites="true";w.siteId=x;this.siteId=x}}delete w.facetFilters;this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:r.objectToQuery(w),type:"HASH"},true)}}},facetFields:"",onIncludeFacetRequest:function k(w){this.alfLog("log","Adding facet filter",w,this);var x=v.getObject("qname",false,w);if(x==null){this.alfLog("warn","No qname provided when adding facet field",w,this)}else{this.facetFields=(this.facetFields!="")?this.facetFields+","+x:x}},facetFilters:null,onApplyFacetFilter:function p(x){this.alfLog("log","Filtering on facet",x,this);var w=v.getObject("filter",false,x);if(w==null){this.alfLog("warn","No filter provided when filtering by facet",x,this)}else{this.facetFilters[w]=true;this.updateFilterHash(w,"add")}},onRemoveFacetFilter:function o(w){this.alfLog("log","Removing facet filter",w,this);delete this.facetFilters[w.filter];this.updateFilterHash(w.filter,"remove")},updateFilterHash:function m(z,A){var y=r.queryToObject(b()),w=((y.facetFilters)?y.facetFilters:""),x=(w==="")?[]:w.split(",");if(A==="add"&&!d.arrayContains(x,z)){x.push(z)}else{if(A==="remove"&&d.arrayContains(x,z)){x.splice(x.indexOf(z),1)}}if(x.length<1){delete y.facetFilters}else{y.facetFilters=x.join()}this.alfPublish("ALF_NAVIGATE_TO_PAGE",{url:r.objectToQuery(y),type:"HASH"},true)},onChangeFilter:function e(z){this.alfLog("log","Filter change detected",z,this);if(this._payloadContainsUpdateableVar(z)){var w=v.getObject("searchTerm",false,z);if(w!=this.searchTerm){this.facetFilters={}}var y=v.getObject("facetFilters",false,z);if(y!=null){var x=z.facetFilters={};var A=y.split(",");j.forEach(A,function(B){x[B]=true},this)}else{this.facetFilters={}}v.mixin(this,z);this.resetResultsList();this.loadData()}},loadData:function a(){if(this.requestInProgress&&this.blockConcurrentRequests){this.alfLog("log","Search request ignored because progress is already in progress")}else{if(this.currentRequestId){this.alfPublish("ALF_STOP_SEARCH_REQUEST",{requestId:this.currentRequestId},true)}this.alfPublish(this.requestInProgressTopic,{});this.showLoadingMessage();var y="";for(var x in this.facetFilters){y=y+x.replace(/\.__.u/g,"").replace(/\.__/g,"")+","}y=y.substring(0,y.length-1);var w=this.repo==="true"||!(this.allSites==="true"||(this.siteId!=null&&this.siteId!==""));this.currentRequestId=this.generateUuid();var z={term:this.searchTerm,facetFields:this.facetFields,filters:y,sortAscending:this.sortAscending,sortField:this.sortField,site:this.siteId,rootNode:this.rootNode,repo:w,requestId:this.currentRequestId};if(this.useInfiniteScroll){z.startIndex=(this.currentPage-1)*this.currentPageSize;z.pageSize=this.currentPageSize}z.alfResponseTopic=this.pubSubScope+"ALF_RETRIEVE_DOCUMENTS_REQUEST";this.alfPublish("ALF_SEARCH_REQUEST",z,true)}},onSearchLoadSuccess:function c(C){this.alfLog("log","Search Results Loaded",C,this);var z=C.response;this._currentData=z;var w=this.viewMap[this._currentlySelectedView];if(w!=null){this.showRenderingMessage();if(this.useInfiniteScroll){w.augmentData(z);this._currentData=w.getData()}else{w.setData(z)}w.renderView(this.useInfiniteScroll);this.showView(w)}var B=v.getObject("response.facets",false,C);var A=v.getObject("requestConfig.query.filters",false,C);if(B!=null){for(var x in B){this.alfPublish("ALF_FACET_RESULTS_"+x,{facetResults:B[x],activeFilters:A})}}var y=this._currentData.numberFound!=-1?this._currentData.numberFound:0;if(y!=null){this.alfPublish("ALF_SEARCH_RESULTS_COUNT",{count:y,label:y})}this.alfPublish(this.requestFinishedTopic,{});this.alfPublish("ALF_RESIZE_SIDEBAR",{})},resetResultsList:function t(){this.startIndex=0;this.currentPage=1;this.hideChildren(this.domNode);this.alfPublish(this.clearDocDataTopic)}})});