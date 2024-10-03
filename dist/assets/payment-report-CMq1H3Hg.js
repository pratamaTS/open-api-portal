import{_ as q,k as M,r as d,Q as O,q as P,o as b,f as y,w as t,d as a,b as o,a4 as I,t as n,M as N,a as l,S as j,T as G}from"./index-D2-qfZUC.js";import{a as $}from"./axios-B6xwUs71.js";import{V as T}from"./VCard-ejHHU9Bq.js";import{V as L}from"./VCardTitle-PXnkOUol.js";import{V as R,a as w,b as c}from"./VCardText-DTp4SCLr.js";import{V as H}from"./VForm-Dut-m-4W.js";import{V as x}from"./VTextField-Ay2s5CCj.js";import{V as J,e as K}from"./VSelect-Cqivx8vu.js";import{V as U}from"./VAlert-BwkZ1Dg2.js";import{V as W,a as X}from"./VDataTable-DKw8THsX.js";import"./VGrid-CFL11Wdl.js";import"./VAvatar-BlyarVzO.js";import"./VImg-ky0uhTEw.js";import"./index-G4heg744.js";import"./VMenu-qjjmy5pR.js";import"./lazy-B8-pPrfC.js";import"./VDivider-CEgDdWDf.js";import"./VCheckboxBtn-DfWcySS9.js";import"./VSelectionControl-DWy0skl9.js";import"./VTable-BFNrG0pI.js";const s=p=>(j("data-v-26324b44"),p=p(),G(),p),Y=["colspan"],Z=s(()=>l("strong",null,"Sender Bank Type:",-1)),ee=s(()=>l("br",null,null,-1)),te=s(()=>l("strong",null,"Payment URL:",-1)),ae=["href"],le=s(()=>l("br",null,null,-1)),se=s(()=>l("strong",null,"Virtual Account Number:",-1)),oe=s(()=>l("br",null,null,-1)),ne=s(()=>l("strong",null,"Transaction Reference Number:",-1)),re=s(()=>l("br",null,null,-1)),ue=s(()=>l("strong",null,"Settlement Status:",-1)),de=s(()=>l("br",null,null,-1)),ie=s(()=>l("strong",null,"Bill Link:",-1)),ce=s(()=>l("br",null,null,-1)),me=s(()=>l("strong",null,"Completed At:",-1)),_e=s(()=>l("br",null,null,-1)),pe=s(()=>l("strong",null,"Reference ID:",-1)),fe=s(()=>l("br",null,null,-1)),ve=s(()=>l("strong",null,"Settlement Date:",-1)),ge={__name:"PaymentReportList",setup(p){const f=M(),S=localStorage.getItem("token"),m=d(""),i=d([]),_=d(""),v=d(""),F=d([]),C=d({current_page:1,from:1,last_page:1,next_page_url:null,prev_page_url:null,total:0}),g=d("2024-06-01"),h=d("2024-06-30"),V=d("created_at"),D=d("sort_desc"),z=[{title:"Created At",value:"created_at"},{title:"Amount",value:"amount"},{title:"Sender Name",value:"sender_name"}],A=[{title:"ID",value:"id"},{title:"Bill Title",value:"bill_title"},{title:"Sender Name",value:"sender_name"},{title:"Sender Bank",value:"sender_bank"},{title:"Amount",value:"amount"},{title:"Status",value:"status"},{title:"Created At",value:"created_at"}],B=async(u=1,r="")=>{try{const e=await $.get("https://gateway.berkompeten.com/api/admin/report/bills",{headers:{Authorization:`Bearer ${S}`},params:{page:u,search:r.toLowerCase(),start_date:g.value,end_date:h.value,sort_by:V.value,sort_type:D.value}});if(e.data.error){_.value=e.data.message,i.value=[];return}v.value=e.data.message,i.value=e.data.data.data,C.value=e.data.data}catch(e){_.value="Failed to fetch bills. Please try again.",console.log("err: ",e),e.response&&e.response.status===401&&(localStorage.removeItem("token"),f.push("/login"))}};O([m,g,h,V,D],([u])=>{B(C.value.current_page,u)});const k=u=>u?new Date(u).toLocaleDateString("en-US"):"N/A",E=u=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(u),Q=u=>{switch(u.toLowerCase()){case"successful":return"success";case"pending":return"warning";case"failed":return"error";default:return"info"}};return P(()=>{B()}),(u,r)=>(b(),y(X,null,{default:t(()=>[a(T,null,{default:t(()=>[a(L,null,{default:t(()=>[o("Bill List")]),_:1}),a(R,null,{default:t(()=>[a(H,null,{default:t(()=>[a(w,null,{default:t(()=>[a(c,{cols:"12",md:"4"},{default:t(()=>[a(x,{modelValue:m.value,"onUpdate:modelValue":r[0]||(r[0]=e=>m.value=e),label:"Search",class:"mx-3",solo:""},null,8,["modelValue"])]),_:1}),a(c,{cols:"12",md:"3"},{default:t(()=>[a(x,{modelValue:g.value,"onUpdate:modelValue":r[1]||(r[1]=e=>g.value=e),label:"Start Date",type:"date",class:"mx-3",solo:""},null,8,["modelValue"])]),_:1}),a(c,{cols:"12",md:"3"},{default:t(()=>[a(x,{modelValue:h.value,"onUpdate:modelValue":r[2]||(r[2]=e=>h.value=e),label:"End Date",type:"date",class:"mx-3",solo:""},null,8,["modelValue"])]),_:1}),a(c,{cols:"12",md:"2"},{default:t(()=>[a(J,{items:z,modelValue:V.value,"onUpdate:modelValue":r[3]||(r[3]=e=>V.value=e),"item-text":"title","item-value":"value",label:"Sort By"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),a(R,null,{default:t(()=>[_.value?(b(),y(U,{key:0,type:"error",dismissible:"",onClick:r[4]||(r[4]=I(e=>_.value="",["stop"]))},{default:t(()=>[o(n(_.value),1)]),_:1})):N("",!0),v.value?(b(),y(U,{key:1,type:"success",dismissible:"",onClick:r[5]||(r[5]=I(e=>v.value="",["stop"]))},{default:t(()=>[o(n(v.value),1)]),_:1})):N("",!0),a(W,{headers:A,items:i.value,"item-value":"id",class:"elevation-1","show-expand":"",expanded:F.value,"single-expand":u.singleExpand},{"item.amount":t(({item:e})=>[o(n(E(e.amount)),1)]),"item.created_at":t(({item:e})=>[o(n(k(e.created_at)),1)]),"item.status":t(({item:e})=>[a(K,{color:Q(e.status),dark:""},{default:t(()=>[o(n(e.status),1)]),_:2},1032,["color"])]),"expanded-row":t(({item:e})=>[l("td",{colspan:A.length,class:"expanded-row"},[a(T,{flat:"",class:"pa-3"},{default:t(()=>[a(L,null,{default:t(()=>[o("Additional Details for Bill ID: "+n(e.id),1)]),_:2},1024),a(w,null,{default:t(()=>[a(c,{cols:"12",sm:"6"},{default:t(()=>[Z,o(" "+n(e.sender_bank_type),1),ee,te,o(),l("a",{href:e.payment_url,target:"_blank"},n(e.payment_url),9,ae),le,se,o(" "+n(e.virtual_account_number),1),oe,ne,o(" "+n(e.transaction_reference_number||"N/A"),1),re]),_:2},1024),a(c,{cols:"12",sm:"6"},{default:t(()=>[ue,o(" "+n(e.settlement_status),1),de,ie,o(" "+n(e.bill_link),1),ce,me,o(" "+n(k(e.completed_at)),1),_e,pe,o(" "+n(e.reference_id||"N/A"),1),fe,ve,o(" "+n(k(e.settlement_date)||"N/A"),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)],8,Y)]),_:1},8,["items","expanded","single-expand"])]),_:1})]),_:1})]),_:1}))}},he=q(ge,[["__scopeId","data-v-26324b44"]]),Fe={__name:"payment-report",setup(p){const f=localStorage.getItem("token"),S=d(null),m=M();return P(async()=>{if(f)try{const i=await $.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${f}`}});S.value=i.data}catch(i){i.response&&i.response.status===401&&m.push("/login")}else m.push("/login")}),(i,_)=>(b(),y(w,{class:"match-height"},{default:t(()=>[a(c,{cols:"12",md:"12"},{default:t(()=>[a(he)]),_:1})]),_:1}))}};export{Fe as default};
