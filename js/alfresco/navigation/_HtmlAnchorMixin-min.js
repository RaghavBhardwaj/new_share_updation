define(["dojo/_base/declare","alfresco/core/Core","alfresco/services/_NavigationServiceTopicMixin","service/constants/Default","dojo/_base/lang","dojo/_base/array","dojo/query","dojo/NodeList","dojo/NodeList-manipulate"],function(h,e,k,g,d,j,l,a,i){return h([e,k],{cssRequirements:[{cssFile:"./css/_HtmlAnchorMixin.css"}],makeAnchor:function f(m,n){if(m!=null){var o;if(typeof n=="undefined"||n==null||n==""||n==this.sharePageRelativePath){o=g.URL_PAGECONTEXT+m}else{if(n==this.contextRelativePath){o=g.URL_CONTEXT+m}else{if(n==this.fullPath){o=m}}}this._addAnchors(o)}},_addAnchors:function c(m){j.forEach(this.getAnchorTargetSelectors(),function(n,o){dojo.query(n,this.domNode).wrapInner("<a tabIndex='-1' class='alfresco-navigation-_HtmlAnchorMixin' title='"+this.label+"' href='"+m+"'></a>")},this)},getAnchorTargetSelectors:function b(){return[]}})});