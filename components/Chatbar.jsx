import profile from "@/public/img.png";
import Image from "next/image";
import { BsPersonFillAdd, BsFillCameraVideoFill } from 'react-icons/bs'
import { GrMore } from "react-icons/gr"

function Chatbar() {
  return (
    <div className="chatbar">
      <div className="chatProfile">
        <Image src={profile} alt="" />
        <h3>User Name</h3>
      </div>
      <div className="chatIcons">
        <BsPersonFillAdd/>
        <BsFillCameraVideoFill />
        <GrMore />
      </div>
    </div>
  );
}

export default Chatbar;
