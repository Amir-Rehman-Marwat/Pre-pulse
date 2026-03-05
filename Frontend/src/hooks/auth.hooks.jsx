import { useContext, useEffect } from "react";
import { loginUser,registerUser } from "../services/auth.api";
import { AuthContext } from "../contexts/auth.context";
import React from "react";
import { useNavigate } from "react-router";

const AuthHook = () => {
const context=useContext(AuthContext);
const {setUser,setLoading,user,setError,setSuccess}=context;
const navigate=useNavigate()
useEffect(() => {
  if(user){
    setTimeout(() => {
      navigate("/")
    }, 3500);
    
  }
}, [user])

  const handleLogin = async (email, password) => {
    try {
       setLoading(true)
      const response = await loginUser(email, password);

      if (response.status === 201) {
        setUser(response.data.user)
        setLoading(false)
        
      } else if (response.status === 400) {
        setLoading(false)
        return response.response.data;
      } else {
        setLoading(false)
        return "Server errror...";
      }
    } catch (error) {
      return error;
    }
  };
  const handleRegister=async(userName,email,password)=>{
    try {
        setLoading(true)
        const response=await registerUser(userName,email,password)
        if(response.status===201){
          setSuccess({message:"Registeration successfull ,Welcome to the APP"})
           setLoading(false)
          setUser(response.data.user)

        }else if(response.status!==201){
           console.log(response)
            setError({type:"Bad request",message:response.response.data.message})
             setLoading(false)
        }else{
            
            setError({type:"Server error!",message:"There is an error in the server ,please try again later "})
            setLoading(false)
        }
    } catch (error) {
        return error
    }

  }
  return({handleLogin,handleRegister})
};

export default AuthHook;
