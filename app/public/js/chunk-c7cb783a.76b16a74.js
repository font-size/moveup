(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c7cb783a"],{a358:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}));var a=n("b775"),o={outApi:"/api/v1/outApi",openDir:"/api/v1/example/openLocalDir",uploadFile:"/api/v1/example/uploadFile",executeJS:"/api/v1/example/executeJS",autoLaunchEnable:"/api/v1/setting/autoLaunchEnable",autoLaunchDisable:"/api/v1/setting/autoLaunchDisable",autoLaunchIsEnabled:"/api/v1/setting/autoLaunchIsEnabled"};function u(t,e){return Object(a["b"])({url:o[t],method:"post",data:e})}function c(t){return Object(a["b"])({url:o.openDir,method:"post",data:t})}function i(t){return Object(a["b"])({url:o.executeJS,method:"post",data:t})}},f04e:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",{style:{marginBottom:"16px"}},[t._v(" Echarts here ")])])},o=[],u=n("a358"),c=[{content:"保存网页目录",id:"webpage"},{content:"商品图片目录",id:"productImg"},{content:"保存抓取截图目录",id:"shotImg"}],i={data:function(){return{data:c}},methods:{openDirectry:function(t){console.log("id:",t);var e={id:t};Object(u["c"])(e).then((function(t){if(0!==t.code)return!1})).catch((function(t){console.log("err:",t)}))}}},r=i,l=n("2877"),p=Object(l["a"])(r,a,o,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-c7cb783a.76b16a74.js.map