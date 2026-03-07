import { useContext, useEffect } from "react";
import { loginUser,logOutUser,registerUser } from "../services/auth.api";
import { AuthContext } from "../contexts/auth.context";
import React from "react";
import { useNavigate } from "react-router";

const AuthHook = (props) => {
  console.log(props)
const context=useContext(AuthContext);
const {setUser,setLoading,user,setError,setSuccess}=context;
const navigate=useNavigate()
useEffect(() => {
  if(user){
    setTimeout(() => {
      navigate(`${props.route}`)
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
        setSuccess({message:"Registeration successfull ,Welcome to the APP"})
        
        
      } else if (response.status === 400) {
        setLoading(false)
setError({type:"Bad request",message:response.response.data.message})
      } else {
        setLoading(false)
         setError({type:"Server error!",message:"There is an error in the server ,please try again later "})
        
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

  const handleLogOut=async()=>{
    const response= await logOutUser()
    if(response.status===200){
      setUser(null)
      navigate("/login")
    }
  }
  return({handleLogin,handleRegister,handleLogOut})
};

export default AuthHook;
