tinymce.PluginManager.add("preview",function(b){var a=b.settings;b.addCommand("mcePreview",function(){b.windowManager.open({title:"Preview",width:parseInt(b.getParam("plugin_preview_width","650"),10),height:parseInt(b.getParam("plugin_preview_height","500"),10),html:'<iframe src="javascript:\'\'" frameborder="0"></iframe>',buttons:{text:"Close",onclick:function(){this.parent().parent().close()}},onPostRender:function(){var e,j=this.getEl("body").firstChild.contentWindow.document,c="";b.settings.document_base_url!=b.documentBaseUrl&&(c+='<base href="'+b.documentBaseURI.getURI()+'">'),tinymce.each(b.contentCSS,function(d){c+='<link type="text/css" rel="stylesheet" href="'+b.documentBaseURI.toAbsolute(d)+'">'});var f=a.body_id||"tinymce";-1!=f.indexOf("=")&&(f=b.getParam("body_id","","hash"),f=f[b.id]||f);var h=a.body_class||"";-1!=h.indexOf("=")&&(h=b.getParam("body_class","","hash"),h=h[b.id]||"");var g=b.settings.directionality?' dir="'+b.settings.directionality+'"':"";e="<!DOCTYPE html><html><head>"+c+'</head><body id="'+f+'" class="mce-content-body '+h+'"'+g+">"+b.getContent()+"</body></html>",j.open(),j.write(e),j.close()}})}),b.addButton("preview",{title:"Preview",cmd:"mcePreview"}),b.addMenuItem("preview",{text:"Preview",cmd:"mcePreview",context:"view"})});