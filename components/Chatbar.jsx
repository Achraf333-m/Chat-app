import { ChatContext } from "@/context/ChatContext";
import profile from "@/public/img.png";
import Image from "next/image";
import { useContext } from "react";
import { BsPersonFillAdd, BsFillCameraVideoFill } from "react-icons/bs";
import { GrMore } from "react-icons/gr";

function Chatbar() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chatbar">
      <div className="chatProfile">
        {data.user.photoURL && <img src={data.user.photoURL} alt="" />}
        <h3>{data.user?.displayName}</h3>
      </div>
      <div className="chatIcons">
        <BsPersonFillAdd />
        <BsFillCameraVideoFill />
        <GrMore />
      </div>
    </div>
  );
}

export default Chatbar;
