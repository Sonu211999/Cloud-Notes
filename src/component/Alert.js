import React from 'react';

const Alert = (props) => {
  const capitilize=(word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
}
return (
props.alert &&/*this is because the alert is null then they can't execute or show the alert*/
<div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
<strong>{capitilize(props.alert.type)}:</strong>{props.alert.msg}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
)
}

export default Alert
