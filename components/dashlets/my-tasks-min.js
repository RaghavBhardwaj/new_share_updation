(function(){var g=YAHOO.util.Dom,k=YAHOO.util.Event,a=YAHOO.util.Selector;var d=Alfresco.util.encodeHTML,f=Alfresco.util.siteURL;Alfresco.dashlet.MyTasks=function e(l){Alfresco.dashlet.MyTasks.superclass.constructor.call(this,"Alfresco.dashlet.MyTasks",l,["button","container","datasource","datatable","paginator","history","animation"]);this.services.preferences=new Alfresco.service.Preferences();return this};YAHOO.extend(Alfresco.dashlet.MyTasks,Alfresco.component.Base);YAHOO.lang.augmentProto(Alfresco.dashlet.MyTasks,Alfresco.action.WorkflowActions);YAHOO.lang.augmentObject(Alfresco.dashlet.MyTasks.prototype,{PREFERENCES_TASKS_DASHLET:"",PREFERENCES_TASKS_DASHLET_FILTER:"",options:{hiddenTaskTypes:[],maxItems:50,filters:{}},onReady:function j(){this.widgets.filterMenuButton=Alfresco.util.createYUIButton(this,"filters",this.onFilterSelected,{type:"menu",menu:"filters-menu",lazyloadmenu:false});this.PREFERENCES_TASKS_DASHLET=this.services.preferences.getDashletId(this,"tasks");this.PREFERENCES_TASKS_DASHLET_FILTER=this.PREFERENCES_TASKS_DASHLET+".filter";var m=this.services.preferences.get();var p=Alfresco.util.findValueByDotNotation(m,this.PREFERENCES_TASKS_DASHLET_FILTER,"activeTasks");p=this.options.filters.hasOwnProperty(p)?p:"activeTasks";this.widgets.filterMenuButton.set("label",this.msg("filter."+p)+" "+Alfresco.constants.MENU_ARROW_SYMBOL);this.widgets.filterMenuButton.value=p;g.removeClass(a.query(".toolbar div",this.id,true),"hidden");var o=YAHOO.lang.substitute("api/task-instances?authority={authority}&properties={properties}&exclude={exclude}",{authority:encodeURIComponent(Alfresco.constants.USERNAME),properties:["bpm_priority","bpm_status","bpm_dueDate","bpm_description"].join(","),exclude:this.options.hiddenTaskTypes.join(",")});this.widgets.alfrescoDataTable=new Alfresco.util.DataTable({dataSource:{url:Alfresco.constants.PROXY_URI+o,filterResolver:this.bind(function(){var s=this.widgets.filterMenuButton.value;var t=this.options.filters[s];return this.substituteParameters(t)||""})},dataTable:{container:this.id+"-tasks",columnDefinitions:[{key:"isPooled",sortable:false,formatter:this.bind(this.renderCellIcons),width:24},{key:"title",sortable:false,formatter:this.bind(this.renderCellTaskInfo)},{key:"name",sortable:false,formatter:this.bind(this.renderCellActions),width:45}],config:{MSG_EMPTY:this.msg("message.noTasks")}},paginator:{history:false,hide:false,config:{containers:[this.id+"-paginator"],template:"{FirstPageLink} {PreviousPageLink} {CurrentPageReport} {NextPageLink} {LastPageLink}",firstPageLinkLabel:"&lt;&lt;",previousPageLinkLabel:"&lt;",nextPageLinkLabel:"&gt;",lastPageLinkLabel:"&gt;&gt;",pageReportTemplate:this.msg("pagination.template.page-report"),rowsPerPage:this.options.maxItems}}});var q=this,r=this.widgets.alfrescoDataTable.getDataTable(),n=r.doBeforeLoadData;r.doBeforeLoadData=function l(s,t,u){if(t.results.length===0){g.addClass(this.configs.paginator.getContainerNodes(),"hidden")}else{g.removeClass(this.configs.paginator.getContainerNodes(),"hidden")}if(t.results.length===0){t.results.unshift({isInfo:true,title:q.msg("empty.title"),description:q.msg("empty.description")})}return n.apply(this,arguments)}},onFilterSelected:function h(m,l){var n=l[1];if(n){this.widgets.alfrescoDataTable.currentSkipCount=0;this.widgets.filterMenuButton.set("label",n.cfg.getProperty("text")+" "+Alfresco.constants.MENU_ARROW_SYMBOL);this.widgets.filterMenuButton.value=n.value;var o=this.substituteParameters(this.options.filters[n.value],{});this.widgets.alfrescoDataTable.loadDataTable(o);this.services.preferences.set(this.PREFERENCES_TASKS_DASHLET_FILTER,n.value)}},renderCellIcons:function c(t,u,q,l){var n=u.getData(),p="";if(n.isInfo){q.width=52;g.setStyle(t,"width",q.width+"px");g.setStyle(t.parentNode,"width",q.width+"px");p='<img src="'+Alfresco.constants.URL_RESCONTEXT+'components/images/help-task-bw-32.png" />'}else{var s=n.properties.bpm_priority,r={"1":"high","2":"medium","3":"low"},m=r[s+""],o=n.isPooled;p='<img src="'+Alfresco.constants.URL_RESCONTEXT+"components/images/priority-"+m+'-16.png" title="'+this.msg("label.priority",this.msg("priority."+m))+'"/>';if(o){p+='<br/><img src="'+Alfresco.constants.URL_RESCONTEXT+'components/images/pooled-task-16.png" title="'+this.msg("label.pooledTask")+'"/>'}}t.innerHTML=p},renderCellTaskInfo:function i(p,B,r,v){var D=B.getData(),x="";if(D.isInfo){x+='<div class="empty"><h3>'+D.title+"</h3>";x+="<span>"+D.description+"</span></div>"}else{var m=D.id,s=D.properties.bpm_description,t=D.properties.bpm_dueDate,C=t?Alfresco.util.fromISO8601(t):null,z=new Date(),n=D.title,u=D.properties.bpm_status,A=D.owner;if(D.propertyLabels&&Alfresco.util.isValueSet(D.propertyLabels.bpm_status,false)){u=D.propertyLabels.bpm_status}if(s==n){s=this.msg("workflow.no_message")}var w;if(D.isEditable){w=f("task-edit?taskId="+m+"&referrer=tasks")+'" class="theme-color-1" title="'+this.msg("title.editTask")}else{w=f("task-details?taskId="+m+"&referrer=tasks")+'" class="theme-color-1" title="'+this.msg("title.viewTask")}var o='<h3><a href="'+w+'">'+d(s)+"</a></h3>",y=C?'<h4><span class="'+(z>C?"task-delayed":"")+'" title="'+this.msg("title.dueOn",Alfresco.util.formatDate(C,"longDate"))+'">'+Alfresco.util.formatDate(C,"longDate")+"</span></h4>":"",l='<div title="'+this.msg("title.taskSummary",n,u)+'">'+this.msg("label.taskSummary",n,u)+"</div>",q="";if(!A||!A.userName){q='<span class="theme-bg-color-5 theme-color-5 unassigned-task">'+this.msg("label.unassignedTask")+"</span>"}x=o+y+l+q}p.innerHTML=x},renderCellActions:function b(n,l,o,q){var m=l.getData(),p="";if(m.isInfo){o.width=0;g.setStyle(n,"width",o.width+"px");g.setStyle(n.parentNode,"width",o.width+"px")}else{if(m.isEditable){p+='<a href="'+f("task-edit?taskId="+m.id+"&referrer=tasks")+'" class="edit-task" title="'+this.msg("title.editTask")+'">&nbsp;</a>'}p+='<a href="'+f("task-details?taskId="+m.id+"&referrer=tasks")+'" class="view-task" title="'+this.msg("title.viewTask")+'">&nbsp;</a>'}n.innerHTML=p}})})();