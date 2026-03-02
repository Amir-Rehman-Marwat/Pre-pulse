import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthHook from "../../../hooks/auth.hooks";
function Login() {
  const context = useContext(AuthContext);
  const { loading, user } = context;
  const { handleLogin } = AuthHook();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // submit function :
  const onSubmit = async (data) => {
    try {
      const response = await handleLogin(data.email, data.password);
      if (response.message) {
         alert(response.message)
      } else {
        alert(response)
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };
  return (
    <main>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          {loading && <div>LOADING....</div>}
          <h3>Welcome Back</h3>
          <input
            type="text"
            className="login-email"
            defaultValue=""
            {...register("email")}
            placeholder="Email"
          />
          <input
            type="password"
            className="login-password"
            defaultValue=""
            {...register("password")}
            placeholder="Password"
          />
          <button disabled={loading} type="submit" className="login-btn">
            Login
          </button>
          <span>Don't have an account?</span>{" "}
          <Link className="link" to="/register">
            Sign up
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;
