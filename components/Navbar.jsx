
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { logOut, updatedUser, user } = useAuth();

  console.log(user, updatedUser)
  return (
    <div className="navBar">
      <h1>Awesome Chat</h1>
      <div className="navInfo">
        {updatedUser || user.displayName ? (<>
          <img src={user?.photoURL || updatedUser?.photoURL} alt="" />
          <h3>{user?.displayName || updatedUser?.displayName}</h3>
        
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
