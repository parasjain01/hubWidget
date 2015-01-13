!function t(e,r,n){function a(i,u){if(!r[i]){if(!e[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(o)return o(i,!0);throw new Error("Cannot find module '"+i+"'")}var c=r[i]={exports:{}};e[i][0].call(c.exports,function(t){var r=e[i][1][t];return a(r?r:t)},c,c.exports,t,e,r,n)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<n.length;i++)a(n[i]);return a}({1:[function(t){window.WidgetCreator=t("./lib/WidgetCreator")},{"./lib/WidgetCreator":2}],2:[function(t,e){var r=t("./api"),n=t("./utils"),a=t("./date-formatter"),o=function(t){for(var e=t.length,r=0;e>r;r++){var n=t.item(r);this.create(n)}};o.prototype.create=function(t){this.api||(this.api=new r({key:t.getAttribute("data-key"),v:t.getAttribute("data-version")})),this.createBaseHtml(t);var e=t.getAttribute("data-type");e=e?e:"articles";var n=this;this.getData(t,e,function(r,a){return r?n.displayError(t):void n.populateWidget(t,e,a)})},o.prototype.createBaseHtml=function(t){var e=t.getAttribute("data-title");e=e?e:"News from the Hub";var r='<div class="header">'+e+"</div>";r+='<div class="content" class="loading"></div>',r+='<div class="hubpower clearfix"><div class="link"><a href="http://hub.jhu.edu">http://hub.jhu.edu</a></div><div class="image"><a href="http://hub.jhu.edu"><span>Powered by the Hub</span></a></div></div>',t.innerHTML=r},o.prototype.getQueryStringParams=function(t){var e={per_page:5},r=parseInt(t.getAttribute("data-count"));n.isNumeric(r)&&(e.per_page=r);var a=t.getAttribute("data-channels");a&&(e.channels=a);var o=t.getAttribute("data-tags");o&&(e.tags=o);var i=t.getAttribute("data-topics");return i&&(e.topics=i),e},o.prototype.getData=function(t,e,r){if(!this.api[e])return this.displayError(t);var n=this.getQueryStringParams(t);this.api[e](n).then(function(t){return t.error?r(t.error):r(null,t)})},o.prototype.populateWidget=function(t,e,r){var a="";return"articles"==e?a=this.getFormattedArticles(r):"events"==e&&(a=this.getFormattedEvents(r)),a?(n.removeClass(t.querySelector(".content"),"loading"),void(t.querySelector(".content").innerHTML="<ul>"+a+"</ul>")):this.displayError()},o.prototype.getFormattedArticles=function(t){var e=t._embedded.articles;if(e){for(var r="",n=0,o=e.length;o>n;n++){var i=e[n],u=new a(i.publish_date);r+='<li><p class="headline"><a href="'+i.url+'">'+i.headline+"</a></p>",r+='<p class="pubdate">'+u.article()+"</a></p></li>"}return r}},o.prototype.getFormattedEvents=function(t){var e=t._embedded.events;if(e){for(var r="",n=0,o=e.length;o>n;n++){var i=e[n],u=new a(i.start_date+" "+i.start_time);r+='<li><p class="headline"><a href="'+i.url+'">'+i.name+"</a></p>",r+='<p class="pubdate">'+u.event()+"</a></p></li>"}return r}},o.prototype.displayError=function(t){n.removeClass(t.querySelector(".content"),"loading"),t.querySelector(".content").innerHTML='<p>Sorry, no results were found. Trying checking out <a href="http://hub.jhu.edu">The Hub</a> for the latest Johns Hopkins news and events.</p>'},e.exports=o},{"./api":4,"./date-formatter":5,"./utils":7}],3:[function(t,e){var r=t("./deferred"),n=function(){};n.prototype.getXHR=function(){var t;if("undefined"!=typeof XMLHttpRequest)t=new XMLHttpRequest;else for(var e=["Microsoft.XmlHttp","MSXML2.XmlHttp","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.5.0"],r=0,n=e.length;n>r;r++)try{t=new ActiveXObject(e[r]);break}catch(a){}return t},n.prototype.crossDomainRequest=function(t){var e=document.createElement("script");e.src=t,document.body.appendChild(e)},n.prototype.get=function(t){var e,n=new r;if(t.dataType&&"jsonp"==t.dataType.toLowerCase()){var a=this.randomCallbackName();window[a]=n.resolve,t.data.callback=a,e=t.url+this.createQueryString(t.data),this.crossDomainRequest(e)}else{e=t.url+this.createQueryString(t.data);var o=getXHR();o.onreadystatechange=function(){4===o.readyState&&(200==o.status?n.resolve(o.responseText,o.status):n.reject(o.status))},o.open("GET",e,!0),o.send(null)}return n.promise},n.prototype.createQueryString=function(t){var e="",r=!1;for(var n in t)r&&(e+="&"),e+=n+"="+t[n],r=!0;return"?"+e},n.prototype.random=function(){return Math.floor(1e10*Math.random())},n.prototype.randomCallbackName=function(){var t=(new Date).getTime();return"Ajax_"+this.random()+"_"+t+"_"+this.random()},e.exports=new n},{"./deferred":6}],4:[function(t,e){var r=t("./ajax"),n=function(t){this.key=t.key,this.v=t.v};n.prototype.get=function(t,e){return e.v=this.v,e.key=this.key,r.get({url:"http://api.hub.jhu.edu/"+t,dataType:"jsonp",data:e})},n.prototype.articles=function(t){return this.get("articles",t)},n.prototype.events=function(t){return this.get("events",t)},e.exports=n},{"./ajax":3}],5:[function(t,e){function r(t){var e={1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"},r=t.getMonth()+1;return e[r]}function n(t){var e=t.getHours();return e>12?e-12:0===e?12:e}function a(t){var e=t.getMinutes();return 10>e?"0"+e.toString():e.toString()}function o(t){var e=t.getHours();return 12>e?"am":"pm"}function i(t){var e=t.split(" "),t=e[0].split("-"),r=e[1].split(":"),n=parseInt(t[1])-1;return new Date(t[0],n,t[2],r[0],r[1])}var u=function(t){if("number"==typeof t){var e=1e3*t;this.dateObject=new Date(e)}else this.dateObject=i(t);this.date={timstamp:e,dayOfMonth:this.dateObject.getDate(),monthName:r(this.dateObject),year:this.dateObject.getFullYear(),hour:n(this.dateObject),minutes:a(this.dateObject),ampm:o(this.dateObject)}};u.prototype.article=function(){return this.date.monthName+" "+this.date.dayOfMonth+", "+this.date.year},u.prototype.event=function(){return this.date.monthName+" "+this.date.dayOfMonth+" at "+this.date.hour+":"+this.date.minutes+this.date.ampm},e.exports=u},{}],6:[function(t,e){var r=function(){var t={newDefer:{},resolve:function(e,r,n){var a=t.fulfilled(e,r,n);a&&a.then?a.then(function(e){t.newDefer.resolve(e)}):"function"==typeof t.newDefer.resolve&&t.newDefer.resolve(a)},reject:function(e){var r=t.error(e);e&&e.then?e.then(function(e){t.newDefer.resolve(e)}):"function"==typeof t.newDefer.reject&&t.newDefer.reject(r)},fulfilled:function(){},error:function(){},progress:function(){},promise:{then:function(e,n,a){return t.fulfilled="function"==typeof e?e:function(){},t.error="function"==typeof n?n:function(){},t.progress="function"==typeof a?a:function(){},t.newDefer=new r,t.newDefer.promise}}};return t};e.exports=r},{}],7:[function(t,e){var r=function(){};r.prototype.removeClass=function(t,e){var r=t.className,n=new RegExp(e),a=r.replace(n,"");t.className=a},r.prototype.isNumeric=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},e.exports=new r},{}]},{},[1]);