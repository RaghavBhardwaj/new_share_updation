(function(){var d=YAHOO.util.Dom,k=YAHOO.util.Event,a=YAHOO.util.KeyListener;var c=Alfresco.util.encodeHTML;Alfresco.DatePicker=function(m,n){this.name="Alfresco.DatePicker";this.id=m;this.currentValueHtmlId=n;Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["button","calendar"],this.onComponentsLoaded,this);this.widgets={};return this};Alfresco.DatePicker.prototype={options:{currentValue:"",showTime:false,disabled:false,mandatory:false},widgets:null,setOptions:function b(m){this.options=YAHOO.lang.merge(this.options,m);return this},setMessages:function h(m){Alfresco.util.addMessages(m,this.name);return this},onComponentsLoaded:function l(){k.onContentReady(this.id,this.onReady,this,true)},onReady:function i(){var r=null;if(this.options.currentValue==null||this.options.currentValue===""){this.options.currentValue=d.get(this.currentValueHtmlId).value}if(this.options.currentValue!==null&&this.options.currentValue!==""){r=Alfresco.util.fromISO8601(this.options.currentValue,!this.options.showTime)}else{r=new Date()}var q=(r.getMonth()+1)+"/"+r.getFullYear();var p=(r.getMonth()+1)+"/"+r.getDate()+"/"+r.getFullYear();var n=r.toString(this._msg("form.control.date-picker.entry.date.format"));var o=r.toString(this._msg("form.control.date-picker.entry.time.format"));if(this.options.currentValue!==""){d.get(this.id+"-date").value=n;if(this.options.showTime){d.get(this.id+"-time").value=o}}this.widgets.calendar=new YAHOO.widget.Calendar(this.id,this.id,{title:this._msg("form.control.date-picker.choose"),close:true,navigator:true});this.widgets.calendar.cfg.setProperty("pagedate",q);this.widgets.calendar.cfg.setProperty("selected",p);Alfresco.util.calI18nParams(this.widgets.calendar);this.widgets.calendar.selectEvent.subscribe(this._handlePickerChange,this,true);this.widgets.calendar.hideEvent.subscribe(function(){d.get(this.id+"-icon").focus()},this,true);k.addListener(this.id+"-date","keyup",this._handleFieldChange,this,true);k.addListener(this.id+"-time","keyup",this._handleFieldChange,this,true);var m=d.get(this.id+"-icon");if(m){Alfresco.util.useAsButton(m,this._showPicker,null,this);k.addListener(this.id+"-icon","click",this._showPicker,this,true)}YAHOO.Bubbling.fire("registerValidationHandler",{fieldId:this.id+"-date",handler:Alfresco.forms.validation.validDateTime,when:"keyup"});if(this.options.showTime){YAHOO.Bubbling.fire("registerValidationHandler",{fieldId:this.id+"-time",handler:Alfresco.forms.validation.validDateTime,when:"keyup"})}this.widgets.calendar.render();if(this.options.currentValue!==""){this._handleFieldChange(null)}},_showPicker:function f(m){this.widgets.calendar.show()},_handlePickerChange:function g(t,s,q){var p=s[0];var r=this.widgets.calendar.toDate(p[0]);var o=r.toString(this._msg("form.control.date-picker.entry.date.format"));d.get(this.id+"-date").value=o;if(this.options.showTime){var n=d.get(this.id+"-time").value;if(n.length>0){var v=d.get(this.id+"-date").value+" "+n;var u=this._msg("form.control.date-picker.entry.date.format")+" "+this._msg("form.control.date-picker.entry.time.format");r=Date.parseExact(v,u)}}if(r!=null){d.removeClass(this.id+"-date","invalid");if(this.options.showTime){d.removeClass(this.id+"-time","invalid")}var m="";if(this.options.submitTime){m=Alfresco.util.toISO8601(r,{milliseconds:true})}else{m=Alfresco.util.toISO8601(r,{selector:"date"})}d.get(this.currentValueHtmlId).value=m;if(Alfresco.logger.isDebugEnabled()){Alfresco.logger.debug("Hidden field '"+this.currentValueHtmlId+"' updated to '"+m+"'")}YAHOO.Bubbling.fire("mandatoryControlValueUpdated",this)}else{d.addClass(this.id+"-date","invalid");if(this.options.showTime){d.addClass(this.id+"-time","invalid")}}if(d.getStyle(this.id,"display")!="none"){this.widgets.calendar.hide()}},_handleFieldChange:function e(p){var q=d.get(this.id+"-date").value;if(q.length>0){if(p==undefined||(p.keyCode!=a.KEY.TAB&&p.keyCode!=a.KEY.SHIFT)){var o=Date.parseExact(q,this._msg("form.control.date-picker.entry.date.format"));if(o!=null){this.widgets.calendar.select((o.getMonth()+1)+"/"+o.getDate()+"/"+o.getFullYear());var n=this.widgets.calendar.getSelectedDates();if(n.length>0){d.removeClass(this.id+"-date","invalid");var m=n[0];this.widgets.calendar.cfg.setProperty("pagedate",(m.getMonth()+1)+"/"+m.getFullYear());this.widgets.calendar.render()}}else{d.addClass(this.id+"-date","invalid");if(YAHOO.env.ua.ie){YAHOO.Bubbling.fire("mandatoryControlValueUpdated",this)}}}}else{d.removeClass(this.id+"-date","invalid");d.get(this.currentValueHtmlId).value="";if(Alfresco.logger.isDebugEnabled()){Alfresco.logger.debug("Hidden field '"+this.currentValueHtmlId+"' has been reset")}if(this.options.mandatory||YAHOO.env.ua.ie){YAHOO.Bubbling.fire("mandatoryControlValueUpdated",this)}}},_msg:function j(m){return Alfresco.util.message.call(this,m,"Alfresco.DatePicker",Array.prototype.slice.call(arguments).slice(1))}}})();