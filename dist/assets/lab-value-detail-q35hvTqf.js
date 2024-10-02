import{k as $,P as I,al as w,r as g,q as B,o as _,f as b,w as t,d as a,am as M,u,a2 as C,b as f,t as x,M as S}from"./index-DCsPtwhx.js";import{a as y}from"./axios-B6xwUs71.js";import{a as n,V as v}from"./VRow-BQMg7gci.js";import{V as O}from"./VCard-CQGqZZlO.js";import{V as A}from"./VGrid-CNtzL7sO.js";import{V as P}from"./VForm-Cf02CkQH.js";import{V as z}from"./VSelect-n9UX3lEH.js";import{V}from"./VTextField-9r9q975_.js";import{V as R}from"./VAlert-Cp1LBsWb.js";import"./VCardTitle-COZctO8-.js";import"./VImg-qC2UDgjV.js";import"./index-B2lw2hcK.js";import"./VOverlay-CSuY4GSz.js";import"./lazy-atWRYZQq.js";import"./VMenu-AzC6IdKP.js";import"./VDivider-BGWne-YY.js";import"./VCheckboxBtn-jBRBxYNL.js";import"./VSelectionControl-hvyZhp-8.js";import"./VChip-60TtaX10.js";const T={__name:"LabValueDetailUpsert",setup(L){const m=$();I();const c=localStorage.getItem("id"),o=w({category_lab_id:0,indicator:"",unit:"",reference_value:""}),s=w({}),d=localStorage.getItem("token"),p=g(""),i=g(""),h=g([]),U=async r=>{try{const e=await y.get(`https://gateway.berkompeten.com/api/admin/master/lab-value/detail?id=${r}`,{headers:{Authorization:`Bearer ${d}`}});Object.assign(o,e.data.data)}catch(e){console.error("Error fetching lab value data:",e)}},D=async()=>{try{const r=await y.get("https://gateway.berkompeten.com/api/admin/master/category-lab/fetch",{headers:{Authorization:`Bearer ${d}`}});h.value=r.data.data.map(e=>({id:e.id,name:e.name}))}catch(r){console.error("Error fetching category options:",r)}},E=async()=>{try{await y({method:"post",url:"https://gateway.berkompeten.com/api/admin/master/lab-value/upsert",data:o,headers:{Authorization:`Bearer ${d}`}}),p.value="Lab value saved successfully!",setTimeout(()=>{k(),m.push("/lab-value-management")},2e3)}catch(r){console.error("Error submitting form:",r),r.response&&r.response.data?r.response.status===500?i.value=r.response.data.message||"An error occurred while saving. Please try again.":r.response.data.error?(Object.assign(s,r.response.data.message),console.log("ERROR: ",s)):i.value="An error occurred while saving. Please try again.":i.value="An error occurred while saving. Please try again."}},k=()=>{Object.assign(o,{category_lab_id:0,indicator:"",unit:"",reference_value:""})};return B(()=>{D(),c?U(c):localStorage.removeItem("id")}),(r,e)=>(_(),b(v,null,{default:t(()=>[a(n,{cols:"12"},{default:t(()=>[a(O,{title:"Lab Value Details"},{default:t(()=>[a(A,null,{default:t(()=>[a(P,{onSubmit:M(E,["prevent"])},{default:t(()=>[a(v,null,{default:t(()=>[a(n,{cols:"12"},{default:t(()=>[a(z,{modelValue:o.category_lab_id,"onUpdate:modelValue":e[0]||(e[0]=l=>o.category_lab_id=l),"error-messages":s.category_lab_id,label:"Category Lab",items:u(h),placeholder:"Select Category Lab","item-value":"id","item-title":"name"},null,8,["modelValue","error-messages","items"])]),_:1}),a(n,{cols:"12"},{default:t(()=>[a(V,{modelValue:o.indicator,"onUpdate:modelValue":e[1]||(e[1]=l=>o.indicator=l),"error-messages":s.indicator,label:"Indicator"},null,8,["modelValue","error-messages"])]),_:1}),a(n,{cols:"12"},{default:t(()=>[a(V,{modelValue:o.unit,"onUpdate:modelValue":e[2]||(e[2]=l=>o.unit=l),"error-messages":s.unit,label:"Unit"},null,8,["modelValue","error-messages"])]),_:1}),a(n,{cols:"12"},{default:t(()=>[a(V,{modelValue:o.reference_value,"onUpdate:modelValue":e[3]||(e[3]=l=>o.reference_value=l),"error-messages":s.reference_value,label:"Reference Value"},null,8,["modelValue","error-messages"])]),_:1}),a(n,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[a(C,{type:"submit",color:"#0080ff"},{default:t(()=>[f("Save")]),_:1}),a(C,{onClick:k,color:"secondary",variant:"outlined"},{default:t(()=>[f("Reset")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(A,null,{default:t(()=>[u(p)?(_(),b(R,{key:0,type:"success",dismissible:"","onClick:close":e[4]||(e[4]=l=>p.value="")},{default:t(()=>[f(x(u(p)),1)]),_:1})):S("",!0),u(i)?(_(),b(R,{key:1,type:"error",dismissible:"","onClick:close":e[5]||(e[5]=l=>i.value="")},{default:t(()=>[f(x(u(i)),1)]),_:1})):S("",!0)]),_:1})]),_:1})]),_:1})]),_:1}))}},le={__name:"lab-value-detail",setup(L){const m=localStorage.getItem("token"),c=g(null),o=$();return B(async()=>{if(m)try{const s=await y.get("https://gateway.berkompeten.com/api/admin/profile",{headers:{Authorization:`Bearer ${m}`}});c.value=s.data}catch(s){s.response&&s.response.status===401&&o.push("/login")}else o.push("/login")}),(s,d)=>(_(),b(v,{class:"match-height"},{default:t(()=>[a(n,{cols:"12",md:"12"},{default:t(()=>[a(T)]),_:1})]),_:1}))}};export{le as default};
