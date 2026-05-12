import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import {Navigate } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';  // material ui



const Protected = ({children}) => {


    const {loading, user} = useAuth()
        if(loading){
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
        };

        // === if user does not find navigate to login 
if (!user) {
   return <Navigate to="/login" />
}

return children
  return (
    <div>
      
    </div>
  )
}

export default Protected
