import{p as D,aT as U,m as G,bp as W,h as E,y as R,aM as T,i as w,av as z,bq as Y,aV as Z,A as r,j as ee,d as l,I as b,an as B,ar as ae,aK as le,at as te,br as ne,x as se,aL as ie,b1 as ce,aN as de,C as oe,aw as ue,aP as re,aQ as ve,ay as fe,B as me,b2 as pe,a3 as ke,bs as he,aO as ye,l as C,J as x,ah as be,aS as Ce,V as v,a5 as f,K as Ve,F as _,L as Ie}from"./index-DCsPtwhx.js";import{t as ge}from"./VTextField-9r9q975_.js";import{a as L}from"./VCard-CQGqZZlO.js";const F=Symbol.for("vuetify:v-chip-group"),Pe=D({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:U},...G(),...W({selectedClass:"v-chip--selected"}),...E(),...R(),...T({variant:"tonal"})},"VChipGroup");w()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,m){let{slots:c}=m;const{themeClasses:o}=z(e),{isSelected:t,select:p,next:k,prev:h,selected:y}=Y(e,F);return Z({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ee(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:p,next:k,prev:h,selected:y.value})]}})),{}}});const Se=D({activeClass:String,appendAvatar:String,appendIcon:b,closable:Boolean,closeIcon:{type:b,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:b,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:B(),onClickOnce:B(),...ae(),...G(),...le(),...te(),...ne(),...se(),...ie(),...ce(),...E({tag:"span"}),...R(),...T({variant:"tonal"})},"VChip"),_e=w()({name:"VChip",directives:{Ripple:de},props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,m){let{attrs:c,emit:o,slots:t}=m;const{t:p}=oe(),{borderClasses:k}=ue(e),{colorClasses:h,colorStyles:y,variantClasses:u}=re(e),{densityClasses:K}=ve(e),{elevationClasses:M}=fe(e),{roundedClasses:O}=me(e),{sizeClasses:$}=pe(e),{themeClasses:j}=z(e),V=ke(e,"modelValue"),a=he(e,F,!1),s=ye(e,c),q=C(()=>e.link!==!1&&s.isLink.value),i=C(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),N=C(()=>({"aria-label":p(e.closeLabel),onClick(n){n.stopPropagation(),V.value=!1,o("click:close",n)}}));function I(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function J(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),I(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),Q=!!(d||t.append),X=!!(t.close||e.closable),g=!!(t.filter||e.filter)&&a,P=!!(e.prependIcon||e.prependAvatar),H=!!(P||t.prepend),S=!a||a.isSelected.value;return V.value&&x(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":g,"v-chip--pill":e.pill},j.value,k.value,S?h.value:void 0,K.value,M.value,O.value,$.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[S?y.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:I,onKeydown:i.value&&!q.value&&J},{default:()=>{var A;return[Ce(i.value,"v-chip"),g&&l(ge,{key:"filter"},{default:()=>[x(l("div",{class:"v-chip__filter"},[t.filter?l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},t.filter):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ve,a.isSelected.value]])]}),H&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(_,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(L,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((A=t.default)==null?void 0:A.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),Q&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(_,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(L,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),X&&l("button",Ie({key:"close",class:"v-chip__close"},N.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[be("ripple"),i.value&&e.ripple,null]])}}});export{_e as V};
