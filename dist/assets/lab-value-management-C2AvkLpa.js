import{a as y}from"./axios-B6xwUs71.js";import{_ as T,k as S,r,Q as M,q as $,o as p,c as k,d as o,w as l,b as c,a as e,a2 as v,f as x,t as d,M as C,F as N,s as z,V as w,S as F,T as R}from"./index-DCsPtwhx.js";import{V as U}from"./VCardTitle-COZctO8-.js";import{V as q}from"./VTextField-9r9q975_.js";import{V as I}from"./VAlert-Cp1LBsWb.js";import{V as E}from"./VGrid-CNtzL7sO.js";import{V as Q}from"./VTable-CzHr_sSf.js";import{V as j,a as G}from"./VRow-BQMg7gci.js";import"./index-B2lw2hcK.js";const H=_=>(F("data-v-befb516b"),_=_(),R(),_),J={class:"table-header"},K={class:"table-container"},O=H(()=>e("thead",null,[e("tr",null,[e("th",null,"ID"),e("th",null,"Category Lab"),e("th",null,"Indicator"),e("th",null,"Unit"),e("th",null,"Reference Value"),e("th",null,"Created Date"),e("th",null,"Actions")])],-1)),W={class:"pagination"},X={__name:"LabValueList",setup(_){const i=S(),h=localStorage.getItem("token"),m=r([]),s=r("");r(null),r([]);const n=r({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0});r(!1),r(null);const b=r(""),g=r(""),f=async(u=1,t="")=>{try{let a=`https://gateway.berkompeten.com/api/admin/master/lab-value?page=${u}`;t&&(a+=`&search=${t.toLowerCase()}`);const V=await y.get(a,{headers:{Authorization:`Bearer ${h}`}});m.value=V.data.data.data,n.value=V.data.data}catch(a){console.log("err: ",a),a.response&&a.response.status===401&&(localStorage.removeItem("token"),i.push("/login"))}};M([s],([u])=>{f(1,u)});const B=()=>{n.value.next_page_url&&f(n.value.current_page+1,s.value)},L=()=>{n.value.prev_page_url&&f(n.value.current_page-1,s.value)},A=()=>{localStorage.removeItem("id"),i.push("/lab-value/detail")},D=u=>{localStorage.setItem("id",u),i.push("/lab-value/detail")},P=async u=>{try{const t=await y.delete(`https://gateway.berkompeten.com/api/admin/master/lab-value?id=${u}`,{headers:{Authorization:`Bearer ${h}`}});b.value=t.data.message,f(n.value.current_page)}catch(t){console.log("err: ",t),t.response&&t.response.data?g.value=t.response.data.message||"An error occurred while deleting. Please try again.":g.value="An error occurred while deleting. Please try again."}};return $(()=>{f()}),(u,t)=>(p(),k("div",null,[o(U,{class:"mb-4"},{default:l(()=>[c("Lab Values Management")]),_:1}),e("div",J,[o(q,{modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=a=>s.value=a),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"]),o(v,{color:"#0080ff",class:"mx-1",onClick:A},{default:l(()=>[c("Create")]),_:1})]),o(E,null,{default:l(()=>[b.value?(p(),x(I,{key:0,type:"success",dismissible:"","onClick:close":t[1]||(t[1]=a=>b.value="")},{default:l(()=>[c(d(b.value),1)]),_:1})):C("",!0),g.value?(p(),x(I,{key:1,type:"error",dismissible:"","onClick:close":t[2]||(t[2]=a=>g.value="")},{default:l(()=>[c(d(g.value),1)]),_:1})):C("",!0)]),_:1}),e("div",K,[o(Q,{"fixed-header":""},{default:l(()=>[O,e("tbody",null,[(p(!0),k(N,null,z(m.value,a=>(p(),k("tr",{key:a.id},[e("td",null,d(a.id),1),e("td",null,d(a.category_lab.name),1),e("td",null,d(a.indicator),1),e("td",null,d(a.unit),1),e("td",null,d(a.reference_value),1),e("td",null,d(a.created_date),1),e("td",null,[e("div",null,[o(v,{icon:"",onClick:V=>D(a.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:l(()=>[o(w,{style:{color:"orange"}},{default:l(()=>[c("ri-edit-line")]),_:1})]),_:2},1032,["onClick"]),o(v,{icon:"",onClick:V=>P(a.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:l(()=>[o(w,{style:{color:"red"}},{default:l(()=>[c("ri-delete-bin-line")]),_:1})]),_:2},1032,["onClick"])])])]))),128))])]),_:1})]),e("div",W,[o(v,{onClick:L,disabled:!n.value.prev_page_url,class:"mx-1",color:"#0080ff"},{default:l(()=>[c("Previous")]),_:1},8,["disabled"]),o(v,{onClick:B,disabled:!n.value.next_page_url,class:"mx-1",color:"#0080ff"},{default:l(()=>[c("Next")]),_:1},8,["disabled"])])]))}},Y=T(X,[["__scopeId","data-v-befb516b"]]),ue={__name:"lab-value-management",setup(_){const i=localStorage.getItem("token"),h=r(null),m=S();return $(async()=>{if(i)try{const s=await y.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${i}`}});h.value=s.data}catch(s){s.response&&s.response.status===401&&m.push("/login")}else m.push("/login")}),(s,n)=>(p(),x(j,{class:"match-height"},{default:l(()=>[o(G,{cols:"12",md:"12"},{default:l(()=>[o(Y)]),_:1})]),_:1}))}};export{ue as default};
