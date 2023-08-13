import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import profile from "@/public/img.png";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

function Chats() {
  const [chats, setChats] = useState(null);

  const { user, updatedUser } = useAuth();

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }

    user.uid && getChats();
  }, [user.uid]);

//  something with the object,entries does not work, chats may be null

    const userChat = Object.entries(chats);
    console.log(userChat.map((elem) => elem[1].userInfo));
  
  return (
    <div>
      {userChat?.map((chat) => (
        <div className="user" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>Hey there</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
