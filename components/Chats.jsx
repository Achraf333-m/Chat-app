import { ChatContext } from "@/context/ChatContext";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import profile from "@/public/img.png";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

function Chats() {
  const [chats, setChats] = useState(null);

  const { user, updatedUser } = useAuth();
  const { dispatch } = useContext(ChatContext)

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

  if (!chats) {
    return null
  }
  const userChat = Object.entries(chats);
  
  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u})

  }
  return (
    <div>
      {chats && userChat?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className="user" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
