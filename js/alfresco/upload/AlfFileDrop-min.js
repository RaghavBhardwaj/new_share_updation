define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/AlfFileDrop.html","alfresco/core/Core","dojo/_base/lang","dojo/on"],function(d,b,j,k,f,a,g){return d([b,j,f],{cssRequirements:[{cssFile:"./css/AlfFileDrop.css"}],templateString:k,postCreate:function e(){g(this.domNode,"dragenter",a.hitch(this,"onDndDragEnter"));g(this.domNode,"dragover",a.hitch(this,"onDndDragOver"));g(this.domNode,"drop",a.hitch(this,"onDndDrop"))},onDndDragEnter:function i(l){},onDndDragOver:function h(l){l.stopPropagation();l.preventDefault()},onDndDrop:function c(l){l.stopPropagation();l.preventDefault();this.alfPublish("ALF_UPLOAD_REQUEST",{files:l.dataTransfer.files,targetData:{destination:"workspace://SpacesStore/551e9d37-5a66-4297-a8a6-725ad864378e",siteId:null,containerId:null,uploadDirectory:null,updateNodeRef:null,description:"",overwrite:false,thumbnails:"doclib",username:null}})}})});