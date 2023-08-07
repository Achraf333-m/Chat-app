import "@/styles/globals.scss";
import Link from "next/link";
import avatar from "@/public/add.png"
import Image from "next/image";

function Login() {
  return (
    <section className="formContainer">
      <div className="formWrapper">
        <div className="formInfo">
          <h1 className="logo">Awesome Chat</h1>
          <span className="title">Log in</span>
        </div>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          
          <button>Sign in</button>
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
