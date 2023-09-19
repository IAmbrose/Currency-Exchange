import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="menu-position fixed top-0 right-0 p-4">
            <div className="menu-container text-red-300">
                <p onClick = {toggleMenu}>Menu</p>
                {showMenu && (
                    <ul className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                    <li>
                        <Link to="/mainpage" className="block px-4 py-2 hover:bg-gray-100" >Main Page</Link>
                    </li>
                    <li>
                        <Link to="/mywallet" className="block px-4 py-2 hover:bg-gray-100">My Wallet</Link>
                    </li>
                    <li>
                        <Link to="/chartpage" className="block px-4 py-2 hover:bg-gray-100">Historical Charts</Link>
                    </li>
                </ul>
                )}
            </div>
        </div>   
    )
}