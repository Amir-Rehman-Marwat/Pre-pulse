import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useContext ,useEffect} from "react";
import { AuthContext } from "../../../contexts/auth.context";
import AuthHook from "../../../hooks/auth.hooks";
import styles from "./Login.module.scss"; // Import the SCSS module

function Login() {
  const context = useContext(AuthContext);
const { loading, error, success, setError, setSuccess } = context
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, setError, setSuccess]);

  const { handleLogin } = AuthHook({route:"/"});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await handleLogin(data.email, data.password);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (

    <main className={styles.mainWrapper}>
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
          {loading && <div className={styles.loadingPulse}>LOADING....</div>}
          
          <h3 className={styles.formTitle}>Welcome Back</h3>
          
          <input
            type="text"
            className={styles.loginEmail}
            defaultValue=""
            {...register("email")}
            placeholder="Email"
          />
          
          <input
            type="password"
            className={styles.loginPassword}
            defaultValue=""
            {...register("password")}
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
