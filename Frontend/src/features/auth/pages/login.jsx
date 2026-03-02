
import { Link } from 'react-router'
import { useForm } from "react-hook-form"
import { useContext } from 'react' 
import { AuthContext } from '../../../contexts/auth.context'

import axios from 'axios'
import AuthHook from '../../../hooks/auth.hooks'
function Login() {
  const {handleLogin}=AuthHook()
  const context = useContext(AuthContext)
  const {loading,user}=context
  console.log(loading,user)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // submit function :
    const onSubmit = async (data) => {
     
try {
  const response= await handleLogin(data.email,data.password)
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
}
                 }
  return (
    <main>
      <div className="login-form-container">
        
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          {loading && <div>LOADING....</div> }
          <h3>Welcome Back</h3>
          <input type="text"
           className="login-email" 
           defaultValue="" {...register("email")}
           placeholder='Email'/>
          <input type="password" 
          className="login-password"
           defaultValue="" {...register("password")}
           placeholder='Password' />
          <button type='submit' className="login-btn">Login</button>
          <span>Don't have an account?</span> <Link className="link" to="/register">Sign up</Link>
        </form>
      </div>
    </main>
  )
}

export default Login 