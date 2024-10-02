import{a as x}from"./axios-B6xwUs71.js";import{_ as T,k as S,r,Q as M,q as $,o as p,c as b,d as o,w as s,b as c,a,a2 as f,f as V,t as u,M as C,F as L,s as U,V as w,S as z,T as F}from"./index-DCsPtwhx.js";import{V as R}from"./VCardTitle-COZctO8-.js";import{V as q}from"./VTextField-9r9q975_.js";import{V as I}from"./VAlert-Cp1LBsWb.js";import{V as E}from"./VGrid-CNtzL7sO.js";import{V as Q}from"./VTable-CzHr_sSf.js";import{V as j,a as G}from"./VRow-BQMg7gci.js";import"./index-B2lw2hcK.js";const H=m=>(z("data-v-80bdf328"),m=m(),F(),m),J={class:"table-header"},K={class:"table-container"},O=H(()=>a("thead",null,[a("tr",null,[a("th",null,"ID"),a("th",null,"Name"),a("th",null,"Is Active"),a("th",null,"Created Date"),a("th",null,"Actions")])],-1)),W={class:"pagination"},X={__name:"UniversityList",setup(m){const d=S(),h=localStorage.getItem("token"),_=r([]),l=r("");r(null),r([]);const n=r({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0});r(!1),r(null);const y=r(""),v=r(""),g=async(i=1,t="")=>{try{let e=`https://gateway.berkompeten.com/api/admin/master/university?page=${i}`;t&&(e+=`&search=${t.toLowerCase()}`);const k=await x.get(e,{headers:{Authorization:`Bearer ${h}`}});_.value=k.data.data.data,n.value=k.data.data}catch(e){console.log("err: ",e),e.response&&e.response.status===401&&(localStorage.removeItem("token"),d.push("/login"))}};M([l],([i])=>{g(1,i)});const A=()=>{n.value.next_page_url&&g(n.value.current_page+1,l.value)},B=()=>{n.value.prev_page_url&&g(n.value.current_page-1,l.value)},D=()=>{localStorage.removeItem("id"),d.push("/university/detail")},N=i=>{localStorage.setItem("id",i),d.push("/university/detail")},P=async i=>{try{const t=await x.delete(`https://gateway.berkompeten.com/api/admin/master/university?id=${i}`,{headers:{Authorization:`Bearer ${h}`}});y.value=t.data.message,g(n.value.current_page)}catch(t){console.log("err: ",t),t.response&&t.response.data?v.value=t.response.data.message||"An error occurred while deleting. Please try again.":v.value="An error occurred while deleting. Please try again."}};return $(()=>{g()}),(i,t)=>(p(),b("div",null,[o(R,{class:"mb-4"},{default:s(()=>[c("University Management")]),_:1}),a("div",J,[o(q,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value=e),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"]),o(f,{color:"#0080ff",class:"mx-1",onClick:D},{default:s(()=>[c("Create")]),_:1})]),o(E,null,{default:s(()=>[y.value?(p(),V(I,{key:0,type:"success",dismissible:"","onClick:close":t[1]||(t[1]=e=>y.value="")},{default:s(()=>[c(u(y.value),1)]),_:1})):C("",!0),v.value?(p(),V(I,{key:1,type:"error",dismissible:"","onClick:close":t[2]||(t[2]=e=>v.value="")},{default:s(()=>[c(u(v.value),1)]),_:1})):C("",!0)]),_:1}),a("div",K,[o(Q,{"fixed-header":""},{default:s(()=>[O,a("tbody",null,[(p(!0),b(L,null,U(_.value,e=>(p(),b("tr",{key:e.id},[a("td",null,u(e.id),1),a("td",null,u(e.name),1),a("td",null,u(e.is_active),1),a("td",null,u(e.created_date),1),a("td",null,[a("div",null,[o(f,{icon:"",onClick:k=>N(e.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:s(()=>[o(w,{style:{color:"orange"}},{default:s(()=>[c("ri-edit-line")]),_:1})]),_:2},1032,["onClick"]),o(f,{icon:"",onClick:k=>P(e.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:s(()=>[o(w,{style:{color:"red"}},{default:s(()=>[c("ri-delete-bin-line")]),_:1})]),_:2},1032,["onClick"])])])]))),128))])]),_:1})]),a("div",W,[o(f,{onClick:B,disabled:!n.value.prev_page_url,class:"mx-1",color:"#0080ff"},{default:s(()=>[c("Previous")]),_:1},8,["disabled"]),o(f,{onClick:A,disabled:!n.value.next_page_url,class:"mx-1",color:"#0080ff"},{default:s(()=>[c("Next")]),_:1},8,["disabled"])])]))}},Y=T(X,[["__scopeId","data-v-80bdf328"]]),ie={__name:"university-management",setup(m){const d=localStorage.getItem("token"),h=r(null),_=S();return $(async()=>{if(d)try{const l=await x.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${d}`}});h.value=l.data}catch(l){l.response&&l.response.status===401&&_.push("/login")}else _.push("/login")}),(l,n)=>(p(),V(j,{class:"match-height"},{default:s(()=>[o(G,{cols:"12",md:"12"},{default:s(()=>[o(Y)]),_:1})]),_:1}))}};export{ie as default};
