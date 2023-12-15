import "@/styles/globals.scss";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    await signIn(email, password);
    setLoading(false)
  };

  return (
    <section className="formContainer">
      <div className="formWrapper">
        <div className="formInfo">
          <h1 className="logo">Awesome Chat</h1>
          <span className="title">Sign in</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is wrong</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="error">Password is wrong</p>}

          <button>{loading ? 'Please Wait..' : 'Sign up'}</button>
        </form>
        <div className="logInRedirect">
          <p>Don't have an acoount? </p>
          <Link className="link" href="/register">
            Sign up here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
