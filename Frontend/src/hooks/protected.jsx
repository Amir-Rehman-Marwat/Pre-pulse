import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {getMe}  from "../services/auth.api"
function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const context = useContext(AuthContext)
    const {user,loading,setUser}=context

useEffect(() => {
 const getUser=getMe()
 getUser.then(res=>{
    if(res.status===200){
        setUser(res.data.user)
       
    }else{
        navigate("/login")
    }
 })
 
}, [])

return children
}

export default ProtectedRoute