import profile from "@/public/img.png";
import Image from "next/image";

function Message() {
    return (
        <div className="message ">
            <div className="info">
                <Image src={profile} />
                <span>Just now</span>
            </div>
            <div className="content">
                <p>hello</p>
                <img src="https://images.pexels.com/photos/9241611/pexels-photo-9241611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"/>
            </div>
        </div>
    );
}

export default Message;