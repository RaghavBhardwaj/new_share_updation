define(["dojo/_base/declare","alfresco/renderers/Thumbnail","dojo/text!./templates/GalleryThumbnail.html","dojo/_base/lang","dojo/dom-style","dojo/dom-class","alfresco/layout/LeftAndRight","alfresco/renderers/Selector","alfresco/renderers/MoreInfo","service/constants/Default"],function(j,g,o,e,k,m,h,c,b,i){return j([g],{nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js"],cssRequirements:[{cssFile:"./css/GalleryThumbnail.css"}],templateString:o,customClasses:"gallery",getFolderImage:function l(){return i.URL_RESCONTEXT+"components/documentlibrary/images/folder-256.png"},renditionName:"imgpreview",resize:function n(q){if(this.imgNode!=null){var p=q.w;k.set(this.thumbnailNode,"width",p);k.set(this.thumbnailNode,"height",p);k.set(this.imgNode,"width",p);k.set(this.imgNode,"minHeight",p);k.set(this.selectBarNode,"width",p);k.set(this.displayNameNode,"width",p)}},postCreate:function d(){this.inherited(arguments);this.selectBarWidget=new h({widgets:this.getSelectBarWidgets()},this.selectBarNode)},getSelectBarWidgets:function f(){return[{name:"alfresco/renderers/Selector",align:"left",config:{currentItem:this.currentItem}},{name:"alfresco/renderers/MoreInfo",align:"right",config:{currentItem:this.currentItem}}]},focus:function a(){this.domNode.focus();m.remove(this.titleNode,"share-hidden")},blur:function(){m.add(this.titleNode,"share-hidden")}})});