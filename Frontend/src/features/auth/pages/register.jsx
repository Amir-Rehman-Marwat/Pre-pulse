import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router'
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/auth.context'
import AuthHook from '../hooks/auth.hooks'
import { toast, Toaster } from "react-hot-toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import styles from './Register.module.scss'

function Register() {
  const { handleRegister } = AuthHook({ route: "/" })
  const { loading, error, success, setError, setSuccess } = useContext(AuthContext)
  
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (error) {
      toast.error(error.message || "REGISTRATION_FAILED", {
        icon: <AlertCircle size={18} color="#dc143c" />,
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #dc143c',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem'
        }
      });
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
    if (success) {
      toast.success(success.message || "ACCOUNT_CREATED", {
        icon: <CheckCircle2 size={18} color="#22d3ee" />,
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #22d3ee',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem'
        }
      });
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, setError, setSuccess]);

  const onSubmit = async (data) => {
    try {
      await handleRegister(data.userName, data.email, data.password)
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  const onInvalid = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message, {
        icon: <AlertCircle size={18} color="#dc143c" />,
        style: {
          background: '#020617',
          color: '#fff',
          border: '1px solid #dc143c',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem'
        }
      });
    }
  };

  return (
    <main className={styles.mainWrapper}>
      <Toaster position="top-right" />

      <div className={styles.registerFormContainer}>
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit, onInvalid)}>
          
          {loading && (
            <div className={styles.loaderArea}>
              <div className={styles.visualizer}>
                <div className={styles.orb} />
                <div className={styles.pulse} />
                <div className={styles.scanLine} />
              </div>
              <span className={styles.loadingMsg}>INITIALIZING_ACCOUNT</span>
            </div>
          )}
          
          <h3 className={styles.formTitle}>Create Account</h3>
          
          <input
            type="text"
            className={styles.registerInput}
            {...register("userName", {
              required: "User name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
            placeholder='User name'
          />
          
          <input
            type="text"
            className={styles.registerInput}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })}
            placeholder='Email'
          />
          
          <input
            type="password"
            className={styles.registerInput}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            placeholder='Password'
          />
          
          <button disabled={loading} type='submit' className={styles.registerBtn}>
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

export default Register