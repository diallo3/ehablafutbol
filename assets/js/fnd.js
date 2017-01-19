"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};window.whatInput=function(){function t(){i(),o(event),m=!0,$=window.setTimeout(function(){m=!1},650)}function e(t){m||o(t)}function n(t){i(),o(t)}function i(){window.clearTimeout($)}function o(t){var e=r(t),n=b[t.type];if("pointer"===n&&(n=u(t)),w!==n){var i=s(t),o=i.nodeName.toLowerCase(),d="input"===o?i.getAttribute("type"):null;!h.hasAttribute("data-whatinput-formtyping")&&w&&"keyboard"===n&&"tab"!==E[e]&&("textarea"===o||"select"===o||"input"===o&&v.indexOf(d)<0)||y.indexOf(e)>-1||a(n)}"keyboard"===n&&l(e)}function a(t){w=t,h.setAttribute("data-whatinput",w),z.indexOf(w)===-1&&z.push(w)}function r(t){return t.keyCode?t.keyCode:t.which}function s(t){return t.target||t.srcElement}function u(t){return"number"==typeof t.pointerType?O[t.pointerType]:"pen"===t.pointerType?"touch":t.pointerType}function l(t){p.indexOf(E[t])===-1&&E[t]&&p.push(E[t])}function d(t){var e=r(t),n=p.indexOf(E[e]);n!==-1&&p.splice(n,1)}function f(){h=document.body,window.PointerEvent?(h.addEventListener("pointerdown",e),h.addEventListener("pointermove",e)):window.MSPointerEvent?(h.addEventListener("MSPointerDown",e),h.addEventListener("MSPointerMove",e)):(h.addEventListener("mousedown",e),h.addEventListener("mousemove",e),"ontouchstart"in window&&h.addEventListener("touchstart",t)),h.addEventListener(g,e),h.addEventListener("keydown",n),h.addEventListener("keyup",n),document.addEventListener("keyup",d)}function c(){return g="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"}var h,p=[],m=!1,w=null,v=["button","checkbox","file","image","radio","reset","submit"],g=c(),y=[16,17,18,91,93],b={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"};b[c()]="mouse";var $,z=[],E={9:"tab",13:"enter",16:"shift",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"},O={2:"touch",3:"touch",4:"mouse"};return"addEventListener"in window&&Array.prototype.indexOf&&(document.body?f():document.addEventListener("DOMContentLoaded",f)),{ask:function(){return w},keys:function(){return p},types:function(){return z},set:a}}(),!function(t){function e(t){if(void 0===Function.prototype.name){var e=/function\s([^(]{1,})\(/,n=e.exec(t.toString());return n&&n.length>1?n[1].trim():""}return void 0===t.prototype?t.constructor.name:t.prototype.constructor.name}function n(t){return!!/true/.test(t)||!/false/.test(t)&&(isNaN(1*t)?t:parseFloat(t))}function i(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}var o="6.2.4",a={version:o,_plugins:{},_uuids:[],rtl:function(){return"rtl"===t("html").attr("dir")},plugin:function(t,n){var o=n||e(t),a=i(o);this._plugins[a]=this[o]=t},registerPlugin:function(t,n){var o=n?i(n):e(t.constructor).toLowerCase();t.uuid=this.GetYoDigits(6,o),t.$element.attr("data-"+o)||t.$element.attr("data-"+o,t.uuid),t.$element.data("zfPlugin")||t.$element.data("zfPlugin",t),t.$element.trigger("init.zf."+o),this._uuids.push(t.uuid)},unregisterPlugin:function(t){var n=i(e(t.$element.data("zfPlugin").constructor));this._uuids.splice(this._uuids.indexOf(t.uuid),1),t.$element.removeAttr("data-"+n).removeData("zfPlugin").trigger("destroyed.zf."+n);for(var o in t)t[o]=null},reInit:function(e){var n=e instanceof t;try{if(n)e.each(function(){t(this).data("zfPlugin")._init()});else{var o="undefined"==typeof e?"undefined":_typeof(e),a=this,r={object:function(e){e.forEach(function(e){e=i(e),t("[data-"+e+"]").foundation("_init")})},string:function(){e=i(e),t("[data-"+e+"]").foundation("_init")},undefined:function(){this.object(Object.keys(a._plugins))}};r[o](e)}}catch(s){console.error(s)}finally{return e}},GetYoDigits:function(t,e){return t=t||6,Math.round(Math.pow(36,t+1)-Math.random()*Math.pow(36,t)).toString(36).slice(1)+(e?"-"+e:"")},reflow:function(e,i){"undefined"==typeof i?i=Object.keys(this._plugins):"string"==typeof i&&(i=[i]);var o=this;t.each(i,function(i,a){var r=o._plugins[a],s=t(e).find("[data-"+a+"]").addBack("[data-"+a+"]");s.each(function(){var e=t(this),i={};if(e.data("zfPlugin"))return void console.warn("Tried to initialize "+a+" on an element that already has a Foundation plugin.");if(e.attr("data-options")){e.attr("data-options").split(";").forEach(function(t,e){var o=t.split(":").map(function(t){return t.trim()});o[0]&&(i[o[0]]=n(o[1]))})}try{e.data("zfPlugin",new r(t(this),i))}catch(o){console.error(o)}finally{return}})})},getFnName:e,transitionend:function(t){var e,n={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend"},i=document.createElement("div");for(var o in n)"undefined"!=typeof i.style[o]&&(e=n[o]);return e?e:(e=setTimeout(function(){t.triggerHandler("transitionend",[t])},1),"transitionend")}};a.util={throttle:function(t,e){var n=null;return function(){var i=this,o=arguments;null===n&&(n=setTimeout(function(){t.apply(i,o),n=null},e))}}};var r=function(n){var i="undefined"==typeof n?"undefined":_typeof(n),o=t("meta.foundation-mq"),r=t(".no-js");if(o.length||t('<meta class="foundation-mq">').appendTo(document.head),r.length&&r.removeClass("no-js"),"undefined"===i)a.MediaQuery._init(),a.reflow(this);else{if("string"!==i)throw new TypeError("We're sorry, "+i+" is not a valid parameter. You must use a string representing the method you wish to invoke.");var s=Array.prototype.slice.call(arguments,1),u=this.data("zfPlugin");if(void 0===u||void 0===u[n])throw new ReferenceError("We're sorry, '"+n+"' is not an available method for "+(u?e(u):"this element")+".");1===this.length?u[n].apply(u,s):this.each(function(e,i){u[n].apply(t(i).data("zfPlugin"),s)})}return this};window.Foundation=a,t.fn.foundation=r,function(){Date.now&&window.Date.now||(window.Date.now=Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var n=t[e];window.requestAnimationFrame=window[n+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var i=0;window.requestAnimationFrame=function(t){var e=Date.now(),n=Math.max(i+16,e);return setTimeout(function(){t(i=n)},n-e)},window.cancelAnimationFrame=clearTimeout}window.performance&&window.performance.now||(window.performance={start:Date.now(),now:function(){return Date.now()-this.start}})}(),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array.prototype.slice.call(arguments)))};return this.prototype&&(i.prototype=this.prototype),o.prototype=new i,o})}(jQuery),!function(t){function e(t,e,i,o){var a,r,s,u,l=n(t);if(e){var d=n(e);r=l.offset.top+l.height<=d.height+d.offset.top,a=l.offset.top>=d.offset.top,s=l.offset.left>=d.offset.left,u=l.offset.left+l.width<=d.width+d.offset.left}else r=l.offset.top+l.height<=l.windowDims.height+l.windowDims.offset.top,a=l.offset.top>=l.windowDims.offset.top,s=l.offset.left>=l.windowDims.offset.left,u=l.offset.left+l.width<=l.windowDims.width;var f=[r,a,s,u];return i?s===u==!0:o?a===r==!0:f.indexOf(!1)===-1}function n(t,e){if(t=t.length?t[0]:t,t===window||t===document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");var n=t.getBoundingClientRect(),i=t.parentNode.getBoundingClientRect(),o=document.body.getBoundingClientRect(),a=window.pageYOffset,r=window.pageXOffset;return{width:n.width,height:n.height,offset:{top:n.top+a,left:n.left+r},parentDims:{width:i.width,height:i.height,offset:{top:i.top+a,left:i.left+r}},windowDims:{width:o.width,height:o.height,offset:{top:a,left:r}}}}function i(t,e,i,o,a,r){var s=n(t),u=e?n(e):null;switch(i){case"top":return{left:Foundation.rtl()?u.offset.left-s.width+u.width:u.offset.left,top:u.offset.top-(s.height+o)};case"left":return{left:u.offset.left-(s.width+a),top:u.offset.top};case"right":return{left:u.offset.left+u.width+a,top:u.offset.top};case"center top":return{left:u.offset.left+u.width/2-s.width/2,top:u.offset.top-(s.height+o)};case"center bottom":return{left:r?a:u.offset.left+u.width/2-s.width/2,top:u.offset.top+u.height+o};case"center left":return{left:u.offset.left-(s.width+a),top:u.offset.top+u.height/2-s.height/2};case"center right":return{left:u.offset.left+u.width+a+1,top:u.offset.top+u.height/2-s.height/2};case"center":return{left:s.windowDims.offset.left+s.windowDims.width/2-s.width/2,top:s.windowDims.offset.top+s.windowDims.height/2-s.height/2};case"reveal":return{left:(s.windowDims.width-s.width)/2,top:s.windowDims.offset.top+o};case"reveal full":return{left:s.windowDims.offset.left,top:s.windowDims.offset.top};case"left bottom":return{left:u.offset.left,top:u.offset.top+u.height};case"right bottom":return{left:u.offset.left+u.width+a-s.width,top:u.offset.top+u.height};default:return{left:Foundation.rtl()?u.offset.left-s.width+u.width:u.offset.left+a,top:u.offset.top+u.height+o}}}Foundation.Box={ImNotTouchingYou:e,GetDimensions:n,GetOffsets:i}}(jQuery),!function(t){function e(t){var e={};for(var n in t)e[t[n]]=t[n];return e}var n={9:"TAB",13:"ENTER",27:"ESCAPE",32:"SPACE",37:"ARROW_LEFT",38:"ARROW_UP",39:"ARROW_RIGHT",40:"ARROW_DOWN"},i={},o={keys:e(n),parseKey:function(t){var e=n[t.which||t.keyCode]||String.fromCharCode(t.which).toUpperCase();return t.shiftKey&&(e="SHIFT_"+e),t.ctrlKey&&(e="CTRL_"+e),t.altKey&&(e="ALT_"+e),e},handleKey:function(e,n,o){var a,r,s,u=i[n],l=this.parseKey(e);if(!u)return console.warn("Component not defined!");if(a="undefined"==typeof u.ltr?u:Foundation.rtl()?t.extend({},u.ltr,u.rtl):t.extend({},u.rtl,u.ltr),r=a[l],s=o[r],s&&"function"==typeof s){var d=s.apply();(o.handled||"function"==typeof o.handled)&&o.handled(d)}else(o.unhandled||"function"==typeof o.unhandled)&&o.unhandled()},findFocusable:function(e){return e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){return!(!t(this).is(":visible")||t(this).attr("tabindex")<0)})},register:function(t,e){i[t]=e}};Foundation.Keyboard=o}(jQuery),!function(t){function e(t){var e={};return"string"!=typeof t?e:(t=t.trim().slice(1,-1))?e=t.split("&").reduce(function(t,e){var n=e.replace(/\+/g," ").split("="),i=n[0],o=n[1];return i=decodeURIComponent(i),o=void 0===o?null:decodeURIComponent(o),t.hasOwnProperty(i)?Array.isArray(t[i])?t[i].push(o):t[i]=[t[i],o]:t[i]=o,t},{}):e}var n={queries:[],current:"",_init:function(){var n,i=this,o=t(".foundation-mq").css("font-family");n=e(o);for(var a in n)n.hasOwnProperty(a)&&i.queries.push({name:a,value:"only screen and (min-width: "+n[a]+")"});this.current=this._getCurrentSize(),this._watcher()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return"object"===("undefined"==typeof t?"undefined":_typeof(t))?t.name:t},_watcher:function(){var e=this;t(window).on("resize.zf.mediaquery",function(){var n=e._getCurrentSize(),i=e.current;n!==i&&(e.current=n,t(window).trigger("changed.zf.mediaquery",[n,i]))})}};Foundation.MediaQuery=n,window.matchMedia||(window.matchMedia=function(){var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n&&n.parentNode&&n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===i.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),Foundation.MediaQuery=n}(jQuery),!function(t){function e(t,e,n){function i(s){r||(r=window.performance.now()),a=s-r,n.apply(e),a<t?o=window.requestAnimationFrame(i,e):(window.cancelAnimationFrame(o),e.trigger("finished.zf.animate",[e]).triggerHandler("finished.zf.animate",[e]))}var o,a,r=null;o=window.requestAnimationFrame(i)}function n(e,n,a,r){function s(){e||n.hide(),u(),r&&r.apply(n)}function u(){n[0].style.transitionDuration=0,n.removeClass(l+" "+d+" "+a)}if(n=t(n).eq(0),n.length){var l=e?i[0]:i[1],d=e?o[0]:o[1];u(),n.addClass(a).css("transition","none"),requestAnimationFrame(function(){n.addClass(l),e&&n.show()}),requestAnimationFrame(function(){n[0].offsetWidth,n.css("transition","").addClass(d)}),n.one(Foundation.transitionend(n),s)}}var i=["mui-enter","mui-leave"],o=["mui-enter-active","mui-leave-active"],a={animateIn:function(t,e,i){n(!0,t,e,i)},animateOut:function(t,e,i){n(!1,t,e,i)}};Foundation.Move=e,Foundation.Motion=a}(jQuery),!function(t){var e={Feather:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"zf";e.attr("role","menubar");var i=e.find("li").attr({role:"menuitem"}),o="is-"+n+"-submenu",a=o+"-item",r="is-"+n+"-submenu-parent";e.find("a:first").attr("tabindex",0),i.each(function(){var e=t(this),n=e.children("ul");n.length&&(e.addClass(r).attr({"aria-haspopup":!0,"aria-expanded":!1,"aria-label":e.children("a:first").text()}),n.addClass("submenu "+o).attr({"data-submenu":"","aria-hidden":!0,role:"menu"})),e.parent("[data-submenu]").length&&e.addClass("is-submenu-item "+a)})},Burn:function(t,e){var n=(t.find("li").removeAttr("tabindex"),"is-"+e+"-submenu"),i=n+"-item",o="is-"+e+"-submenu-parent";t.find(">li, .menu, .menu > li").removeClass(n+" "+i+" "+o+" is-submenu-item submenu is-active").removeAttr("data-submenu").css("display","")}};Foundation.Nest=e}(jQuery),!function(t){function e(t,e,n){var i,o,a=this,r=e.duration,s=Object.keys(t.data())[0]||"timer",u=-1;this.isPaused=!1,this.restart=function(){u=-1,clearTimeout(o),this.start()},this.start=function(){this.isPaused=!1,clearTimeout(o),u=u<=0?r:u,t.data("paused",!1),i=Date.now(),o=setTimeout(function(){e.infinite&&a.restart(),n&&"function"==typeof n&&n()},u),t.trigger("timerstart.zf."+s)},this.pause=function(){this.isPaused=!0,clearTimeout(o),t.data("paused",!0);var e=Date.now();u-=e-i,t.trigger("timerpaused.zf."+s)}}function n(e,n){function i(){o--,0===o&&n()}var o=e.length;0===o&&n(),e.each(function(){this.complete?i():"undefined"!=typeof this.naturalWidth&&this.naturalWidth>0?i():t(this).one("load",function(){i()})})}Foundation.Timer=e,Foundation.onImagesLoaded=n}(jQuery),function(t){function e(){this.removeEventListener("touchmove",n),this.removeEventListener("touchend",e),l=!1}function n(n){if(t.spotSwipe.preventDefault&&n.preventDefault(),l){var i,o=n.touches[0].pageX,r=(n.touches[0].pageY,a-o);u=(new Date).getTime()-s,Math.abs(r)>=t.spotSwipe.moveThreshold&&u<=t.spotSwipe.timeThreshold&&(i=r>0?"left":"right"),i&&(n.preventDefault(),e.call(this),t(this).trigger("swipe",i).trigger("swipe"+i))}}function i(t){1==t.touches.length&&(a=t.touches[0].pageX,r=t.touches[0].pageY,l=!0,s=(new Date).getTime(),this.addEventListener("touchmove",n,!1),this.addEventListener("touchend",e,!1))}function o(){this.addEventListener&&this.addEventListener("touchstart",i,!1)}t.spotSwipe={version:"1.0.0",enabled:"ontouchstart"in document.documentElement,preventDefault:!1,moveThreshold:75,timeThreshold:200};var a,r,s,u,l=!1;t.event.special.swipe={setup:o},t.each(["left","up","down","right"],function(){t.event.special["swipe"+this]={setup:function(){t(this).on("swipe",t.noop)}}})}(jQuery),!function(t){t.fn.addTouch=function(){this.each(function(n,i){t(i).bind("touchstart touchmove touchend touchcancel",function(){e(event)})});var e=function(t){var e,n=t.changedTouches,i=n[0],o={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup"},a=o[t.type];"MouseEvent"in window&&"function"==typeof window.MouseEvent?e=new window.MouseEvent(a,{bubbles:!0,cancelable:!0,screenX:i.screenX,screenY:i.screenY,clientX:i.clientX,clientY:i.clientY}):(e=document.createEvent("MouseEvent"),e.initMouseEvent(a,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null)),i.target.dispatchEvent(e)}}}(jQuery),!function(t){function e(){a(),i(),o(),n()}function n(e){var n=t("[data-yeti-box]"),i=["dropdown","tooltip","reveal"];if(e&&("string"==typeof e?i.push(e):"object"===("undefined"==typeof e?"undefined":_typeof(e))&&"string"==typeof e[0]?i.concat(e):console.error("Plugin names must be strings")),n.length){var o=i.map(function(t){return"closeme.zf."+t}).join(" ");t(window).off(o).on(o,function(e,n){var i=e.namespace.split(".")[0],o=t("[data-"+i+"]").not('[data-yeti-box="'+n+'"]');o.each(function(){var e=t(this);e.triggerHandler("close.zf.trigger",[e])})})}}function i(e){var n=void 0,i=t("[data-resize]");i.length&&t(window).off("resize.zf.trigger").on("resize.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("resizeme.zf.trigger")}),i.attr("data-events","resize")},e||10)})}function o(e){var n=void 0,i=t("[data-scroll]");i.length&&t(window).off("scroll.zf.trigger").on("scroll.zf.trigger",function(o){n&&clearTimeout(n),n=setTimeout(function(){r||i.each(function(){t(this).triggerHandler("scrollme.zf.trigger")}),i.attr("data-events","scroll")},e||10)})}function a(){if(!r)return!1;var e=document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"),n=function(e){var n=t(e[0].target);switch(n.attr("data-events")){case"resize":n.triggerHandler("resizeme.zf.trigger",[n]);break;case"scroll":n.triggerHandler("scrollme.zf.trigger",[n,window.pageYOffset]);break;default:return!1}};if(e.length)for(var i=0;i<=e.length-1;i++){var o=new r(n);o.observe(e[i],{attributes:!0,childList:!1,characterData:!1,subtree:!1,attributeFilter:["data-events"]})}}var r=function(){for(var t=["WebKit","Moz","O","Ms",""],e=0;e<t.length;e++)if(t[e]+"MutationObserver"in window)return window[t[e]+"MutationObserver"];return!1}(),s=function(e,n){e.data(n).split(" ").forEach(function(i){t("#"+i)["close"===n?"trigger":"triggerHandler"](n+".zf.trigger",[e])})};t(document).on("click.zf.trigger","[data-open]",function(){s(t(this),"open")}),t(document).on("click.zf.trigger","[data-close]",function(){var e=t(this).data("close");e?s(t(this),"close"):t(this).trigger("close.zf.trigger")}),t(document).on("click.zf.trigger","[data-toggle]",function(){s(t(this),"toggle")}),t(document).on("close.zf.trigger","[data-closable]",function(e){e.stopPropagation();var n=t(this).data("closable");""!==n?Foundation.Motion.animateOut(t(this),n,function(){t(this).trigger("closed.zf")}):t(this).fadeOut().trigger("closed.zf")}),t(document).on("focus.zf.trigger blur.zf.trigger","[data-toggle-focus]",function(){var e=t(this).data("toggle-focus");t("#"+e).triggerHandler("toggle.zf.trigger",[t(this)])}),t(window).on("load",function(){e()}),Foundation.IHearYou=e}(jQuery),!function(t){function e(){return/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)}function n(){return/Android/.test(window.navigator.userAgent)}function i(){return e()||n()}var o=function(){function e(n,i){_classCallCheck(this,e),this.$element=n,this.options=t.extend({},e.defaults,this.$element.data(),i),this._init(),Foundation.registerPlugin(this,"Reveal"),Foundation.Keyboard.register("Reveal",{ENTER:"open",SPACE:"open",ESCAPE:"close",TAB:"tab_forward",SHIFT_TAB:"tab_backward"})}return _createClass(e,[{key:"_init",value:function(){this.id=this.$element.attr("id"),this.isActive=!1,this.cached={mq:Foundation.MediaQuery.current},this.isMobile=i(),this.$anchor=t(t('[data-open="'+this.id+'"]').length?'[data-open="'+this.id+'"]':'[data-toggle="'+this.id+'"]'),this.$anchor.attr({"aria-controls":this.id,"aria-haspopup":!0,tabindex:0}),(this.options.fullScreen||this.$element.hasClass("full"))&&(this.options.fullScreen=!0,this.options.overlay=!1),this.options.overlay&&!this.$overlay&&(this.$overlay=this._makeOverlay(this.id)),this.$element.attr({role:"dialog","aria-hidden":!0,"data-yeti-box":this.id,"data-resize":this.id}),this.$overlay?this.$element.detach().appendTo(this.$overlay):(this.$element.detach().appendTo(t("body")),this.$element.addClass("without-overlay")),this._events(),this.options.deepLink&&window.location.hash==="#"+this.id&&t(window).one("load.zf.reveal",this.open.bind(this))}},{key:"_makeOverlay",value:function(e){var n=t("<div></div>").addClass("reveal-overlay").appendTo("body");return n}},{key:"_updatePosition",value:function(){var e,n,i=this.$element.outerWidth(),o=t(window).width(),a=this.$element.outerHeight(),r=t(window).height();e="auto"===this.options.hOffset?parseInt((o-i)/2,10):parseInt(this.options.hOffset,10),n="auto"===this.options.vOffset?a>r?parseInt(Math.min(100,r/10),10):parseInt((r-a)/4,10):parseInt(this.options.vOffset,10),this.$element.css({top:n+"px"}),this.$overlay&&"auto"===this.options.hOffset||(this.$element.css({left:e+"px"}),this.$element.css({margin:"0px"}))}},{key:"_events",value:function(){var e=this,n=this;this.$element.on({"open.zf.trigger":this.open.bind(this),"close.zf.trigger":function(i,o){if(i.target===n.$element[0]||t(i.target).parents("[data-closable]")[0]===o)return e.close.apply(e)},"toggle.zf.trigger":this.toggle.bind(this),"resizeme.zf.trigger":function(){n._updatePosition()}}),this.$anchor.length&&this.$anchor.on("keydown.zf.reveal",function(t){13!==t.which&&32!==t.which||(t.stopPropagation(),t.preventDefault(),n.open())}),this.options.closeOnClick&&this.options.overlay&&this.$overlay.off(".zf.reveal").on("click.zf.reveal",function(e){e.target!==n.$element[0]&&!t.contains(n.$element[0],e.target)&&t.contains(document,e.target)&&n.close()}),this.options.deepLink&&t(window).on("popstate.zf.reveal:"+this.id,this._handleState.bind(this))}},{key:"_handleState",value:function(t){window.location.hash!=="#"+this.id||this.isActive?this.close():this.open()}},{key:"open",value:function(){var e=this;if(this.options.deepLink){var n="#"+this.id;window.history.pushState?window.history.pushState(null,null,n):window.location.hash=n}if(this.isActive=!0,this.$element.css({visibility:"hidden"}).show().scrollTop(0),this.options.overlay&&this.$overlay.css({visibility:"hidden"}).show(),this._updatePosition(),this.$element.hide().css({visibility:""}),this.$overlay&&(this.$overlay.css({visibility:""}).hide(),this.$element.hasClass("fast")?this.$overlay.addClass("fast"):this.$element.hasClass("slow")&&this.$overlay.addClass("slow")),this.options.multipleOpened||this.$element.trigger("closeme.zf.reveal",this.id),this.options.animationIn){var i;!function(){var t=function(){i.$element.attr({"aria-hidden":!1,tabindex:-1}).focus()};i=e,e.options.overlay&&Foundation.Motion.animateIn(e.$overlay,"fade-in"),Foundation.Motion.animateIn(e.$element,e.options.animationIn,function(){e.focusableElements=Foundation.Keyboard.findFocusable(e.$element),t()})}()}else this.options.overlay&&this.$overlay.show(0),this.$element.show(this.options.showDelay);this.$element.attr({"aria-hidden":!1,tabindex:-1}).focus(),this.$element.trigger("open.zf.reveal"),this.isMobile?(this.originalScrollPos=window.pageYOffset,t("html, body").addClass("is-reveal-open")):t("body").addClass("is-reveal-open"),setTimeout(function(){e._extraHandlers()},0)}},{key:"_extraHandlers",value:function(){var e=this;this.focusableElements=Foundation.Keyboard.findFocusable(this.$element),this.options.overlay||!this.options.closeOnClick||this.options.fullScreen||t("body").on("click.zf.reveal",function(n){n.target!==e.$element[0]&&!t.contains(e.$element[0],n.target)&&t.contains(document,n.target)&&e.close()}),this.options.closeOnEsc&&t(window).on("keydown.zf.reveal",function(t){Foundation.Keyboard.handleKey(t,"Reveal",{close:function(){e.options.closeOnEsc&&(e.close(),e.$anchor.focus())}})}),this.$element.on("keydown.zf.reveal",function(n){var i=t(this);Foundation.Keyboard.handleKey(n,"Reveal",{tab_forward:function(){return e.focusableElements=Foundation.Keyboard.findFocusable(e.$element),e.$element.find(":focus").is(e.focusableElements.eq(-1))?(e.focusableElements.eq(0).focus(),!0):0===e.focusableElements.length||void 0},tab_backward:function(){return e.focusableElements=Foundation.Keyboard.findFocusable(e.$element),e.$element.find(":focus").is(e.focusableElements.eq(0))||e.$element.is(":focus")?(e.focusableElements.eq(-1).focus(),!0):0===e.focusableElements.length||void 0},open:function(){e.$element.find(":focus").is(e.$element.find("[data-close]"))?setTimeout(function(){e.$anchor.focus()},1):i.is(e.focusableElements)&&e.open()},close:function(){e.options.closeOnEsc&&(e.close(),e.$anchor.focus())},handled:function(t){t&&n.preventDefault()}})})}},{key:"close",value:function(){function e(){n.isMobile?(t("html, body").removeClass("is-reveal-open"),n.originalScrollPos&&(t("body").scrollTop(n.originalScrollPos),n.originalScrollPos=null)):t("body").removeClass("is-reveal-open"),n.$element.attr("aria-hidden",!0),n.$element.trigger("closed.zf.reveal")}if(!this.isActive||!this.$element.is(":visible"))return!1;var n=this;this.options.animationOut?(this.options.overlay?Foundation.Motion.animateOut(this.$overlay,"fade-out",e):e(),Foundation.Motion.animateOut(this.$element,this.options.animationOut)):(this.options.overlay?this.$overlay.hide(0,e):e(),this.$element.hide(this.options.hideDelay)),this.options.closeOnEsc&&t(window).off("keydown.zf.reveal"),!this.options.overlay&&this.options.closeOnClick&&t("body").off("click.zf.reveal"),this.$element.off("keydown.zf.reveal"),this.options.resetOnClose&&this.$element.html(this.$element.html()),this.isActive=!1,n.options.deepLink&&(window.history.replaceState?window.history.replaceState("",document.title,window.location.pathname):window.location.hash="")}},{key:"toggle",value:function(){this.isActive?this.close():this.open()}},{key:"destroy",value:function(){this.options.overlay&&(this.$element.appendTo(t("body")),this.$overlay.hide().off().remove()),this.$element.hide().off(),this.$anchor.off(".zf"),t(window).off(".zf.reveal:"+this.id),Foundation.unregisterPlugin(this)}}]),e}();o.defaults={animationIn:"",animationOut:"",showDelay:0,hideDelay:0,closeOnClick:!0,closeOnEsc:!0,multipleOpened:!1,vOffset:"auto",hOffset:"auto",fullScreen:!1,btmOffsetPct:10,overlay:!0,resetOnClose:!1,deepLink:!1},Foundation.plugin(o,"Reveal")}(jQuery);