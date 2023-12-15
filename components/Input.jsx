import { FcAddImage } from "react-icons/fc";
import { AiOutlinePaperClip } from "react-icons/ai";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { v4 as random } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { ChatContext } from "@/context/ChatContext";

function Input() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  console.log(data.user)

  const handleSubmit = async () => {
    if (image) {
      const storageRef = ref(storage, random());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: random(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: random(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".data"]:serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".data"]:serverTimestamp(),
    })

    setText("")
    setImage(null)
  };


  const handleKey = (e) => {
    e.code === "Enter" && handleSubmit()

  }

  return (
    <div className="input">
      {data.user.displayName ? (<>
      
      
      <input
        type="text"
        placeholder="Type a message..."
        onKeyDown={handleKey} 
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="inputTools">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <FcAddImage />
        </label>
        <AiOutlinePaperClip />
        <button onClick={handleSubmit}>Send</button>
      </div>
      </>) : (<h1 className="noChat">
        Pick a friend and start talking!
      </h1>)}
    </div>
  );
}

export default Input;
