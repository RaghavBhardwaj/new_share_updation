tinymce.PluginManager.add("importcss",function(b){function f(e){return"string"==typeof e?function(h){return -1!==h.indexOf(e)}:e instanceof RegExp?function(h){return e.test(h)}:e}function g(k,p){function h(q,r){var s,n=q.href;if((r||m[n])&&(!p||p(n))){c(q.imports,function(e){h(e,!0)});try{s=q.cssRules||q.rules}catch(i){}c(s,function(e){e.styleSheet?h(e.styleSheet,!0):e.selectorText&&c(e.selectorText.split(","),function(o){j.push(tinymce.trim(o))})})}}var j=[],m={};c(b.contentCSS,function(e){m[e]=!0});try{c(k.styleSheets,function(e){h(e)})}catch(l){}return j}function a(l){var o,h=/^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(l);if(h){var k=h[1],j=h[2].substr(1).split(".").join(" "),m=tinymce.makeMap("a,img");return h[1]?(o={title:l},b.schema.getTextBlockElements()[k]?o.block=k:b.schema.getBlockElements()[k]||m[k.toLowerCase()]?o.selector=k:o.inline=k):h[2]&&(o={inline:"span",title:l.substr(1),classes:j}),b.settings.importcss_merge_classes!==!1?o.classes=j:o.attributes={"class":j},o}}var d=this,c=tinymce.each;b.on("renderFormatsMenu",function(n){var k=b.settings,i={},h=k.importcss_selector_converter||a,e=f(k.importcss_selector_filter);b.settings.importcss_append||n.control.items().remove();var j=[];tinymce.each(k.importcss_groups,function(l){l=tinymce.extend({},l),l.filter=f(l.filter),j.push(l)}),c(g(b.getDoc(),f(k.importcss_file_filter)),function(q){if(-1===q.indexOf(".mce-")&&!i[q]&&(!e||e(q))){var t,m=h.call(d,q);if(m){var p=m.name||tinymce.DOM.uniqueId();if(j){for(var r=0;r<j.length;r++){if(!j[r].filter||j[r].filter(q)){j[r].item||(j[r].item={text:j[r].title,menu:[]}),t=j[r].item.menu;break}}}b.formatter.register(p,m);var l=tinymce.extend({},n.control.settings.itemDefaults,{text:m.title,format:p});t?t.push(l):n.control.add(l)}i[q]=!0}}),c(j,function(l){n.control.add(l.item)}),n.control.renderNew()}),d.convertSelectorToFormat=a});