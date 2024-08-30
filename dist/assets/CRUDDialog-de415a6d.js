import{r as x,j as i,S as j,Q as F,a6 as g,a7 as v,a8 as S,a9 as w,y as d,aa as s,F as y,z as R,G as c}from"./index-c7565a54.js";const W=x.forwardRef(function(a,l){return i.jsx(j,{direction:"down",ref:l,...a})}),q=f=>{const{open:a,onClose:l,action:r,selectedData:e,refresh:p}=f,{callApi:b}=F({method:r==="Add"?"post":"put",url:"customers",immediate:!1,onSuccess(){c.fire({icon:"success",title:"Success",text:"Saved",showConfirmButton:!1,timer:3e3}).then(()=>{m()})}}),[t,C]=x.useState(!1),m=()=>{p(),l()},h=n=>{let o={...n};r==="Edit"&&(o.id=e==null?void 0:e.id),c.fire({icon:"question",title:"Confirm",text:"Proceed with save?",showConfirmButton:!0}).then(u=>{u.isConfirmed&&b(o)})};return x.useEffect(()=>{r==="View"&&C(!0)},[]),i.jsx(g,{open:a,onClose:m,TransitionComponent:W,fullWidth:!0,maxWidth:"sm",children:i.jsxs(v,{sx:{display:"flex",flexDirection:"column",gap:1},children:[i.jsx(S,{handleClose:m,action:r,module:"Customer"}),i.jsx(w,{initialValues:{fname:e!=null&&e.fname?e.fname:"",mname:e!=null&&e.mname?e.mname:"",lname:e!=null&&e.lname?e.lname:"",email:e!=null&&e.email?e.email:"",contact_number:e!=null&&e.contact_number?e==null?void 0:e.contact_number:""},onSubmit:n=>{h(n)},children:({values:n,handleChange:o,handleSubmit:u})=>i.jsx(i.Fragment,{children:i.jsxs(d,{component:"form",onSubmit:u,sx:{display:"flex",flexDirection:"column",gap:3,padding:2},children:[i.jsx(s,{required:!0,name:"fname",label:"First Name",variant:"outlined",size:"small",fullWidth:!0,value:n.fname,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:t}),i.jsx(s,{required:!0,name:"mname",label:"Middle Name",variant:"outlined",size:"small",fullWidth:!0,value:n.mname,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:t}),i.jsx(s,{required:!0,name:"lname",label:"Last Name",variant:"outlined",size:"small",fullWidth:!0,value:n.lname,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:t}),i.jsx(s,{required:!0,name:"email",label:"Email",variant:"outlined",size:"small",fullWidth:!0,value:n.email,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:t}),i.jsxs(d,{sx:{display:"flex",justifyContent:"space-between"},children:[i.jsx(s,{required:!0,name:"contact_number",label:"Contact Number",variant:"outlined",size:"small",fullWidth:!0,value:n.contact_number,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:t}),i.jsx(d,{sx:{display:"flex",justifyContent:"space-between"}})]}),i.jsx(y,{variant:"contained",type:"submit",sx:{borderRadius:"10px",width:"120px",height:"40px",mr:"10px",alignSelf:"end",backgroundColor:"#8C57FF"},children:i.jsx(R,{fontSize:"12px",fontWeight:"bold",children:r})})]})})})]})})};export{q as default};