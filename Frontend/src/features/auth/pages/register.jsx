import React from 'react'
import { Link } from 'react-router'
import { useForm } from "react-hook-form"
import { useContext } from 'react' 
import { AuthContext } from '../../../contexts/auth.context'
import AuthHook from '../../../hooks/auth.hooks'
function Register() {
 const {handleRegister}=AuthHook()
  const context = useContext(AuthContext)
  const {loading,user}=context
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  // submit function :
    const onSubmit = async (data) => {
     
try {
  const response= await handleRegister(data.userName,data.email,data.password)
console.dir(response)
if(response.user){
  alert(response.message)
}else if(response.message){
     alert(response.message)
}else{
  alert(response)
}
} catch (error) {
  console.log(error)
}finally{
  reset()
}
                 }
  return (
    <main>
      <div className="login-form-container">
        
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          {loading && <div>LOADING....</div> }
          <h3>Create Account</h3>
             <input type="text"
           className="login-email" 
           defaultValue="" {...register("userName")}
           placeholder='User name'/>
          <input type="text"
           className="login-email" 
           defaultValue="" {...register("email")}
           placeholder='Email'/>
          <input type="password" 
          className="login-password"
           defaultValue="" {...register("password")}
           placeholder='Password' />
          <button disabled={loading} type='submit' className="login-btn">Sign up</button>
          <span>Already have an account ?</span> <Link className="link" to="/login">Login</Link>
        </form>
      </div>
    </main>
  )
}

export default Register