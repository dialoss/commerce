"use strict";(self.webpackChunkcommerce=self.webpackChunkcommerce||[]).push([[210],{30858:(e,n,t)=>{t.d(n,{cm:()=>d,ie:()=>f,ZJ:()=>y,jH:()=>p,QR:()=>v});var r=t(65043),o=t(73913),a=t(6693),l=function(e){return e&&e.reactPage&&e.reactPage.focus},i=function(e){var n,t,r;return null!==(r=null===(t=null===(n=l(e))||void 0===n?void 0:n.nodeIds)||void 0===t?void 0:t.filter((function(n){var t;return null===(t=(0,a.K3)(e,n))||void 0===t?void 0:t.node})))&&void 0!==r?r:[]},u=function(e){var n=i(e);return 1===(null===n||void 0===n?void 0:n.length)?n[0]:null},c=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,o,a=t.call(e),l=[];try{for(;(void 0===n||n-- >0)&&!(r=a.next()).done;)l.push(r.value)}catch(i){o={error:i}}finally{try{r&&!r.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return l},s=function(e,n,t){if(t||2===arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))},f=function(){return(0,o.d4)(u)},d=function(){return(0,o.d4)(i)},p=function(e){return(0,o.d4)((function(n){return i(n).includes(e)}))},y=function(e){return(0,o.d4)((function(n){return u(n)===e}))},v=function(e,n,t){var a=(0,o.d4)((function(n){var t=l(n),r=u(n);return t&&r===e?t.scrollToCell:null}));(0,r.useEffect)((function(){if(a)return n()}),s([a],c(t),!1))}},59210:(e,n,t)=>{t.r(n),t.d(n,{default:()=>m});var r=t(43024),o=t(30858),a=t(93906),l=t(65043),i=t(7245),u=t(55041),c=t(40781),s=t(19025),f=t(58679),d=t(24466),p=t(40461),y=(0,r.A)((function(){return Promise.all([t.e(281),t.e(596),t.e(793)]).then(t.bind(t,49793))})),v=l.memo((function(e){var n=e.plugins,t=e.defaultPluginType,r=e.readOnly,a=e.placeholder,y={useSelected:i.f7,useFocused:i.zL,readOnly:r},v=(0,p.o)({plugins:n,defaultPluginType:t,injections:y},[]),m=(0,p.V)({plugins:n,injections:y},[]),h=function(e,n){var t=e.plugins,r=(0,i.Zi)();return l.useCallback((function(e){return t.filter((function(e){return e.hotKey})).forEach((function(n){n.hotKey&&(0,c.Ay)(n.hotKey,e)&&(e.preventDefault(),(0,f.h)(r,n)?(0,d.c)(r,n):(0,s.Z)(r,n))})),(0,c.Ay)(["mod+z","mod+y"],e)?(e.preventDefault(),!0):(0,c.Ay)(["esc"],e)?(i.rL.blur(r),!0):(0,c.Ay)("shift+enter",e)?(e.preventDefault(),r.insertText("\n"),!0):void 0}),n)}({plugins:n},[]),g=(0,u.Qy)(),w=(0,o.cm)().length>1;return l.createElement(i.Fo,{placeholder:r?void 0:a,readOnly:g||r||w,renderElement:v,renderLeaf:m,onKeyDown:r?void 0:h})}));const m=l.memo((function(e){var n,t,r=e.plugins,o=e.focused,i=e.readOnly,u=(0,a.EN)().t;return l.createElement(l.Fragment,null,!i&&o&&l.createElement(y,{plugins:e.plugins,translations:e.translations}),l.createElement(v,{placeholder:null!==(t=u(null===(n=e.translations)||void 0===n?void 0:n.placeholder))&&void 0!==t?t:"",readOnly:i,plugins:r,defaultPluginType:e.defaultPluginType}))}))},19025:(e,n,t)=>{t.d(n,{A:()=>f,Z:()=>s});var r=t(65043),o=t(9318),a=t(7245),l=t(58679),i=t(24466),u=t(63286),c=function(){return c=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},c.apply(this,arguments)},s=function(e,n,t){var r,a=t||{},s=a.data,f=a.text,d=(0,l.h)(e,n);if(f){var p="component"===n.pluginType&&"inline"===n.object&&n.addExtraSpace?f+" ":f;e.insertText(p),e.selection&&o.Transforms.select(e,{anchor:e.selection.anchor,focus:c(c({},e.selection.focus),{offset:e.selection.focus.offset-p.length})})}var y=s||(n.getInitialData?n.getInitialData():null);if(d&&(o.Transforms.select(e,d[1]),(0,i.c)(e,n)),n.customAdd)n.customAdd(e);else if("component"===n.pluginType){if("mark"===n.object)e.addMark(n.type,y||!0);else if(n.isVoid)o.Transforms.insertNodes(e,{type:n.type,data:y,children:[{text:""}]});else if("block"===n.object&&n.replaceWithDefaultOnRemove)o.Transforms.setNodes(e,{type:n.type,data:y});else if(o.Transforms.wrapNodes(e,{type:n.type,children:[],data:y},{split:!0}),"inline"===n.object&&n.addExtraSpace&&!f&&e.selection){var v=c({},e.selection.focus);o.Transforms.insertText(e," ",{at:e.selection.focus}),o.Transforms.select(e,v)}}else if("data"===n.pluginType){var m=null!==(r=(0,u.A)(e))&&void 0!==r?r:{};o.Transforms.setNodes(e,{data:c(c({},m),null!==y&&void 0!==y?y:{})})}};const f=function(e){var n=(0,a.Zi)();return(0,r.useCallback)((function(t){return s(n,e,t)}),[])}},58679:(e,n,t)=>{t.d(n,{A:()=>i,h:()=>l});var r=t(9318),o=t(7245),a=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,o,a=t.call(e),l=[];try{for(;(void 0===n||n-- >0)&&!(r=a.next()).done;)l.push(r.value)}catch(i){o={error:i}}finally{try{r&&!r.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return l},l=function(e,n){if("custom"===n.pluginType)return null;var t="component"===n.pluginType?"mark"===n.object?function(e){return Boolean(e[n.type])}:function(e){return e.type===n.type}:"data"===n.pluginType?function(e){var t=e.data;return n.dataMatches(t)}:null;if(!t)return null;try{return a(r.Editor.nodes(e,{match:t,mode:"lowest"}),1)[0]}catch(o){return null}};const i=function(e){var n=(0,o.Zi)();return l(n,e)}},24466:(e,n,t)=>{t.d(n,{A:()=>c,c:()=>u});var r=t(65043),o=t(9318),a=t(7245),l=t(63286),i=function(){return i=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},i.apply(this,arguments)},u=function(e,n){if(n.customRemove)n.customRemove(e);else if("component"===n.pluginType)"mark"===n.object?e.removeMark(n.type):"inline"===n.object?n.isVoid?o.Transforms.removeNodes(e,{match:function(e){return e.type===n.type}}):o.Transforms.unwrapNodes(e,{match:function(e){return e.type===n.type}}):"block"===n.object&&(n.isVoid?o.Transforms.removeNodes(e,{match:function(e){return e.type===n.type}}):n.replaceWithDefaultOnRemove?o.Transforms.setNodes(e,{type:null}):o.Transforms.unwrapNodes(e,{match:function(e){return e.type===n.type},split:!0}));else if("data"===n.pluginType)if(n.properties){var t=(0,l.A)(e),r=Object.keys(t).reduce((function(e,r){var o,a;return(null===(a=n.properties)||void 0===a?void 0:a.includes(r))?e:i(i({},e),((o={})[r]=t[r],o))}),{});o.Transforms.setNodes(e,{data:r})}else;};const c=function(e){var n=(0,a.Zi)();return(0,r.useCallback)((function(){return u(n,e)}),[])}},63286:(e,n,t)=>{t.d(n,{A:()=>a});var r=t(9318),o=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,o,a=t.call(e),l=[];try{for(;(void 0===n||n-- >0)&&!(r=a.next()).done;)l.push(r.value)}catch(i){o={error:i}}finally{try{r&&!r.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return l};const a=function(e){var n,t=o(r.Editor.nodes(e,{mode:"all",match:function(e){return Boolean(e.data)}}),1)[0];return t?null===(n=t[0])||void 0===n?void 0:n.data:{}}},40781:(e,n)=>{for(var t="undefined"!=typeof window&&/Mac|iPod|iPhone|iPad/.test(window.navigator.platform),r={alt:"altKey",control:"ctrlKey",meta:"metaKey",shift:"shiftKey"},o={add:"+",break:"pause",cmd:"meta",command:"meta",ctl:"control",ctrl:"control",del:"delete",down:"arrowdown",esc:"escape",ins:"insert",left:"arrowleft",mod:t?"meta":"control",opt:"alt",option:"alt",return:"enter",right:"arrowright",space:" ",spacebar:" ",up:"arrowup",win:"meta",windows:"meta"},a={backspace:8,tab:9,enter:13,shift:16,control:17,alt:18,pause:19,capslock:20,escape:27," ":32,pageup:33,pagedown:34,end:35,home:36,arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,insert:45,delete:46,meta:91,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},l=1;l<20;l++)a["f"+l]=111+l;function i(e,n,t){n&&!("byKey"in n)&&(t=n,n=null),Array.isArray(e)||(e=[e]);var r=e.map((function(e){return u(e,n)})),o=function(e){return r.some((function(n){return c(n,e)}))};return null==t?o:o(t)}function u(e,n){var t=n&&n.byKey,l={},i=(e=e.replace("++","+add")).split("+"),u=i.length;for(var c in r)l[r[c]]=!1;var d=!0,p=!1,y=void 0;try{for(var v,m=i[Symbol.iterator]();!(d=(v=m.next()).done);d=!0){var h=v.value,g=h.endsWith("?")&&h.length>1;g&&(h=h.slice(0,-1));var w=f(h),b=r[w];if(h.length>1&&!b&&!o[h]&&!a[w])throw new TypeError('Unknown modifier: "'+h+'"');1!==u&&b||(t?l.key=w:l.which=s(h)),b&&(l[b]=!g||null)}}catch(T){p=!0,y=T}finally{try{!d&&m.return&&m.return()}finally{if(p)throw y}}return l}function c(e,n){for(var t in e){var r=e[t],o=void 0;if(null!=r&&((null!=(o="key"===t&&null!=n.key?n.key.toLowerCase():"which"===t?91===r&&93===n.which?91:n.which:n[t])||!1!==r)&&o!==r))return!1}return!0}function s(e){return e=f(e),a[e]||e.toUpperCase().charCodeAt(0)}function f(e){return e=e.toLowerCase(),e=o[e]||e}n.Ay=i}}]);
//# sourceMappingURL=210.f0e2bbcd.chunk.js.map