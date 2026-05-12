import React from 'react'
import { useState } from 'react'
import {useNavigate, Link} from "react-router"
import { useAuth } from '../hooks/useAuth'
import CircularProgress from '@mui/material/CircularProgress';  // material ui

const Register = () => {

  const navigate = useNavigate()

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [passsword, setpasssword] = useState("")

  const {loading, handleRegister} = useAuth;



  const handleSubmit =  async(e)=>{
    e.preventDefault()
    await handleRegister(username, email, passsword)
    navigate("/")
  }

  if(loading){
    return(
      <main
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress />  
          </main>
    )
  }

  return (
   <main>
    <div className="form-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input value={username} onChange={(e)=>{setusername(e.target.value)}} 
        type="username" id="username" placeholder='Enter username' />
      </div>

      <div className="input-group">
        <label htmlFor="Email">Email:</label>
        <input value={email} onChange={(e)=>{setemail(e.target.value)}}
         type="email" id="email" placeholder='Enter email address' />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input value={passsword} onChange={(e)=>{setpasssword(e.target.value)}}
         type="password" id="password" placeholder='Enter password' />
      </div>

<button className='button primary-button'>Register</button>
      </form>

<p>Already have an account? <Link to={"/login"}>Login</Link></p>

    </div>
   </main>
  )
}

export default Register
