(()=>{var t={3:()=>{!function(){if("function"==typeof window.Event)return!1;function t(t,e){e=e||{bubbles:!1,cancelable:!1};var n=document.createEvent("Event");return n.initEvent(t,e.bubbles,e.cancelable),n}t.prototype=window.Event.prototype,window.Event=t}()},406:()=>{!function(){"use strict";function t(r){if(!r)throw new Error("No options passed to Waypoint constructor");if(!r.element)throw new Error("No element option passed to Waypoint constructor");if(!r.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,r),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=r.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var r in n)e.push(n[r]);for(var i=0,a=e.length;a>i;i++)e[i][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){for(var e in t.Context.refreshAll(),n)n[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=i.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,r[t.waypointContextKey]=this,n+=1,i.windowContext||(i.windowContext=!0,i.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,r={},i=window.Waypoint,a=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;t&&e&&!n&&(this.adapter.off(".waypoints"),delete r[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",(function(){e.didResize||(e.didResize=!0,i.requestAnimationFrame(t))}))},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",(function(){(!e.didScroll||i.isTouch)&&(e.didScroll=!0,i.requestAnimationFrame(t))}))},e.prototype.handleResize=function(){i.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var r=e[n],i=r.newScroll>r.oldScroll?r.forward:r.backward;for(var a in this.waypoints[n]){var o=this.waypoints[n][a];if(null!==o.triggerPoint){var s=r.oldScroll<o.triggerPoint,u=r.newScroll>=o.triggerPoint;(s&&u||!s&&!u)&&(o.queueTrigger(i),t[o.group.id]=o.group)}}}for(var l in t)t[l].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var r=0,i=t.length;i>r;r++)t[r].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),r={};for(var a in this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var o=t[a];for(var s in this.waypoints[a]){var u,l,c,p,d=this.waypoints[a][s],f=d.options.offset,h=d.triggerPoint,g=0,v=null==h;d.element!==d.element.window&&(g=d.adapter.offset()[o.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(o.contextDimension*f/100))),u=o.contextScroll-o.contextOffset,d.triggerPoint=Math.floor(g+u-f),l=h<o.oldScroll,c=d.triggerPoint>=o.oldScroll,p=!l&&!c,!v&&(l&&c)?(d.queueTrigger(o.backward),r[d.group.id]=d.group):(!v&&p||v&&o.oldScroll>=d.triggerPoint)&&(d.queueTrigger(o.forward),r[d.group.id]=d.group)}}return i.requestAnimationFrame((function(){for(var t in r)r[t].flushTriggers()})),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in r)r[t].refresh()},e.findByElement=function(t){return r[t.waypointContextKey]},window.onload=function(){a&&a(),e.refreshAll()},i.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},i.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),r[this.axis][this.name]=this}var r={vertical:{},horizontal:{}},i=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var r=this.triggerQueues[n],i="up"===n||"left"===n;r.sort(i?e:t);for(var a=0,o=r.length;o>a;a+=1){var s=r[a];(s.options.continuous||a===r.length-1)&&s.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=i.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return r[t.axis][t.name]||new n(t)},i.Group=n}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function n(t){this.element=t,this.handlers={}}var r=window.Waypoint;n.prototype.innerHeight=function(){return t(this.element)?this.element.innerHeight:this.element.clientHeight},n.prototype.innerWidth=function(){return t(this.element)?this.element.innerWidth:this.element.clientWidth},n.prototype.off=function(t,e){function n(t,e,n){for(var r=0,i=e.length-1;i>r;r++){var a=e[r];n&&n!==a||t.removeEventListener(a)}}var r=t.split("."),i=r[0],a=r[1],o=this.element;if(a&&this.handlers[a]&&i)n(o,this.handlers[a][i],e),this.handlers[a][i]=[];else if(i)for(var s in this.handlers)n(o,this.handlers[s][i]||[],e),this.handlers[s][i]=[];else if(a&&this.handlers[a]){for(var u in this.handlers[a])n(o,this.handlers[a][u],e);this.handlers[a]={}}},n.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,n=e(this.element.ownerDocument),r={top:0,left:0};return this.element.getBoundingClientRect&&(r=this.element.getBoundingClientRect()),{top:r.top+n.pageYOffset-t.clientTop,left:r.left+n.pageXOffset-t.clientLeft}},n.prototype.on=function(t,e){var n=t.split("."),r=n[0],i=n[1]||"__default",a=this.handlers[i]=this.handlers[i]||{};(a[r]=a[r]||[]).push(e),this.element.addEventListener(r,e)},n.prototype.outerHeight=function(e){var n,r=this.innerHeight();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),r+=parseInt(n.marginTop,10),r+=parseInt(n.marginBottom,10)),r},n.prototype.outerWidth=function(e){var n,r=this.innerWidth();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),r+=parseInt(n.marginLeft,10),r+=parseInt(n.marginRight,10)),r},n.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},n.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},n.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}for(var e=Array.prototype.slice.call(arguments),n=1,r=e.length;r>n;n++)t(e[0],e[n]);return e[0]},n.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},n.isEmptyObject=function(t){for(var e in t)return!1;return!0},r.adapters.push({name:"noframework",Adapter:n}),r.Adapter=n}()}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}(()=>{"use strict";var t={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],i={CSS:{},springs:{}};function a(t,e,n){return Math.min(Math.max(t,e),n)}function o(t,e){return t.indexOf(e)>-1}function s(t,e){return t.apply(null,e)}var u={arr:function(t){return Array.isArray(t)},obj:function(t){return o(Object.prototype.toString.call(t),"Object")},pth:function(t){return u.obj(t)&&t.hasOwnProperty("totalLength")},svg:function(t){return t instanceof SVGElement},inp:function(t){return t instanceof HTMLInputElement},dom:function(t){return t.nodeType||u.svg(t)},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return void 0===t},nil:function(t){return u.und(t)||null===t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return u.hex(t)||u.rgb(t)||u.hsl(t)},key:function(n){return!t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&"targets"!==n&&"keyframes"!==n}};function l(t){var e=/\(([^)]+)\)/.exec(t);return e?e[1].split(",").map((function(t){return parseFloat(t)})):[]}function c(t,e){var n=l(t),r=a(u.und(n[0])?1:n[0],.1,100),o=a(u.und(n[1])?100:n[1],.1,100),s=a(u.und(n[2])?10:n[2],.1,100),c=a(u.und(n[3])?0:n[3],.1,100),p=Math.sqrt(o/r),d=s/(2*Math.sqrt(o*r)),f=d<1?p*Math.sqrt(1-d*d):0,h=d<1?(d*p-c)/f:-c+p;function g(t){var n=e?e*t/1e3:t;return n=d<1?Math.exp(-n*d*p)*(1*Math.cos(f*n)+h*Math.sin(f*n)):(1+h*n)*Math.exp(-n*p),0===t||1===t?t:1-n}return e?g:function(){var e=i.springs[t];if(e)return e;for(var n=1/6,r=0,a=0;;)if(1===g(r+=n)){if(++a>=16)break}else a=0;var o=r*n*1e3;return i.springs[t]=o,o}}function p(t){return void 0===t&&(t=10),function(e){return Math.ceil(a(e,1e-6,1)*t)*(1/t)}}var d,f,h=function(){var t=.1;function e(t,e){return 1-3*e+3*t}function n(t,e){return 3*e-6*t}function r(t){return 3*t}function i(t,i,a){return((e(i,a)*t+n(i,a))*t+r(i))*t}function a(t,i,a){return 3*e(i,a)*t*t+2*n(i,a)*t+r(i)}return function(e,n,r,o){if(0<=e&&e<=1&&0<=r&&r<=1){var s=new Float32Array(11);if(e!==n||r!==o)for(var u=0;u<11;++u)s[u]=i(u*t,e,r);return function(t){return e===n&&r===o||0===t||1===t?t:i(l(t),n,o)}}function l(n){for(var o=0,u=1;10!==u&&s[u]<=n;++u)o+=t;--u;var l=o+(n-s[u])/(s[u+1]-s[u])*t,c=a(l,e,r);return c>=.001?function(t,e,n,r){for(var o=0;o<4;++o){var s=a(e,n,r);if(0===s)return e;e-=(i(e,n,r)-t)/s}return e}(n,l,e,r):0===c?l:function(t,e,n,r,a){var o,s,u=0;do{(o=i(s=e+(n-e)/2,r,a)-t)>0?n=s:e=s}while(Math.abs(o)>1e-7&&++u<10);return s}(n,o,o+t,e,r)}}}(),g=(d={linear:function(){return function(t){return t}}},f={Sine:function(){return function(t){return 1-Math.cos(t*Math.PI/2)}},Circ:function(){return function(t){return 1-Math.sqrt(1-t*t)}},Back:function(){return function(t){return t*t*(3*t-2)}},Bounce:function(){return function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}},Elastic:function(t,e){void 0===t&&(t=1),void 0===e&&(e=.5);var n=a(t,1,10),r=a(e,.1,2);return function(t){return 0===t||1===t?t:-n*Math.pow(2,10*(t-1))*Math.sin((t-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach((function(t,e){f[t]=function(){return function(t){return Math.pow(t,e+2)}}})),Object.keys(f).forEach((function(t){var e=f[t];d["easeIn"+t]=e,d["easeOut"+t]=function(t,n){return function(r){return 1-e(t,n)(1-r)}},d["easeInOut"+t]=function(t,n){return function(r){return r<.5?e(t,n)(2*r)/2:1-e(t,n)(-2*r+2)/2}},d["easeOutIn"+t]=function(t,n){return function(r){return r<.5?(1-e(t,n)(1-2*r))/2:(e(t,n)(2*r-1)+1)/2}}})),d);function v(t,e){if(u.fnc(t))return t;var n=t.split("(")[0],r=g[n],i=l(t);switch(n){case"spring":return c(t,e);case"cubicBezier":return s(h,i);case"steps":return s(p,i);default:return s(r,i)}}function y(t){try{return document.querySelectorAll(t)}catch(t){return}}function m(t,e){for(var n=t.length,r=arguments.length>=2?arguments[1]:void 0,i=[],a=0;a<n;a++)if(a in t){var o=t[a];e.call(r,o,a,t)&&i.push(o)}return i}function w(t){return t.reduce((function(t,e){return t.concat(u.arr(e)?w(e):e)}),[])}function x(t){return u.arr(t)?t:(u.str(t)&&(t=y(t)||t),t instanceof NodeList||t instanceof HTMLCollection?[].slice.call(t):[t])}function b(t,e){return t.some((function(t){return t===e}))}function O(t){var e={};for(var n in t)e[n]=t[n];return e}function E(t,e){var n=O(t);for(var r in t)n[r]=e.hasOwnProperty(r)?e[r]:t[r];return n}function I(t,e){var n=O(t);for(var r in e)n[r]=u.und(t[r])?e[r]:t[r];return n}function S(t){return u.rgb(t)?(n=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=t))?"rgba("+n[1]+",1)":e:u.hex(t)?function(t){var e=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,e,n,r){return e+e+n+n+r+r})),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return"rgba("+parseInt(n[1],16)+","+parseInt(n[2],16)+","+parseInt(n[3],16)+",1)"}(t):u.hsl(t)?function(t){var e,n,r,i=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),a=parseInt(i[1],10)/360,o=parseInt(i[2],10)/100,s=parseInt(i[3],10)/100,u=i[4]||1;function l(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}if(0==o)e=n=r=s;else{var c=s<.5?s*(1+o):s+o-s*o,p=2*s-c;e=l(p,c,a+1/3),n=l(p,c,a),r=l(p,c,a-1/3)}return"rgba("+255*e+","+255*n+","+255*r+","+u+")"}(t):void 0;var e,n}function A(t){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);if(e)return e[1]}function C(t,e){return u.fnc(t)?t(e.target,e.id,e.total):t}function M(t,e){return t.getAttribute(e)}function k(t,e,n){if(b([n,"deg","rad","turn"],A(e)))return e;var r=i.CSS[e+n];if(!u.und(r))return r;var a=document.createElement(t.tagName),o=t.parentNode&&t.parentNode!==document?t.parentNode:document.body;o.appendChild(a),a.style.position="absolute",a.style.width=100+n;var s=100/a.offsetWidth;o.removeChild(a);var l=s*parseFloat(e);return i.CSS[e+n]=l,l}function P(t,e,n){if(e in t.style){var r=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i=t.style[e]||getComputedStyle(t).getPropertyValue(r)||"0";return n?k(t,i,n):i}}function T(t,e){return u.dom(t)&&!u.inp(t)&&(!u.nil(M(t,e))||u.svg(t)&&t[e])?"attribute":u.dom(t)&&b(r,e)?"transform":u.dom(t)&&"transform"!==e&&P(t,e)?"css":null!=t[e]?"object":void 0}function B(t){if(u.dom(t)){for(var e,n=t.style.transform||"",r=/(\w+)\(([^)]*)\)/g,i=new Map;e=r.exec(n);)i.set(e[1],e[2]);return i}}function D(t,e,n,r){var i=o(e,"scale")?1:0+function(t){return o(t,"translate")||"perspective"===t?"px":o(t,"rotate")||o(t,"skew")?"deg":void 0}(e),a=B(t).get(e)||i;return n&&(n.transforms.list.set(e,a),n.transforms.last=e),r?k(t,a,r):a}function L(t,e,n,r){switch(T(t,e)){case"transform":return D(t,e,r,n);case"css":return P(t,e,n);case"attribute":return M(t,e);default:return t[e]||0}}function z(t,e){var n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;var r=A(t)||0,i=parseFloat(e),a=parseFloat(t.replace(n[0],""));switch(n[0][0]){case"+":return i+a+r;case"-":return i-a+r;case"*":return i*a+r}}function W(t,e){if(u.col(t))return S(t);if(/\s/g.test(t))return t;var n=A(t),r=n?t.substr(0,t.length-n.length):t;return e?r+e:r}function H(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function X(t){for(var e,n=t.points,r=0,i=0;i<n.numberOfItems;i++){var a=n.getItem(i);i>0&&(r+=H(e,a)),e=a}return r}function F(t){if(t.getTotalLength)return t.getTotalLength();switch(t.tagName.toLowerCase()){case"circle":return function(t){return 2*Math.PI*M(t,"r")}(t);case"rect":return function(t){return 2*M(t,"width")+2*M(t,"height")}(t);case"line":return function(t){return H({x:M(t,"x1"),y:M(t,"y1")},{x:M(t,"x2"),y:M(t,"y2")})}(t);case"polyline":return X(t);case"polygon":return function(t){var e=t.points;return X(t)+H(e.getItem(e.numberOfItems-1),e.getItem(0))}(t)}}function Y(t,e){var n=e||{},r=n.el||function(t){for(var e=t.parentNode;u.svg(e)&&u.svg(e.parentNode);)e=e.parentNode;return e}(t),i=r.getBoundingClientRect(),a=M(r,"viewBox"),o=i.width,s=i.height,l=n.viewBox||(a?a.split(" "):[0,0,o,s]);return{el:r,viewBox:l,x:l[0]/1,y:l[1]/1,w:o,h:s,vW:l[2],vH:l[3]}}function q(t,e,n){function r(n){void 0===n&&(n=0);var r=e+n>=1?e+n:0;return t.el.getPointAtLength(r)}var i=Y(t.el,t.svg),a=r(),o=r(-1),s=r(1),u=n?1:i.w/i.vW,l=n?1:i.h/i.vH;switch(t.property){case"x":return(a.x-i.x)*u;case"y":return(a.y-i.y)*l;case"angle":return 180*Math.atan2(s.y-o.y,s.x-o.x)/Math.PI}}function R(t,e){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=W(u.pth(t)?t.totalLength:t,e)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:u.str(t)||e?r.split(n):[]}}function N(t){return m(t?w(u.arr(t)?t.map(x):x(t)):[],(function(t,e,n){return n.indexOf(t)===e}))}function j(t){var e=N(t);return e.map((function(t,n){return{target:t,id:n,total:e.length,transforms:{list:B(t)}}}))}function Q(t,e){var n=O(e);if(/^spring/.test(n.easing)&&(n.duration=c(n.easing)),u.arr(t)){var r=t.length;2===r&&!u.obj(t[0])?t={value:t}:u.fnc(e.duration)||(n.duration=e.duration/r)}var i=u.arr(t)?t:[t];return i.map((function(t,n){var r=u.obj(t)&&!u.pth(t)?t:{value:t};return u.und(r.delay)&&(r.delay=n?0:e.delay),u.und(r.endDelay)&&(r.endDelay=n===i.length-1?e.endDelay:0),r})).map((function(t){return I(t,n)}))}function V(t,e){var n=[],r=e.keyframes;for(var i in r&&(e=I(function(t){for(var e=m(w(t.map((function(t){return Object.keys(t)}))),(function(t){return u.key(t)})).reduce((function(t,e){return t.indexOf(e)<0&&t.push(e),t}),[]),n={},r=function(r){var i=e[r];n[i]=t.map((function(t){var e={};for(var n in t)u.key(n)?n==i&&(e.value=t[n]):e[n]=t[n];return e}))},i=0;i<e.length;i++)r(i);return n}(r),e)),e)u.key(i)&&n.push({name:i,tweens:Q(e[i],t)});return n}function $(t,e){var n;return t.tweens.map((function(r){var i=function(t,e){var n={};for(var r in t){var i=C(t[r],e);u.arr(i)&&1===(i=i.map((function(t){return C(t,e)}))).length&&(i=i[0]),n[r]=i}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}(r,e),a=i.value,o=u.arr(a)?a[1]:a,s=A(o),l=L(e.target,t.name,s,e),c=n?n.to.original:l,p=u.arr(a)?a[0]:c,d=A(p)||A(l),f=s||d;return u.und(o)&&(o=c),i.from=R(p,f),i.to=R(z(o,p),f),i.start=n?n.end:0,i.end=i.start+i.delay+i.duration+i.endDelay,i.easing=v(i.easing,i.duration),i.isPath=u.pth(a),i.isPathTargetInsideSVG=i.isPath&&u.svg(e.target),i.isColor=u.col(i.from.original),i.isColor&&(i.round=1),n=i,i}))}var U={css:function(t,e,n){return t.style[e]=n},attribute:function(t,e,n){return t.setAttribute(e,n)},object:function(t,e,n){return t[e]=n},transform:function(t,e,n,r,i){if(r.list.set(e,n),e===r.last||i){var a="";r.list.forEach((function(t,e){a+=e+"("+t+") "})),t.style.transform=a}}};function G(t,e){j(t).forEach((function(t){for(var n in e){var r=C(e[n],t),i=t.target,a=A(r),o=L(i,n,a,t),s=z(W(r,a||A(o)),o),u=T(i,n);U[u](i,n,s,t.transforms,!0)}}))}function Z(t,e){return m(w(t.map((function(t){return e.map((function(e){return function(t,e){var n=T(t.target,e.name);if(n){var r=$(e,t),i=r[r.length-1];return{type:n,property:e.name,animatable:t,tweens:r,duration:i.end,delay:r[0].delay,endDelay:i.endDelay}}}(t,e)}))}))),(function(t){return!u.und(t)}))}function _(t,e){var n=t.length,r=function(t){return t.timelineOffset?t.timelineOffset:0},i={};return i.duration=n?Math.max.apply(Math,t.map((function(t){return r(t)+t.duration}))):e.duration,i.delay=n?Math.min.apply(Math,t.map((function(t){return r(t)+t.delay}))):e.delay,i.endDelay=n?i.duration-Math.max.apply(Math,t.map((function(t){return r(t)+t.duration-t.endDelay}))):e.endDelay,i}var K=0;var J=[],tt=function(){var t;function e(n){for(var r=J.length,i=0;i<r;){var a=J[i];a.paused?(J.splice(i,1),r--):(a.tick(n),i++)}t=i>0?requestAnimationFrame(e):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",(function(){nt.suspendWhenDocumentHidden&&(et()?t=cancelAnimationFrame(t):(J.forEach((function(t){return t._onDocumentVisibility()})),tt()))})),function(){t||et()&&nt.suspendWhenDocumentHidden||!(J.length>0)||(t=requestAnimationFrame(e))}}();function et(){return!!document&&document.hidden}function nt(n){void 0===n&&(n={});var r,i=0,o=0,s=0,u=0,l=null;function c(t){var e=window.Promise&&new Promise((function(t){return l=t}));return t.finished=e,e}var p=function(n){var r=E(t,n),i=E(e,n),a=V(i,n),o=j(n.targets),s=Z(o,a),u=_(s,i),l=K;return K++,I(r,{id:l,children:[],animatables:o,animations:s,duration:u.duration,delay:u.delay,endDelay:u.endDelay})}(n);c(p);function d(){var t=p.direction;"alternate"!==t&&(p.direction="normal"!==t?"normal":"reverse"),p.reversed=!p.reversed,r.forEach((function(t){return t.reversed=p.reversed}))}function f(t){return p.reversed?p.duration-t:t}function h(){i=0,o=f(p.currentTime)*(1/nt.speed)}function g(t,e){e&&e.seek(t-e.timelineOffset)}function v(t){for(var e=0,n=p.animations,r=n.length;e<r;){var i=n[e],o=i.animatable,s=i.tweens,u=s.length-1,l=s[u];u&&(l=m(s,(function(e){return t<e.end}))[0]||l);for(var c=a(t-l.start-l.delay,0,l.duration)/l.duration,d=isNaN(c)?1:l.easing(c),f=l.to.strings,h=l.round,g=[],v=l.to.numbers.length,y=void 0,w=0;w<v;w++){var x=void 0,b=l.to.numbers[w],O=l.from.numbers[w]||0;x=l.isPath?q(l.value,d*b,l.isPathTargetInsideSVG):O+d*(b-O),h&&(l.isColor&&w>2||(x=Math.round(x*h)/h)),g.push(x)}var E=f.length;if(E){y=f[0];for(var I=0;I<E;I++){f[I];var S=f[I+1],A=g[I];isNaN(A)||(y+=S?A+S:A+" ")}}else y=g[0];U[i.type](o.target,i.property,y,o.transforms),i.currentValue=y,e++}}function y(t){p[t]&&!p.passThrough&&p[t](p)}function w(t){var e=p.duration,n=p.delay,h=e-p.endDelay,m=f(t);p.progress=a(m/e*100,0,100),p.reversePlayback=m<p.currentTime,r&&function(t){if(p.reversePlayback)for(var e=u;e--;)g(t,r[e]);else for(var n=0;n<u;n++)g(t,r[n])}(m),!p.began&&p.currentTime>0&&(p.began=!0,y("begin")),!p.loopBegan&&p.currentTime>0&&(p.loopBegan=!0,y("loopBegin")),m<=n&&0!==p.currentTime&&v(0),(m>=h&&p.currentTime!==e||!e)&&v(e),m>n&&m<h?(p.changeBegan||(p.changeBegan=!0,p.changeCompleted=!1,y("changeBegin")),y("change"),v(m)):p.changeBegan&&(p.changeCompleted=!0,p.changeBegan=!1,y("changeComplete")),p.currentTime=a(m,0,e),p.began&&y("update"),t>=e&&(o=0,p.remaining&&!0!==p.remaining&&p.remaining--,p.remaining?(i=s,y("loopComplete"),p.loopBegan=!1,"alternate"===p.direction&&d()):(p.paused=!0,p.completed||(p.completed=!0,y("loopComplete"),y("complete"),!p.passThrough&&"Promise"in window&&(l(),c(p)))))}return p.reset=function(){var t=p.direction;p.passThrough=!1,p.currentTime=0,p.progress=0,p.paused=!0,p.began=!1,p.loopBegan=!1,p.changeBegan=!1,p.completed=!1,p.changeCompleted=!1,p.reversePlayback=!1,p.reversed="reverse"===t,p.remaining=p.loop,r=p.children;for(var e=u=r.length;e--;)p.children[e].reset();(p.reversed&&!0!==p.loop||"alternate"===t&&1===p.loop)&&p.remaining++,v(p.reversed?p.duration:0)},p._onDocumentVisibility=h,p.set=function(t,e){return G(t,e),p},p.tick=function(t){s=t,i||(i=s),w((s+(o-i))*nt.speed)},p.seek=function(t){w(f(t))},p.pause=function(){p.paused=!0,h()},p.play=function(){p.paused&&(p.completed&&p.reset(),p.paused=!1,J.push(p),h(),tt())},p.reverse=function(){d(),p.completed=!p.reversed,h()},p.restart=function(){p.reset(),p.play()},p.remove=function(t){it(N(t),p)},p.reset(),p.autoplay&&p.play(),p}function rt(t,e){for(var n=e.length;n--;)b(t,e[n].animatable.target)&&e.splice(n,1)}function it(t,e){var n=e.animations,r=e.children;rt(t,n);for(var i=r.length;i--;){var a=r[i],o=a.animations;rt(t,o),o.length||a.children.length||r.splice(i,1)}n.length||r.length||e.pause()}nt.version="3.2.1",nt.speed=1,nt.suspendWhenDocumentHidden=!0,nt.running=J,nt.remove=function(t){for(var e=N(t),n=J.length;n--;){it(e,J[n])}},nt.get=L,nt.set=G,nt.convertPx=k,nt.path=function(t,e){var n=u.str(t)?y(t)[0]:t,r=e||100;return function(t){return{property:t,el:n,svg:Y(n),totalLength:F(n)*(r/100)}}},nt.setDashoffset=function(t){var e=F(t);return t.setAttribute("stroke-dasharray",e),e},nt.stagger=function(t,e){void 0===e&&(e={});var n=e.direction||"normal",r=e.easing?v(e.easing):null,i=e.grid,a=e.axis,o=e.from||0,s="first"===o,l="center"===o,c="last"===o,p=u.arr(t),d=p?parseFloat(t[0]):parseFloat(t),f=p?parseFloat(t[1]):0,h=A(p?t[1]:t)||0,g=e.start||0+(p?d:0),y=[],m=0;return function(t,e,u){if(s&&(o=0),l&&(o=(u-1)/2),c&&(o=u-1),!y.length){for(var v=0;v<u;v++){if(i){var w=l?(i[0]-1)/2:o%i[0],x=l?(i[1]-1)/2:Math.floor(o/i[0]),b=w-v%i[0],O=x-Math.floor(v/i[0]),E=Math.sqrt(b*b+O*O);"x"===a&&(E=-b),"y"===a&&(E=-O),y.push(E)}else y.push(Math.abs(o-v));m=Math.max.apply(Math,y)}r&&(y=y.map((function(t){return r(t/m)*m}))),"reverse"===n&&(y=y.map((function(t){return a?t<0?-1*t:-t:Math.abs(m-t)})))}return g+(p?(f-d)/m:d)*(Math.round(100*y[e])/100)+h}},nt.timeline=function(t){void 0===t&&(t={});var n=nt(t);return n.duration=0,n.add=function(r,i){var a=J.indexOf(n),o=n.children;function s(t){t.passThrough=!0}a>-1&&J.splice(a,1);for(var l=0;l<o.length;l++)s(o[l]);var c=I(r,E(e,t));c.targets=c.targets||t.targets;var p=n.duration;c.autoplay=!1,c.direction=n.direction,c.timelineOffset=u.und(i)?p:z(i,p),s(n),n.seek(c.timelineOffset);var d=nt(c);s(d),o.push(d);var f=_(o,t);return n.delay=f.delay,n.endDelay=f.endDelay,n.duration=f.duration,n.seek(0),n.reset(),n.autoplay&&n.play(),n},n},nt.easing=v,nt.penner=g,nt.random=function(t,e){return Math.floor(Math.random()*(e-t+1))+t};const at=nt,ot={springBounce:{easing:"spring",scale:[{value:1.05,duration:50},{value:.95,duration:250},{value:1,duration:500}]}},st={default:[{opacity:1,duration:0}],fadeIn:[{easing:"easeOutExpo",duration:2500,opacity:[0,1]}],fadeInUp:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],translateY:["100px",0]}],fadeInDown:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],translateY:["-100px",0]}],fadeInLeft:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],translateX:["-100px",0]}],fadeInRight:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],translateX:["100px",0]}],slideInUp:[{easing:"easeOutExpo",duration:2500,opacity:[{value:0,duration:1},{value:1,duration:0}],translateY:[{value:0,duration:1},{value:"100vh",duration:0},{value:0}]}],slideInDown:[{easing:"easeOutExpo",duration:2500,opacity:[{value:0,duration:1},{value:1,duration:0}],translateY:[{value:0,duration:1},{value:"-100vh",duration:0},{value:0}]}],slideInLeft:[{easing:"easeOutExpo",duration:2500,opacity:[1,1],translateX:["-100vw",0]}],slideInRight:[{easing:"easeOutExpo",duration:2500,opacity:[1,1],translateX:["100vw",0]}],zoomIn:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],scale:[.3,1]}],zoomInUp:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],scale:[.3,1],translateY:["100px",0]}],zoomInDown:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],scale:[.3,1],translateY:["-100px",0]}],zoomInLeft:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],scale:[.3,1],translateX:["-100px",0]}],zoomInRight:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],scale:[.3,1],translateX:["100px",0]}],bounceIn:[{easing:"easeInExpo",duration:1e3,opacity:[0,1],scale:[0,1]},ot.springBounce],bounceInUp:[{easing:"easeInExpo",duration:1e3,opacity:[0,1],scale:[.1,1],translateY:["100vh",0]},ot.springBounce],bounceInDown:[{easing:"easeInExpo",duration:1e3,opacity:[0,1],scale:[.1,1],translateY:["-100vh",0]},ot.springBounce],bounceInLeft:[{easing:"easeInExpo",duration:1e3,opacity:[0,1],scale:[.1,1],translateX:["-100vw",0]},ot.springBounce],bounceInRight:[{easing:"easeInExpo",duration:1e3,opacity:[0,1],scale:[.1,1],translateX:["100vw",0]},ot.springBounce],flipInX:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotateX:[180,0]}],flipInY:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotateY:[180,0]}],rotateIn:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotate:[90,0]}],rotateInUpLeft:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotate:[-180,0],translateX:["-100px",0],translateY:["-100px",0]}],rotateInUpRight:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotate:[180,0],translateX:["100px",0],translateY:["-100px",0]}],rotateInDownLeft:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotate:[-180,0],translateX:["-100px",0],translateY:["100px",0]}],rotateInDownRight:[{easing:"easeOutExpo",duration:2500,opacity:[0,1],rotate:[180,0],translateX:["100px",0],translateY:["100px",0]}],shakeX:[{easing:"easeInOutSine",duration:1e3,opacity:[1,1],translateX:["-10px","10px","-7px","7px","-5px","5px",0]}],shakeY:[{easing:"easeInOutSine",duration:1e3,opacity:[1,1],translateY:["-10px","10px","-7px","7px","-5px","5px",0]}],revealltr:[{easing:"easeInOutQuint",duration:1500,opacity:[1,1],clipPath:["inset(0 100% 0 0)","inset(0 0% 0 0)"]}],revealrtl:[{easing:"easeInOutQuint",duration:1500,opacity:[1,1],clipPath:["inset(0 0 0 100%)","inset(0 0 0 0%)"]}],revealbtt:[{easing:"easeInOutQuint",duration:1500,opacity:[1,1],clipPath:["inset(0 0 100% 0)","inset(0 0 0% 0)"]}],revealttb:[{easing:"easeInOutQuint",duration:1500,opacity:[1,1],clipPath:["inset(100% 0 0 0)","inset(0% 0 0 0)"]}],flash:[{easing:"spring",duration:1e3,opacity:[0,1,0,1]}],pulse:[{easing:"easeInOutSine",duration:1e3,scale:[1,1.3,1],opacity:[1,.8,1]}],waves:[{easing:"easeInOutSine",duration:1500,opacity:[1,1],translateY:[0,"-5px","5px",0],rotate:[0,-2,2,-2,2,0]}],heartbeat:[{duration:1e3,opacity:[1,1],scale:[{value:1,duration:0,easing:"easeOutCubic"},{value:1.3,duration:150,easing:"easeOutCubic"},{value:1,duration:200,easing:"easeOutCubic"},{value:1.15,duration:150,easing:"easeOutCubic"},{value:1,duration:200,easing:"easeOutCubic"}],translateY:[{value:0,duration:0,easing:"easeOutCubic"},{value:-4,duration:150,easing:"easeOutCubic"},{value:0,duration:200,easing:"easeOutCubic"},{value:-2,duration:150,easing:"easeOutCubic"},{value:0,duration:200,easing:"easeOutCubic"}]}],swing:[{easing:"easeInOutSine",duration:2e3,opacity:[1,1],translateX:["-20%","20%","-10%","10%","-5%","5%","0"],rotate:[10,-10,6,-6,3,-3,0]}],rubberBand:[{easing:"easeInOutSine",duration:1e3,opacity:[1,1],scale:[1,1.25,.75,1.15,.95,1.05,1]}],tada:[{easing:"easeOutElastic(1, .8)",duration:1e3,opacity:[1,1],scale:[{value:1,duration:0,easing:"easeOutExpo"},{value:.9,duration:100,easing:"easeOutExpo"},{value:1.1,duration:300,easing:"easeOutExpo"},{value:1.1,duration:200,easing:"easeOutExpo"},{value:1.2,duration:100,easing:"easeOutExpo"},{value:1,duration:300,easing:"easeOutExpo"}],rotate:[{value:0,duration:0,easing:"easeOutExpo"},{value:-3,duration:100,easing:"easeOutExpo"},{value:3,duration:100,easing:"easeOutExpo"},{value:-3,duration:100,easing:"easeOutExpo"},{value:3,duration:100,easing:"easeOutExpo"},{value:-3,duration:100,easing:"easeOutExpo"},{value:3,duration:100,easing:"easeOutExpo"},{value:0,duration:300,easing:"easeOutExpo"}]}],wobble:[{easing:"easeInOutSine",duration:1e3,opacity:[1,1],translateX:["0","-25%","20%","-15%","10%","-5%","0"],rotate:[0,-5,3,-3,2,-1,0]}],jello:[{easing:"easeInOutSine",duration:1e3,opacity:[1,1],translateX:["0","-20%","15%","-10%","5%","0"],rotate:[0,-10,3,-3,2,-1,0]}]},ut="superb-addons/block-animation";n(406),n(3),function(){const t=document.querySelectorAll("[superb-addons-animation]");if(!t.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return void t.forEach((t=>{t.style.opacity=1}));const e=t=>!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length);t.forEach((t=>{const n=((t,e)=>{const n=st[t]??st.default;if(!n)return!1;const r=at.timeline({loop:!1,autoplay:!1});return n.forEach((t=>{t.targets=e,r.add(t)})),r})(t.getAttribute("superb-addons-animation"),t);n&&((t,n)=>{if(!t)return;if(!n)return;const r=()=>{e(t)&&n.play()};if(t.addEventListener(ut,r),t.getAttribute("superb-addons-animation-trigger"))return;const i=new Waypoint({element:t,offset:"95%",handler:function(){if(e(t))t.dispatchEvent(new Event(ut)),t.removeEventListener(ut,r),i.destroy();else{console.log("Element is not visible, observing");const n=new MutationObserver((a=>{e(t)&&(t.dispatchEvent(new Event(ut)),t.removeEventListener(ut,r),i.destroy(),n.disconnect())}));n.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class","hidden"]})}}})})(t,n)}))}()})()})();