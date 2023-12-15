import "@/styles/globals.scss";
import Link from "next/link";
import avatar from "@/public/add.png";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
  const { signUp, addImageAndName } = useAuth();
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ image, displayName, email, password }) => {
    await signUp(email, password);
    await addImageAndName(email, image, displayName);
    setLoading(true)
  };
  
  return (
    <section className="formContainer">
      <div className="formWrapper">
        <div className="formInfo">
          <h1 className="logo">Awesome Chat</h1>
          <span className="title">Sign up</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("displayName", { required: true })}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is incorrect or taken</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            min={6}
          />
          {errors.email && (
            <p className="error">Password is not secure or incorrect</p>
          )}
          <input
            type="file"
            {...register("image", { required: true })}
            id="file"
            style={{ display: "none" }}
          />
          <label htmlFor="file">
            <Image src={avatar} alt="file" />
            <p>Choose an avatar</p>
          </label>
          <button type="submit">{loading ? 'Please Wait..' : 'Sign up'}</button>
        </form>
        <div className="logInRedirect">
          <p>Already have an acoount? </p>
          <Link className="link" href="/login">
            Sign in here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
