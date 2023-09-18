import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div className="menu-container">
            <h3 onClick = {toggleMenu}>Menu</h3>
            {showMenu && (
                <ul>
                <li>
                    <Link to="/mainpage">Main Page</Link>
                </li>
                <li>
                    <Link to="/mywallet">My Wallet</Link>
                </li>
                <li>
                    <Link to="/chartpage">Historical Charts</Link>
                </li>
            </ul>
            )}
        </div>
    )
}