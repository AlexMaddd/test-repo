import{r as l,j as e,S as b,Q as g,a6 as j,a7 as S,a8 as F,a9 as v,y as w,aa as m,F as R,z as y,G as c}from"./index-c7565a54.js";const B=l.forwardRef(function(a,t){return e.jsx(b,{direction:"down",ref:t,...a})}),T=u=>{const{open:a,onClose:t,action:n,selectedData:s,refresh:f}=u,{callApi:h}=g({method:n==="Add"?"post":"put",url:"branches",immediate:!1,onSuccess(){c.fire({icon:"success",title:"Success",text:"Saved",showConfirmButton:!1,timer:3e3}).then(()=>{r()})}}),[x,p]=l.useState(!1),r=()=>{f(),t()},C=i=>{let o={...i};n==="Edit"&&(o.id=s==null?void 0:s.id),c.fire({icon:"question",title:"Confirm",text:"Proceed with save?",showConfirmButton:!0}).then(d=>{d.isConfirmed&&h(o)})};return l.useEffect(()=>{n==="View"&&p(!0)},[]),e.jsx(j,{open:a,onClose:r,TransitionComponent:B,fullWidth:!0,maxWidth:"sm",children:e.jsxs(S,{sx:{display:"flex",flexDirection:"column",gap:1},children:[e.jsx(F,{handleClose:r,action:n,module:"Branch"}),e.jsx(v,{initialValues:{name:s!=null&&s.name?s.name:"",address:s!=null&&s.address?s.address:""},onSubmit:i=>{C(i)},children:({values:i,handleChange:o,handleSubmit:d})=>e.jsx(e.Fragment,{children:e.jsxs(w,{component:"form",onSubmit:d,sx:{display:"flex",flexDirection:"column",gap:3,padding:2},children:[e.jsx(m,{required:!0,name:"name",label:"Name",variant:"outlined",size:"small",fullWidth:!0,value:i.name,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:x}),e.jsx(m,{required:!0,name:"address",label:"Address",variant:"outlined",size:"small",fullWidth:!0,value:i.address,onChange:o,sx:{fieldset:{borderColor:"#8C57FF",borderRadius:"10px"}},disabled:x}),e.jsx(R,{variant:"contained",type:"submit",sx:{borderRadius:"10px",width:"120px",height:"40px",mr:"10px",alignSelf:"end",backgroundColor:"#8C57FF"},children:e.jsx(y,{fontSize:"12px",fontWeight:"bold",children:n})})]})})})]})})};export{T as default};
