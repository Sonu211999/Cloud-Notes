import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // use to redirect to home page

const Login = (props) => {
  let history = useNavigate();
  const [credentials, setcredentials] = useState({email:"", password:""})
  const handelonsubmit= async(e)=>{
    e.preventDefault();// use to prevent the default behaviour not to reload the page
    const response = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
      // to redirect to home page and save the token in local storage
      props.showAlert("Login Successfull", "success")
      localStorage.setItem("token", json.authtoken);
      history("/");// to redirect to home page
    }
    else{
      props.showAlert("Login Failed", "danger")
    }
  }
  const onChange=(e)=>{
setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  return (
    <div>
    <div className='container my-3 card p-5'>{/* card is a bootstrap class padding 5 p==padding */}
      <form onSubmit={handelonsubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" name='email' value ={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" name='password' className="form-control" value = {credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" name='login' className="btn btn-primary d-flex">Login</button>
</form>
    </div>
  )
    </div>
  )
}
export default Login
