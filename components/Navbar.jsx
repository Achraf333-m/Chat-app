import useAuth from "@/hooks/useAuth";
import profile from "@/public/img.png";
import Image from "next/image";
import { useEffect } from "react";

function Navbar() {
  const { logOut,user } = useAuth();
  
console.log(user)
  return (
    <div className="navBar">
      <h1>Awesome Chat</h1>
      <div className="navInfo">
        <img src={user.photoURL} alt="" />
        <h3>{user.displayName}</h3>
        <button onClick={() => logOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
