import{a as x}from"./axios-B6xwUs71.js";import{_ as M,k as S,r,Q as N,q as $,o as p,c as b,d as l,w as o,b as i,a,a2 as v,f as V,t as d,M as C,F as L,s as z,V as w,S as F,T as R}from"./index-DCsPtwhx.js";import{V as q}from"./VCardTitle-COZctO8-.js";import{V as E}from"./VTextField-9r9q975_.js";import{V as I}from"./VAlert-Cp1LBsWb.js";import{V as Q}from"./VGrid-CNtzL7sO.js";import{V as U}from"./VTable-CzHr_sSf.js";import{V as j,a as G}from"./VRow-BQMg7gci.js";import"./index-B2lw2hcK.js";const H=m=>(F("data-v-2406742d"),m=m(),R(),m),J={class:"table-header"},K={class:"table-container"},O=H(()=>a("thead",null,[a("tr",null,[a("th",null,"ID"),a("th",null,"System"),a("th",null,"Topic"),a("th",null,"Is Active"),a("th",null,"Created Date"),a("th",null,"Actions")])],-1)),W={class:"pagination"},X={__name:"TopicList",setup(m){const u=S(),h=localStorage.getItem("token"),_=r([]),s=r("");r(null),r([]);const n=r({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0});r(!1),r(null);const k=r(""),g=r(""),f=async(c=1,t="")=>{try{let e=`https://gateway.berkompeten.com/api/admin/master/topic?page=${c}`;t&&(e+=`&search=${t.toLowerCase()}`);const y=await x.get(e,{headers:{Authorization:`Bearer ${h}`}});_.value=y.data.data.data,n.value=y.data.data}catch(e){console.log("err: ",e),e.response&&e.response.status===401&&(localStorage.removeItem("token"),u.push("/login"))}};N([s],([c])=>{f(1,c)});const T=()=>{n.value.next_page_url&&f(n.value.current_page+1,s.value)},A=()=>{n.value.prev_page_url&&f(n.value.current_page-1,s.value)},B=()=>{localStorage.removeItem("id"),u.push("/topic/detail")},D=c=>{localStorage.setItem("id",c),u.push("/topic/detail")},P=async c=>{try{const t=await x.delete(`https://gateway.berkompeten.com/api/admin/master/topic?id=${c}`,{headers:{Authorization:`Bearer ${h}`}});k.value=t.data.message,f(n.value.current_page)}catch(t){console.log("err: ",t),t.response&&t.response.data?g.value=t.response.data.message||"An error occurred while deleting. Please try again.":g.value="An error occurred while deleting. Please try again."}};return $(()=>{f()}),(c,t)=>(p(),b("div",null,[l(q,{class:"mb-4"},{default:o(()=>[i("Topic Management")]),_:1}),a("div",J,[l(E,{modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=e=>s.value=e),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"]),l(v,{color:"#0080ff",class:"mx-1",onClick:B},{default:o(()=>[i("Create")]),_:1})]),l(Q,null,{default:o(()=>[k.value?(p(),V(I,{key:0,type:"success",dismissible:"","onClick:close":t[1]||(t[1]=e=>k.value="")},{default:o(()=>[i(d(k.value),1)]),_:1})):C("",!0),g.value?(p(),V(I,{key:1,type:"error",dismissible:"","onClick:close":t[2]||(t[2]=e=>g.value="")},{default:o(()=>[i(d(g.value),1)]),_:1})):C("",!0)]),_:1}),a("div",K,[l(U,{"fixed-header":""},{default:o(()=>[O,a("tbody",null,[(p(!0),b(L,null,z(_.value,e=>(p(),b("tr",{key:e.id},[a("td",null,d(e.id),1),a("td",null,d(e.system_list.topic),1),a("td",null,d(e.topic),1),a("td",null,d(e.is_active),1),a("td",null,d(e.created_date),1),a("td",null,[a("div",null,[l(v,{icon:"",onClick:y=>D(e.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:o(()=>[l(w,{style:{color:"orange"}},{default:o(()=>[i("ri-edit-line")]),_:1})]),_:2},1032,["onClick"]),l(v,{icon:"",onClick:y=>P(e.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:o(()=>[l(w,{style:{color:"red"}},{default:o(()=>[i("ri-delete-bin-line")]),_:1})]),_:2},1032,["onClick"])])])]))),128))])]),_:1})]),a("div",W,[l(v,{onClick:A,disabled:!n.value.prev_page_url,class:"mx-1",color:"#0080ff"},{default:o(()=>[i("Previous")]),_:1},8,["disabled"]),l(v,{onClick:T,disabled:!n.value.next_page_url,class:"mx-1",color:"#0080ff"},{default:o(()=>[i("Next")]),_:1},8,["disabled"])])]))}},Y=M(X,[["__scopeId","data-v-2406742d"]]),ce={__name:"topic-management",setup(m){const u=localStorage.getItem("token"),h=r(null),_=S();return $(async()=>{if(u)try{const s=await x.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${u}`}});h.value=s.data}catch(s){s.response&&s.response.status===401&&_.push("/login")}else _.push("/login")}),(s,n)=>(p(),V(j,{class:"match-height"},{default:o(()=>[l(G,{cols:"12",md:"12"},{default:o(()=>[l(Y)]),_:1})]),_:1}))}};export{ce as default};
