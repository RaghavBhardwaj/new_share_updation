(function(){Alfresco.WikiParser=function(){return this};Alfresco.WikiParser.prototype={URL:null,parse:function a(d,c){c=c==null?[]:c;d=this._renderLinks(d,c);return d},_renderLinks:function b(o,d){if(typeof o=="string"){var p=o.split("[["),l=o;if(p.length>1){var n=/^([^\|\]]+)(?:\|([^\]]+))?\]\]/;var c,f,m,j,g,h,k,e;l=p[0];for(f=1,m=p.length;f<m;f++){j=p[f];if(n.test(j)){g=n.exec(j);e=g[1].split("#");if(e[1]){g[1]=e[0]}else{if(g[2]){e=g[2].split("#");if(e[1]){g[2]=e[0]}}}h=g[1].replace(/\s+/g,"_");k=Alfresco.util.arrayContains(d,h);c='<a href="'+this.URL+encodeURIComponent(Alfresco.util.decodeHTML(e[1]?h+"#"+e[1]:h))+'" class="'+(k?"theme-color-1":"wiki-missing-page")+'">';c+=(g[2]?g[2]:e[1]?g[1]+"#"+e[1]:g[1]);c+="</a>";l+=c.replace("%23","#");l+=j.substring(g[0].length)}}}return l}return o}}})();