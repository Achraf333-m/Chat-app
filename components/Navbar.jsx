
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { logOut, user } = useAuth();

  console.log(user)

  return (
    <div className="navBar">
      <h1>Awesome Chat</h1>
      <div className="navInfo">
        {user.displayName ? (<>
          <img src={user?.photoURL} alt="" />
          <h3>{user?.displayName}</h3>
        
        </>) : (<>
        <div className="loadingImg"></div>
        <div className="loadingTitle"></div>
        </>)}

        <button onClick={() => logOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
