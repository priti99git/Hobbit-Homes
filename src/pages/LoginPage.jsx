import React, { useState } from 'react';
import "../styles/login.scss";
import { useDispatch } from "react-redux";
import { setLogin } from '../redux/state';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const handleSubmit=async (e)=>  {
    e.preventDefault()
    try{
      const response=await fetch("http://localhost:3001/auth/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({email,password})
      })

      // get data sfter fetching
      const loggedIn=await response.json()

        if (loggedIn){
          dispatch(
            setLogin({
              user:loggedIn.user,
              token:loggedIn.token
            })
          )
            navigate("/")
          }
        }
    catch(err){
      console.log("Login Failed",err.message)
    }
  }

  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input
           type="email"
           placeholder='email'
           value={email} 
           onChange={(e)=> setEmail(e.target.value)} 
           required />
          
          <input
            type="password"
             placeholder='password'
             value={password} 
             onChange={(e)=> setPassword(e.target.value)} 
             required />
        <button type='submit'>LOG IN</button>
        </form>
        <a href='/register'>Don't have an Account? Sign In Here</a>
      </div>
    </div>
  )
}

export default LoginPage