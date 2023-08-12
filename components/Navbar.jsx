
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { logOut, updatedUser, user } = useAuth();


  return (
    <div className="navBar">
      <h1>Awesome Chat</h1>
      <div className="navInfo">
        {updatedUser || user.displayName ? (<>
          <img src={updatedUser?.photoURL || user?.photoURL} alt="" />
          <h3>{updatedUser?.displayName || user?.displayName}</h3>
        
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
