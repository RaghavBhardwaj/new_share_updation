define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/Tree.html","alfresco/core/Core","service/constants/Default","alfresco/documentlibrary/_AlfDocumentListTopicMixin","alfresco/services/_NavigationServiceTopicMixin","dojo/dom-construct","dojo/_base/lang","dojo/_base/array","alfresco/navigation/TreeStore","dijit/tree/ObjectStoreModel","dijit/Tree","dojo/aspect","dojo/when"],function(t,o,l,u,p,n,d,a,j,v,k,g,f,r,q,i){return t([o,l,p,d,a],{i18nRequirements:[{i18nFile:"./i18n/Tree.properties"}],cssRequirements:[{cssFile:"./css/Tree.css"}],customCssClasses:"",templateString:u,siteId:null,containerId:null,rootNode:null,rootLabel:"documentlibrary.root.label",rootValue:"",filterPrefsName:"docListTreePref",getTargetUrl:function c(){var w=null;if(this.siteId!=null&&this.containerId!=null){w=n.PROXY_URI+"slingshot/doclib/treenode/site/"+this.siteId+"/documentlibrary"}else{if(this.rootNode!=null){w=n.PROXY_URI+"slingshot/doclib/treenode/node/alfresco/company/home"}else{this.alfLog("error","Cannot create a tree without 'siteId' and 'containerId' or 'rootNode' attributes",this)}}return w},getTargetQueryObject:function h(){var w={perms:"false",children:"false",max:"-1"};if(this.siteId!=null&&this.containerId!=null){}else{if(this.rootNode!=null){w.max="500";w.libraryRoot=this.rootNode}}return w},postCreate:function s(){this.treeStore=new g({target:this.getTargetUrl(),targetQueryObject:this.getTargetQueryObject()});this.treeModel=new f({root:{id:this.id+"_ROOT",name:this.encodeHTML(this.message(this.rootLabel)),value:this.rootValue,path:this.rootValue+"/"},store:this.treeStore,query:{}});this.tree=new r({model:this.treeModel,showRoot:true,onClick:v.hitch(this,"onClick"),onOpen:v.hitch(this,"onNodeExpand"),onClose:v.hitch(this,"onNodeCollapse")});this.tree.placeAt(this.domNode);this.tree.startup()},onClickFilterId:"path",onClick:function e(y,x,w){this.alfLog("log","Tree Node clicked",y,x,w);this.alfPublish(this.navigateToPageTopic,{url:this.onClickFilterId+"="+y.path,type:"HASH"})},onNodeExpand:function b(x,w){if(w!=null&&w._loadDeferred!=null){this.alfLog("log","Wait for node expand before rezize",w._loadDeferred);w._loadDeferred.then(v.hitch(this,"requestSidebarResize"))}},onNodeCollapse:function b(x,w){if(w!=null&&w._collapseDeferred!=null){this.alfLog("log","Wait for node collapse before rezize",w._collapseDeferred);w._loadDeferred.then(v.hitch(this,"requestSidebarResize"))}},requestSidebarResize:function m(){this.alfPublish("ALF_RESIZE_SIDEBAR",{})}})});