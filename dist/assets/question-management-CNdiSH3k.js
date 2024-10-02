import{a as V}from"./axios-B6xwUs71.js";import{_ as j,k as F,r as d,Q as J,q as L,o as v,c as $,d as l,w as o,b as u,a,a2 as f,f as C,t as r,M as w,F as G,s as K,V as U,S as W,T as X}from"./index-DCsPtwhx.js";import{V as P}from"./VCardTitle-COZctO8-.js";import{V as Y}from"./VTextField-9r9q975_.js";import{V as Z}from"./VSelect-n9UX3lEH.js";import{V as S}from"./VAlert-Cp1LBsWb.js";import{V as T}from"./VGrid-CNtzL7sO.js";import{V as ee}from"./VTable-CzHr_sSf.js";import{V as te,b as ae}from"./VCard-CQGqZZlO.js";import{V as le,a as oe}from"./VFileInput-BQa7zEYi.js";import{V as se}from"./VSpacer-gK13XpwC.js";import{V as re,a as ne}from"./VRow-BQMg7gci.js";import"./index-B2lw2hcK.js";import"./VOverlay-CSuY4GSz.js";import"./lazy-atWRYZQq.js";import"./VMenu-AzC6IdKP.js";import"./VDivider-BGWne-YY.js";import"./VCheckboxBtn-jBRBxYNL.js";import"./VSelectionControl-hvyZhp-8.js";import"./VChip-60TtaX10.js";import"./VImg-qC2UDgjV.js";const ue=y=>(W("data-v-5fea272a"),y=y(),X(),y),ie={class:"table-header"},de={class:"table-container"},ce=ue(()=>a("thead",null,[a("tr",null,[a("th",null,"ID"),a("th",null,"Packet Name"),a("th",null,"Subtopic Name"),a("th",null,"Question Number"),a("th",null,"Question"),a("th",null,"Option A"),a("th",null,"Option B"),a("th",null,"Option C"),a("th",null,"Option D"),a("th",null,"Option E"),a("th",null,"Correct Answer"),a("th",null,"Discussion"),a("th",null,"Is Active"),a("th",null,"Created Date"),a("th",null,"Actions")])],-1)),pe=["innerHTML"],me={key:0},fe={class:"pagination"},ve={__name:"QuestionList",setup(y){const h=F(),g=localStorage.getItem("token"),x=d([]),i=d(""),_=d(null),A=d([]),c=d({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0}),B=d(!1),k=d(null),p=d(""),n=d(""),b=async(s=1,e=null,t="")=>{try{let m=`https://gateway.berkompeten.com/api/admin/master/question?page=${s}`;e&&(console.log("Q: ",e),m+=`&question_packet_id=${e}`),t&&(m+=`&search=${t.toLowerCase()}`);const I=await V.get(m,{headers:{Authorization:`Bearer ${g}`}});x.value=I.data.data.data,c.value=I.data.data}catch(m){console.log("err: ",m),m.response&&m.response.status===401&&(localStorage.removeItem("token"),h.push("/login"))}},N=async()=>{try{const s=await V.get("https://gateway.berkompeten.com/api/admin/master/question-packet/fetch-all",{headers:{Authorization:`Bearer ${g}`}});A.value=s.data.data.map(e=>({id:e.id,name:e.name}))}catch(s){console.error("Error fetching question packet options:",s)}};J([_,i],([s,e])=>{b(1,s,e)});const O=()=>{var s=null;_.value&&(s=_.value),c.value.next_page_url&&b(c.value.current_page+1,s,i.value)},E=()=>{var s=null;_.value&&(s=_.value),c.value.prev_page_url&&b(c.value.current_page-1,s,i.value)},Q=()=>{localStorage.removeItem("question_id"),h.push("/question/detail")},M=async()=>{try{const s=await V.get("https://gateway.berkompeten.com/api/admin/master/question/download-template",{responseType:"blob",headers:{Authorization:`Bearer ${g}`}}),e=window.URL.createObjectURL(new Blob([s.data])),t=document.createElement("a");t.href=e,t.setAttribute("download","questions_template.xlsx"),document.body.appendChild(t),t.click()}catch(s){console.error("Error downloading template:",s)}},z=()=>{localStorage.removeItem("question_id"),B.value=!0},D=()=>{B.value=!1,k.value=null,p.value="",n.value=""},R=async()=>{if(!k.value){n.value="Please upload a file",setTimeout(()=>{n.value=""},5e3);return}const s=new FormData;s.append("file",k.value[0]),console.log("FILE: ",k.value[0]);try{const e=await V.post("https://gateway.berkompeten.com/api/admin/master/question/bulk-upsert",s,{headers:{"Content-Type":"multipart/form-data",Authorization:`Bearer ${g}`}});p.value="Bulk upsert completed successfully",setTimeout(()=>{D(),b(c.value.current_page)},2e3)}catch(e){e.response&&e.response.status===422?(n.value="Validation error: "+JSON.stringify(e.response.data.message.file[0]),setTimeout(()=>{n.value=""},5e3)):(n.value="Error bulk upsert: "+e.response.data.message,setTimeout(()=>{n.value=""},5e3))}},q=s=>{localStorage.setItem("question_id",s),h.push("/question/detail")},H=async s=>{try{const e=await V.delete(`https://gateway.berkompeten.com/api/admin/master/question?question_id=${s}`,{headers:{Authorization:`Bearer ${g}`}});p.value=e.data.message,b(c.value.current_page)}catch(e){console.log("err: ",e),e.response&&e.response.data?n.value=e.response.data.message||"An error occurred while deleting. Please try again.":n.value="An error occurred while deleting. Please try again."}};return L(()=>{b(),N()}),(s,e)=>(v(),$("div",null,[l(P,{class:"mb-4"},{default:o(()=>[u("Question Management")]),_:1}),a("div",ie,[l(Y,{modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=t=>i.value=t),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"]),l(Z,{modelValue:_.value,"onUpdate:modelValue":e[1]||(e[1]=t=>_.value=t),items:A.value,"item-value":"id","item-title":"name",label:"Filter by Packet",class:"mx-3",solo:"",clearable:""},null,8,["modelValue","items"]),l(f,{color:"#0080ff",class:"mx-1",onClick:Q},{default:o(()=>[u("Create")]),_:1}),l(f,{color:"#0080ff",class:"mx-1",onClick:z},{default:o(()=>[u("Bulk Upsert")]),_:1}),l(f,{color:"#0080ff",class:"mx-1",onClick:M},{default:o(()=>[u("Download Template")]),_:1})]),l(T,null,{default:o(()=>[p.value?(v(),C(S,{key:0,type:"success",dismissible:"","onClick:close":e[2]||(e[2]=t=>p.value="")},{default:o(()=>[u(r(p.value),1)]),_:1})):w("",!0),n.value?(v(),C(S,{key:1,type:"error",dismissible:"","onClick:close":e[3]||(e[3]=t=>n.value="")},{default:o(()=>[u(r(n.value),1)]),_:1})):w("",!0)]),_:1}),a("div",de,[l(ee,{"fixed-header":""},{default:o(()=>[ce,a("tbody",null,[(v(!0),$(G,null,K(x.value,t=>(v(),$("tr",{key:t.id},[a("td",null,r(t.id),1),a("td",null,r(t.question_packet.name),1),a("td",null,r(t.subtopic_list.subtopic),1),a("td",null,r(t.question_number),1),a("td",null,r(t.question),1),a("td",null,r(t.option_a),1),a("td",null,r(t.option_b),1),a("td",null,r(t.option_c),1),a("td",null,r(t.option_d),1),a("td",null,r(t.option_e),1),a("td",null,r(t.correct_answer),1),a("td",{innerHTML:t.discussion},null,8,pe),a("td",null,r(t.is_active),1),a("td",null,r(t.created_date),1),a("td",null,[t.is_used===!1?(v(),$("div",me,[l(f,{icon:"",onClick:m=>q(t.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:o(()=>[l(U,{style:{color:"orange"}},{default:o(()=>[u("ri-edit-line")]),_:1})]),_:2},1032,["onClick"]),l(f,{icon:"",onClick:m=>H(t.id),class:"mx-1",color:"transparent",style:{padding:"0",border:"none","background-color":"transparent","box-shadow":"none"}},{default:o(()=>[l(U,{style:{color:"red"}},{default:o(()=>[u("ri-delete-bin-line")]),_:1})]),_:2},1032,["onClick"])])):w("",!0)])]))),128))])]),_:1})]),a("div",fe,[l(f,{onClick:E,disabled:!c.value.prev_page_url,class:"mx-1",color:"#0080ff"},{default:o(()=>[u("Previous")]),_:1},8,["disabled"]),l(f,{onClick:O,disabled:!c.value.next_page_url,class:"mx-1",color:"#0080ff"},{default:o(()=>[u("Next")]),_:1},8,["disabled"])]),l(oe,{modelValue:B.value,"onUpdate:modelValue":e[7]||(e[7]=t=>B.value=t),"max-width":"500px"},{default:o(()=>[l(te,null,{default:o(()=>[l(P,{class:"text-h5"},{default:o(()=>[u("Bulk Upsert")]),_:1}),l(T,null,{default:o(()=>[l(le,{modelValue:k.value,"onUpdate:modelValue":e[4]||(e[4]=t=>k.value=t),label:"Upload Excel File",accept:".csv,.xlsx,.xls","prepend-icon":"mdi-upload"},null,8,["modelValue"])]),_:1}),l(ae,null,{default:o(()=>[l(se),l(f,{color:"blue darken-1",text:"",onClick:D},{default:o(()=>[u("Cancel")]),_:1}),l(f,{color:"#0080ff",text:"",onClick:R},{default:o(()=>[u("Upload")]),_:1})]),_:1}),l(T,null,{default:o(()=>[p.value?(v(),C(S,{key:0,type:"success",dismissible:"","onClick:close":e[5]||(e[5]=t=>p.value="")},{default:o(()=>[u(r(p.value),1)]),_:1})):w("",!0),n.value?(v(),C(S,{key:1,type:"error",dismissible:"","onClick:close":e[6]||(e[6]=t=>n.value="")},{default:o(()=>[u(r(n.value),1)]),_:1})):w("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}},_e=j(ve,[["__scopeId","data-v-5fea272a"]]),Oe={__name:"question-management",setup(y){const h=localStorage.getItem("token"),g=d(null),x=F();return L(async()=>{if(h)try{const i=await V.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${h}`}});g.value=i.data}catch(i){i.response&&i.response.status===401&&x.push("/login")}else x.push("/login")}),(i,_)=>(v(),C(re,{class:"match-height"},{default:o(()=>[l(ne,{cols:"12",md:"12"},{default:o(()=>[l(_e)]),_:1})]),_:1}))}};export{Oe as default};
