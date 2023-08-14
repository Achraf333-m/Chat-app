import { ChatContext } from "@/context/ChatContext";
import useAuth from "@/hooks/useAuth";
import { useContext, useEffect, useRef, useState } from "react";

function Message({ message }) {
  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }, [message])
  return (
    <div ref={ref} className={`message ${message.senderId === user.uid && 'owner'}`}>
      <div className="info">
        <img alt="avatar" src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} />
        <span>Just now</span>
      </div>
      <div className="content">
        <p>{message.text}</p>
        {message.image && <img src={message.image} />}
      </div>
    </div>
  );
}

export default Message;
