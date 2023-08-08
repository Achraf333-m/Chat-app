import profile from '@/public/img.png'
import Image from 'next/image';

function Navbar() {
    return (
        <div className="navBar">
            <h1>Awesome Chat</h1>
            <div className="navInfo">
                <Image src={profile} alt="" />
                <h3>User Name</h3>
                <button>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;