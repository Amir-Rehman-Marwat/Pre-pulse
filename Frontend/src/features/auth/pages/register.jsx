import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useForm } from "react-hook-form"
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import AuthHook from '../hooks/auth.hooks'
import styles from './Register.module.scss'; 

function Register() {
  console.log("page rendere")
  const { handleRegister } = AuthHook({route:"/"})
  const context = useContext(AuthContext)
  const { loading, error, success, setError, setSuccess } = context
  
  console.log(error,success)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Logic to clear toasters after 2 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, setError, setSuccess]);

  const onSubmit = async (data) => {
    try {
      const response = await handleRegister(data.userName, data.email, data.password)
    } catch (error) {
      console.log(error)
    } finally {
      reset()
    }
  }

  return (
    <main className={styles.mainWrapper}>
      {/* ERROR TOASTER */}
      {error && (
        <div className='errorMsg'>
          <h3>{error.type}</h3>
          <span>{error.message} </span>
        </div>
      )}

      {/* SUCCESS TOASTER */}
      {success && (
        <div className='successMsg'>{success.message}</div>
      )}

      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          {loading && <div className={styles.loadingPulse}>LOADING....</div> }
          
          <h3 className={styles.formTitle}>Create Account</h3>
          
          <input
            type="text"
            className={styles.loginEmail}
            defaultValue=""
            {...register("userName")}
            placeholder='User name'
          />
          
          <input
            type="text"
            className={styles.loginEmail}
            defaultValue=""
            {...register("email")}
            placeholder='Email'
          />
          
          <input
            type="password"
            className={styles.loginPassword}
            defaultValue=""
            {...register("password")}
            placeholder='Password'
          />
          
          <button disabled={loading} type='submit' className={styles.loginBtn}>
            Sign up
          </button>
          
          <div className={styles.footerText}>
            <span>Already have an account?</span>{" "}
            <Link className={styles.link} to="/login">Login</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Register;