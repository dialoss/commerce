"use strict";(self.webpackChunkcommerce=self.webpackChunkcommerce||[]).push([[596],{67500:(e,n,t)=>{var o=t(24994);n.A=void 0;var r=o(t(40039)),l=t(70579);n.A=(0,r.default)((0,l.jsx)("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"}),"Done")},29596:(e,n,t)=>{t.d(n,{A:()=>E});var o=t(93906),r=t(65043),l=t(9318),i=t(7245),a=t(19025),c=t(65996),u=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var o,r,l=t.call(e),i=[];try{for(;(void 0===n||n-- >0)&&!(o=l.next()).done;)i.push(o.value)}catch(a){r={error:a}}finally{try{o&&!o.done&&(t=l.return)&&t.call(l)}finally{if(r)throw r.error}}return i};var s=t(24466),d=t(66216),v=t(43024),f=function(e){var n=e.condition,t=e.wrapper,o=e.children;return r.createElement(r.Fragment,null,n?t(o):o)},m=t(26240),p=function(){return p=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},p.apply(this,arguments)},y=(0,v.A)((function(){return t.e(273).then(t.bind(t,28273))})),b=(0,v.A)((function(){return t.e(259).then(t.bind(t,90259))}));const h=r.memo((function(e){var n=e.dark,t=e.icon,o=e.isActive,l=e.onClick,i=e.disabled,a=void 0!==i&&i,c=e.toolTip,u=void 0===c?"":c,s=(0,m.A)();return r.createElement(f,{condition:!a,wrapper:function(e){return r.createElement(b,{title:u},r.createElement(r.Fragment,null,e))}},r.createElement(y,{onMouseDown:l,style:p({transition:"0.3s"},o?{transform:"scale(1.15)",color:s.palette.primary.main}:a?{color:s.palette.action.disabled}:{color:n?s.palette.common.white:s.palette.common.black}),disabled:a},t))}));var A=function(){return A=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},A.apply(this,arguments)},g=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var o,r,l=t.call(e),i=[];try{for(;(void 0===n||n-- >0)&&!(o=l.next()).done;)i.push(o.value)}catch(a){r={error:a}}finally{try{o&&!o.done&&(t=l.return)&&t.call(l)}finally{if(r)throw r.error}}return i};const E=r.memo((function(e){var n,t,v,f,m=e.plugin,p=e.dark,y=(0,o.EN)().t,b=Boolean(m.controls),E=g((0,r.useState)(!1),2),k=E[0],S=E[1],C=(0,i.Zi)(),w=(0,c.A)(m),j="component"===m.pluginType&&("inline"===m.object||"block"===m.object)&&m.isVoid,x="component"===m.pluginType&&("inline"===m.object||"mark"===m.object)&&(!C.selection||l.Range.isCollapsed(C.selection))&&!w&&!j,T=(0,a.A)(m),D=(0,s.A)(m),O=(0,r.useCallback)((function(){return S(!1)}),[S]),R=r.useCallback((function(e){e.preventDefault(),b||x?S(!k):w?D():T()}),[w,b,k,x]),I=function(e){var n=(0,i.Zi)(),t=u((0,r.useState)(!1),2),o=t[0],l=t[1];return(0,r.useEffect)((function(){if(e.isDisabled)try{e.isDisabled(n).then((function(e){l(e)}))}catch(t){}}),[n.selection,e]),!n||o}(m);return r.createElement(r.Fragment,null,r.createElement(h,{onClick:R,disabled:I,isActive:w,dark:p,icon:null!==(n=m.icon)&&void 0!==n?n:"component"===m.pluginType&&null!==(v=null===(t=m.deserialize)||void 0===t?void 0:t.tagName)&&void 0!==v?v:"",toolTip:null!==(f=y(m.label))&&void 0!==f?f:""}),(b||x)&&k?r.createElement(d.A,A({},e,{open:k,close:O})):null)}))},66216:(e,n,t)=>{t.d(n,{A:()=>P});var o=t(65043),r=t(9318),l=t(7245),i=t(19025),a=t(58679),c=function(e,n){var t=(0,a.h)(e,n);if(t){var o=t[0];return"component"===n.pluginType&&"mark"===n.object?o[n.type]:o.data}return n.getInitialData?n.getInitialData():{}};var u=t(65996),s=t(24466),d=t(61485),v=t(41503),f=t(98587),m=t(58168),p=t(58387),y=t(68606),b=t(34535),h=t(72876),A=t(57056),g=t(32400);function E(e){return(0,g.Ay)("MuiDialogActions",e)}(0,A.A)("MuiDialogActions",["root","spacing"]);var k=t(70579);const S=["className","disableSpacing"],C=(0,b.Ay)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.disableSpacing&&n.spacing]}})((e=>{let{ownerState:n}=e;return(0,m.A)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!n.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})})),w=o.forwardRef((function(e,n){const t=(0,h.A)({props:e,name:"MuiDialogActions"}),{className:o,disableSpacing:r=!1}=t,l=(0,f.A)(t,S),i=(0,m.A)({},t,{disableSpacing:r}),a=(e=>{const{classes:n,disableSpacing:t}=e,o={root:["root",!t&&"spacing"]};return(0,y.A)(o,E,n)})(i);return(0,k.jsx)(C,(0,m.A)({className:(0,p.A)(a.root,o),ownerState:i,ref:n},l))}));var j=t(42518),x=t(35410),T=t(63471),D=t(67500),O=t(988),R=t(73809),I=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var o,r,l=t.call(e),i=[];try{for(;(void 0===n||n-- >0)&&!(o=l.next()).done;)i.push(o.value)}catch(a){r={error:a}}finally{try{o&&!o.done&&(t=l.return)&&t.call(l)}finally{if(r)throw r.error}}return i};const L=function(e){var n=e.schema?(0,O.A)(e.schema):null,t=Boolean(e.schema),r=(0,o.useRef)(),l=I((0,o.useState)(null),2),i=l[0],a=l[1],c=(0,o.useCallback)((function(n){e.close(),e.shouldInsertWithText?e.add({text:i,data:n}):e.add({data:n})}),[e.shouldInsertWithText,i]),u=(0,o.useCallback)((function(){r.current&&r.current.submit()}),[r.current]),s=(0,o.useCallback)((function(){n?u():c({})}),[u,c,t]);return o.createElement(d.A,{disableEnforceFocus:!0,PaperProps:{style:{minWidth:300}},open:e.open},o.createElement(v.A,null,e.shouldInsertWithText?o.createElement("div",{style:{marginBottom:"1em"}},o.createElement(x.A,{autoFocus:!0,placeholder:"Text",onChange:function(e){return a(e.target.value)},value:i})):null,t&&n?o.createElement(R._A,{ref:r,model:e.data,schema:n,onSubmit:c},o.createElement(R.dX,null)):null),o.createElement(w,null,o.createElement(j.A,{variant:"text",onClick:function(){e.close()},style:{marginRight:"auto"}},e.cancelLabel||"Cancel"),e.isActive?o.createElement(j.A,{variant:"contained",color:"secondary",onClick:function(){e.remove(),e.close()}},e.removeLabel||"Remove",o.createElement(T.A,{style:{marginLeft:10}})):null,t?o.createElement(j.A,{variant:"contained",color:"primary",onClick:s},e.submitLabel||"Ok",o.createElement(D.A,{style:{marginLeft:10}})):null))};var M=t(55041),F=function(){return F=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},F.apply(this,arguments)},N=function(e,n){var t="function"===typeof Symbol&&e[Symbol.iterator];if(!t)return e;var o,r,l=t.call(e),i=[];try{for(;(void 0===n||n-- >0)&&!(o=l.next()).done;)i.push(o.value)}catch(a){r={error:a}}finally{try{o&&!o.done&&(t=l.return)&&t.call(l)}finally{if(r)throw r.error}}return i};const P=o.memo((function(e){var n,t,a,d,v,f,m=e.plugin,p=(0,o.useRef)(),y=!("component"===m.pluginType&&("inline"===m.object||"block"===m.object)&&m.isVoid)&&(!(null===(n=null===p||void 0===p?void 0:p.current)||void 0===n?void 0:n.selection)||r.Range.isCollapsed(null===(t=null===p||void 0===p?void 0:p.current)||void 0===t?void 0:t.selection))&&!(null===(a=null===p||void 0===p?void 0:p.current)||void 0===a?void 0:a.isActive),b=(0,i.A)(m),h=(0,s.A)(m),A=(0,l.Zi)(),g=(0,M.cO)(),E=N((0,o.useState)(!1),2),k=(E[0],E[1]),S=(0,u.A)(m);(0,o.useEffect)((function(){return null===g||void 0===g||g(e.open),k(e.open),e.open&&(p.current={selection:A.selection,isActive:S,data:c(A,m)}),function(){null===g||void 0===g||g(!1)}}),[e.open,g,k]);var C=m.controls,w=(0,o.useMemo)((function(){return C?"autoform"===C.type?function(e){return o.createElement(L,F({},e,{schema:null===C||void 0===C?void 0:C.schema}))}:C.Component:L}),[C]),j=(0,o.useCallback)((function(e){var n,t;(null===(n=null===p||void 0===p?void 0:p.current)||void 0===n?void 0:n.selection)&&r.Transforms.select(A,null===(t=null===p||void 0===p?void 0:p.current)||void 0===t?void 0:t.selection),b(e)}),[b]),x=(0,o.useCallback)((function(){setTimeout((function(){var e,n;(null===(e=null===p||void 0===p?void 0:p.current)||void 0===e?void 0:e.selection)&&r.Transforms.select(A,null===(n=null===p||void 0===p?void 0:p.current)||void 0===n?void 0:n.selection),h()}),100)}),[h]);return e.open?o.createElement(w,F({pluginConfig:m,add:j,remove:x,isActive:null!==(v=null===(d=null===p||void 0===p?void 0:p.current)||void 0===d?void 0:d.isActive)&&void 0!==v&&v,shouldInsertWithText:y,data:null===(f=null===p||void 0===p?void 0:p.current)||void 0===f?void 0:f.data},e)):null}))},65996:(e,n,t)=>{t.d(n,{A:()=>r});var o=t(58679);const r=function(e){var n=(0,o.A)(e);return Boolean(n)}}}]);
//# sourceMappingURL=596.22eee5b5.chunk.js.map