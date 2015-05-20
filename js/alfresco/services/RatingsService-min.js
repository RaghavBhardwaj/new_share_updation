define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","alfresco/services/_RatingsServiceTopicMixin","dojo/_base/lang","service/constants/Default"],function(h,d,e,b,c,f){return h([d,e,b],{constructor:function j(o){c.mixin(this,o);this.alfSubscribe(this.addRatingTopic,c.hitch(this,"onAddRating"));this.alfSubscribe(this.removeRatingTopic,c.hitch(this,"onRemoveRating"))},getAddRatingsUrl:function m(o){return f.PROXY_URI+"api/node/"+o+"/ratings"},getRemoveRatingsUrl:function m(o){return f.PROXY_URI+"api/node/"+o+"/ratings/likesRatingScheme"},onAddRating:function i(q){if(q!=null&&q.node!=null&&q.node.jsNode!=null&&q.node.jsNode.nodeRef!=null&&q.node.jsNode.nodeRef.uri!=null){var o=this.getAddRatingsUrl(q.node.jsNode.nodeRef.uri);var p={nodeRefUri:q.node.jsNode.nodeRef.uri,rating:1,ratingScheme:"likesRatingScheme"};this.serviceXhr({url:o,data:p,method:"POST",successCallback:this.onAddRatingSuccess,failureCallback:this.onAddRatingFailure,callbackScope:this})}},onAddRatingSuccess:function g(p,o){this.alfLog("log","Successfully rated a document",p,o);this.alfPublish(this.addRatingSuccessTopic,{response:p,requestConfig:o})},onAddRatingFailure:function l(p,o){this.alfLog("error","Failed to rate a document",p,o);this.alfPublish(this.addRatingFailureTopic,{response:p,requestConfig:o})},onRemoveRating:function a(q){if(q!=null&&q.node!=null&&q.node.jsNode!=null&&q.node.jsNode.nodeRef!=null&&q.node.jsNode.nodeRef.uri!=null){var o=this.getRemoveRatingsUrl(q.node.jsNode.nodeRef.uri);var p={nodeRefUri:q.node.jsNode.nodeRef.uri,ratingScheme:"likesRatingScheme"};this.serviceXhr({url:o,data:p,method:"DELETE",successCallback:this.onRemoveRatingSuccess,failureCallback:this.onRemoveRatingFailure,callbackScope:this})}},onRemoveRatingSuccess:function k(p,o){this.alfLog("log","Successfully removed a document rating",p,o);this.alfPublish(this.removeRatingSuccessTopic,{response:p,requestConfig:o})},onRemoveRatingFailure:function n(p,o){this.alfLog("error","Failed to remove a document rating",p,o);this.alfPublish(this.removeRatingFailureTopic,{response:p,requestConfig:o})}})});