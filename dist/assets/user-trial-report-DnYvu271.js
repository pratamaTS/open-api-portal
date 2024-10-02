import{_ as $,k as R,r as _,Q,q as B,R as q,o as m,f as h,w as e,d as t,b as l,am as w,t as r,M as C,a,c as z,F as G,s as H,S as Y,T as j}from"./index-DCsPtwhx.js";import{a as E}from"./axios-B6xwUs71.js";import{V as T}from"./VCard-CQGqZZlO.js";import{V as L}from"./VCardTitle-COZctO8-.js";import{V as N}from"./VGrid-CNtzL7sO.js";import{V as J}from"./VForm-Cf02CkQH.js";import{V as y,a as k}from"./VRow-BQMg7gci.js";import{V as K}from"./VTextField-9r9q975_.js";import{V as U}from"./VAlert-Cp1LBsWb.js";import{V as A,a as O}from"./VDataTable-CsjFIWeL.js";import{V as W}from"./VDivider-BGWne-YY.js";import{d as X,a as Z}from"./VSelect-n9UX3lEH.js";import{V as ee}from"./VChip-60TtaX10.js";import"./VImg-qC2UDgjV.js";import"./index-B2lw2hcK.js";import"./VCheckboxBtn-jBRBxYNL.js";import"./VSelectionControl-hvyZhp-8.js";import"./VTable-CzHr_sSf.js";import"./filter-CIkSTTsY.js";import"./VOverlay-CSuY4GSz.js";import"./lazy-atWRYZQq.js";import"./VMenu-AzC6IdKP.js";const s=f=>(Y("data-v-b6f89d64"),f=f(),j(),f),te=["colspan"],ae=s(()=>a("strong",null,"Gender:",-1)),se=s(()=>a("br",null,null,-1)),oe=s(()=>a("strong",null,"Role:",-1)),le=s(()=>a("br",null,null,-1)),re=s(()=>a("strong",null,"Year of Entry:",-1)),ne=s(()=>a("br",null,null,-1)),ie=s(()=>a("strong",null,"Target Exam Date:",-1)),ue=s(()=>a("br",null,null,-1)),de=s(()=>a("strong",null,"University ID:",-1)),_e=s(()=>a("br",null,null,-1)),ce=s(()=>a("strong",null,"Educational Status ID:",-1)),pe=s(()=>a("strong",null,"Trial Packet Completion Date:",-1)),me=s(()=>a("br",null,null,-1)),fe=s(()=>a("strong",null,"Is User Trial:",-1)),he=s(()=>a("br",null,null,-1)),ge=s(()=>a("strong",null,"Is User Silver:",-1)),ve=s(()=>a("br",null,null,-1)),Ve=s(()=>a("strong",null,"Is User Gold:",-1)),ke=s(()=>a("h4",null,"Login Activities",-1)),xe=s(()=>a("h4",null,"Student To-Do Lists",-1)),ye={__name:"UserTrialReportList",setup(f){const g=R(),x=localStorage.getItem("token"),c=_(""),i=_([]),p=_(""),v=_(""),F=_([]),D=_({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0}),b=[{title:"ID",value:"id"},{title:"Name",value:"name"},{title:"Email",value:"email"},{title:"Phone Number",value:"phone_number"},{title:"Created At",value:"created_date"}],M=[{title:"ID",value:"id"},{title:"Question Packet Name",value:"question_packet.name"},{title:"Start Date",value:"start_date"},{title:"Finish Date",value:"finish_date"},{title:"Score",value:"score"},{title:"Is Done",value:"is_done"}],I=async(u=1,d="")=>{try{const n=await E.get("https://gateway.berkompeten.com/api/admin/report/user/trial",{headers:{Authorization:`Bearer ${x}`},params:{page:u,search:d.toLowerCase()}});if(n.data.error){p.value=n.data.message,i.value=[];return}v.value=n.data.message,i.value=n.data.data.data,D.value=n.data.data}catch(n){p.value="Failed to fetch user trial report. Please try again.",console.log("err: ",n),n.response&&n.response.status===401&&(localStorage.removeItem("token"),g.push("/login"))}};Q([c],([u])=>{I(D.value.current_page,u)});const S=u=>u?new Date(u).toLocaleDateString("en-US"):"N/A";return B(()=>{I()}),(u,d)=>{const n=q("v-list-item-content");return m(),h(O,null,{default:e(()=>[t(T,null,{default:e(()=>[t(L,null,{default:e(()=>[l("User Trial Report")]),_:1}),t(N,null,{default:e(()=>[t(J,null,{default:e(()=>[t(y,null,{default:e(()=>[t(k,{cols:"12"},{default:e(()=>[t(K,{modelValue:c.value,"onUpdate:modelValue":d[0]||(d[0]=o=>c.value=o),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(N,null,{default:e(()=>[p.value?(m(),h(U,{key:0,type:"error",dismissible:"",onClick:d[1]||(d[1]=w(o=>p.value="",["stop"]))},{default:e(()=>[l(r(p.value),1)]),_:1})):C("",!0),v.value?(m(),h(U,{key:1,type:"success",dismissible:"",onClick:d[2]||(d[2]=w(o=>v.value="",["stop"]))},{default:e(()=>[l(r(v.value),1)]),_:1})):C("",!0),t(A,{headers:b,items:i.value,"item-value":"id",class:"elevation-1","show-expand":"",expanded:F.value,"single-expand":u.singleExpand},{"expanded-row":e(({item:o})=>[a("td",{colspan:b.length,class:"expanded-row"},[t(T,{flat:"",class:"pa-3"},{default:e(()=>[t(L,null,{default:e(()=>[l("Additional Details for "+r(o.name),1)]),_:2},1024),t(y,null,{default:e(()=>[t(k,{cols:"12",sm:"6"},{default:e(()=>[ae,l(" "+r(o.gender),1),se,oe,l(" "+r(o.role),1),le,re,l(" "+r(o.year_of_entry),1),ne,ie,l(" "+r(S(o.target_exam_date)),1),ue,de,l(" "+r(o.university_id),1),_e,ce,l(" "+r(o.educational_status_id),1)]),_:2},1024),t(k,{cols:"12",sm:"6"},{default:e(()=>[pe,l(" "+r(S(o.trial_packet_completion_date)),1),me,fe,l(" "+r(o.is_user_trial),1),he,ge,l(" "+r(o.is_user_silver),1),ve,Ve,l(" "+r(o.is_user_gold),1)]),_:2},1024)]),_:2},1024),t(W,{class:"my-3"}),ke,t(X,{dense:""},{default:e(()=>[(m(!0),z(G,null,H(o.login_activities,(V,P)=>(m(),h(Z,{key:P},{default:e(()=>[t(n,null,{default:e(()=>[l(r(V),1)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024),xe,t(A,{headers:M,items:o.student_to_do_lists,"item-value":"id",class:"elevation-1","hide-default-footer":!0,"items-per-page":5},{"item.is_done":e(({item:V})=>[t(ee,{color:V.is_done?"success":"error",dark:""},{default:e(()=>[l(r(V.is_done?"Done":"Not Done"),1)]),_:2},1032,["color"])]),_:2},1032,["items"])]),_:2},1024)],8,te)]),_:1},8,["items","expanded","single-expand"])]),_:1})]),_:1})]),_:1})}}},De=$(ye,[["__scopeId","data-v-b6f89d64"]]),Ye={__name:"user-trial-report",setup(f){const g=localStorage.getItem("token"),x=_(null),c=R();return B(async()=>{if(g)try{const i=await E.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${g}`}});x.value=i.data}catch(i){i.response&&i.response.status===401&&c.push("/login")}else c.push("/login")}),(i,p)=>(m(),h(y,{class:"match-height"},{default:e(()=>[t(k,{cols:"12",md:"12"},{default:e(()=>[t(De)]),_:1})]),_:1}))}};export{Ye as default};
