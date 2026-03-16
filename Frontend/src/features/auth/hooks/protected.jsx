import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {getMe}  from "../services/auth.api"
function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const context = useContext(AuthContext)
    const {user,loading,setUser,setLoading}=context

useEffect(() => {
 const getUser=getMe()
 getUser.then(res=>{
    try {
        if(res.status===200){
        setLoading(false)
        setUser(res.data.user)
        
       
    }else{
        setLoading(false)
        navigate("/login")
    }
    } catch (error) {
        setLoading(false)
    }finally{
          setLoading(false)
    }
 })
 
}, [])

if(loading){
    return <div>LOADING ....</div>
}else{
     return children
   
}
}

export default ProtectedRoute