import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/smallnotes/AlertContext';
const host = "http://localhost:5001/"
const Login = () => {
  const [credential, setCredentials] = useState({ email: "", password: "", otp:"" }) //we should use array for defininf states
  const navigate = useNavigate();
  const alertMsg = useContext(AlertContext)
  const { showAlert } = alertMsg
  const handleOTP = async (e)=>{
    e.preventDefault();
    const rawResponse = await fetch(`${host}verify-registered-user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credential.email,
        })
  })
  const content = await rawResponse.json();
  console.log(content)
  if(content){
      console.log("OTP sent successfully")
      showAlert("OTP sent successfully", "success")
      }
  else{
      console.log("OTP not sent")
      alert("OTP not sent")
      showAlert("OTP not sent", "warning")
      }

}
  const handleSubmit = async (e) => {
    e.preventDefault();//helps to not reload the page(kind off)
    const rawResponse = await fetch(`${host}login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
        otp:credential.otp
      })
    });
    
    const content = await rawResponse.json();
    console.log("login content", content)
    if (content&&content.success) {
      //redirect user
      let sessionToken = localStorage.setItem('token', content.authtoken);// saving the token to webbrowser
      console.log({"logged in with session token":  content.authtoken})
      navigate("/")
    }
    else {
      showAlert("invalid", "danger");
    }
  }
  
  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className="login-form ">
      <h1>Login</h1>
      <h2>Enter registered id and password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} value={credential.email} placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="enter otp">Enter your otp</label>
          <input type="password" className="form-control" id="otp" name='otp' onChange={onChange} value={credential.otp} placeholder="OTP" />
        </div>
        <button type="submit" className="btn btn-primary my-3"disabled={credential.otp.length < 6} >Login</button>
        <button type="button" className="btn btn-primary m-3"onClick={handleOTP} >Send OTP</button>
      </form>

    </div>

  )
}

export default Login
