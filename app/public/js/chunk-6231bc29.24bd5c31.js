(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6231bc29"],{"1ab5":function(e,t,a){},"1dde":function(e,t,a){var o=a("d039"),r=a("b622"),n=a("2d00"),l=r("species");e.exports=function(e){return n>=51||!o((function(){var t=[],a=t.constructor={};return a[l]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"36c8":function(e,t,a){"use strict";a("1ab5")},"65f0":function(e,t,a){var o=a("861d"),r=a("e8b5"),n=a("b622"),l=n("species");e.exports=function(e,t){var a;return r(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!r(a.prototype)?o(a)&&(a=a[l],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},8418:function(e,t,a){"use strict";var o=a("c04e"),r=a("9bf2"),n=a("5c6c");e.exports=function(e,t,a){var l=o(t);l in e?r.f(e,l,n(0,a)):e[l]=a}},a434:function(e,t,a){"use strict";var o=a("23e7"),r=a("23cb"),n=a("a691"),l=a("50c4"),i=a("7b0b"),s=a("65f0"),c=a("8418"),u=a("1dde"),f=u("splice"),m=Math.max,d=Math.min,p=9007199254740991,v="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!f},{splice:function(e,t){var a,o,u,f,b,h,g=i(this),y=l(g.length),k=r(e,y),x=arguments.length;if(0===x?a=o=0:1===x?(a=0,o=y-k):(a=x-2,o=d(m(n(t),0),y-k)),y+a-o>p)throw TypeError(v);for(u=s(g,o),f=0;f<o;f++)b=k+f,b in g&&c(u,f,g[b]);if(u.length=o,a<o){for(f=k;f<y-o;f++)b=f+o,h=f+a,b in g?g[h]=g[b]:delete g[h];for(f=y;f>y-o+a;f--)delete g[f-1]}else if(a>o)for(f=y-o;f>k;f--)b=f+o-1,h=f+a-1,b in g?g[h]=g[b]:delete g[h];for(f=0;f<a;f++)g[f+k]=arguments[f+2];return g.length=y-o+a,u}})},b0c0:function(e,t,a){var o=a("83ab"),r=a("9bf2").f,n=Function.prototype,l=n.toString,i=/^\s*function ([^ (]*)/,s="name";o&&!(s in n)&&r(n,s,{configurable:!0,get:function(){try{return l.call(this).match(i)[1]}catch(e){return""}}})},d761:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("a-form",{staticClass:"form",attrs:{"label-col":{span:4},"wrapper-col":{span:20}}},[a("a-form-item",{attrs:{"wrapper-col":{span:12}}},[a("a-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(" 启动爬虫 ")])],1),a("a-form-item",{attrs:{label:"目标url"}},[e._l(e.form.targetUrl,(function(t,o){return a("div",{key:o,staticClass:"url-input"},[a("a-input",{staticStyle:{width:"80%"},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}}),e.form.targetUrl.length>1?a("a-icon",{staticClass:"del-icon",attrs:{type:"delete"},on:{click:function(t){return e.delUrlInput(o)}}}):e._e()],1)})),a("a-button",{attrs:{type:"link"},on:{click:e.addNewUrlInput}},[e._v(" 新增一行 ")])],2),a("a-form-item",{attrs:{label:"目标dom"}},[a("a-input",{attrs:{placeholder:"默认为body（支持.class,#id 选择模式）"},model:{value:e.form.targetDom,callback:function(t){e.$set(e.form,"targetDom",t)},expression:"form.targetDom"}})],1),a("a-form-item",{attrs:{label:"下载"}},[a("a-radio-group",{attrs:{"button-style":"solid"},model:{value:e.form.downType,callback:function(t){e.$set(e.form,"downType",t)},expression:"form.downType"}},[a("a-radio-button",{attrs:{value:"a"}},[e._v(" 抓取文本和图片 ")]),a("a-radio-button",{attrs:{value:"b"}},[e._v(" 只抓取文本 ")]),a("a-radio-button",{attrs:{value:"c"}},[e._v(" 只抓取图片 ")])],1)],1),a("a-form-item",{attrs:{label:"设备"}},[a("a-radio-group",{attrs:{"button-style":"solid"},model:{value:e.form.device,callback:function(t){e.$set(e.form,"device",t)},expression:"form.device"}},[a("a-radio-button",{attrs:{value:""}},[e._v(" PC ")]),a("a-radio-button",{attrs:{value:"Nexus 7"}},[e._v(" 移动端 ")])],1)],1),a("a-form-item",{attrs:{label:"并发爬取限制"}},[a("a-input",{attrs:{placeholder:"并发爬取限制"},model:{value:e.form.minConcurrency,callback:function(t){e.$set(e.form,"minConcurrency",t)},expression:"form.minConcurrency"}})],1),a("a-form-item",{attrs:{label:"单个任务重试次数"}},[a("a-input",{attrs:{placeholder:"单个任务重试次数"},model:{value:e.form.maxRequestRetries,callback:function(t){e.$set(e.form,"maxRequestRetries",t)},expression:"form.maxRequestRetries"}})],1),a("a-form-item",{attrs:{label:"最长等待时间(S)"}},[a("a-input",{attrs:{placeholder:"最长等待时间(S)"},model:{value:e.form.handlePageTimeoutSecs,callback:function(t){e.$set(e.form,"handlePageTimeoutSecs",t)},expression:"form.handlePageTimeoutSecs"}})],1),a("a-form-item",{attrs:{label:"配置"}},[a("a-select",{model:{value:e.form.mode,callback:function(t){e.$set(e.form,"mode",t)},expression:"form.mode"}},e._l(e.modes,(function(t,o){return a("a-select-option",{key:o,attrs:{value:t.value}},[e._v(" "+e._s(t.key)+" ")])})),1)],1),a("a-form-item",{attrs:{label:"模式"}},[a("a-select",{model:{value:e.form.behavior,callback:function(t){e.$set(e.form,"behavior",t)},expression:"form.behavior"}},e._l(e.behaviors,(function(t,o){return a("a-select-option",{key:o,attrs:{value:t.value}},[e._v(" "+e._s(t.key)+" ")])})),1)],1)],1)],1)},r=[],n=(a("b0c0"),a("a434"),{data:function(){return{action_url:"/api/v1/example/uploadFile",form:{name:"",targetUrl:[{value:""}],targetDom:"",downType:"a",device:"",minConcurrency:"1",maxRequestRetries:"0",handlePageTimeoutSecs:30,mode:"mode1",behavior:"36ke"},behaviors:[{value:"taobao",key:"淘宝"},{value:"36ke",key:"36氪"},{value:"specialWord",key:"百度搜索"},{value:"screenshot",key:"腾讯新闻"}],modes:[{value:"mode1",key:"配置一"},{value:"mode2",key:"配置二"},{value:"mode3",key:"配置三"},{value:"mode4",key:"配置四"}]}},methods:{helloHandle:function(e){var t=this;this.$callMain("example.console",e).then((function(e){var a=e.status+""+e.time;t.$message.info(a)}))},handleChange:function(e){var t=e.file.status;if("uploading"!==t&&console.log(e.file),"done"===t){var a=e.file.response;if(console.log("uploadRes:",a),"success"!==a.code)return this.$message.error("file upload failed ".concat(a.code," .")),!1;this.num++;var o=a.data;o.id=this.num,o.imageUrlText="image url",this.image_info.push(o),this.$message.success("".concat(e.file.name," file uploaded successfully."))}else"error"===t&&this.$message.error("".concat(e.file.name," file upload failed."))},changeBehavior:function(e){console.log("e: ",e)},changeMode:function(e){console.log("e: ",e)},handleSubmit:function(){var e=this.form,t=this;if(this.$message.info("开始运行"),"36ke"===e.behavior){var a=(new Date).getTime();this.$callMain("example.getPage",e).then((function(e){console.log("r: ",e),t.$message.success("抓取结束 本次任务共耗时".concat((new Date).getTime()-a))}))}},addNewUrlInput:function(){var e={value:""};this.form.targetUrl.push(e)},delUrlInput:function(e){this.form.targetUrl.splice(e,1)}}}),l=n,i=(a("36c8"),a("2877")),s=Object(i["a"])(l,o,r,!1,null,"1715fa4e",null);t["default"]=s.exports},e8b5:function(e,t,a){var o=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==o(e)}}}]);
//# sourceMappingURL=chunk-6231bc29.24bd5c31.js.map