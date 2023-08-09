import useAuth from "@/hooks/useAuth";
import profile from "@/public/img.png";
import Image from "next/image";

function Navbar() {
  const { logOut } = useAuth();
  
  return (
    <div className="navBar">
      <h1>Awesome Chat</h1>
      <div className="navInfo">
        <Image src={profile} alt="" />
        <h3>User Name</h3>
        <button onClick={() => logOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
