import{r as n,N as m,C as j,H as y,G as b,j as e,K as C,y as t,P as w,a9 as F,E as v,z as x,aa as p,F as S,ak as D}from"./index-c7565a54.js";import{u as E}from"./hooks-51dc8d91.js";import"./useDispatch-d33b0fcf.js";const I="/assets/logo_black-52a2d66f.png",P=n.lazy(()=>m(()=>import("./BranchSelection-62cd4eee.js"),["assets/BranchSelection-62cd4eee.js","assets/index-c7565a54.js","assets/index-fc468ed0.css","assets/SelectFilter-ed0f01bd.js","assets/hooks-51dc8d91.js","assets/useDispatch-d33b0fcf.js","assets/MenuItem-ef9aa227.js","assets/listItemIconClasses-c6ce6db0.js"])),R=()=>{const o=E(),r=j(s=>{var i,a;return(a=(i=s.root)==null?void 0:i.auth)==null?void 0:a.isLoggedIn}),g=550,u=400,[h,d]=n.useState(!1),[l,c]=n.useState(""),f=s=>{o(D(s)).catch(()=>{c("Login Failed")})};return n.useEffect(()=>{o({type:"branch/branchClear"}),o(y())},[]),n.useEffect(()=>{r==!0&&d(!0)},[r]),n.useEffect(()=>{l.length>0&&(b.fire({icon:"warning",title:"Warning",text:l,showConfirmButton:!1,timer:3e3}),c(""))},[l]),e.jsxs(e.Fragment,{children:[r?e.jsx(n.Suspense,{fallback:e.jsx(C,{}),children:e.jsx(P,{open:h,onClose:()=>d(!1)})}):null,e.jsxs(t,{sx:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx(t,{sx:{height:"50vh",backgroundColor:"#28243D"}}),e.jsx(w,{elevation:24,sx:{display:"flex",padding:"20px",width:g,height:u,position:"absolute",alignSelf:"center",borderRadius:"10px",border:0,borderColor:"white"},children:e.jsx(F,{initialValues:{email:"",password:""},onSubmit:s=>{f(s)},children:({values:s,handleChange:i,handleSubmit:a})=>e.jsxs(t,{component:"form",onSubmit:a,sx:{display:"flex",flexDirection:"column",width:"100%"},children:[e.jsx(t,{sx:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"50%",padding:"10px"},children:e.jsx("img",{src:I})}),e.jsx(v,{}),e.jsxs(t,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"50%",padding:"10px",gap:1},children:[e.jsxs(t,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:1},children:[e.jsxs(x,{fontWeight:"bold",variant:"subtitle2",justifyContent:"start",children:["Username:"," "]}),e.jsx(p,{name:"email",size:"small",value:s.email,onChange:i,InputProps:{style:{borderRadius:"10px",alignSelf:"end"}}})]}),e.jsxs(t,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:1},children:[e.jsxs(x,{fontWeight:"bold",variant:"subtitle2",children:["Password:"," "]}),e.jsx(p,{name:"password",size:"small",value:s.password,onChange:i,type:"password",InputProps:{style:{borderRadius:"10px"}}})]}),e.jsx(S,{type:"submit",variant:"contained",sx:{backgroundColor:"#8C57FF",width:"310px",borderRadius:"10px"},children:"Login"})]})]})})}),e.jsx(t,{sx:{height:"50vh",backgroundColor:"#FFFFF"}})]})]})};export{R as default};
