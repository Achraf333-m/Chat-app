import "@/styles/globals.scss";
import Link from "next/link";
import avatar from "@/public/add.png"
import Image from "next/image";

function Register() {
  return (
    <section className="formContainer">
      <div className="formWrapper">
        <div className="formInfo">
          <h1 className="logo">Awesome Chat</h1>
          <span className="title">Sign up</span>
        </div>
        <form>
          <input required type="text" placeholder="Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input type="file" id="file" style={{display:"none"}} />
          <label htmlFor="file">
            <Image src={avatar} alt="file" />
            <p>Choose an avatar</p>
          </label>
          <button>Sign up</button>
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
