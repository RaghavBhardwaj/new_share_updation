define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/AlfShareFooter.html","alfresco/core/Core","dojo/dom-class"],function(b,a,g,c,f,e){return b([a,g,f],{i18nRequirements:[{i18nFile:"./i18n/AlfShareFooter.properties"}],cssRequirements:[{cssFile:"./css/AlfShareFooter.css"},{cssFile:"/modules/about-share.css"}],templateString:c,nonAmdDependencies:["/js/yui-common.js","/js/alfresco.js","/modules/about-share.js"],licenseLabel:null,postMixInProperties:function h(){this.licensedToLabel=this.message("label.licensedTo");if(this.licenseLabel!=null&&this.licenseLabel.trim()!=""&&this.licenseLabel!="UNKNOWN"){this.licenseLabel=this.message(this.licenseLabel)}else{this.licenseLabel=""}if(this.copyrightLabel!=null&&this.copyrightLabel.trim()!=""){this.copyrightLabel=this.message(this.copyrightLabel)}else{this.copyrightLabel=this.message("label.copyright")}if(this.altText!=null&&this.altText.trim()!=null){this.altText=this.message(this.altText)}else{this.altText="Alfresco Community"}if(this.logoImageSrc==null){this.logoImageSrc="alfresco-share-logo.png"}if(this.logoImageSrc=="alfresco-share-logo-enterprise.png"||this.logoImageSrc=="alfresco-share-logo-team.png"||this.logoImageSrc=="alfresco-share-logo.png"){this.logoImageSrc=require.toUrl("alfresco/footer")+"/css/images/"+this.logoImageSrc}else{this.logoImageSrc=this.logoImageSrc}},postCreate:function d(){e.add(this.footerParentNode,"footer");if(this.cssClass!=null&&this.cssClass.trim()!=""){e.add(this.footerParentNode,this.cssClass)}else{e.add(this.footerParentNode,"footer-com")}if(this.licenseLabel==null||this.licenseLabel.trim()==""||this.licenseLabel=="UNKNOWN"){e.add(this.licenseHolderNode,"hidden")}}})});