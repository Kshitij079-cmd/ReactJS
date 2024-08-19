import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/smallnotes/AlertContext';

// const host = process.env.REACT_APP_APIHOST_URL
const host =  "http://localhost:5001/"

const Signup = () => {
const {showAlert} = useContext(AlertContext)
    const [credential, setCredentials] = useState({ name: "", email: "", password: "", gender: "", otp:"" }) //we should use array for defininf states
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        console.log("submit")
        e.preventDefault();//helps to not reload the page(kind off)
        const { name, email, password,  gender, otp } = credential;
        
        const rawResponse = await fetch(`${host}authentication-with-otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                gender,
                otp,

            })
        });
        const content = await rawResponse.json();
        console.log(content)
        console.log(content.authtoken)
        if(content.authtoken){
            //redirect user
        //    let sessionToken = localStorage.setItem('token', content.authtoken);// saving the token to webbrowser
            console.log("getting token for signup",content.authtoken)
            alert("redirecting to login page...")
            showAlert("Accout Created Successfully", "success")
            navigate("/login")
          }
          else{
            showAlert("Invalid Credentials", "warning");
          }

    }
    const bringOTP = async()=>{
        const { email} = credential;
        const rawResponse = await fetch(`${host}sendotp-to-user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                email,
                })
            
        })
        const content = await rawResponse.json();
        console.log(content)
        if(content){
            console.log("OTP sent successfully")
            alert("OTP sent successfully")
            showAlert("OTP sent successfully", "success")
            }
            else{
                console.log("OTP not sent")
                alert("OTP not sent")
                showAlert("OTP not sent", "warning")
                }
    }


    const onChange = (e) => {
        console.log("changing inputs")
        setCredentials({ ...credential, [e.target.name]: e.target.value })

    }

    return (
        <div className="sign-up-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChange} name='name' id='name' placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="text" className="form-control" onChange={onChange} name='gender' id='gender' placeholder="gender" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='password' id="password"   placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="otp">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='otp' id="otp"   placeholder="Enter the otp" />
                </div>
              
                <button type="submit" 
                disabled={credential.otp.length < 6}
                className="btn btn-primary m-3" >Create Account</button>
                <button type="button" 
                className="btn btn-primary m-3" onClick={bringOTP}>Send OTP</button>
            </form>
        </div>
    )
}

export default Signup
