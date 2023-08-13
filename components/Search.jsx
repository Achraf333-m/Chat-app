import Image from "next/image";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";

function Search() {
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [error, setError] = useState(false);
  const { user, updatedUser } = useAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
      });
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };

  const handleKey = (e) => {
    if (username.length === 0) {
      setSearchedUser(null);
    }
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      user.uid > searchedUser.uid
        ? user.uid + searchedUser.uid
        : searchedUser.uid + user.uid;
        console.log(user.uid, searchedUser.uid, combinedId)
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", searchedUser.uid), {
          [combinedId+".userInfo"]: {
            uid: updatedUser?.uid || user.uid,
            displayName: updatedUser?.displayName || user.displayName,
            photoURL: updatedUser?.photoURL || user.photoURL,
          },
          [combinedId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", updatedUser?.uid || user.uid), {
          [combinedId+".userInfo"]: {
            uid: searchedUser.uid,
            displayName: searchedUser.displayName,
            photoURL: searchedUser.photoURL,
          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    } catch (error) {
      console.log(error.message)
    }
    setUsername("")
    setSearchedUser(null)
  };


  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user.."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>No users were found matching that name</span>}
      {searchedUser && (
        <div className="user" onClick={handleSelect}>
          <img src={searchedUser.photoURL} alt="" />
          <div className="userInfo">
            <span>{searchedUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
