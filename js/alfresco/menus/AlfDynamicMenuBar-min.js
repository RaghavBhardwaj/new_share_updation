define(["dojo/_base/declare","alfresco/menus/AlfMenuBar","dojo/_base/lang","dojo/_base/array","alfresco/menus/AlfMenuBarItem"],function(d,f,b,g,i){return d([f],{updateTopic:"ALF_ADD_DYNAMIC MENU_ITEMS",postCreate:function c(){this.inherited(arguments);this.alfSubscribe(this.updateTopic,b.hitch(this,"processUpdates"))},processUpdates:function e(j){if(j==null&&j.add==null&&j.remove==null){this.alfLog("warn","A request was made to update a dynamic menu bar but not enough information was provided",j)}else{if(j.remove){g.forEach(j.remove,b.hitch(this,"removeUpdate"))}if(j.add){g.forEach(j.add,b.hitch(this,"addUpdate"))}}},addUpdate:function h(k,j){this._menuBar.addChild(k,"first")},removeUpdate:function a(k,j){this._menuBar.removeChild(k)}})});