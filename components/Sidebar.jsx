import Navbar from "./Navbar";
import Search from "./Search";

function Sidebar() {
    return (
        <div className="sideBar">
            <Navbar/>
            <Search/>
        </div>
    );
}

export default Sidebar;