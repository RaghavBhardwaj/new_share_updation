define(["dojo/_base/declare","alfresco/core/PathUtils","service/constants/Default","dojo/_base/lang"],function(f,h,e,b){return f([h],{nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js"],generateUserLink:function l(m){if(m.isDeleted===true){return"<span>"+this.message("details.user.deleted",Alfresco.util.encodeHTML(m.userName))+"</span>"}return this.userProfileLink(m.userName,YAHOO.lang.trim(m.firstName+" "+m.lastName))},userProfileLink:function k(r,s,q,o){if(!YAHOO.lang.isString(r)||r.length===0){return""}var m=Alfresco.util.encodeHTML(YAHOO.lang.isString(s)&&s.length>0?s:r),n=e.URI_TEMPLATES.userprofilepage,p="";if(o||YAHOO.lang.isUndefined(n)||n.length===0||b.getObject("Alfresco.constants.PORTLET")){return"<span>"+m+"</span>"}p=this.uriTemplate("userprofilepage",{userid:r});return'<a href="'+p+'" '+(q||"")+">"+m+"</a>"},siteURL:function i(m,n,o){return this.uriTemplate("sitepage",YAHOO.lang.merge(n||{},{pageid:m}),o)},uriTemplate:function a(m,n,o){if(!(m in e.URI_TEMPLATES)){return null}return this.renderUriTemplate(e.URI_TEMPLATES[m],n,o)},renderUriTemplate:function g(n,p,q){if(n.indexOf("{site}")!==-1){if(p.hasOwnProperty("site")){if(!Alfresco.util.isValueSet(p.site)){n=n.replace("/site/{site}","")}else{if(b.getObject("Alfresco.constants.PAGECONTEXT")&&Alfresco.constants.PAGECONTEXT.length>0){n=n.replace("/site/{site}","/context/"+Alfresco.constants.PAGECONTEXT)}}}else{if(b.getObject("Alfresco.constants.SITE")&&Alfresco.constants.SITE.length>0){p.site=Alfresco.constants.SITE}else{if(b.getObject("Alfresco.constants.PAGECONTEXT")&&Alfresco.constants.PAGECONTEXT.length>0){n=n.replace("/site/{site}","/context/"+Alfresco.constants.PAGECONTEXT)}else{n=n.replace("/site/{site}","")}}}}var o=n,m=/^(http|https):\/\//;while(o!==(o=YAHOO.lang.substitute(o,p))){}if(!m.test(o)){o=this.combinePaths(e.URL_PAGECONTEXT,o)}if(e.PORTLET){if(o.indexOf(e.URL_CONTEXT)===0){o=this.combinePaths("/",o.substring(e.URL_CONTEXT.length))}o=e.PORTLET_URL.replace("$$scriptUrl$$",encodeURIComponent(decodeURIComponent(o.replace(/%25/g,"%2525").replace(/%26/g,"%252526"))))}if(q&&(o.indexOf(location.protocol+"//")!==0)){if(o.substring(0,1)!=="/"){o="/"+o}o=location.protocol+"//"+location.host+o}return o},getActionUrls:function j(t,o,w,s){var q=t.node,x=q.isLink?q.linkedNode.nodeRef:q.nodeRef,v=x.toString(),m=x.uri,r=q.contentURL,y=t.workingCopy||{},p=(t.location.site!=null)?t.location.site.name:null;var n={site:(o!=null)?o:p};try{actionUrls={};actionUrls.downloadUrl=this.combinePaths(e.PROXY_URI,r)+"?a=true";actionUrls.viewUrl=this.combinePaths(e.PROXY_URI,r)+'" target="_blank';actionUrls.documentDetailsUrl=this.generatePageUrl("document-details?nodeRef="+v,n);actionUrls.folderDetailsUrl=this.generatePageUrl("folder-details?nodeRef="+v,n);actionUrls.editMetadataUrl=this.generatePageUrl("edit-metadata?nodeRef="+v,n);actionUrls.inlineEditUrl=this.generatePageUrl("inline-edit?nodeRef="+v,n);actionUrls.managePermissionsUrl=this.generatePageUrl("manage-permissions?nodeRef="+v,n);actionUrls.manageTranslationsUrl=this.generatePageUrl("manage-translations?nodeRef="+v,n);actionUrls.workingCopyUrl=this.generatePageUrl("document-details?nodeRef="+(y.workingCopyNodeRef||v),n);actionUrls.workingCopySourceUrl=this.generatePageUrl("document-details?nodeRef="+(y.sourceNodeRef||v),n);actionUrls.viewGoogleDocUrl=y.googleDocUrl+'" target="_blank';actionUrls.explorerViewUrl=this.combinePaths(w,"/n/showSpaceDetails/",m,n)+'" target="_blank';actionUrls.cloudViewUrl=this.combinePaths(e.URL_SERVICECONTEXT,"cloud/cloudUrl?nodeRef="+v);actionUrls.sourceRepositoryUrl=this.viewInSourceRepositoryURL(t,actionUrls)+'" target="_blank'}catch(u){this.alfLog("error","The following error occurred generating action URLs",u,t,this)}return actionUrls},generatePageUrl:function c(n,m){return this.siteURL(n,m)},viewInSourceRepositoryURL:function d(p,r,o){var q=p.node,n=p.location.repositoryId,m=o,s;if(!n||!m||!m[n]){return"#"}s=q.isContainer?r.folderDetailsUrl:r.documentDetailsUrl;s=s.substring(e.URL_CONTEXT.length);return this.combinePaths(m[n],"/",s)}})});