(function(){Alfresco.module.DataListActions=function(){this.name="Alfresco.module.DataListActions";Alfresco.util.YUILoaderHelper.require(["json"],this.onComponentsLoaded,this);return this};Alfresco.module.DataListActions.prototype={isReady:false,defaultConfig:{method:"POST",urlStem:Alfresco.constants.PROXY_URI+"slingshot/datalists/action/",dataObj:null,successCallback:null,successMessage:null,failureCallback:null,failureMessage:null,object:null},onComponentsLoaded:function a(){this.isReady=true},_runAction:function b(e,f){if(!this.isReady){return false}if(typeof f=="object"){e=YAHOO.lang.merge(e,f)}if(e.method==Alfresco.util.Ajax.DELETE){if(e.dataObj!==null){e.method=Alfresco.util.Ajax.POST;if(e.url.indexOf("alf_method")<1){e.url+=(e.url.indexOf("?")<0?"?":"&")+"alf_method=delete"}Alfresco.util.Ajax.jsonRequest(e)}else{Alfresco.util.Ajax.request(e)}}else{Alfresco.util.Ajax.jsonRequest(e)}},genericAction:function d(k){var p="",o=k.success,g=k.failure,f=k.webscript,j=k.params?k.params:k.webscript.params,i=k.config,m=k.wait,h=null;var l=function n(s,t){if(t){if(t.event&&t.event.name){YAHOO.Bubbling.fire(t.event.name,t.event.obj)}if(YAHOO.lang.isArray(t.events)){for(var q=0,r=t.events.length;q<r;q++){YAHOO.Bubbling.fire(t.events[q].name,t.events[q].obj)}}if(t.popup){t.popup.destroy()}if(t.message){Alfresco.util.PopupManager.displayMessage({text:t.message})}if(t.callback&&t.callback.fn){t.callback.fn.call((typeof t.callback.scope=="object"?t.callback.scope:this),{config:s.config,json:s.json,serverResponse:s.serverResponse},t.callback.obj)}}};if(m&&m.message){if(typeof o!="object"){o={}}if(typeof g!="object"){g={}}o.popup=Alfresco.util.PopupManager.displayMessage({modal:true,displayTime:0,text:m.message,effect:null});g.popup=o.popup}var e;if(f.stem){e=f.stem+f.name}else{e=this.defaultConfig.urlStem+f.name}if(j){e=YAHOO.lang.substitute(e,j);h=j}if(f.queryString){e+="?"+f.queryString}var h=YAHOO.lang.merge(this.defaultConfig,{successCallback:{fn:l,scope:this,obj:o},successMessage:null,failureCallback:{fn:l,scope:this,obj:g},failureMessage:null,url:e,method:f.method,responseContentType:Alfresco.util.Ajax.JSON,object:h});return this._runAction(h,i)}};var c=new Alfresco.module.DataListActions()})();