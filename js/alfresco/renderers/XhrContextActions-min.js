define(["dojo/_base/declare","alfresco/renderers/ContextActions","alfresco/renderers/_XhrActionsMixin","dojo/aspect","dojo/_base/lang","dojo/_base/array"],function(e,i,h,a,d,f){return e([i,h],{addActions:function g(){this.actionsGroup.processWidgets(this.widgetsForLoading);a.after(this._contextMenu,"onFocus",d.hitch(this,this.loadActions))},clearLoadingItem:function c(){f.forEach(this.actionsGroup.getChildren(),function(k,j){this.actionsGroup.removeChild(k)},this)},addXhrItems:function b(){f.forEach(this.currentItem.actions,d.hitch(this,"addAction"))}})});