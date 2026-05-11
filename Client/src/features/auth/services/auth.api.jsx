import axios from "axios"

//===== Register =======
export async function register({username, email, password}){
  try{
     const response = await axios.post("http://localhost:3000/api/auth/register",{
        username, email, password
    },{
        withCredentials:true
    })
    return response.data
  }catch(err){
console.log(err)
  }
}

//======= Login ======
export async function login({email, password}){
  try{
     const response = await axios.post("http://localhost:3000/api/auth/login",{
        email, password
    },{
        withCredentials:true
    })
    return response.data
  }catch(err){
console.log(err)
  }
}


//====== logout ======
export async function logout(){
  try{
     const response = await axios.post("http://localhost:3000/api/auth/logout",{
        withCredentials:true
    })
    return response.data
  }catch(err){
console.log(err)
  }
}


//==== get-me =====

export async function getMe(){
  try{
const response = await axios.get("http://localhost:3000/api/auth/get-me",{
  withCredentials:true
})

return response.data

  }catch(err){
    console.log(err)
  }
}