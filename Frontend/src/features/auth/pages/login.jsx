import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import AuthHook from "../hooks/auth.hooks";
import styles from "./Login.module.scss";
import { toast, Toaster } from "react-hot-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";

function Login() {
  const { loading, error, success, setError, setSuccess } = useContext(AuthContext);
  const { handleLogin } = AuthHook();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "ERROR", {
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
      toast.success(success.message || "SUCCESS", {
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
      await handleLogin(data.email, data.password);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

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

      <div className={styles.loginFormContainer}>
        <form 
          className={styles.loginForm} 
          onSubmit={handleSubmit(onSubmit, onInvalid)}
        >
          
          {loading && (
            <div className={styles.loaderArea}>
              <div className={styles.visualizer}>
                <div className={styles.orb} />
                <div className={styles.pulse} />
                <div className={styles.scanLine} />
              </div>
              <span className={styles.loadingMsg}>SYNCING_DATABASE</span>
            </div>
          )}
          
          <h3 className={styles.formTitle}>Welcome Back</h3>
          
          <input
            type="text"
            className={styles.loginEmail}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email"
              }
            })}
            placeholder="Email"
          />
          
          <input
            type="password"
            className={styles.loginPassword}
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            placeholder="Password"
          />
          
          <button disabled={loading} type="submit" className={styles.loginBtn}>
            Login
          </button>
          
          <div className={styles.footerText}>
            <span>Don't have an account?</span>{" "}
            <Link className={styles.link} to="/register">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;