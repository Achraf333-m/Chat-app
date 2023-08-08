import Image from "next/image";
import profile from '@/public/img.png'


function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user.." />
      </div>
      <div className="user">
        <Image src={profile} alt="" />
        <div className="userInfo">
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
