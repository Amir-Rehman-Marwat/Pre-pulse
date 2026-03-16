import React from 'react'
import { createContext } from 'react'
export const AuthContext=createContext("hhh")
import Login from '../pages/login'
import { useState } from 'react'
function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [success, setSuccess] = useState(null)
  return (

       <AuthContext.Provider value={{user,setUser,loading,setLoading,error,success,setError,setSuccess}}>
      { children }
       </AuthContext.Provider> 
  )
}

export default AuthProvider