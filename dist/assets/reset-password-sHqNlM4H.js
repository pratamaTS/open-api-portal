import{_ as k,k as x,P as g,al as T,r as _,q as M,E as C,l as P,c as p,d as a,w as s,o as c,a as m,u as S,am as E,a2 as I,b as N,t as w,M as V,S as R,T as q}from"./index-DCsPtwhx.js";import{l as B}from"./berkompeten_logo-eijgBe6e.js";import{a as U,b as A}from"./auth-v1-mask-light-Dw7KYw8D.js";import{a as L}from"./axios-B6xwUs71.js";import{V as j,c as D}from"./VCard-CQGqZZlO.js";import{V as v}from"./VGrid-CNtzL7sO.js";import{V as F}from"./VForm-Cf02CkQH.js";import{V as H,a as d}from"./VRow-BQMg7gci.js";import{V as i}from"./VTextField-9r9q975_.js";import"./VCardTitle-COZctO8-.js";import"./VImg-qC2UDgjV.js";import"./index-B2lw2hcK.js";const y=n=>(R("data-v-b214c7db"),n=n(),q(),n),z={class:"auth-wrapper d-flex align-center justify-center pa-4"},G={class:"d-flex"},J=["innerHTML"],K=y(()=>m("h5",{class:"text-h5 font-weight-semibold mb-1"},"Reset Password",-1)),O=y(()=>m("p",{class:"mb-0"},"Enter your new password",-1)),Q={key:0,class:"mt-2 text-danger",style:{color:"#ff5252"}},W={key:1,class:"mt-2 text-success"},X={__name:"reset-password",setup(n){x();const f=g(),e=T({email:"",token:"",password:"",password_confirmation:""}),r=_(null),u=_(null);M(()=>{e.email=f.query.email||"",e.token=f.query.token||""});const b=async()=>{try{if(e.password===""||e.password_confirmation===""){r.value="All fields are required";return}const l=await L.post("https://gateway.berkompeten.com/api/admin/reset-password",{email:e.email,token:e.token,password:e.password,password_confirmation:e.password_confirmation});u.value=l.data.message,r.value=null}catch(l){l.response&&l.response.data?r.value=l.response.data.message||"An error occurred":r.value="An unexpected error occurred",u.value=null}},h=C();return P(()=>h.global.name.value==="light"?U:A),(l,o)=>(c(),p("div",z,[a(j,{class:"auth-card pa-4 pt-7","max-width":"448"},{default:s(()=>[a(D,{class:"justify-center"},{prepend:s(()=>[m("div",G,[m("div",{innerHTML:S(B)},null,8,J)])]),_:1}),a(v,{class:"pt-2"},{default:s(()=>[K,O]),_:1}),a(v,null,{default:s(()=>[a(F,{onSubmit:E(b,["prevent"])},{default:s(()=>[a(H,null,{default:s(()=>[a(d,{cols:"12"},{default:s(()=>[a(i,{modelValue:e.email,"onUpdate:modelValue":o[0]||(o[0]=t=>e.email=t),label:"Email",type:"email",readonly:""},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:s(()=>[a(i,{modelValue:e.token,"onUpdate:modelValue":o[1]||(o[1]=t=>e.token=t),label:"Token",type:"text",readonly:""},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:s(()=>[a(i,{modelValue:e.password,"onUpdate:modelValue":o[2]||(o[2]=t=>e.password=t),label:"New Password",type:"password"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:s(()=>[a(i,{modelValue:e.password_confirmation,"onUpdate:modelValue":o[3]||(o[3]=t=>e.password_confirmation=t),label:"Confirm Password",type:"password"},null,8,["modelValue"])]),_:1}),a(d,{cols:"12"},{default:s(()=>[a(I,{block:"",type:"submit",color:"#0080ff"},{default:s(()=>[N("Reset Password")]),_:1}),r.value?(c(),p("div",Q,w(r.value),1)):V("",!0),u.value?(c(),p("div",W,w(u.value),1)):V("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]))}},ue=k(X,[["__scopeId","data-v-b214c7db"]]);export{ue as default};
