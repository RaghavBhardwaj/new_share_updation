define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","service/constants/Default","alfresco/core/PathUtils","alfresco/core/NodeUtils","dojo/_base/lang","dojo/json","dojo/hash"],function(h,b,d,e,j,k,a,i,g){return h([b,d,j],{constructor:function c(l){a.mixin(this,l);this.alfSubscribe("ALF_SEARCH_REQUEST",a.hitch(this,this.onSearchRequest));this.alfSubscribe("ALF_STOP_SEARCH_REQUEST",a.hitch(this,this.onStopRequest))},pageSize:25,query:"",repo:true,rootNode:"alfresco://company/home",site:"",sort:"",sortAscending:true,startIndex:0,tag:"",onSearchRequest:function f(r){if(r==null||r.term==null){this.alfLog("warn","A request was made to perform a search but no 'term' attribute was provided",r,this)}else{var l=(r.alfResponseTopic!=null)?r.alfResponseTopic:"ALF_SEARCH_REQUEST";var n=e.PROXY_URI+"slingshot/search/";var q=this.query;if(r.query==null){var s={};for(key in r){switch(key){case"alfTopic":case"alfResponseTopic":case"term":case"tag":case"startIndex":case"sort":case"site":case"rootNode":case"repo":case"pageSize":case"facetFields":case"filters":case"sortAscending":case"sortField":case"requestId":break;default:s[key]=r[key]}}q=i.stringify(s);if(q=="{}"){q=""}}else{q=r.query}var o="";if(r.sortField!=null&&r.sortField==""){}else{if(r.sortField==="Relevance"){o=""}else{o=((r.sortField!=null)?r.sortField:this.sort)+"|"+((r.sortAscending!=null)?r.sortAscending:this.sortAscending)}}var p={facetFields:(r.facetFields!=null)?r.facetFields:"{http://www.alfresco.org/model/content/1.0}content.mimetype,{http://www.alfresco.org/model/content/1.0}modifier.__,{http://www.alfresco.org/model/content/1.0}creator.__,{http://www.alfresco.org/model/content/1.0}description.__",filters:(r.filters!=null)?r.filters:"",term:r.term,tag:(r.tag!=null)?r.tag:this.tag,startIndex:(r.startIndex!=null)?r.startIndex:this.startIndex,sort:o,site:(r.site!=null)?r.site:this.site,rootNode:(r.rootNode!=null)?r.rootNode:this.rootNode,repo:(r.repo!=null)?r.repo:this.repo,query:q,pageSize:(r.pageSize!=null)?r.pageSize:this.pageSize,noCache:new Date().getTime()};var m={requestId:r.requestId,alfTopic:l,url:n,query:p,method:"GET",callbackScope:this};this.serviceXhr(m)}}})});