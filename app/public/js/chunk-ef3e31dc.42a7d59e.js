(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef3e31dc"],{a358:function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return l}));var a=n("b775"),o={outApi:"/api/v1/outApi",openDir:"/api/v1/example/openLocalDir",uploadFile:"/api/v1/example/uploadFile",executeJS:"/api/v1/example/executeJS",autoLaunchEnable:"/api/v1/setting/autoLaunchEnable",autoLaunchDisable:"/api/v1/setting/autoLaunchDisable",autoLaunchIsEnabled:"/api/v1/setting/autoLaunchIsEnabled"};function u(t,e){return Object(a["b"])({url:o[t],method:"post",data:e})}function c(t){return Object(a["b"])({url:o.openDir,method:"post",data:t})}function l(t){return Object(a["b"])({url:o.executeJS,method:"post",data:t})}},a90d:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("h3",{style:{marginBottom:"16px"}},[t._v(" 渲染进程与主进程IPC通信 ")]),n("a-list",{attrs:{bordered:""}},[n("a-input-search",{on:{search:t.helloHandle},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[n("a-button",{attrs:{slot:"enterButton"},slot:"enterButton"},[t._v(" send ")])],1)],1)],1),n("div",{staticStyle:{"margin-top":"20px"}},[n("h3",{style:{marginBottom:"16px"}},[t._v(" 主进程API执行网页函数 ")]),n("a-list",{attrs:{bordered:""}},[n("a-input-search",{on:{search:t.executeJSHandle},model:{value:t.content2,callback:function(e){t.content2=e},expression:"content2"}},[n("a-button",{attrs:{slot:"enterButton"},slot:"enterButton"},[t._v(" send ")])],1)],1)],1)])},o=[],u=n("a358"),c={data:function(){return{content:"hello",content2:"hello world",reply:""}},methods:{helloHandle:function(t){var e=this;this.$callMain("example.getImg",t).then((function(t){var n=t.status+""+t.time;e.$message.info(n)}))},executeJSHandle:function(t){Object(u["a"])({str:t}).then((function(t){0==t.code&&console.log(t.data)})).catch((function(t){console.log("err:",t)}))}}},l=c,i=n("2877"),r=Object(i["a"])(l,a,o,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-ef3e31dc.42a7d59e.js.map