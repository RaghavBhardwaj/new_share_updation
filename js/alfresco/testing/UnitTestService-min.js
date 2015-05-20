define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","dojo/_base/lang","service/constants/Default"],function(b,d,c,f,h){return b([d,c],{constructor:function e(i){f.mixin(this,i);this.alfSubscribe("ALF_REQUEST_UNIT_TEST",f.hitch(this,"requestUnitTest"))},requestUnitTest:function a(j){this.alfLog("log","Unit test request received:",j);if(j!=null&&j.unitTestModel!=null){var i={unitTestModel:j.unitTestModel};this.serviceXhr({url:h.URL_SERVICECONTEXT+"unit-test-model",data:i,method:"POST",successCallback:this.requestUnitTestSuccess,failureCallback:this.requestUnitTestFailure,callbackScope:this})}else{this.alfLog("error","No 'unitTestModel' attribute provided in the payload",j,this)}},requestUnitTestSuccess:function g(j,i){this.alfLog("log","Redirecting to unit test rendering page");window.location=h.URL_PAGECONTEXT+"tp/ws/unit-test-model"},requestUnitTestFailure:function g(j,i){this.alfLog("error","The unit test model could not be saved",j,i)}})});