import{t as R,v as z,j as e,r as i,S as P,a6 as A,a7 as k,a8 as T,a9 as w,y as o,z as r,aa as x,ab as B,ac as _,F as v,P as I,R as H,U as j,ad as M,ae as q,V as E,W as U,X as V,Y as J,Z as N}from"./index-c7565a54.js";import{S as m}from"./SelectFilter-ed0f01bd.js";import{D as O}from"./DatePicker-a8dcbf82.js";import{M as f}from"./MenuItem-ef9aa227.js";import"./listItemButtonClasses-07749e4a.js";import"./listItemIconClasses-c6ce6db0.js";var g={},Y=z;Object.defineProperty(g,"__esModule",{value:!0});var b=g.default=void 0,$=Y(R()),Q=e,X=(0,$.default)((0,Q.jsx)("path",{d:"M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"}),"Print");b=g.default=X;const Z=i.forwardRef(function(n,l){return e.jsx(P,{direction:"down",ref:l,...n})}),G=d=>{const{open:n,onClose:l,action:u}=d,c=()=>{l()},h=s=>{console.log(s)};return e.jsx(e.Fragment,{children:e.jsx(A,{open:n,onClose:c,TransitionComponent:Z,fullWidth:!0,maxWidth:"sm",children:e.jsxs(k,{sx:{display:"flex",flexDirection:"column",gap:1},children:[e.jsx(T,{handleClose:c,action:u,module:"Report"}),e.jsx(w,{initialValues:{name:"",category:"",quantity:"",price:0,purchaseDate:"",description:""},onSubmit:s=>{h(s)},children:({values:s,handleChange:a,handleSubmit:p})=>e.jsxs(o,{component:"form",onSubmit:p,sx:{display:"flex",flexDirection:"column",gap:2,padding:2},children:[e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Name:"}),e.jsx(x,{variant:"outlined",size:"small",fullWidth:!0,value:s.name,onChange:a,sx:{fieldset:{borderColor:"#7DAFDB"}}})]}),e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Category:"}),e.jsx(B,{variant:"outlined",size:"small",fullWidth:!0,value:s.category,onChange:a,sx:{fieldset:{borderColor:"#7DAFDB"}}})]}),e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Quantity:"}),e.jsx(x,{variant:"outlined",size:"small",fullWidth:!0,value:s.quantity,onChange:a,sx:{fieldset:{borderColor:"#7DAFDB"}}})]}),e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Price:"}),e.jsx(x,{variant:"outlined",size:"small",fullWidth:!0,value:s.price,onChange:a,type:"number",sx:{fieldset:{borderColor:"#7DAFDB"}},InputProps:{startAdornment:e.jsx(_,{position:"start",children:"Php"})}})]}),e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Purchase Date:"}),e.jsx(O,{value:s.purchaseDate,onChange:a,sx:{width:"100%",fieldset:{borderColor:"#7DAFDB"}},slotProps:{textField:{size:"small"}}})]}),e.jsxs(o,{children:[e.jsx(r,{fontWeight:"bold",children:"Description:"}),e.jsx(x,{variant:"outlined",size:"small",fullWidth:!0,value:s.description,onChange:a,rows:3,multiline:!0,sx:{fieldset:{borderColor:"#7DAFDB"}}})]}),e.jsxs(o,{sx:{display:"flex",alignSelf:"center",gap:2,mt:"10px"},children:[e.jsx(v,{variant:"outlined",sx:{borderColor:"#104C82",backgroundcolor:"#104C82",borderRadius:"10px",width:"130px",fontWeight:"bold",height:"40px"},children:e.jsx(r,{fontSize:"12px",color:"#104C82",fontWeight:"bold",children:"Save"})}),e.jsx(v,{variant:"contained",sx:{color:"#104C82",borderRadius:"10px",width:"130px",fontWeight:"bold",height:"40px",backgroundcolor:"#FFFFFF"},children:e.jsx(r,{fontSize:"12px",color:"white",fontWeight:"bold",children:"Save & Done"})})]})]})})]})})})},re=()=>{const[d,n]=i.useState(!1),[l,u]=i.useState(""),[c,h]=i.useState("2023"),[s,a]=i.useState("January"),[p,D]=i.useState("Week 1"),C=["2023","2022","2021"],y=["January","February","March"],F=["Week 1","Week 2","Week 3"],W=["Report Number","Services Used","Employees","Price","Description"],S=t=>{n(!0),u(t)};return e.jsxs(e.Fragment,{children:[e.jsx(G,{open:d,onClose:()=>n(!1),action:l}),e.jsx(r,{variant:"h6",fontWeight:"bold",sx:{ml:"50px",mb:"20px"},children:"Reports"}),e.jsxs(I,{elevation:24,sx:{display:"flex",flexDirection:"column",height:"100%",maxHeight:"700px",borderRadius:"20px",p:"30px",gap:1},children:[e.jsxs(o,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:1},children:[e.jsx(H,{placeholder:"Search Reports...",size:"small"}),e.jsx(j,{color:"primary",icon:e.jsx(M,{}),onClick:()=>S("Add"),text:"Add"}),e.jsx(j,{color:"error",icon:e.jsx(q,{}),text:"Delete"}),e.jsx(j,{color:"warning",icon:e.jsx(b,{}),text:"Print"})]}),e.jsxs(o,{sx:{display:"flex",alignItems:"center",justifyContent:"start",gap:1},children:[e.jsx(m,{value:c,items:C.map(t=>e.jsx(f,{value:t,children:t})),onChange:t=>h(t.target.value)}),e.jsx(m,{value:s,items:y.map(t=>e.jsx(f,{value:t,children:t})),onChange:t=>a(t.target.value)}),e.jsx(m,{value:p,items:F.map(t=>e.jsx(f,{value:t,children:t})),onChange:t=>D(t.target.value)})]}),e.jsx(E,{children:e.jsx(U,{children:e.jsx(V,{sx:{backgroundColor:"#F5F5F5"},children:e.jsx(J,{children:W.map(t=>e.jsx(N,{size:"small",sx:{fontWeight:"bold"},children:t}))})})})})]})]})};export{re as default};
