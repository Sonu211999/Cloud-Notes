import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let history = useNavigate();
  const [credentials, setcredentials] = useState({email: "", password:"",cpassword:"",name:""})
  const handelonsubmit= async(e)=>{
    e.preventDefault();// use to prevent the default behaviour not to reload the page
    const {name,email,password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser",
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,email,password})// using destructuring 
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success){
      props.showAlert("Signup Successfull", "success")
      // to redirect to home page and save the token in local storage
      localStorage.setItem("token", json.authtoken);
      history("/");
    }
    else{
      props.showAlert("Signup Failed", "danger")
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
    <label htmlFor="NameInpute" className="form-label" >Name</label>
    <input type="text" name='name' value ={credentials.name} onChange={onChange} className="form-control" id="NameInpute" aria-describedby="emailHelp"/>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" name='email' value ={credentials.email} onChange={onChange} className="form-control" id="NameInput" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" name='password' className="form-control" value = {credentials.password} onChange={onChange} minLength={5} required id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label" >Confirm Password</label>
    <input type="password" name='cpassword' className="form-control" value = {credentials.cpassword} onChange={onChange} minLength={5} required id="confirmPassword"/>
  </div>
  <button type="submit" name='login' className="btn btn-primary d-flex">SignUp</button>
</form>
    </div>
  )
    </div>
  )
}

export default Signup
