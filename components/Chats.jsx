import profile from '@/public/img.png'
import Image from 'next/image';


function Chats() {
  return (
    <div>
      <div className="user">
        <Image src={profile} alt="" />
        <div className="userInfo">
          <span>User Name</span>
          <p>Hey there</p>
        </div>
      </div>
      <div className="user">
        <Image src={profile} alt="" />
        <div className="userInfo">
          <span>User Name</span>
          <p>Hey there</p>
        </div>
      </div>
      <div className="user">
        <Image src={profile} alt="" />
        <div className="userInfo">
          <span>User Name</span>
          <p>Hey there</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;
