"use strict";angular.module("axisJSApp",["ngAnimate","ngResource","ngSanitize","ui","ui.router","ui.bootstrap","minicolors","cn.offCanvas"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("index",{url:"/",templateUrl:"partials/main.html",controller:"MainCtrl",resolve:{appConfig:["configProvider","$rootScope",function(a,b){return b.version="1.0.0",a}]}})}]),angular.module("axisJSApp").controller("HeadCtrl",["configProvider","$scope",function(a,b){a.then(function(a){b.conf=a,b.stylesheet="undefined"!=typeof a.stylesheet?a.stylesheet:"",b.fonts="undefined"!=typeof a.fonts?a.fonts:[]})}]),angular.module("axisJSApp").controller("MainCtrl",["chartProvider","inputService","configChooser","appConfig","$scope",function(a,b,c,d,e){e.appConfig=d,e.appConfig.toggleChooser=c.toggle,e.inputs={},e.columns=[],e.chartData={},e.config=a(d).config,e.chartTypes=a(d).chartTypes,e.axesConfig=a(d).axesConfig,e.config.background=d.background?d.background:!1,e.config.backgroundColor=d.backgroundColor?d.backgroundColor:"white";var f=b(d);e.updateData=function(){return f.input(e)},e.validateData=function(a){return f.validate(a)},e.setGlobalType=function(a){for(var b in e.config.data.types)e.config.data.types.hasOwnProperty(b)&&(e.config.data.types[b]="series"!==a?a:"line")},e.setGroups=function(){e.config.data.groups=[];for(var a in e.config.groups)e.config.groups.hasOwnProperty(a)&&("undefined"==typeof e.config.data.groups[e.config.groups[a]]&&(e.config.data.groups[e.config.groups[a]]=[]),e.config.data.groups[e.config.groups[a]].push(a))},window.getConfig=function(){console.dir(e),window.chartConfig=e.config},"undefined"!=typeof parent.tinymce&&"undefined"!=typeof parent.tinymce.activeEditor.windowManager.getParams().axisJS&&(e.config=angular.fromJson(window.atob(parent.tinymce.activeEditor.windowManager.getParams().axisJS)),e.config.axis.x.tick.format=function(a){return"series"===e.config.chartGlobalType&&"category"!==e.config.axis.x.type?e.config.axis.x.prefix+a.toFixed(e.config.axis.x.accuracy).toString()+e.config.axis.x.suffix:a},e.config.axis.y.tick.format=function(a){return"series"===e.config.chartGlobalType&&"category"!==e.config.axis.y.type?e.config.axis.y.prefix+a.toFixed(e.config.axis.y.accuracy).toString()+e.config.axis.y.suffix:a},e.config.axis.y2.tick.format=function(a){return"series"===e.config.chartGlobalType&&"category"!==e.config.axis.y2.type?e.config.axis.y2.prefix+a.toFixed(e.config.axis.y2.accuracy).toString()+e.config.axis.y2.suffix:a},e.config.donut.label.format=function(a,b){return(100*b).toFixed(e.config.chartAccuracy)+"%"},e.config.pie.label.format=function(a,b){return(100*b).toFixed(e.config.chartAccuracy)+"%"},e.config.gauge.label.format=function(a,b){return(100*b).toFixed(e.config.chartAccuracy)+"%"},e.updateData()),e.inputs.csvData=f.defaultData.csvData,e.updateData()}]),angular.module("axisJSApp").directive("buildChart",["chartProvider","$timeout",function(a,b){return{restrict:"A",link:function(c,d){function e(){var a,b,d,e,f=d3.select("svg"),g=f.attr("width");null!==f.select("text.titles")[0][0]?(a=f.select("text.titles"),b=a.select("tspan.chartTitle"),d=a.select("tspan.chartCredit"),e=a.select("tspan.chartSource")):(a=f.insert("text").attr("class","titles").attr("text-anchor",c.appConfig.titles.align),b=a.insert("tspan").attr("class","chartTitle"),d=a.insert("tspan").attr("class","chartCredit"),e=a.insert("tspan").attr("class","chartSource")),b.text(c.config.chartTitle).attr("font-size",c.appConfig.titles["title size"]),d.text(c.config.chartCredit).attr("font-size",c.appConfig.titles["credit size"]);var h=(c.appConfig.titles["append source"]&&c.config.chartSource?"Source: ":"")+c.config.chartSource;e.text(h).attr({"font-size":c.appConfig.titles["source size"],"font-style":c.appConfig.titles["source style"]});var i="undefined"!=typeof c.appConfig.titles["title translateY"]?c.appConfig.titles["title translateY"]:0;b.attr({dy:i,x:0});var j="undefined"!=typeof c.appConfig.titles["credit translateY"]?c.appConfig.titles["credit translateY"]:32;d.attr({dy:j,x:0});var k="undefined"!=typeof c.appConfig.titles["source translateY"]?c.appConfig.titles["source translateY"]:30;for(e.attr({dy:k,x:0});b.node().getComputedTextLength()>g||d.node().getComputedTextLength()>g||e.node().getComputedTextLength()>g;){var l=parseInt(b.attr("font-size").replace("px",""))-1,m=parseInt(d.attr("font-size").replace("px",""))-1,n=parseInt(e.attr("font-size").replace("px",""))-1;b.attr("font-size",l+"px"),d.attr("font-size",m+"px"),e.attr("font-size",n+"px"),d.attr({dy:l,x:0}),e.attr({dy:m,x:0})}if(c.appConfig.titles["title background"]&&b.text().length>0){b.attr("fill","white");var o=b.node().getBBox(),p=c.appConfig.titles["background padding"],q=d3.select(b.node().parentNode.parentNode).insert("rect","text.titles");q.attr("x",0).attr("y",0).attr("class","title-background").attr("width",o.width+2*p).attr("height",18+2*p).style("fill",c.config.data.colors[c.config.data.columns[0][0]]),b.attr({x:0+p,dy:i+p})}var r="undefined"!=typeof c.appConfig.titles.translateX?c.appConfig.titles.translateX:g/2,s="undefined"!=typeof c.appConfig.titles.translateY?c.appConfig.titles.translateY:350;a.attr("width",g).attr("transform","translate("+r+","+s+")"),f.attr("height",f.node().getBBox().height+"px")}function f(){g=a(c.appConfig).generate(d[0].id,c.config),b(function(){e()})}d.children("svg").attr("transform","scale(2)");var g;f(),c.$watch("config.data.columns",function(){f();for(var a in g.data.colors())c.config.data.colors[a]=g.data.colors()[a]}),c.$watch("config.data.colors",function(){g.data.colors(c.config.data.colors)},!0),c.$watch("config.data.types",function(){f()},!0),c.$watch("config.axis",function(a){for(var b in a)if(a.hasOwnProperty(b)){if(a[b].hasOwnProperty("label")){var d={};d[b]=a[b].label,g.axis.labels(d)}(a[b].hasOwnProperty("show")||a[b].hasOwnProperty("max")||a[b].hasOwnProperty("min"))&&f(),(a[b].hasOwnProperty("prefix")||a[b].hasOwnProperty("suffix")||a[b].hasOwnProperty("accuracy"))&&(c.config.axis[b].prefix="undefined"==typeof a[b].prefix?"":a[b].prefix,c.config.axis[b].suffix="undefined"==typeof a[b].suffix?"":a[b].suffix,c.config.axis[b].accuracy="undefined"==typeof a[b].accuracy?0:a[b].accuracy)}},!0),c.$watchGroup(["config.data.x","config.data.y","config.data.y2"],function(a){a.forEach(function(a,b){var d=0===b?"x":1===b?"y":2===b?"y2":"";c.config.data.columns.forEach(function(b){for(var e=1;e<b.length;e++){if(isNaN(b[e])&&b[0]===a){c.config.axis[d].type="category",c.config.axis[d].tick=void 0;break}b[0]===a&&(c.config.data.axes[a]=d)}})}),f()}),c.$watchGroup(["config.chartTitle","config.chartCredit","config.chartSource","config.chartAccuracy","config.legend.position","config.legend.show"],function(){f()}),c.$watch("config.data.groups",function(){f()},!0),c.$watch("config.background",function(a){a===!0?d3.select("svg").insert("rect",":first-child").attr("class","chart-bg").attr("width","100%").attr("height","100%").attr("fill",c.config.backgroundColor):d3.select(".chart-bg").remove()})}}}]),angular.module("axisJSApp").directive("exportChart",["outputService",function(a){return{restrict:"A",scope:"@",link:function(b,c,d){c.on("click",function(){f(b.config.chartWidth),"save"!==d.exportChart&&a(b,d.exportChart)});var e,f=function(a){angular.element("defs").remove(),g();var c=angular.element("#canvas").empty()[0];if(a){var d=a/angular.element("#chart").width();angular.element("#chart > svg").attr("transform","scale("+d+")"),c.width=angular.element("#chart > svg").width()*d,c.height=angular.element("#chart > svg").height()*d}else angular.element("#chart > svg").attr("transform","scale(2)"),c.width=2*angular.element("#chart > svg").width(),c.height=2*angular.element("#chart > svg").height();var e=c.getContext("2d"),f=document.getElementsByTagName("svg")[0],h=new XMLSerializer;f=h.serializeToString(f),e.drawSvg(f,0,0);for(var j=[],k=0;k<b.columns.length;k++)j.push(b.columns[k]);b.chartTitle&&j.unshift(b.chartTitle),j=j.join("-").replace(/[^\w\d]+/gi,"-"),angular.element(".savePNG").attr("href",c.toDataURL("png")).attr("download",function(){return j+"_axisJS.png"});var l=i(angular.element("#chart > svg")[0]);$(".saveSVG").attr("href","data:text/svg,"+l.source[0]).attr("download",function(){return j+"_axisJS.svg"})},g=function(){for(var a,b,c=0;c<=document.styleSheets.length-1;c++)document.styleSheets[c].href&&-1!==document.styleSheets[c].href.indexOf("c3.css")&&(a=void 0!==document.styleSheets[c].rules?document.styleSheets[c].rules:document.styleSheets[c].cssRules);if(null!==a&&void 0!==a){var d=function(){("hidden"===angular.element(this).css("visibility")||"0"===angular.element(this).css("opacity"))&&angular.element(this).css("display","none")};for(c=0;c<a.length;c++)1===a[c].type&&(b=a[c].selectorText,e=h(a[c]),angular.element("svg *").each(d),angular.element(b).not(".c3-chart path").css(e)),angular.element(".c3-chart path").filter(function(){return"none"===angular.element(this).css("fill")}).attr("fill","none"),angular.element(".c3-chart path").filter(function(){return"none"!==angular.element(this).css("fill")}).attr("fill",function(){return angular.element(this).css("fill")})}},h=function(a){var b,c=a.style,d={};for(b=0;b<c.length;b++)d[c[b]]=c[c[b]];return d},i=function(a){var b={xmlns:"http://www.w3.org/2000/xmlns/",xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"},c='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';a.setAttribute("version","1.1");var d=document.createElement("style");d.setAttribute("type","text/css"),a.removeAttribute("xmlns"),a.removeAttribute("xlink"),a.hasAttributeNS(b.xmlns,"xmlns")||a.setAttributeNS(b.xmlns,"xmlns",b.svg),a.hasAttributeNS(b.xmlns,"xmlns:xlink")||a.setAttributeNS(b.xmlns,"xmlns:xlink",b.xlink);var f=(new XMLSerializer).serializeToString(a).replace("</style>","<![CDATA["+e+"]]></style>");return f=f.replace(/\sfont-.*?: .*?;/gi,""),f=f.replace(/\sclip-.*?="url\(http:\/\/.*?\)"/gi,""),f=f.replace(/\stransform="scale\(2\)"/gi,""),f=f.replace(/<defs xmlns="http:\/\/www.w3.org\/1999\/xhtml">/gi,"<defs>"),{svg:a,source:[c+f]}}}}}]),angular.module("axisJSApp").directive("addColors",["$timeout",function(a){return{restrict:"A",link:function(b,c){a(function(){c.children("option").each(function(){var a=angular.element(this);a.attr("data-color",a.text())}),c.colorselector()},500)}}}]),angular.module("axisJSApp").directive("maintainFocus",function(){return{restrict:"A",link:function(a,b){b.on("keydown",function(a){if(9===a.keyCode){var b=this.value,c=this.selectionStart,d=this.selectionEnd;return this.value=b.substring(0,c)+"	"+b.substring(d),this.selectionStart=this.selectionEnd=c+1,!1}})}}}),angular.module("axisJSApp").factory("configChooser",["cnOffCanvas",function(a){return a({controller:function(){this.name="Choose Configuration"},controllerAs:"ConfigCtrl",templateUrl:"partials/configChooser.html"})}]),angular.module("axisJSApp").provider("configProvider",function(){var a="config.yaml";return{setConfigFile:function(b){a=b},$get:["$http","$q",function(b,c){var d=b.get("default.config.yaml"),e=b.get(a).then(function(a){return a.data},function(a){return 404===a.status?(a.data={},a):c.reject(a)});return c.all([d,e]).then(function(a){var b=jsyaml.safeLoad(a[0].data),c=jsyaml.safeLoad(a[1]);return c="undefined"!==c?c:{},angular.extend(b,c)})}]}}).config(["configProviderProvider",function(a){var b=window.location.href.match(/config=([a-z]+)/i);b&&b.length>0&&a.setConfigFile("themes/"+b[1]+".config.yaml")}]),angular.module("axisJSApp").factory("GenericOutput",[function(){return this.serviceConfig={type:"save",label:""},this.preprocess=function(a){return a},this.process=function(a){return a},this.complete=function(a){return a},this.export=function(a){var b=this.preprocess(a),c=this.process(b);return this.complete(c)},this}]),angular.module("axisJSApp").factory("wordpressOutput",["GenericOutput","$http",function(a,b){var c=angular.copy(a);return c.serviceConfig={type:"export",label:"Save to WordPress"},c.preprocess=function(a){var b=a.config;b.axis.x.tick.format=b.axis.x.tick.format.toString(),b.axis.y.tick.format=b.axis.y.tick.format.toString(),b.axis.y2.tick.format=b.axis.y2.tick.format.toString(),b.pie.label.format=b.pie.label.format.toString(),b.donut.label.format=b.donut.label.format.toString(),b.gauge.label.format=b.gauge.label.format.toString();var c=String(angular.toJson(b)),d=String(angular.element(".savePNG").attr("href")),e=parent.tinymce.activeEditor.windowManager.getParams().axisWP;return{action:"insert_axis_attachment",axisConfig:c,axisChart:d,parentID:e.parentID}},c.process=function(a){b.post(parent.ajaxurl,a).success(function(a){a=angular.fromJson(a),parent.tinymce.activeEditor.insertContent('<div class="mceNonEditable"><img src="'+a.attachmentURL+"\" data-axisjs='"+window.btoa(angular.toJson(a))+'\' class="mceItem axisChart" /></div><br />'),parent.tinymce.activeEditor.windowManager.close()})},c.export=function(a){var b=c.preprocess(a);c.process(b),c.complete()},c}]),angular.module("axisJSApp").service("outputService",["configProvider","$injector",function(a,b){return function(a,c){var d=b.get(c+"Output");return d.export(a)}}]),angular.module("axisJSApp").service("chartProvider",["$injector",function(a){return function(b){var c=a.get(b.framework+"Service"),d=c.getConfig(b);return d.generate=c.generate,d}}]),angular.module("axisJSApp").factory("c3Service",function(){return{generate:function(a,b){var c=angular.extend({bindto:"#"+a},b);return c3.generate(c)},getConfig:function(a){var b=[];angular.forEach(a.colors,function(a){b.push(a.value)});var c={data:{x:"",y:"",y2:"",columns:[["data1",30,200,100,400,150,250],["data2",50,20,10,40,15,25]],axes:{},groups:{},type:"",types:{data1:"line",data2:"line"},colors:{data1:a.colors[0].value,data2:a.colors[1].value}},grid:{x:{show:"undefined"!=typeof a.defaults["grid x"]?a.defaults["grid x"]:!1},y:{show:"undefined"!=typeof a.defaults["grid y"]?a.defaults["grid y"]:!1}},axis:{x:{show:"undefined"!=typeof a.defaults["axis x"]?a.defaults["axis x"]:!0},y:{show:"undefined"!=typeof a.defaults["axis y"]?a.defaults["axis y"]:!0},y2:{show:"undefined"!=typeof a.defaults["axis y2"]?a.defaults["axis y2"]:!1}},point:{show:"undefined"!=typeof a.defaults.point?a.defaults.point:!1},legend:{position:"undefined"!=typeof a.defaults["legend position"]?a.defaults["legend position"]:"bottom",show:"undefined"!=typeof a.defaults.legend?a.defaults.legend:!0},color:{pattern:b}},d=["line","step","area","area-step","scatter","bar","spline"],e=[{value:"x",label:"Bottom"},{value:"y",label:"Left"},{value:"y2",label:"Right"}];return c.groups={},c.axis.x.accuracy=0,c.axis.y.accuracy=0,c.axis.y2.accuracy=0,c.axis.x.prefix="",c.axis.y.prefix="",c.axis.y2.prefix="",c.axis.x.suffix="",c.axis.y.suffix="",c.axis.y2.suffix="",c.axis.x.tick={format:function(a){return"series"===c.chartGlobalType&&"category"!==c.axis.x.type?c.axis.x.prefix+a.toFixed(c.axis.x.accuracy).toString()+c.axis.x.suffix:a}},c.axis.y.tick={format:function(a){return"series"===c.chartGlobalType&&"category"!==c.axis.y.type?c.axis.y.prefix+a.toFixed(c.axis.y.accuracy).toString()+c.axis.y.suffix:a}},c.axis.y2.tick={format:function(a){return"series"===c.chartGlobalType&&"category"!==c.axis.y2.type?c.axis.y2.prefix+a.toFixed(c.axis.y2.accuracy).toString()+c.axis.y2.suffix:a}},c.chartTitle="",c.chartCredit="",c.chartSource="",c.chartWidth=1e3,c.chartGlobalType="series",c.chartAccuracy=1,c.cms="undefined"!=typeof parent.tinymce?!0:!1,c.pie={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+"%"}}},c.donut={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+"%"}}},c.gauge={label:{format:function(a,b){return(100*b).toFixed(c.chartAccuracy)+"%"}}},{config:c,chartTypes:d,axesConfig:e,dependencies:this.getExternalDependencies()}},getExternalDependencies:function(){return{css:["//cdnjs.cloudflare.com/ajax/libs/c3/0.4.7/c3.min.css"],js:["//cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js","//cdnjs.cloudflare.com/ajax/libs/c3/0.4.7/c3.min.js","//cdn.rawgit.com/vkiryukhin/jsonfn/master/jsonfn.js"]}}}}),angular.module("axisJSApp").service("inputService",["configProvider","$injector",function(a,b){return function(a){return b.get(a.input+"Input")}}]),angular.module("axisJSApp").factory("csvInput",function(){var a=function(a){var b={header:!0};a.match("	")&&(b.delimiter="	");var c=Papa.parse(a,b),d=/^[^,\t\s]*\n[^,\t\s]*$/gm;return c.errors.length>0&&!a.match(d)?!1:!0},b="data1	data2\n30	50\n200	20\n100	10\n400	40\n150	15\n250	25",c=function(a){if(a.inputs.csvData){a.chartData=[],a.columns=[],a.config.data.columns=[];var b={header:!0};a.inputs.csvData.match("	")&&(b.delimiter="	"),a.chartData=Papa.parse(a.inputs.csvData,b).data,a.chartData.length>0&&(a.columns=Object.keys(a.chartData[0]),angular.forEach(a.columns,function(b){var c=[];c.push(b),angular.forEach(a.chartData,function(a){c.push(a[b])}),a.config.data.columns.push(c),"undefined"==typeof a.config.data.types[b]&&(a.config.data.types[b]="series"===a.config.chartGlobalType?"line":a.config.chartGlobalType)}))}return a};return{validate:function(b){return a(b)},defaultData:{csvData:b},input:function(a){return c(a)}}}),angular.module("axisJSApp").factory("embedcodeOutput",["GenericOutput","chartProvider","$modal",function(a,b,c){var d=angular.copy(a);return d.serviceConfig={type:"export",label:"Generate embed code"},d.preprocess=function(a){var c=angular.copy(a.config);return c.bindto="#chart-"+Math.floor(1e4*Math.random()+1),{config:c,dependencies:b(a.appConfig).dependencies}},d.process=function(a){var b=[],c=String(encodeURI(JSONfn.stringify(a.config)));return b.push('<div id="'+a.config.bindto.replace("#","")+'"></div>'),angular.forEach(a.dependencies.css,function(a){b.push('<link rel="stylesheet" href="'+a+'" />')}),angular.forEach(a.dependencies.js,function(a){b.push('<script src="'+a+'"></script>')}),b.push('<script type="text/javascript">var config = JSONfn.parse(decodeURI("'+c+'"));(function(){c3.generate(config);})();</script>'),b.join("\n")},d.complete=function(a){c.open({template:'<h1 style="text-align: center;">Embed code: <br /><small style="text-align: center;">Copy and paste this into a new HTML document</small></h1> <textarea width="100%" height="400" class="form-control">{{output}}</textarea>',controller:["$scope",function(b){b.output=a}]})},d}]),angular.module("axisJSApp").service("pdfOutput",["GenericOutput",function(a){var b=angular.copy(a);return b.preprocess=function(a){return{data:document.getElementById("canvas").toDataURL(),margins:a.appConfig["print margins"]?a.appConfig["print margins"]:void 0}},b.process=function(a){var b=new jsPDF("l","pt");return b.addImage(a.data,"PNG",0,0),b},b.complete=function(a){a.save("axis.pdf")},b}]);