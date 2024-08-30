import{Q as B,I as w,C as E,r as a,G as h,j as t,a6 as I,a7 as k,y as x,z as D,E as W,K as R,F as p,H as A,bd as F}from"./index-c7565a54.js";import{S as G}from"./SelectFilter-ed0f01bd.js";import{u as L}from"./hooks-51dc8d91.js";import{M}from"./MenuItem-ef9aa227.js";import"./useDispatch-d33b0fcf.js";import"./listItemIconClasses-c6ce6db0.js";const T=f=>{const{open:g,onClose:m}=f,{error:r,loading:C}=B({method:"get",url:"branches/all",onSuccess(e){if(e!=null){y(e.data);let s=e.data[0];l(s)}}}),i=L(),j=w(),b=E(e=>{var s,n;return(n=(s=e.root)==null?void 0:s.auth)==null?void 0:n.isLoggedIn}),[o,l]=a.useState(),[c,y]=a.useState([]);a.useEffect(()=>{r.length>0&&h.fire({icon:"error",title:"Error",text:r,showConfirmButton:!1,timer:3e3})},[r]);const d=()=>{i(A()),m()},S=e=>{let s={id:"",name:"",address:"",employees:[]};s=c.reduce((n,u)=>(u.id===e&&(n=u),n),{id:"",name:"",address:"",employees:[]}),l(s)},v=()=>{b==!0&&o!=null?(i(F({type:"branch/branchSet",payload:o})),j("/")):h.fire({icon:"warning",title:"Warning",text:"Select branch before proceeding",showConfirmButton:!1,timer:3e3})};return t.jsx(I,{open:g,onClose:d,maxWidth:"xs",fullWidth:!0,children:t.jsx(k,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsxs(x,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2,flexGrow:1},children:[t.jsx(D,{variant:"h6",fontWeight:"bold",children:"Branch Selection"}),t.jsx(W,{sx:{width:"100%"}}),C?t.jsx(R,{}):t.jsx(G,{value:(o==null?void 0:o.id)??"",items:c.map(e=>t.jsx(M,{value:e.id,sx:{width:"400px"},children:e.name},e.id)),onChange:e=>S(e.target.value),fullWidth:!0}),t.jsxs(x,{sx:{display:"flex",gap:2},children:[t.jsx(p,{variant:"contained",sx:{borderRadius:"10px",width:"100px"},onClick:()=>v(),children:"Proceed"}),t.jsx(p,{variant:"contained",sx:{borderRadius:"10px",width:"100px",backgroundColor:"#EB1C24","&: hover":{backgroundColor:"#EB1C24"},"&: focus":{backgroundColor:"#EB1C24"}},onClick:d,children:"Cancel"})]})]})})})};export{T as default};