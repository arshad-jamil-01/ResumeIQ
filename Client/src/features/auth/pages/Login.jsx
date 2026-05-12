import { useState } from 'react'
import "../auth.form.css"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import CircularProgress from '@mui/material/CircularProgress';  // material ui


const Login = () => {

  const {loading, handleLogin} = useAuth()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
   await handleLogin({email, password})
   navigate("/")
  }

  if(loading){
    // return (<main><h1>Loading....</h1></main>)
      
    // material ui
    return ( <main
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
      <h1>Login</h1>


      <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label htmlFor="Email">Email:</label>
        <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" id="email" placeholder='Enter email address' />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input  value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" id="password" placeholder='Enter password' />
      </div>

<button className='button primary-button'>Login</button>
      </form>

      <p>Don't have an account? <Link to={"/Register"}>Register</Link></p>

    </div>
   </main>
  )
}

export default Login
