!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";var r=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return r.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)void 0!==e[r]&&(n[r]=e[r]);return n};e.exports={arrayToObject:i,assign:function(e,t){return Object.keys(t).reduce(function(e,n){return e[n]=t[n],e},e)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var o=t[r],i=o.obj[o.prop],a=Object.keys(i),s=0;s<a.length;++s){var c=a[s],u=i[c];"object"==typeof u&&null!==u&&-1===n.indexOf(u)&&(t.push({obj:i,prop:c}),n.push(u))}return function(e){for(var t;e.length;){var n=e.pop();if(t=n.obj[n.prop],Array.isArray(t)){for(var r=[],o=0;o<t.length;++o)void 0!==t[o]&&r.push(t[o]);n.obj[n.prop]=r}}return t}(t)},decode:function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},encode:function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),n="",r=0;r<t.length;++r){var i=t.charCodeAt(r);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?n+=t.charAt(r):i<128?n+=o[i]:i<2048?n+=o[192|i>>6]+o[128|63&i]:i<55296||i>=57344?n+=o[224|i>>12]+o[128|i>>6&63]+o[128|63&i]:(r+=1,i=65536+((1023&i)<<10|1023&t.charCodeAt(r)),n+=o[240|i>>18]+o[128|i>>12&63]+o[128|i>>6&63]+o[128|63&i])}return n},isBuffer:function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,n,o){if(!n)return t;if("object"!=typeof n){if(Array.isArray(t))t.push(n);else{if("object"!=typeof t)return[t,n];(o.plainObjects||o.allowPrototypes||!r.call(Object.prototype,n))&&(t[n]=!0)}return t}if("object"!=typeof t)return[t].concat(n);var a=t;return Array.isArray(t)&&!Array.isArray(n)&&(a=i(t,o)),Array.isArray(t)&&Array.isArray(n)?(n.forEach(function(n,i){r.call(t,i)?t[i]&&"object"==typeof t[i]?t[i]=e(t[i],n,o):t.push(n):t[i]=n}),t):Object.keys(n).reduce(function(t,i){var a=n[i];return r.call(t,i)?t[i]=e(t[i],a,o):t[i]=a,t},a)}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}c((r=r.apply(e,t||[])).next())})},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(9),a=n(5),s=i("crypto-news-api");t.generateAPI=function(e){return function(){function t(e,t){if(this.sentimentEnabled=!1,!e)throw new Error("No API key found. Register for an API key at https://cryptocontrol.io/apis");this.apikey=e,this.proxyURL=t,s("using cryptocontrol.io api v1")}return t.prototype._fetch=function(t,n){void 0===n&&(n={}),n.enableSentiment=this.sentimentEnabled;var r=a.stringify(n),o=this.proxyURL||"https://cryptocontrol.io/api/v1/public";return e(""+o+t+"?"+r,{headers:{"user-agent":"CryptoControl Node.js API v2.2.0","x-api-key":this.apikey}}).then(function(e){if(401===e.status)throw new Error("Invalid API Key");if(405===e.status)throw new Error("You are not a premium user. Visit https://cryptocontrol.io/about/premium for more info");if(200!==e.status)throw new Error("Bad response from the CryptoControl server");return e.json()})},t.prototype.enableSentiment=function(){return r(this,void 0,void 0,function(){return o(this,function(e){return this.sentimentEnabled=!0,[2]})})},t.prototype.getTopNews=function(e){return void 0===e&&(e="en"),r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this._fetch("/news",{language:e})];case 1:return[2,t.sent()]}})})},t.prototype.getLatestNews=function(e){return void 0===e&&(e="en"),r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this._fetch("/news",{latest:!0,language:e})];case 1:return[2,t.sent()]}})})},t.prototype.getTopNewsByCategory=function(e){return void 0===e&&(e="en"),r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this._fetch("/news/category",{language:e})];case 1:return[2,t.sent()]}})})},t.prototype.getTopNewsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/news/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getLatestNewsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/news/coin/"+e,{latest:!0,language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getTopNewsByCoinCategory=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/news/coin/"+e+"/category",{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getTopTweeetsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/tweets/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getLatestTweetsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/tweets/coin/"+e,{latest:!0,language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getTopRedditPostsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/reddit/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getLatestRedditPostsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/reddit/coin/"+e,{latest:!0,language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getTopFeedByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/feed/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getLatestFeedByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/feed/coin/"+e,{latest:!0,language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getTopItemsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/all/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getLatestItemsByCoin=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/all/coin/"+e,{latest:!0,language:t})];case 1:return[2,n.sent()]}})})},t.prototype.getCoinDetails=function(e,t){return void 0===t&&(t="en"),r(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._fetch("/details/coin/"+e,{language:t})];case 1:return[2,n.sent()]}})})},t}()}},function(e,t,n){"use strict";var r=n(1),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:r.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(e,t,n){if(e){var r=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(r),s=a?r.slice(0,a.index):r,c=[];if(s){if(!n.plainObjects&&o.call(Object.prototype,s)&&!n.allowPrototypes)return;c.push(s)}for(var u=0;null!==(a=i.exec(r))&&u<n.depth;){if(u+=1,!n.plainObjects&&o.call(Object.prototype,a[1].slice(1,-1))&&!n.allowPrototypes)return;c.push(a[1])}return a&&c.push("["+r.slice(a.index)+"]"),function(e,t,n){for(var r=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a)i=(i=[]).concat(r);else{i=n.plainObjects?Object.create(null):{};var s="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(s,10);!isNaN(c)&&a!==s&&String(c)===s&&c>=0&&n.parseArrays&&c<=n.arrayLimit?(i=[])[c]=r:i[s]=r}r=i}return r}(c,t,n)}};e.exports=function(e,t){var n=t?r.assign({},t):{};if(null!==n.decoder&&void 0!==n.decoder&&"function"!=typeof n.decoder)throw new TypeError("Decoder has to be a function.");if(n.ignoreQueryPrefix=!0===n.ignoreQueryPrefix,n.delimiter="string"==typeof n.delimiter||r.isRegExp(n.delimiter)?n.delimiter:i.delimiter,n.depth="number"==typeof n.depth?n.depth:i.depth,n.arrayLimit="number"==typeof n.arrayLimit?n.arrayLimit:i.arrayLimit,n.parseArrays=!1!==n.parseArrays,n.decoder="function"==typeof n.decoder?n.decoder:i.decoder,n.allowDots="boolean"==typeof n.allowDots?n.allowDots:i.allowDots,n.plainObjects="boolean"==typeof n.plainObjects?n.plainObjects:i.plainObjects,n.allowPrototypes="boolean"==typeof n.allowPrototypes?n.allowPrototypes:i.allowPrototypes,n.parameterLimit="number"==typeof n.parameterLimit?n.parameterLimit:i.parameterLimit,n.strictNullHandling="boolean"==typeof n.strictNullHandling?n.strictNullHandling:i.strictNullHandling,""===e||null===e||void 0===e)return n.plainObjects?Object.create(null):{};for(var s="string"==typeof e?function(e,t){for(var n={},r=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,s=r.split(t.delimiter,a),c=0;c<s.length;++c){var u,l,f=s[c],p=f.indexOf("]="),d=-1===p?f.indexOf("="):p+1;-1===d?(u=t.decoder(f,i.decoder),l=t.strictNullHandling?null:""):(u=t.decoder(f.slice(0,d),i.decoder),l=t.decoder(f.slice(d+1),i.decoder)),o.call(n,u)?n[u]=[].concat(n[u]).concat(l):n[u]=l}return n}(e,n):e,c=n.plainObjects?Object.create(null):{},u=Object.keys(s),l=0;l<u.length;++l){var f=u[l],p=a(f,s[f],n);c=r.merge(c,p,n)}return r.compact(c)}},function(e,t,n){"use strict";var r=n(1),o=n(0),i={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},a=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,serializeDate:function(e){return a.call(e)},skipNulls:!1,strictNullHandling:!1},c=function e(t,n,o,i,a,c,u,l,f,p,d,h){var y=t;if("function"==typeof u)y=u(n,y);else if(y instanceof Date)y=p(y);else if(null===y){if(i)return c&&!h?c(n,s.encoder):n;y=""}if("string"==typeof y||"number"==typeof y||"boolean"==typeof y||r.isBuffer(y))return c?[d(h?n:c(n,s.encoder))+"="+d(c(y,s.encoder))]:[d(n)+"="+d(String(y))];var g,v=[];if(void 0===y)return v;if(Array.isArray(u))g=u;else{var C=Object.keys(y);g=l?C.sort(l):C}for(var m=0;m<g.length;++m){var b=g[m];a&&null===y[b]||(v=Array.isArray(y)?v.concat(e(y[b],o(n,b),o,i,a,c,u,l,f,p,d,h)):v.concat(e(y[b],n+(f?"."+b:"["+b+"]"),o,i,a,c,u,l,f,p,d,h)))}return v};e.exports=function(e,t){var n=e,a=t?r.assign({},t):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!=typeof a.encoder)throw new TypeError("Encoder has to be a function.");var u=void 0===a.delimiter?s.delimiter:a.delimiter,l="boolean"==typeof a.strictNullHandling?a.strictNullHandling:s.strictNullHandling,f="boolean"==typeof a.skipNulls?a.skipNulls:s.skipNulls,p="boolean"==typeof a.encode?a.encode:s.encode,d="function"==typeof a.encoder?a.encoder:s.encoder,h="function"==typeof a.sort?a.sort:null,y=void 0!==a.allowDots&&a.allowDots,g="function"==typeof a.serializeDate?a.serializeDate:s.serializeDate,v="boolean"==typeof a.encodeValuesOnly?a.encodeValuesOnly:s.encodeValuesOnly;if(void 0===a.format)a.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,a.format))throw new TypeError("Unknown format option provided.");var C,m,b=o.formatters[a.format];"function"==typeof a.filter?n=(m=a.filter)("",n):Array.isArray(a.filter)&&(C=m=a.filter);var w,F=[];if("object"!=typeof n||null===n)return"";w=a.arrayFormat in i?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var O=i[w];C||(C=Object.keys(n)),h&&C.sort(h);for(var j=0;j<C.length;++j){var A=C[j];f&&null===n[A]||(F=F.concat(c(n[A],A,O,l,f,p?d:null,m,h,y,g,b,v)))}var x=F.join(u),T=!0===a.addQueryPrefix?"?":"";return x.length>0?T+x:""}},function(e,t,n){"use strict";var r=n(4),o=n(3),i=n(0);e.exports={formats:i,parse:o,stringify:r}},function(e,t){var n=1e3,r=60*n,o=60*r,i=24*o,a=365.25*i;function s(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}e.exports=function(e,t){t=t||{};var c,u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var s=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return s*a;case"days":case"day":case"d":return s*i;case"hours":case"hour":case"hrs":case"hr":case"h":return s*o;case"minutes":case"minute":case"mins":case"min":case"m":return s*r;case"seconds":case"second":case"secs":case"sec":case"s":return s*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:return}}(e);if("number"===u&&!1===isNaN(e))return t.long?s(c=e,i,"day")||s(c,o,"hour")||s(c,r,"minute")||s(c,n,"second")||c+" ms":function(e){if(e>=i)return Math.round(e/i)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=r)return Math.round(e/r)+"m";if(e>=n)return Math.round(e/n)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,t,n){function r(e){var n;function r(){if(r.enabled){var e=r,o=+new Date,i=o-(n||o);e.diff=i,e.prev=n,e.curr=o,n=o;for(var a=new Array(arguments.length),s=0;s<a.length;s++)a[s]=arguments[s];a[0]=t.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");var c=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;c++;var o=t.formatters[r];if("function"==typeof o){var i=a[c];n=o.call(e,i),a.splice(c,1),c--}return n}),t.formatArgs.call(e,a),(r.log||t.log||console.log.bind(console)).apply(e,a)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var n,r=0;for(n in e)r=(r<<5)-r+e.charCodeAt(n),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),r.destroy=o,"function"==typeof t.init&&t.init(r),t.instances.push(r),r}function o(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var n;t.save(e),t.names=[],t.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(n=0;n<o;n++)r[n]&&("-"===(e=r[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(n=0;n<t.instances.length;n++){var i=t.instances[n];i.enabled=t.enabled(i.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var n,r;for(n=0,r=t.skips.length;n<r;n++)if(t.skips[n].test(e))return!1;for(n=0,r=t.names.length;n<r;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=n(6),t.instances=[],t.names=[],t.skips=[],t.formatters={}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&d())}function d(){if(!l){var e=s(p);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function y(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new h(e,t)),1!==u.length||l||s(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){(function(r){function o(){var e;try{e=t.storage.debug}catch(e){}return!e&&void 0!==r&&"env"in r&&(e=r.env.DEBUG),e}(t=e.exports=n(7)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var n=this.useColors;if(e[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+e[0]+(n?"%c ":" ")+"+"+t.humanize(this.diff),!n)return;var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var o=0,i=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&"%c"===e&&(i=++o)}),e.splice(i,0,r)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=o,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(o())}).call(this,n(8))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=n(2).generateAPI(fetch);window.CryptoControlApi=r,window.CryptoNewsApi=r,e.CryptoControlApi=r,e.CryptoNewsApi=r,t.default=r,function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(2))}).call(this,n(10))}]);